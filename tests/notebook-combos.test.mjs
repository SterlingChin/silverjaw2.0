import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {test} from 'node:test';
import assert from 'node:assert/strict';
const html=readFileSync(new URL('../public/games/notebook-invasion/index.html',import.meta.url),'utf8');
function game(saved={}){
 const noop=()=>{},element={innerHTML:'',classList:{add:noop,remove:noop,contains:()=>true},getContext:()=>({}),addEventListener:noop,setAttribute:noop,blur:noop};
 const c=vm.createContext({document:{querySelector:()=>element,querySelectorAll:()=>[],activeElement:null},window:{addEventListener:noop},localStorage:{getItem:k=>saved[k]??null,setItem:(k,v)=>saved[k]=v},requestAnimationFrame:noop});
 for(const match of html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g))vm.runInContext(match[1],c);
 return code=>vm.runInContext(code,c);
}
test('all new recipes are reachable from base pickups and spend finite ammo',()=>{
 const run=game();
 for(const [path,name] of [[['SPREAD GUN','ROCKETS'],'FIREWORK LAUNCHER'],[['RAPID BLASTER','SPREAD GUN','SPREAD GUN','ROCKETS'],'VOLCANO GUN'],[['RAPID BLASTER','SPREAD GUN','ROCKETS','SPREAD GUN'],'PRISM GUN'],[['RAPID BLASTER','ROCKETS','SPREAD GUN'],'SWARM LAUNCHER'],[['RAPID BLASTER','SPREAD GUN','SPREAD GUN','RAPID BLASTER'],'POPCORN GUN'],[['RAPID BLASTER','SPREAD GUN','ROCKETS','RAPID BLASTER'],'THUNDER PEN']]){
  const result=run(`(()=>{let w='PENCIL PISTOL',a=0;for(const p of ${JSON.stringify(path)}){const r=weaponPickup(w,a,p);w=r.weapon;a=r.ammo;}return {w,a}})()`);assert.equal(result.w,name);assert.ok(result.a>0);
 }
});
test('fireworks and popcorn detonate once and fragments damage enemies',()=>{
 for(const weapon of ['FIREWORK LAUNCHER','POPCORN GUN']){
  const run=game();const result=run(`(()=>{start('human');spawnTimer=100;pickupTimer=100;player.weapon='${weapon}';player.ammo=10;fire();const s=shots[0];detonate(s);const n=shots.length;detonate(s);const once=shots.length===n;const f=shots[1];entities=[{type:'ufo',x:f.x+f.vx*.01,y:f.y+f.vy*.01,hp:1,vx:0,t:0,cool:100}];update(.01);return {once,kills,ammo:player.ammo}})()`);assert.equal(result.once,true);assert.ok(result.kills>=1);assert.equal(result.ammo,9);
 }
});
test('volcano impacts emit upward lava and prism hits split into four rays',()=>{
 const run=game();assert.equal(run(`(()=>{start('human');player.weapon='VOLCANO GUN';player.ammo=10;fire();detonate(shots[0]);return shots.slice(1).filter(s=>s.vy<=0&&s.effect==='ember').length})()`),13);
 assert.equal(run(`(()=>{start('human');player.weapon='PRISM GUN';player.ammo=10;fire();splitPrism(shots[0]);return shots.filter(s=>s.laser&&!s.effect).length})()`),4);
});
test('swarm launches three rockets with distinct target slots for one ammo',()=>{
 const run=game();assert.equal(run(`(()=>{start('human');player.weapon='SWARM LAUNCHER';player.ammo=10;fire();return shots.length===3&&new Set(shots.map(s=>s.targetSlot)).size===3&&shots.every(s=>s.homing)&&player.ammo===9})()`),true);
});
test('UFO combos stack and expire back to basic beam',()=>{
 const run=game();assert.equal(run(`(()=>{const p=ufoPower(Object.fromEntries(UFO_PARTS.map(k=>[k,30])));return p.tornado&&p.bubble&&p.vacuum&&p.reflect})()`),true);
 assert.equal(run(`(()=>{start('alien');player.mods=Object.fromEntries(UFO_PARTS.map(k=>[k,.01]));update(.02);return ufoName(ufoPower(player.mods))})()`),'TRACTOR BEAM');
});
test('shield absorbs damage at a cost and deflector reflects hostile shots',()=>{
 const run=game();assert.equal(run(`(()=>{start('alien');player.mods.SHIELD=30;hurt();return player.hp===5&&player.mods.SHIELD===24})()`),true);
 assert.equal(run(`(()=>{start('alien');player.mods={SHIELD:30,SPEED:30};shots=[{x:player.x+40,y:player.y,vx:-100,vy:0,life:5,friendly:false}];update(.01);return shots[0].friendly&&shots[0].vx>0&&player.hp===5})()`),true);
});
test('tornado abducts trucks, while ordinary beams cannot',()=>{
 const run=game();for(const strong of [false,true]){const result=run(`(()=>{start('alien');player.y=450;player.mods={'WIDE BEAM':30,'STRONG BEAM':${strong?30:0}};keys.Space=true;spawnTimer=100;pickupTimer=100;entities=[{type:'truck',x:player.x,y:player.y+35,hp:4,t:0,cool:100}];for(let i=0;i<10;i++)update(.02);return kills})()`);assert.equal(result,strong?1:0);}
});
test('bubble passengers keep rising after the beam is released',()=>{
 const run=game();assert.equal(run(`(()=>{start('alien');player.mods={'WIDE BEAM':30,SHIELD:30};keys.Space=true;entities=[{type:'cow',x:player.x,y:400,hp:1,t:0}];update(.02);const e=entities[0],y=e.y;keys.Space=false;update(.02);return e.bubble&&e.y<y})()`),true);
});
test('Thunder Pen kills visible invaders, preserves offscreen enemies, and awards each kill once',()=>{
 const run=game();assert.equal(run(`(()=>{start('human');player.weapon='THUNDER PEN';player.ammo=3;entities=[{type:'ufo',x:500,y:200,hp:99},{type:'alien',x:800,y:G,hp:99},{type:'ufo',x:1400,y:200,hp:99},{type:'cow',x:400,y:G,hp:1}];fire();return kills===2&&score===225&&entities[0].hp===0&&entities[1].hp===0&&entities[2].hp===99&&entities[3].hp===1&&player.ammo===2&&player.storm.targets.length===2&&shots.length===0})()`),true);
});
test('Thunder Pen has three single-press uses, cannot repeat while held, and returns to pistol',()=>{
 const run=game();assert.equal(run(`(()=>{start('human');player.weapon='THUNDER PEN';player.ammo=WEAPONS['THUNDER PEN'].ammo;keys.KeyJ=true;fire();player.cool=0;fire();if(player.ammo!==2)return false;for(let i=0;i<2;i++){keys.KeyJ=false;update(.01);player.cool=0;keys.KeyJ=true;fire();}return player.ammo===0&&player.weapon==='PENCIL PISTOL'})()`),true);
});
test('UFO pickups activate their named module and a new run clears all modules',()=>{
 const run=game();assert.equal(run(`(()=>{start('alien');spawnTimer=100;pickupTimer=100;for(const type of UFO_PARTS){pickups=[{x:player.x,y:player.y,type,life:10}];update(.01);}const all=ufoPower(player.mods);const combined=all.tornado&&all.bubble&&all.vacuum&&all.reflect;start('alien');return combined&&ufoName(ufoPower(player.mods))==='TRACTOR BEAM'})()`),true);
});
test('secret power requires a live Prism Gun plus heal, lasts 120 seconds, and leaves map unchanged',()=>{
 const run=game();for(const [weapon,ammo,expected] of [['PRISM GUN',3,120],['PRISM GUN',0,0],['LASER',3,0]]){assert.equal(run(`(()=>{start('human');player.weapon='${weapon}';player.ammo=${ammo};pickups=[{x:player.x,y:player.y-24,type:'+',life:10}];update(.01);return player.superTime})()`),expected);}
 assert.equal(run("Object.keys(WEAPONS).some(k=>k.includes('SUPER'))"),false);
});
test('super dash sweeps through enemies, blocks damage, expires, and resets on restart',()=>{
 const run=game();assert.equal(run(`(()=>{start('human');player.superTime=120;player.y=250;keys.ArrowRight=true;entities=[{type:'ufo',x:player.x+50,y:226,hp:99,t:0,cool:100,vx:0}];update(.1);hurt();return kills===1&&player.hp===5&&player.x===472&&player.superTime===119.9})()`),true);
 assert.equal(run(`(()=>{player.superTime=.01;keys={};update(.02);hurt();const expired=player.superTime===0&&player.hp===4;start('human');return expired&&player.superTime===0&&player.trail.length===0})()`),true);
});

