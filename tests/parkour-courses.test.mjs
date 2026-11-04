import {Parkour} from '../public/tater/_shared/models.js';
import {PARKOUR_COURSES} from '../public/tater/_shared/parkour-courses.js';
import {test} from 'node:test';
import assert from 'node:assert/strict';
const routes=[
 [[120,440],[310,410],[510,370],[705,405],[875,330]],
 [[170,470],[255,390,'ladder'],[420,390],[520,300,'ladder'],[850,300],[790,225,'ladder'],[620,225],[460,145,'ladder'],[170,145],[100,145]],
 [[100,300],[220,380],[395,450],[540,375],[625,300],[880,280]],
 [[110,440],[270,395],[480,365],[690,315],[880,300]],
 [[135,215],[230,205],[410,290],[575,370],[690,460],[875,395]],
 [[100,455],[320,300],[480,220,'ladder'],[650,220],[760,145],[875,145]]
];
test('six distinct authored courses can be completed using only movement and jump inputs',()=>{assert.equal(new Set(PARKOUR_COURSES.map(c=>JSON.stringify(c.platforms))).size,6);for(let l=0;l<6;l++){let g=new Parkour(l),n=0;for(let t=0;t<120*40&&g.state==='play';t++){
 const [x,y,mode]=routes[l][n],p=g.p,dx=x-(p.x+12),dy=y-(p.y+p.h);let jump=false;
 if(mode==='ladder'&&Math.abs(dx)<24)jump=true;
 else if(g.umbrella)jump=!(p.ground&&g.jumpHeld);
 else if(p.ground){const b=g.platforms[g.riding];jump=dy< -15||(Math.abs(dx)>45&&b&&(dx>0?p.x+p.w>b.x+b.w-30:p.x<b.x+30));}
 if(Math.abs(dx)<22&&Math.abs(dy)<42)n=Math.min(n+1,routes[l].length-1);
 let right=dx>7,left=dx< -7;const ride=g.platforms[g.riding];if(ride?.moveX&&x>ride.x+ride.w+90){jump=false;right=p.x+12<ride.x+ride.w/2-8;left=p.x+12>ride.x+ride.w/2+8;}
 g.tick(.025,{right,left,jump});
 if(g.deaths>2)break;
 }assert.equal(g.state,'won',g.course.name);assert.ok(g.coins.every(c=>c.got));assert.ok(g.deaths<=2);}});

test('parkour tool rules, carry, checkpoint, and trophy gating',()=>{
 const ladder=new Parkour(1);ladder.p.x=243;ladder.p.y=410;ladder.tick(.025,{up:true});assert.ok(ladder.p.y<410);
 const bridge=new Parkour(2);bridge.p.x=710;bridge.p.y=250;bridge.p.vy=200;for(let n=0;n<10;n++)bridge.tick(.025,{});assert.ok(bridge.p.y+38>300);bridge.switches[0].on=true;bridge.p.x=710;bridge.p.y=250;bridge.p.vy=200;for(let n=0;n<10;n++)bridge.tick(.025,{});assert.equal(bridge.p.y+38,300);
 const ferry=new Parkour(3);ferry.riding=1;ferry.p.x=210;ferry.p.y=372;const x=ferry.p.x;ferry.tick(.025,{});assert.ok(ferry.p.x>x);
 const glide=new Parkour(4);glide.p.x=350;glide.p.y=250;glide.p.vy=300;glide.umbrella=true;glide.tick(.025,{jump:true});assert.equal(glide.p.vy,75);
 const check=new Parkour(0);check.coins[0].got=true;check.checkpoint={x:470,y:332};check.p.y=600;check.tick(.025,{});assert.equal(check.p.x,470);assert.ok(check.coins[0].got);check.p.x=875;check.p.y=292;check.tick(.025,{});assert.equal(check.state,'play');
});
