import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const html = readFileSync(new URL('../public/games/q-bee/index.html', import.meta.url), 'utf8');
const source = html.match(/<script id="qbee-model">([\s\S]*?)<\/script>/)[1];
function setup(serialized = null) {
  const context = vm.createContext({});
  const api = vm.runInContext(source + '\n({Progress,Fall,LEVELS,SKINS,SAVE_KEY,REVIVE_COST,gateAt,safeAt,normalizeSave,expressionAt,obstacleRects,hitsObstacle,landingAt,ghostAt,validGhost,crashMessage,candyHeads})', context);
  let stored = serialized;
  const storage = { getItem: () => stored, setItem: (_, v) => stored = v };
  const model = new api.Progress(storage);
  return { ...api, model, storage, snapshot: () => JSON.parse(stored) };
}

test('first visit has an empty wallet, original skin, one story level, and all free levels', () => {
  const {model,LEVELS}=setup();
  assert.equal(model.save.bank,0);
  assert.equal(model.save.skin,'mint');
  assert.equal(model.save.modes.story.unlocked,0);
  assert.equal(model.save.modes.free.unlocked,LEVELS.length-1);
  assert.equal(model.start('story',1),false);
  assert.equal(model.start('free',LEVELS.length-1),true);
});

test('only touched qoins are earned; bank changes only on a successful finish', () => {
  const {model}=setup();model.start('story',0);model.collect();model.collect();
  assert.equal(model.run.qoins,2);assert.equal(model.save.bank,0);
  const result=model.finish();assert.equal(result.qoins,2);assert.equal(result.bonus,5);
  assert.equal(model.save.bank,7);assert.equal(model.finish(),null);assert.equal(model.save.bank,7);
});

test('all six try bonuses match Taylor’s rules', () => {
  for(let tries=1;tries<=8;tries++) {
    const {model}=setup();model.start('free',1);
    for(let i=1;i<tries;i++){model.collect();model.die();model.start('free',1);}
    model.collect();const reward=model.finish();
    assert.equal(reward.tries,tries);assert.equal(reward.bonus,Math.max(0,6-tries));
    assert.equal(model.save.bank,1+Math.max(0,6-tries));
  }
});

test('death discards carried qoins but preserves the bank; repeated death is inert', () => {
  const {model}=setup();model.save.bank=34;model.start('story',0);
  model.collect();model.collect();assert.equal(model.die(),true);assert.equal(model.die(),false);
  assert.equal(model.run.qoins,0);assert.equal(model.save.bank,34);assert.equal(model.finish(),null);
});

test('free restart loses collected qoins and adds one try', () => {
  const {model}=setup();model.start('story',0);model.collect();model.start('story',0);
  assert.equal(model.run.qoins,0);assert.equal(model.run.tries,2);
});

test('insufficient bank cannot revive, and carried qoins cannot pay for it', () => {
  const {model}=setup();model.save.bank=19;model.start('free',0);
  for(let i=0;i<30;i++)model.collect();model.die();assert.equal(model.revive(),false);
  assert.equal(model.save.bank,19);assert.equal(model.run.status,'dead');assert.equal(model.run.tries,1);
});

test('a paid revive deducts exactly 20, adds a try, clears four layers, and discards attempt qoins', () => {
  const {model,Fall}=setup();model.save.bank=50;model.start('story',0);const fall=new Fall(0);
  fall.depth=fall.course.obstacles[1].z;fall.course.obstacles[0].passed=true;
  model.collect();model.die();const cleared=fall.revive(model);
  assert.equal(cleared.length,4);assert.equal(cleared[0].index,1);assert.equal(cleared[3].index,4);
  assert.equal(fall.course.obstacles[5].broken,false);assert.equal(model.save.bank,30);
  assert.equal(model.run.tries,2);assert.equal(model.run.qoins,0);assert.equal(fall.revive(model),false);
  model.collect();const reward=model.finish();assert.equal(reward.bonus,4);assert.equal(model.save.bank,35);
});