test('Super Doodle discovery stays hidden until earned and persists across reloads and runs',()=>{
 const saved={};let run=game(saved);assert.equal(run('superDiscovered'),false);
 run("start('human');player.weapon='PRISM GUN';player.ammo=3;pickups=[{type:'+',x:player.x,y:player.y-24,life:10}];update(.01)");
 assert.equal(run('superDiscovered'),true);assert.equal(saved['notebook-invasion-super-discovered'],'1');
 run("start('human')");assert.equal(run('superDiscovered'),true);assert.equal(run('player.superTime'),0);
 run=game(saved);assert.equal(run('superDiscovered'),true);
 assert.equal(game({'notebook-invasion-super-discovered':'false'})('superDiscovered'),false);
});
test('dragon comes from a charged Volcano plus heal and breathes lava without spending gun ammo',()=>{
 const run=game();assert.equal(run(`(()=>{start('human');player.weapon='VOLCANO GUN';player.ammo=12;pickups=[{type:'+',x:player.x,y:player.y-24,life:10}];update(.01);fire();return player.dragonTime===60&&foundSecrets.dragon&&shots[0].lava&&player.ammo===12&&player.healUsed})()`),true);
 assert.equal(run(`(()=>{player.dragonTime=.01;keys={};update(.02);player.cool=0;shots=[];fire();return player.dragonTime===0&&shots[0].effect==='volcano'&&player.ammo===11})()`),true);
});
test('cow secret requires five consecutive cows and resets on other passengers or hits',()=>{
 const run=game();assert.equal(run(`(()=>{start('alien');for(let i=0;i<4;i++)recordAbduction('cow');recordAbduction('civilian');recordAbduction('cow');hurt();if(player.cowStreak!==0)return false;for(let i=0;i<5;i++)recordAbduction('cow');return foundSecrets.cow&&player.cowTime===60&&tractorWidth(ufoPower(player.mods))===280})()`),true);
});
test('ten actual reflected bullets unlock mirrors that abduct outside the main beam',()=>{
 const run=game();assert.equal(run(`(()=>{start('alien');player.mods={SHIELD:30,SPEED:30};spawnTimer=100;pickupTimer=100;for(let i=0;i<10;i++){shots=[{x:player.x+45,y:player.y,vx:-100,vy:0,life:5,friendly:false}];update(.01);}if(!foundSecrets.mirror||player.mirrorTime!==45)return false;player.mods={};entities=[{type:'cow',x:player.x+170,y:player.y+31,hp:1,t:0}];keys.Space=true;update(.02);return kills===1})()`),true);
});
test('wave ten without heals draws a teammate that shoots; heal use blocks the secret',()=>{
 for(const healed of [false,true]){const run=game();assert.equal(run(`(()=>{start('human');wave=9;player.healUsed=${healed};kills=goal;update(.01);return player.buddy})()`),!healed);if(!healed)assert.equal(run(`(()=>{entities=[{type:'ufo',x:player.x+100,y:250,hp:5,t:0,cool:100,vx:0}];shots=[];update(.01);return shots.some(s=>s.friendly&&s.damage===2)})()`),true);}
});
test('all discoveries persist while temporary powers and challenge counters reset',()=>{
 const saved={},run=game(saved);run("start('alien');for(const key of Object.keys(SECRET_NOTES))unlockSecret(key);player.cowTime=60;player.mirrorTime=45;start('human')");assert.equal(run('player.cowTime+player.mirrorTime+player.dragonTime+player.reflections+player.cowStreak'),0);assert.equal(run('player.buddy'),false);const loaded=game(saved);assert.equal(loaded('Object.keys(foundSecrets).length'),9);
});

