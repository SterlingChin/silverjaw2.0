import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {test} from 'node:test';
import assert from 'node:assert/strict';
const html=readFileSync(new URL('../public/games/notebook-invasion/index.html',import.meta.url),'utf8');
const src=html.match(/<script id="notebook-weapons">([\s\S]*?)<\/script>/)[1];
const {WEAPONS,weaponPickup,segmentDistance,stepProjectile}=vm.runInNewContext(src+';({WEAPONS,weaponPickup,segmentDistance,stepProjectile})');
test('rapid plus spread creates a limited-ammo laser in either order',()=>{
 for(const [a,b]of[['RAPID BLASTER','SPREAD GUN'],['SPREAD GUN','RAPID BLASTER']]){const r=weaponPickup(a,1,b);assert.equal(r.weapon,'LASER');assert.equal(r.ammo,120);assert.equal(r.combined,true);}
 assert.equal(WEAPONS.LASER.laser,true);
});
test('rapid plus rockets creates fast rockets in either order',()=>{
 for(const [a,b]of[['RAPID BLASTER','ROCKETS'],['ROCKETS','RAPID BLASTER']]){const r=weaponPickup(a,1,b);assert.equal(r.weapon,'RAPID-FIRE ROCKETS');assert.equal(r.ammo,30);}
 const fast=WEAPONS['RAPID-FIRE ROCKETS'];assert.ok(fast.cool<WEAPONS.ROCKETS.cool);assert.equal(fast.rocket,true);assert.equal(fast.damage,WEAPONS.ROCKETS.damage);
});
test('spent weapons and unrelated pairs do not create combinations',()=>{
 assert.equal(weaponPickup('SPREAD GUN',0,'RAPID BLASTER').weapon,'RAPID BLASTER');
 assert.equal(weaponPickup('SPREAD GUN',10,'ROCKETS').weapon,'FIREWORK LAUNCHER');
 assert.equal(weaponPickup('ROCKETS',10,'SPREAD GUN').weapon,'FIREWORK LAUNCHER');
 assert.equal(weaponPickup('PENCIL PISTOL',0,'+'),null);
});
test('laser upgrades take priority over refilling ingredients',()=>{
 assert.equal(weaponPickup('LASER',10,'SPREAD GUN').weapon,'LAVA GUN');
 assert.equal(weaponPickup('LASER',10,'RAPID BLASTER').ammo,120);
 assert.equal(weaponPickup('LASER',10,'ROCKETS').weapon,'GIANT LASER');
 assert.equal(weaponPickup('RAPID-FIRE ROCKETS',2,'ROCKETS').ammo,30);
});
test('swept hit detection catches fast projectiles crossing small targets',()=>{
 assert.equal(segmentDistance(50,0,0,0,100,0),0);
 assert.equal(segmentDistance(50,30,0,0,100,0),30);
 assert.equal(segmentDistance(120,0,0,0,100,0),20);
});

test('second-tier weapons need a live laser and carry finite ammunition',()=>{
 assert.equal(weaponPickup('LASER',0,'SPREAD GUN').weapon,'SPREAD GUN');
 assert.equal(weaponPickup('LASER',0,'ROCKETS').weapon,'ROCKETS');
 assert.equal(weaponPickup('LASER',1,'SPREAD GUN').ammo,1000);
 assert.equal(weaponPickup('LASER',1,'ROCKETS').ammo,45);
 assert.ok(WEAPONS['GIANT LASER'].damage>WEAPONS.LASER.damage);
 assert.equal(WEAPONS['GIANT LASER'].giant,true);
});
test('lava fired upward turns and falls rapidly before expiring',()=>{
 const s={x:0,y:500,vx:0,vy:-900,life:4,lava:true,travel:0};let top=500,riseTime=0,fallTime=0,descending=false;
 for(let i=0;i<240&&s.y<=500;i++){stepProjectile(s,1/60);top=Math.min(top,s.y);if(s.vy>=0)descending=true;if(descending)fallTime+=1/60;else riseTime+=1/60;}
 assert.ok(top<200);assert.ok(s.y>500);assert.ok(s.vy>0);assert.ok(s.life>0);assert.ok(fallTime<riseTime);
});

test('lava has a dense emission rate and at least thirty seconds of fuel',()=>{
 const lava=WEAPONS['LAVA GUN'];assert.ok(lava.cool<=.03);assert.ok(lava.ammo*lava.cool>=30);
});