test('late revive clears only remaining obstacles', () => {
  const {model,Fall}=setup();model.save.bank=20;model.start('story',0);const fall=new Fall(0);
  const last=fall.course.obstacles.at(-1);fall.depth=last.z;model.die();
  assert.equal(fall.revive(model).length,1);assert.equal(model.save.bank,0);
});

test('reload persists earned progress, never depth or attempt qoins, and restarts at the top', () => {
  const {model,Progress,Fall,storage,snapshot}=setup();model.save.bank=110;model.buy('chef');
  model.start('story',0);model.collect();model.finish();model.start('story',1);model.collect();
  const data=snapshot();assert.equal(data.qoins,undefined);assert.equal(data.depth,undefined);
  const reloaded=new Progress(storage);assert.equal(reloaded.run,null);
  assert.equal(reloaded.save.skin,'chef');assert.equal(reloaded.save.bank,76);
  assert.equal(reloaded.save.modes.story.unlocked,1);assert.equal(reloaded.save.resume.level,1);
  reloaded.start(reloaded.save.resume.mode,reloaded.save.resume.level);
  assert.equal(reloaded.run.qoins,0);assert.equal(reloaded.run.tries,2);
  assert.equal(new Fall(1).depth,0);
});

test('story and free records are independent but wallet and wardrobe are shared', () => {
  const {model}=setup();model.start('free',5);model.finish();
  assert.equal(model.save.modes.story.unlocked,0);
  assert.equal(model.save.modes.free.records.volcano.wins,1);
  assert.equal(model.save.modes.story.records.volcano,undefined);
  model.start('story',0);model.finish();assert.equal(model.save.modes.story.unlocked,1);
  assert.equal(model.save.bank,10);assert.equal(model.buy('berry'),true);assert.equal(model.save.bank,0);
});

test('going home retains attempt counts and forfeits unbanked qoins', () => {
  const {model}=setup();model.start('story',0);model.collect();model.abandon();
  assert.equal(model.run.qoins,0);assert.equal(model.save.bank,0);model.start('story',0);
  assert.equal(model.run.tries,2);
});

test('skins cannot be bought without funds or charged twice', () => {
  const {model}=setup();assert.equal(model.buy('cosmic'),false);assert.equal(model.buy('unknown'),false);
  model.save.bank=210;assert.equal(model.buy('cosmic'),true);assert.equal(model.save.bank,10);
  model.buy('mint');model.buy('cosmic');assert.equal(model.save.bank,10);assert.equal(model.save.skin,'cosmic');
});

test('reset removes only Q-BEE progress and returns to the first story level', () => {
  const {model,snapshot}=setup();model.save.bank=200;model.buy('armor');model.start('story',0);model.finish();model.reset();
  assert.equal(model.save.bank,0);assert.equal(model.save.owned.length,1);assert.equal(model.save.modes.story.unlocked,0);
  assert.equal(model.save.resume,null);assert.equal(snapshot().skin,'mint');
});

test('malformed and untrusted saves recover safely', () => {
  assert.equal(setup('{ broken').model.save.bank,0);
  const {normalizeSave}=setup();const save=normalizeSave({version:1,bank:-100,owned:['nope'],skin:'nope',resume:{mode:'story',level:50},modes:{story:{unlocked:100,records:{space:{pending:-9,best:'abc'}}}}});
  assert.equal(save.bank,0);assert.equal(save.skin,'mint');assert.equal(save.resume,null);assert.equal(save.modes.story.records.space.pending,0);
});

test('blocked storage surfaces a failure and game remains playable', () => {
  const {Progress}=setup();let warnings=0;const model=new Progress({getItem(){throw Error('blocked')},setItem(){throw Error('blocked')}},()=>warnings++);
  model.start('story',0);model.collect();assert.equal(model.finish().total,6);assert.ok(warnings>=2);
});