test('Imposter unlocks with charged swarm plus heal and protects against targeting and contact',()=>{
 const run=game();assert.equal(run(`(()=>{start('human');player.weapon='SWARM LAUNCHER';player.ammo=10;pickups=[{type:'+',x:player.x,y:player.y-24,life:10}];update(.01);shots=[];enemyShot({x:100,y:100},100);hurt();return player.imposter&&foundSecrets.imposter&&player.hp===5&&shots.length===0})()`),true);
 assert.equal(run(`(()=>{player.cool=0;fire();enemyShot({x:100,y:100},100);hurt();return !player.imposter&&player.hp===4&&shots.some(s=>!s.friendly)&&shots.some(s=>s.friendly)})()`),true);
});
test('Imposter holds teammate fire, suppresses super dash kills, and resets on new runs',()=>{
 const run=game();assert.equal(run(`(()=>{start('human');player.imposter=true;player.buddy=true;player.superTime=120;spawnTimer=100;pickupTimer=100;entities=[{type:'alien',x:player.x,y:G,hp:3,t:0,cool:0}];update(.01);const protectedState=entities[0].hp===3&&shots.length===0&&player.hp===5;start('human');return protectedState&&!player.imposter})()`),true);
});

test('five rocket crates unlock one Nuke, heals preserve streak and other weapons reset it',()=>{
 const run=game();assert.equal(run(`(()=>{start('human');spawnTimer=100;pickupTimer=100;function pickup(type){pickups=[{type,x:player.x,y:player.y-24,life:10}];update(.01);}pickup('ROCKETS');pickup('ROCKETS');pickup('SPREAD GUN');if(player.rocketStreak!==0)return false;for(let i=0;i<4;i++)pickup('ROCKETS');pickup('+');if(player.rocketStreak!==4||player.weapon==='NUKE')return false;pickup('ROCKETS');return player.weapon==='NUKE'&&player.ammo===1&&foundSecrets.nuke&&player.rocketStreak===0})()`),true);
});
test('Nuke removes all current invaders and bullets, advances exactly ten waves, and is single use',()=>{
 const run=game();assert.equal(run(`(()=>{start('human');wave=3;goal=16;kills=15;player.weapon='NUKE';player.ammo=1;entities=[{type:'ufo',x:500,y:200,hp:99},{type:'alien',x:3000,y:G,hp:99}];shots=[{friendly:false,life:5}];fire();const fired=wave===13&&goal===46&&kills===0&&entities.length===0&&shots.length===0&&player.ammo===0&&player.weapon==='PENCIL PISTOL'&&score===2725;fire();return fired&&wave===13})()`),true);
});

