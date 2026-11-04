import {PARKOUR_COURSES} from './parkour-courses.js';
export const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export const hit=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
export function readSave(value,max){return {unlocked:Number.isInteger(value?.unlocked)?clamp(value.unlocked,1,max):1,best:Array.from({length:max},(_,i)=>Number.isFinite(value?.best?.[i])?clamp(value.best[i],0,999999):0)};}
class Base{constructor(level=0){this.level=level;this.time=0;this.state='play';this.message='';this.score=0;this.camera=0;}win(text){if(this.state!=='play')return;this.state='won';this.message=text;this.score=Math.max(1,this.score);}lose(text){if(this.state!=='play')return;this.state='lost';this.message=text;}tick(dt,input={}){if(this.state!=='play')return;dt=clamp(dt,0,.025);this.time+=dt;this.update(dt,input);}press(){}drag(){}release(){}action(){}}
export class Doodle extends Base{
 constructor(l){super(l);this.p={x:55,y:420,vy:0,grounded:true};this.ink=1050-l*80;this.lines=[];this.active=null;this.running=false;this.eraser=-90;this.platforms=[{x:0,y:420,w:180},{x:300+l*8,y:395,w:135},{x:555-l*5,y:365,w:120},{x:800,y:410,w:160}];this.bits=[];}
 press(x,y){if(this.running||y<95)return;this.active=[{x,y}];}
 drag(x,y){if(!this.active||this.ink<=0)return;const prev=this.active.at(-1),len=Math.hypot(x-prev.x,y-prev.y);if(len<5)return;const used=Math.min(len,this.ink);this.active.push({x:prev.x+(x-prev.x)*used/len,y:prev.y+(y-prev.y)*used/len});this.ink-=used;}
 release(){if(this.active?.length>1)this.lines.push(this.active);this.active=null;}
 action(n){if(n===0){this.release();this.running=true;}if(n===1&&!this.running){const line=this.lines.pop();if(line)for(let i=1;i<line.length;i++)this.ink+=dist(line[i],line[i-1]);}}
 move(dt){
 const p=this.p,oldX=p.x,oldY=p.y,nextX=p.x+65*dt;
 const surfaces=this.platforms.map(b=>({a:{x:b.x,y:b.y},b:{x:b.x+b.w,y:b.y}}));
 for(const path of this.lines)for(let n=1;n<path.length;n++)surfaces.push({a:path[n-1],b:path[n]});
 const ramps=surfaces.filter(s=>Math.abs(s.b.x-s.a.x)>.001).map(s=>({...s,slope:(s.b.y-s.a.y)/(s.b.x-s.a.x),min:Math.min(s.a.x,s.b.x),max:Math.max(s.a.x,s.b.x)}));
 const at=(s,x)=>s.a.y+(x-s.a.x)*s.slope;
 // Follow only a surface already touching the feet. Never snap up to a nearby line.
 const support=ramps.filter(s=>Math.abs(s.slope)<=.85&&oldX>=s.min&&oldX<=s.max&&nextX>=s.min&&nextX<=s.max&&Math.abs(at(s,oldX)-oldY)<.15).sort((a,b)=>at(a,nextX)-at(b,nextX))[0];
 p.x=nextX;p.grounded=false;
 if(support&&p.vy===0){p.y=at(support,nextX);p.grounded=true;}
 else{
  p.vy+=700*dt;p.y+=p.vy*dt;
  // Swept feet/segment collision: land only when falling across the actual surface.
  let first=null;
  for(const s of ramps){if(Math.abs(s.slope)>.85)continue;const before=oldY-at(s,oldX),after=p.y-at(s,p.x);if(before>0.001||after<0||after<=before)continue;const t=-before/(after-before),x=oldX+(p.x-oldX)*t;if(x<s.min||x>s.max)continue;if(!first||t<first.t)first={s,t,x};}
  if(first){const s=first.s;if(p.x>=s.min&&p.x<=s.max){p.y=at(s,p.x);p.vy=0;p.grounded=true;}}
 }
 // Steep strokes behave as walls instead of invisible elevators.
 for(const s of surfaces){if(Math.abs(s.b.x-s.a.x)>.001&&Math.abs((s.b.y-s.a.y)/(s.b.x-s.a.x))<=.85)continue;const edge=Math.min(s.a.x,s.b.x);if(oldX<=edge&&p.x>=edge&&Math.max(s.a.y,s.b.y)>p.y-45&&Math.min(s.a.y,s.b.y)<p.y){p.x=edge-.01;}}
 }
 update(dt){if(!this.running)return;const p=this.p;let remaining=dt;
 const edges=this.platforms.flatMap(b=>[b.x,b.x+b.w]).concat(this.lines.flatMap(path=>path.map(p=>p.x)));
 while(remaining>1e-8){const end=p.x+65*remaining;const edge=edges.filter(x=>x>p.x+1e-8&&x<end).sort((a,b)=>a-b)[0];const step=edge===undefined?remaining:(edge-p.x)/65;this.move(step);remaining-=step;}
 this.eraser+=43*dt;if(p.x-this.eraser<35)this.lose('The giant eraser caught your doodle. Try a smoother bridge!');if(p.y>550)this.lose('The doodle fell off the page. Draw a bridge under every gap.');if(this.level>=2&&Math.floor(this.time*1.2)!==Math.floor((this.time-dt)*1.2))this.bits.push({x:350+(this.time*71)%430,y:80});for(const b of this.bits){const oldY=b.y;b.y+=130*dt;let shield=false;for(const line of this.lines)for(let i=1;i<line.length;i++){const a=line[i-1],c=line[i];if(Math.abs(c.x-a.x)<1||b.x<Math.min(a.x,c.x)||b.x>Math.max(a.x,c.x))continue;const y=a.y+(b.x-a.x)/(c.x-a.x)*(c.y-a.y);if(oldY<y&&b.y>=y)shield=true;}if(shield)b.y=999;if(Math.hypot(b.x-p.x,b.y-(p.y-20))<22)this.lose('Falling eraser crumbs! Draw a shield overhead.');}this.bits=this.bits.filter(b=>b.y<540);if(p.x>900&&p.grounded&&Math.abs(p.y-410)<1){this.score=Math.round(this.ink)+100;this.win('You drew yourself out of trouble!');}}
}
export class Plane extends Base{
 constructor(l){super(l);this.p={x:155,y:270};this.distance=0;this.length=2250+l*210;this.obstacles=Array.from({length:9+l},(_,i)=>({x:430+i*210,gap:210+Math.sin(i*2+l)*105,size:210-l*9,kind:i%3}));this.rings=this.obstacles.map(o=>({x:o.x+55,y:o.gap,got:false}));this.target=null;}
 press(x,y){this.target=y;}drag(x,y){this.target=y;}release(){this.target=null;}
 update(dt,i){this.distance+=105*dt;let move=(i.down?1:0)-(i.up?1:0);if(this.target!==null)move=clamp((this.target-this.p.y)/40,-1,1);this.p.y+=move*210*dt;for(const o of this.obstacles){const x=o.x-this.distance;if(o.kind===1&&Math.abs(x-this.p.x)<140)this.p.y+=Math.sin(this.time*4)*70*dt;if(Math.abs(x-this.p.x)<32&&(this.p.y<o.gap-o.size/2+12||this.p.y>o.gap+o.size/2-12))this.lose(o.kind===1?'A ceiling fan folded your flight plan.':'Crash landing! Aim through the open gap.');}this.p.y=clamp(this.p.y,55,485);for(const r of this.rings)if(!r.got&&Math.hypot(r.x-this.distance-this.p.x,r.y-this.p.y)<28){r.got=true;this.score+=50;}if(this.distance>this.length)this.win('Out the window! The classroom can keep its homework.');}
}
export class Monsters extends Base{
 constructor(l){super(l);this.round=0;this.selected=0;this.completed=0;this.progress=0;this.tracing=false;this.crossing=0;this.obstacles=Array.from({length:3+l%3},(_,i)=>(i+l)%3);this.paths=[[[310,260],[270,210],[230,245],[270,280],[310,260],[350,210],[390,245],[350,280],[310,260]],[[300,290],[280,310],[320,330],[280,350],[320,370],[300,390]],[[275,230],[340,230],[350,285],[308,320],[265,285],[275,230]]];}
 action(n){if(!this.crossing){this.selected=n;this.progress=0;}}
 press(x,y){if(this.crossing)return;this.progress=0;this.tracing=true;this.drag(x,y);}
 drag(x,y){if(!this.tracing)return;const p=this.paths[this.selected][this.progress];if(p&&Math.hypot(p[0]-x,p[1]-y)<26)this.progress++;}
 release(){if(!this.tracing)return;this.tracing=false;if(this.progress===this.paths[this.selected].length){if(this.selected===this.obstacles[this.round]){this.crossing=.01;this.message='It works!';}else{this.message='That power does not solve this obstacle. Try another part.';this.progress=0;}}else{this.message='Follow every dot in order. Try again!';this.progress=0;}}
 update(dt){if(this.crossing){this.crossing+=dt;if(this.crossing>2.5){this.completed++;this.score+=100;this.round++;this.crossing=0;this.progress=0;this.message='Choose a power for the next monster.';if(this.round>=this.obstacles.length)this.win('Every unfinished doodle has a happy ending.');}}}
}
export class Sticky extends Base{
 constructor(l){super(l);this.nodes=Array.from({length:7},(_,i)=>({x:100+i*125,y:410-(i%3)*75-l*5,baseY:410-(i%3)*75-l*5,moving:l>0&&(i===2||i===4),phase:i}));this.p={...this.nodes[0],vx:0,vy:0};this.stuck=0;this.visited=new Set([0]);this.aim=null;this.soaps=[{x:345,y:475},{x:720,y:465}];}
 press(x,y){if(this.stuck!==null&&dist(this.p,{x,y})<70)this.aim={x,y};}drag(x,y){if(this.aim)this.aim={x,y};}release(){if(!this.aim)return;this.p.vx=clamp((this.p.x-this.aim.x)*4,-600,600);this.p.vy=clamp((this.p.y-this.aim.y)*4,-650,400);this.departed=this.stuck;this.stuck=null;this.aim=null;}
 action(){if(this.stuck===null)return;const target=this.nodes[Math.min(this.stuck+1,6)],t=.72;this.p.vx=(target.x-this.p.x)/t;const targetY=target.baseY+(target.moving?Math.sin((this.time+t)*1.1+target.phase)*22:0);this.p.vy=(targetY-this.p.y-420*t*t/2)/t;this.departed=this.stuck;this.stuck=null;}
 update(dt){for(const n of this.nodes)if(n.moving)n.y=n.baseY+Math.sin(this.time*1.1+n.phase)*22;if(this.stuck!==null){this.p.x=this.nodes[this.stuck].x;this.p.y=this.nodes[this.stuck].y;return;}this.p.vy+=420*dt;this.p.x+=this.p.vx*dt;this.p.y+=this.p.vy*dt;for(let n=0;n<this.nodes.length;n++){if(n===this.departed){if(dist(this.p,this.nodes[n])>35)this.departed=null;continue;}if(dist(this.p,this.nodes[n])<25){this.p={...this.nodes[n],vx:0,vy:0};this.stuck=n;if(!this.visited.has(n)){this.visited.add(n);this.score+=25;}if(n===6&&this.visited.size===7)this.win('Sticky fingers? Sticky everything. All qoins collected!');return;}}for(const soap of this.soaps)if(dist(this.p,soap)<37){this.p.vx*=.98;this.p.vy+=80*dt;this.message='Soap! No sticking here.';}if(this.p.y>560||this.p.x< -40||this.p.x>1000)this.lose('Too slippery! Aim for a green pad.');}
}
export class Stack extends Base {
 constructor(){super(0);this.blocks=[{x:480,y:470,w:220}];this.height=0;this.speed=260;this.direction=1;this.dropping=false;this.fragments=[];this.perfect=0;this.spawn();}
 spawn(){const top=this.blocks.at(-1);this.moving={x:this.direction>0?140:820,y:top.y-90,w:top.w,vy:0};}
 press(){this.action();}
 action(){if(this.state==='play'&&!this.dropping)this.dropping=true;}
 update(dt){
  for(const f of this.fragments){f.vy+=900*dt;f.y+=f.vy*dt;f.x+=f.vx*dt;f.angle+=f.spin*dt;}
  this.fragments=this.fragments.filter(f=>f.y<600);
  const p=this.moving,top=this.blocks.at(-1);
  if(!this.dropping){p.x+=this.direction*this.speed*dt;if(p.x>820){p.x=820;this.direction=-1;}if(p.x<140){p.x=140;this.direction=1;}return;}
  p.vy+=1800*dt;p.y+=p.vy*dt;
  if(p.y+34<top.y)return;
  let left=Math.max(p.x-p.w/2,top.x-top.w/2),right=Math.min(p.x+p.w/2,top.x+top.w/2);
  if(right-left<=0){this.lose('Missed! Your tower reached '+this.height+' cubes.');return;}
  if(Math.abs(p.x-top.x)<=3){p.x=top.x;left=top.x-top.w/2;right=top.x+top.w/2;this.perfect++;this.message='Perfect! '+this.perfect+' in a row.';}
  else {this.perfect=0;this.message='Overhang trimmed. The next cube is narrower!';const w=p.w-(right-left);this.fragments.push({x:p.x>top.x?right+w/2:left-w/2,y:top.y-34,w,vy:20,vx:p.x>top.x?80:-80,angle:0,spin:p.x>top.x?2:-2});}
  this.blocks.push({x:(left+right)/2,y:top.y-34,w:right-left});this.height++;this.score=this.height;this.speed=Math.min(680,260+this.height*13);
  if(this.blocks.at(-1).y<220){for(const block of this.blocks)block.y+=34;for(const f of this.fragments)f.y+=34;}
  this.blocks=this.blocks.filter(block=>block.y<550);this.direction=this.height%2?-1:1;this.dropping=false;this.spawn();
 }
}
export class Grabby extends Base {
 constructor(l){super(l);this.p={x:100,y:350,vx:0,vy:0};this.anchors=Array.from({length:6+l},(_,i)=>({x:250+i*245,y:125+Math.sin(i+l)*30}));this.finish=this.anchors.at(-1).x+180;this.anchor=null;this.rope=0;this.holding=false;this.started=false;this.skin='classic';this.message='HOLD Space or the screen to attach. RELEASE to fly.';}
 nextRing(){return this.anchors.map((a,n)=>({a,n})).filter(({a})=>a.x>this.p.x-45&&dist(a,this.p)<350).sort((a,b)=>dist(a.a,this.p)-dist(b.a,this.p))[0]?.n??-1;}
 catchRing(){const n=this.nextRing();if(n>=0){this.anchor=n;this.rope=dist(this.p,this.anchors[n]);this.message='Attached! Release as you swing forward, then hold again.';}}
 press(){if(this.state!=='play')return;this.started=true;this.holding=true;if(this.anchor===null)this.catchRing();}
 release(){this.holding=false;if(this.anchor!==null){this.anchor=null;this.p.vx=Math.max(240,this.p.vx);this.p.vy=Math.min(-260,this.p.vy);this.message='Flying! Hold to catch the next glowing ring.';}}
 action(){this.press();}
 update(dt){
  if(!this.started)return;
  if(this.holding&&this.anchor===null)this.catchRing();
  const p=this.p,oldY=p.y;
  p.vx+= (this.anchor!==null?190:12)*dt;p.vx=clamp(p.vx,-450,520);p.vy+=650*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;
  if(this.anchor!==null){const a=this.anchors[this.anchor],dx=p.x-a.x,dy=p.y-a.y,d=Math.hypot(dx,dy);if(d>this.rope){const nx=dx/d,ny=dy/d;p.x=a.x+nx*this.rope;p.y=a.y+ny*this.rope;const v=p.vx*nx+p.vy*ny;p.vx-=v*nx;p.vy-=v*ny;}}
  if(p.x<180&&oldY<=350&&p.y>=350){p.y=350;p.vy=0;}
  if(p.x>=this.finish&&p.x<=this.finish+1400&&oldY<=410&&p.y>=410){this.score=Math.max(1,Math.round(1500-this.time*10));this.win('A perfect landing! Those arms earned a rest.');}
  if(p.y>580||p.x< -100)this.lose('Missed the catch! Hold to attach, release to fly, then hold again.');
  this.camera=clamp(p.x-300,0,this.finish-350);
 }
}
export class Human extends Base{
 constructor(l){super(l);this.x=80;this.tilt=0;this.velocity=0;this.suspicion=0;this.errands=[{x:330,name:'Say hello',done:false},{x:730,name:'Buy groceries',done:false},{x:1130,name:'Thank the cashier',done:false}];this.target=null;}
 press(x){this.target=x;}drag(x){this.target=x;}release(){this.target=null;}
 action(n){if(n!==2)return;const task=this.errands.find(e=>!e.done&&Math.abs(e.x-this.x)<35);if(!task){this.message='Walk up to your next errand first.';return;}if(Math.abs(this.tilt)>.25){this.suspicion=clamp(this.suspicion+12,0,100);this.message='Too wobbly to look normal. Balance first!';return;}task.done=true;this.score+=100;this.suspicion=Math.max(0,this.suspicion-15);this.message=task.name+' ✓ Absolutely normal.';}
 update(dt,i){let steer=(i.right?1:0)-(i.left?1:0);if(this.target!==null)steer=clamp((this.target-this.x)/100,-1,1);this.velocity+=(Math.sin(this.time*2.1)*.8+(this.level+1)*.08+steer*2.4-this.tilt*.7)*dt;this.velocity*=Math.exp(-1.6*dt);this.tilt+=this.velocity*dt;const task=this.errands.find(e=>!e.done);if(!task||this.x<task.x-12)this.x+=45*dt;const watched=this.time%7>3;if(watched&&Math.abs(this.tilt)>.3)this.suspicion+=dt*(Math.abs(this.tilt)*24);else this.suspicion=Math.max(0,this.suspicion-dt*3);if(Math.abs(this.tilt)>1||this.suspicion>=100)this.lose('The coat fell open. Three creatures is NOT one customer.');if(this.x>1390){this.score+=Math.round(100-this.suspicion);this.win('Groceries acquired. Nobody suspects a thing. Probably.');}this.camera=clamp(this.x-280,0,550);}
}
export class Munch extends Base{
 constructor(l){super(l);this.p={x:80,y:445};this.crumbs=[{x:230,y:160,got:false},{x:480,y:340,got:false},{x:740,y:140,got:false}];this.jars=[{x:310,y:150,w:85,h:95},{x:490,y:320,w:95,h:95},{x:680,y:230,w:80,h:90}];this.alert=0;this.target=null;this.hide=false;}
 press(x,y){this.target={x,y};}drag(x,y){this.target={x,y};}release(){this.target=null;}
 update(dt,i){this.hide=!!i.action;let dx=(i.right?1:0)-(i.left?1:0),dy=(i.down?1:0)-(i.up?1:0);if(this.target){dx=clamp((this.target.x-this.p.x)/25,-1,1);dy=clamp((this.target.y-this.p.y)/25,-1,1);}const len=Math.max(1,Math.hypot(dx,dy)),speed=this.hide?55:150;this.p.x=clamp(this.p.x+dx/len*speed*dt,35,925);this.p.y=clamp(this.p.y+dy/len*speed*dt,80,485);const covered=this.hide&&this.jars.some(j=>this.p.x>j.x-20&&this.p.x<j.x+j.w+20&&this.p.y>j.y-20&&this.p.y<j.y+j.h+20);const lit=this.time%6>3&&this.p.x>350&&this.p.x<630;this.dog={x:550+Math.sin(this.time*(.65+this.level*.1))*230,y:245+Math.sin(this.time*.9)*95};const near=dist(this.p,this.dog)<68;if((lit||near)&&!covered)this.alert+=dt*(near?85:50);else this.alert=Math.max(0,this.alert-dt*40);if(this.alert>100)this.lose(near?'The dog found a midnight snack. You.':'The fridge light caught your cookie escape!');for(const c of this.crumbs)if(!c.got&&dist(c,this.p)<28){c.got=true;this.score+=100;}if(this.p.x>855&&this.p.y<145){if(this.crumbs.every(c=>c.got))this.win('Back in the cookie tin. Nobody saw a crumb.');else this.message='Collect all three crumbs before heading home.';}}
}
export class Toast extends Base{
 constructor(l){super(l);this.p={x:105,y:415,vx:0,vy:0,angle:0};this.air=false;this.aim=null;this.plate={x:720-l*12,y:440,w:130};this.cat={x:410+l*20,y:465};this.fork={x:540,y:240};}
 press(x,y){if(!this.air&&dist(this.p,{x,y})<100)this.aim={x,y};}drag(x,y){if(this.aim)this.aim={x,y};}release(){if(!this.aim)return;this.p.vx=clamp((this.p.x-this.aim.x)*5,80,850);this.p.vy=clamp((this.p.y-this.aim.y)*5,-700,-100);this.aim=null;this.air=true;}
 action(n){if(n===2&&!this.air){this.p.vx=this.level===0?500:540;this.p.vy=this.level===0?-500:-410;this.air=true;}}
 update(dt,i){this.fork.y=240+Math.sin(this.time*1.8+this.level)*80;if(!this.air)return;const p=this.p,old=p.y;p.vx+=Math.sin(this.time*2)*this.level*10*dt;p.vy+=720*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.angle+=((i.right?1:0)-(i.left?1:0))*3.5*dt+.18*dt;if(Math.hypot(p.x-this.fork.x,p.y-this.fork.y)<30)this.lose('Fork interception! Try a higher or lower launch.');if(Math.hypot(p.x-this.cat.x,p.y-this.cat.y)<65)this.lose('The cat ordered toast. You delivered.');if(old< this.plate.y-15&&p.y>=this.plate.y-15&&p.vy>0&&p.x>this.plate.x&&p.x<this.plate.x+this.plate.w){const a=Math.atan2(Math.sin(p.angle),Math.cos(p.angle));if(Math.abs(a)<.7){this.score=Math.round(300-Math.abs(a)*100);this.win('Butter-side up. Breakfast is served!');}else this.lose('Butter-side DOWN. Rotate the toast before it lands.');}if(p.y>550||p.x>1000)this.lose('Missed the plate! Pull back to choose a different arc.');}
}
export class Parkour extends Base {
 constructor(l){super(l);this.course=PARKOUR_COURSES[l];const c=this.course;this.platforms=[...c.platforms,...(c.extra||[])].map(b=>({...b,baseX:b.x,baseY:b.y}));this.p={x:c.spawn[0],y:c.spawn[1]-38,w:24,h:38,vx:0,vy:0,ground:false};this.coins=c.coins.map(([x,y])=>({x,y,got:false}));this.ladders=c.ladders||[];this.switches=(c.switches||[]).map(b=>({...b,on:false}));this.enemies=(c.enemies||[]).map(e=>({...e,base:e.x,y:0,w:27,h:28}));this.checkpoint={x:this.p.x,y:this.p.y};this.checked=false;this.deaths=0;this.jumpHeld=false;this.grace=0;this.invulnerable=0;this.umbrella=false;this.riding=null;this.message=c.hint;}
 action(n){if(n===2&&this.grace>0){this.p.vy=-475;this.p.ground=false;this.grace=0;this.riding=null;}}
 respawn(){this.deaths++;Object.assign(this.p,{x:this.checkpoint.x,y:this.checkpoint.y,vx:0,vy:0,ground:false});this.riding=null;this.grace=0;this.invulnerable=1;this.message='Back at the checkpoint. Your collected coins are safe.';}
 update(dt,i){const p=this.p,c=this.course;this.invulnerable=Math.max(0,this.invulnerable-dt);
  for(let n=0;n<this.platforms.length;n++){const b=this.platforms[n],ox=b.x,oy=b.y,phase=(1-Math.cos(this.time*Math.PI*2/(b.period||4)))/2;b.x=b.baseX+(b.moveX||0)*phase;b.y=b.baseY+(b.moveY||0)*phase;if(this.riding===n){p.x+=b.x-ox;p.y+=b.y-oy;}}
  const ladder=this.ladders.find(l=>Math.abs(p.x+12-l.x)<26&&p.y+p.h>=l.y&&p.y<l.y+l.h);
  const climb=!!ladder&&(i.up||i.jump);p.vx=((i.right?1:0)-(i.left?1:0))*210;
  if(i.jump&&!this.jumpHeld&&!climb)this.action(2);this.jumpHeld=!!i.jump;
  const oldY=p.y;p.x=clamp(p.x+p.vx*dt,0,936);
  if(climb){p.x=ladder.x-12;p.vy=-145;this.riding=null;}else{p.vy+=1100*dt;if(this.umbrella&&i.jump&&p.vy>75)p.vy=75;}
  p.y+=p.vy*dt;p.ground=false;this.riding=null;
  for(let n=0;n<this.platforms.length;n++){const b=this.platforms[n];if(b.gate&&!this.switches.every(s=>s.on))continue;if(p.x+p.w>b.x&&p.x<b.x+b.w&&oldY+p.h<=b.y+3&&p.y+p.h>=b.y&&p.vy>=0){p.y=b.y-p.h;p.vy=b.spring?-690:0;p.ground=!b.spring;if(p.ground)this.riding=n;break;}}
  this.grace=p.ground?.1:Math.max(0,this.grace-dt);
  for(const e of this.enemies){const floor=this.platforms[e.platform];e.x=clamp(e.base+Math.sin(this.time*1.7)*32,floor.x,floor.x+floor.w-e.w);e.y=floor.y-e.h;if(hit(p,e)&&this.invulnerable<=0){if(p.vy>0&&oldY+p.h<e.y+12){e.dead=true;p.vy=-370;this.score+=50;}else{this.respawn();return;}}}this.enemies=this.enemies.filter(e=>!e.dead);
  for(const coin of this.coins)if(!coin.got&&dist({x:p.x+12,y:p.y+18},coin)<29){coin.got=true;this.score+=25;}
  for(const sw of this.switches)if(dist({x:p.x+12,y:p.y+18},sw)<33){sw.on=true;this.message='Bridge unlocked! Find the remaining coins.';}
  if(c.umbrella&&dist({x:p.x+12,y:p.y+18},{x:c.umbrella[0],y:c.umbrella[1]})<32){this.umbrella=true;this.message='Umbrella ready! Hold Jump while falling to glide.';}
  if(!this.checked&&p.ground&&Math.abs(p.x-c.checkpoint[0])<45&&Math.abs(p.y+p.h-c.checkpoint[1])<8){this.checked=true;this.checkpoint={x:p.x,y:p.y};this.message='Checkpoint saved!';}
  if(p.y>570){this.respawn();return;}
  if(this.coins.every(k=>k.got)&&dist({x:p.x+12,y:p.y+p.h},{x:c.exit[0],y:c.exit[1]})<40)this.win(c.name+' complete! Every coin collected.');
 }
}
export const MODELS={'doodle-escape':Doodle,'paper-plane-panic':Plane,'margin-monsters':Monsters,'q-stick':Sticky,'q-stack':Stack,'grabby':Grabby,'normal-human':Human,'midnight-munch':Munch,'toast-trouble':Toast,'rooftop-rascal':Parkour};
