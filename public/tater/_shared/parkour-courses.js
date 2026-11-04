// Original, individually authored rooms. Coordinates are feet/platform tops.
const roof=(x,y,w,extra={})=>({x,y,w,h:22,...extra});
export const PARKOUR_COURSES=[
 {name:'Garden Hops',hint:'Explore the garden. Collect all five coins to reveal the trophy.',sky:'#e2edda',stone:'#76926a',spawn:[55,440],exit:[875,330],checkpoint:[470,370],
 platforms:[roof(0,440,180),roof(240,410,145),roof(440,370,155),roof(650,405,110),roof(810,330,150)],coins:[[120,410],[310,380],[510,340],[705,375],[875,300]],enemies:[{x:490,platform:2}]},
 {name:'Clocktower Climb',hint:'Hold Up near ladders. Climb, cross the tower, then return along the upper floor.',sky:'#e1e5f1',stone:'#7885a1',spawn:[65,470],exit:[100,145],checkpoint:[780,300],
 platforms:[roof(0,470,300),roof(350,390,220),roof(650,300,310),roof(405,225,180),roof(0,145,320)],ladders:[{x:255,y:390,h:80},{x:520,y:300,h:90},{x:790,y:225,h:75},{x:460,y:145,h:80}],
 // Ladder landing shelves bridge the staggered tower floors.
 extra:[roof(235,390,140),roof(500,300,180),roof(565,225,245),roof(300,145,185)],coins:[[170,440],[420,360],[850,270],[620,195],[170,115]]},
 {name:'Switchyard',hint:'Take the lower route to the red switch. It builds a bridge across the canal.',sky:'#eee1cd',stone:'#ad906b',spawn:[50,300],exit:[870,280],checkpoint:[360,450],
 platforms:[roof(0,300,180),roof(160,380,120),roof(300,450,210),roof(485,375,120),roof(580,300,100),roof(670,300,150,{gate:true}),roof(810,280,150)],switches:[{x:395,y:430}],coins:[[100,270],[220,350],[395,420],[625,270],[880,250]],enemies:[{x:345,platform:2}]},
 {name:'Sky Ferry',hint:'Ride the moving platforms. Let each ferry carry you toward the next landing.',sky:'#d9ebee',stone:'#6298a3',spawn:[60,440],exit:[875,300],checkpoint:[450,365],
 platforms:[roof(0,440,180),roof(185,410,110,{moveX:140,period:4}),roof(430,365,120),roof(570,360,110,{moveX:130,moveY:-45,period:4.5}),roof(820,300,140)],coins:[[110,410],[270,365],[480,335],[690,285],[880,270]]},
 {name:'Umbrella Alley',hint:'Pick up the umbrella, jump from the high roof, and HOLD Jump to glide across the big gap.',sky:'#e2dceb',stone:'#9380a4',spawn:[55,215],exit:[865,395],checkpoint:[690,460],umbrella:[135,180],
 platforms:[roof(0,215,245),roof(650,460,150),roof(820,395,140)],coins:[[80,185],[230,175],[410,260],[575,340],[875,365]]},
 {name:'Moonlight Relay',hint:'Bounce on the spring, climb the ladder, press the switch, then cross the upper bridge.',sky:'#cdd4e6',stone:'#727c9b',spawn:[55,470],exit:[870,145],checkpoint:[440,300],
 platforms:[roof(0,470,190,{spring:true}),roof(250,300,260),roof(590,220,155),roof(710,145,100),roof(800,145,160,{gate:true})],ladders:[{x:480,y:220,h:80}],extra:[roof(460,220,155)],switches:[{x:650,y:200}],coins:[[100,425],[320,270],[485,190],[660,190],[875,115]],enemies:[{x:370,platform:1}]}
];