test('crossing a blocked layer crashes; passing through the gap succeeds', () => {
  const {model,Fall}=setup();model.start('story',0);const fall=new Fall(0);fall.x=.85;fall.depth=419;
  fall.advance(.02,{x:0,y:0},model);assert.equal(model.run.status,'dead');assert.equal(fall.depth,420);
  model.start('story',0);const next=new Fall(0);next.depth=419;
  next.advance(.02,{x:0,y:0},model);assert.equal(model.run.status,'falling');assert.equal(next.course.obstacles[0].passed,true);
});

test('qoins require a spatial hit; passing their depth elsewhere misses them forever', () => {
  const {model,Fall}=setup();model.start('free',0);const fall=new Fall(0);fall.course.obstacles.forEach(o=>o.broken=true);
  const qoin=fall.course.qoins[0];fall.depth=qoin.z-1;fall.x=.8;
  fall.advance(.02,{x:0,y:0},model);assert.equal(model.run.qoins,0);assert.equal(qoin.missed,true);
  const hit=fall.course.qoins[1];fall.depth=hit.z-1;fall.x=hit.x;fall.y=hit.y;
  fall.advance(.02,{x:0,y:0},model);assert.equal(model.run.qoins,1);assert.equal(hit.taken,true);
});

test('all courses have reachable moving gaps and can be completed through real updates', () => {
  const {model,Fall,LEVELS,gateAt}=setup();
  for(let level=0;level<LEVELS.length;level++) {
    model.start('free',level);const fall=new Fall(level);let steps=0;
    while(model.run.status==='falling'&&steps++<6000){
      const next=fall.course.obstacles.find(o=>!o.passed&&!o.broken);
      const g=next?gateAt(next,fall.time,level):{x:0,y:0};
      const dx=g.x-fall.x,dy=g.y-fall.y,len=Math.hypot(dx,dy),gain=Math.min(5,1/Math.max(.001,len));
      fall.advance(1/60,{x:dx*gain,y:dy*gain},model);
    }
    assert.equal(model.run.status,'won',`course ${level} should be passable`);
    assert.equal(fall.depth,fall.course.length);assert.equal(fall.course.obstacles.filter(o=>o.passed).length,LEVELS[level].count);
  }
});

test('large frame gaps cannot tunnel through walls, and movement stays in the shaft', () => {
  const {model,Fall}=setup();model.start('free',0);const fall=new Fall(0);fall.x=.88;fall.depth=419;
  fall.advance(10,{x:1,y:1},model);assert.equal(model.run.status,'dead');assert.equal(fall.x,.88);
});


test('Q-BEE blinks, briefly grins, and yawns occasionally with a closed smile at rest', () => {
  const {expressionAt}=setup();
  assert.equal(expressionAt(0).grin,0);assert.equal(expressionAt(0).yawn,0);
  assert.ok(expressionAt(4.92).eyes<.1);assert.equal(expressionAt(5.1).eyes,1);
  assert.ok(expressionAt(7.8).grin>.9);assert.equal(expressionAt(10).grin,0);
  assert.ok(expressionAt(18.3).yawn>.9);assert.equal(expressionAt(21).yawn,0);
  assert.equal(expressionAt(18.3,true).yawn,0);
});


test('cross lasers have four safe openings and both beams collide', () => {
 const {hitsObstacle}=setup(),laser={type:'laser',index:1};
 for(const x of [-.48,.48])for(const y of [-.48,.48])assert.equal(hitsObstacle(x,y,laser,0),false);
 assert.equal(hitsObstacle(0,0,laser,0),true);
 assert.equal(hitsObstacle(.7,0,laser,0),true);
 assert.equal(hitsObstacle(0,.7,laser,0),true);
});

test('flames extend from walls, vary their reach, and leave the center open', () => {
 const {obstacleRects,hitsObstacle}=setup(),flame={type:'flame',index:2};
 const a=obstacleRects(flame,0),b=obstacleRects(flame,1);
 assert.equal(a[0][0],-1);assert.equal(a[1][0]+a[1][2],1);assert.notEqual(a[0][2],b[0][2]);
 assert.equal(hitsObstacle(0,0,flame,0),false);assert.equal(hitsObstacle(-.8,-.48,flame,0),true);
 assert.equal(hitsObstacle(.8,.48,flame,0),true);
});