test('both modes start without pre-placed pickups and still spawn power-ups during play',()=>{
 const run=game();for(const side of ['human','alien'])assert.equal(run(`(()=>{start('${side}');if(pickups.length!==0)return false;pickupTimer=.01;update(.02);return pickups.length===1})()`),true);
});

test('secret weapon recipes unlock only through their charged weapon and a heal',()=>{
 const run=game();for(const [base,w] of [['ROCKETS','METEOR SHOWER'],['SPREAD GUN','BOOMERANG SAW'],['RAPID BLASTER','BLACK HOLE GUN']])assert.equal(run(`(()=>{start('human');player.weapon='${base}';player.ammo=10;pickups=[{type:'+',x:player.x,y:G-24,life:10}];update(.01);return player.weapon})()`),w);
});
test('Meteor Shower emits nine falling meteors for one charge',()=>{
 const run=game();assert.equal(run(`(()=>{start('human');player.weapon='METEOR SHOWER';player.ammo=5;fire();return shots.length===9&&shots.every(s=>s.effect==='meteor'&&s.vy>0)&&player.ammo===4})()`),true);
});
test('saw returns toward player and black holes pull then damage invaders',()=>{
 const run=game();assert.equal(run(`(()=>{start('human');spawnTimer=100;pickupTimer=100;shots=[{x:player.x+300,y:player.y-25,vx:750,vy:0,effect:'saw',born:-1,life:4,friendly:true,damage:3,hit:new Set()}];update(.01);return shots[0].vx<0})()`),true);
 assert.equal(run(`(()=>{start('human');spawnTimer=100;pickupTimer=100;entities=[{type:'ufo',x:650,y:200,hp:9,t:0,cool:100,vx:0}];shots=[{x:550,y:200,vx:0,vy:0,effect:'blackhole',fuse:2,life:4,friendly:true,damage:0}];update(.1);const pulled=entities[0].x<650;detonate(shots[0]);return pulled&&entities[0].hp<=0&&kills===1&&player.hp===5})()`),true);
});

test('Swarm plus Rapid unlocks Snake Launcher and only one snake is summoned at a time',()=>{
 const run=game();assert.equal(run(`(()=>{start('human');const r=weaponPickup('SWARM LAUNCHER',10,'RAPID BLASTER');player.weapon=r.weapon;player.ammo=r.ammo;fire();player.cool=0;const snake=player.snake;fire();return r.weapon==='SNAKE LAUNCHER'&&player.ammo===2&&player.snake===snake&&snake.life===30})()`),true);
});
test('snake eats ground aliens, jumps to eat UFOs, and expires without hurting the player',()=>{
 const run=game();assert.equal(run(`(()=>{start('human');player.weapon='SNAKE LAUNCHER';player.ammo=3;fire();entities=[{type:'alien',x:player.snake.x+30,y:G,hp:99}];updateSnake(.05);if(kills!==1)return false;entities=[{type:'ufo',x:player.snake.x+80,y:230,hp:99}];for(let i=0;i<180&&entities[0].hp>0;i++)updateSnake(1/60);const ate=entities[0].hp===0&&kills===2&&player.hp===5;player.snake.life=.01;updateSnake(.02);return ate&&player.snake===null})()`),true);
});
