import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {test} from 'node:test';
import assert from 'node:assert/strict';
const html=readFileSync(new URL('../public/games/notebook-invasion/index.html',import.meta.url),'utf8');
const src=html.match(/<script id="notebook-weapons">([\s\S]*?)<\/script>/)[1];
const {WEAPONS,weaponPickup,segmentDistance}=vm.runInNewContext(src+';({WEAPONS,weaponPickup,segmentDistance})');
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
 assert.equal(weaponPickup('SPREAD GUN',10,'ROCKETS').weapon,'ROCKETS');
 assert.equal(weaponPickup('ROCKETS',10,'SPREAD GUN').weapon,'SPREAD GUN');
 assert.equal(weaponPickup('PENCIL PISTOL',0,'+'),null);
});
test('ingredients refill existing combinations without inventing a third combination',()=>{
 assert.equal(weaponPickup('LASER',10,'SPREAD GUN').weapon,'LASER');
 assert.equal(weaponPickup('LASER',10,'RAPID BLASTER').ammo,120);
 assert.equal(weaponPickup('LASER',10,'ROCKETS').weapon,'ROCKETS');
 assert.equal(weaponPickup('RAPID-FIRE ROCKETS',2,'ROCKETS').ammo,30);
});
test('swept hit detection catches fast projectiles crossing small targets',()=>{
 assert.equal(segmentDistance(50,0,0,0,100,0),0);
 assert.equal(segmentDistance(50,30,0,0,100,0),30);
 assert.equal(segmentDistance(120,0,0,0,100,0),20);
});