test('empty space beside a tapered flame tip does not cause phantom collisions', () => {
 const {obstacleRects,hitsObstacle}=setup(),flame={type:'flame',index:2};
 const [x,y,w,h]=obstacleRects(flame,0)[0];
 assert.equal(hitsObstacle(x+w-.02,y+.02,flame,0,.01),false);
 assert.equal(hitsObstacle(x+w-.02,y+h/2,flame,0,.01),true);
});


test('Jelly Belly pickup absorbs exactly one collision and never banks qoins early',()=>{
 const {model,Fall}=setup();model.start('free',0);const f=new Fall(0);f.depth=239;f.advance(.02,{x:0,y:0},model);assert.equal(f.jelly,true);model.collect();f.x=.85;f.depth=419;f.advance(.02,{x:0,y:0},model);assert.equal(model.run.status,'falling');assert.equal(f.jelly,false);assert.equal(f.course.obstacles[0].broken,true);assert.equal(model.save.bank,0);f.bounce=0;f.x=0;f.y=0;f.depth=739;f.advance(.02,{x:0,y:0},model);assert.equal(model.run.status,'dead');assert.equal(model.run.qoins,0);
});
test('Tiny Trouble shrinks collision radius, expires, and enables the side tunnel',()=>{
 const {model,Fall,hitsObstacle}=setup();model.start('free',0);const f=new Fall(0),p=f.course.powers.find(p=>p.type==='tiny');f.depth=p.z-1;f.x=p.x;f.y=p.y;f.advance(.02,{x:0,y:0},model);assert.equal(f.tiny,6);const o=f.course.obstacles[3],t=o.tunnel;assert.equal(hitsObstacle(t.x,t.y,o,0,.085),true);assert.equal(hitsObstacle(t.x,t.y,o,0,.04),false);f.depth=o.z-1;f.x=t.x;f.y=t.y;f.advance(.02,{x:0,y:0},model);assert.equal(f.tunnelFound,true);assert.equal(model.run.qoins,6);assert.equal(model.save.owned.includes('tunnel'),false);f.tiny=.001;f.advance(.02,{x:0,y:0},model);assert.equal(f.tiny,0);
});
test('tunnel skin requires finishing and cannot be bought or granted by old saves',()=>{
 const {model,Fall,landingAt,normalizeSave}=setup();assert.equal(model.buy('tunnel'),false);assert.equal(normalizeSave({version:1}).owned.includes('tunnel'),false);model.start('free',0);const f=new Fall(0);f.tunnelFound=true;f.course.obstacles.forEach(o=>o.passed=true);f.depth=f.course.length-1;const pad=landingAt(.02);f.x=pad.x;f.y=pad.y;f.advance(.02,{x:0,y:0},model);assert.equal(model.save.owned.includes('tunnel'),true);assert.equal(model.buy('tunnel'),true);
});
test('missing moving jelly crashes and a paid revive gives a new landing approach',()=>{
 const {model,Fall,landingAt}=setup();assert.notEqual(landingAt(0).x,landingAt(2).x);model.save.bank=20;model.start('free',0);const f=new Fall(0);f.course.obstacles.forEach(o=>o.passed=true);f.depth=f.course.length-1;f.x=.88;f.y=.88;f.advance(.02,{x:0,y:0},model);assert.equal(model.run.status,'dead');assert.equal(f.collision.type,'landing');f.revive(model);assert.equal(f.depth,f.course.length-170);assert.equal(model.run.status,'falling');assert.equal(f.x,0);
});
test('ghost replay interpolates, persists per mode, ignores malformed samples and resets',()=>{
 const {model,Fall,ghostAt,validGhost,snapshot}=setup();const g={version:1,time:1,frames:[[0,0,0,0],[1,200,.5,-.5]]};assert.equal(ghostAt(g,.5).depth,100);assert.equal(ghostAt(g,.5).x,.25);assert.equal(validGhost({...g,frames:[[1,5,0,0],[0,8,0,0]]}),null);assert.equal(validGhost({...g,frames:Array(1201).fill([0,0,0,0])}),null);model.start('free',0);const f=new Fall(0);f.course.obstacles.forEach(o=>o.passed=true);f.depth=f.course.length-1;f.advance(.02,{x:0,y:0},model);assert.ok(model.save.modes.free.records.space.ghost);assert.equal(model.save.modes.story.records.space,undefined);assert.ok(setup(JSON.stringify(snapshot())).model.save.modes.free.records.space.ghost);model.reset();assert.equal(model.save.modes.free.records.space,undefined);
});
test('a slower finish or paid revive cannot replace the fastest ghost',()=>{
 const {model,Fall}=setup();model.start('free',0);const r=model.record('free',0);r.ghost={version:1,time:.01,frames:[[0,0,0,0],[.01,3080,0,0]]};const f=new Fall(0);f.course.obstacles.forEach(o=>o.passed=true);f.depth=f.course.length-1;f.advance(.02,{x:0,y:0},model);assert.equal(r.ghost.time,.01);model.start('free',0);delete r.ghost;const revived=new Fall(0);revived.revived=true;revived.course.obstacles.forEach(o=>o.passed=true);revived.depth=revived.course.length-1;revived.advance(.02,{x:0,y:0},model);assert.equal(r.ghost,undefined);
});
test('Candy Factory has moving lollipop colliders and exact crash messages',()=>{
 const {Fall,candyHeads,hitsObstacle,crashMessage}=setup(),f=new Fall(4),o=f.course.obstacles.find(o=>o.type==='lollipop'),a=candyHeads(o,0)[0],b=candyHeads(o,1)[0];assert.notEqual(a.x,b.x);assert.equal(hitsObstacle(a.x,a.y,o,0),true);assert.equal(hitsObstacle(0,-.1,o,0),false);assert.equal(crashMessage('flame'),'Get cooked');assert.equal(crashMessage('wall'),'A little too squishy.');assert.equal(crashMessage('laser'),'Freshly sliced.');
});
test('the tiny pickup and secret tunnel form a reachable route on every course',()=>{
 const {model,Fall,LEVELS,gateAt}=setup();for(let level=0;level<LEVELS.length;level++){model.start('free',level);const f=new Fall(level);let steps=0;while(model.run.status==='falling'&&!f.tunnelFound&&steps++<3000){const obstacle=f.course.obstacles.find(o=>!o.passed&&!o.broken),power=f.course.powers.find(p=>p.type==='tiny'&&!p.taken&&p.z>=f.depth);if(!obstacle)break;const goal=power&&power.z<obstacle.z?power:obstacle.tunnel?obstacle.tunnel:gateAt(obstacle,f.time,level);const dx=goal.x-f.x,dy=goal.y-f.y,len=Math.hypot(dx,dy),gain=Math.min(15,1/Math.max(.001,len));f.advance(1/120,{x:dx*gain,y:dy*gain},model);}assert.equal(f.tunnelFound,true,`tunnel ${level} reachable`);assert.equal(model.run.status,'falling');}
});
test('twenty levels preserve old wallet, wardrobe and progression while free play expands',()=>{
 const {model,LEVELS}=setup(JSON.stringify({version:1,bank:83,owned:['mint','chef'],skin:'chef',modes:{story:{unlocked:5,last:5,records:{volcano:{wins:1,best:2,pending:0,collected:9}}},free:{unlocked:5,last:4,records:{}}}}));assert.equal(LEVELS.length,20);assert.equal(new Set(LEVELS.map(l=>l.id)).size,20);assert.equal(model.save.bank,83);assert.equal(model.save.skin,'chef');assert.equal(model.save.modes.story.unlocked,5);assert.equal(model.save.modes.free.unlocked,19);assert.equal(model.start('story',6),false);assert.equal(model.start('free',19),true);
});
