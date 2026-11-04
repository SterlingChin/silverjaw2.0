export type SeriesId = "notebook" | "q" | "dude" | "snack"

export const series = [
  { id: "notebook", number: "01", title: "Notebook Series", subtitle: "Big adventures. One sheet of paper.", color: "#ba714d" },
  { id: "q", number: "02", title: "Q Series", subtitle: "A little cube with a lot of personality.", color: "#796b9a" },
  { id: "dude", number: "03", title: "Dude Series", subtitle: "Long legs. Questionable balance.", color: "#5d806b" },
  { id: "snack", number: "04", title: "Snack Drawer", subtitle: "Open for a little snack-time chaos.", color: "#b97945" },
] as const

export type Game = {
  series: SeriesId
  icon: string
  slug: string
  title: string
  tagline: string
  description: string
  added: string
}

// Each game is a self-contained HTML file at public/tater/<slug>/index.html.
// Add new games to the top of this list.
export const games: Game[] = [
  {series:"notebook",icon:"/tater/icons/doodle-escape.svg",slug:"doodle-escape",title:"Doodle Escape",tagline:"Draw a way out.",description:"Help the doodle reach the door before the giant eraser catches up.",added:"2026-11-03"},
  {series:"notebook",icon:"/tater/icons/paper-plane-panic.svg",slug:"paper-plane-panic",title:"Paper Plane Panic",tagline:"Cleared for classroom chaos.",description:"Fly through the classroom to the open window. Dodge fans, desks, and thrown pencils.",added:"2026-11-03"},
  {series:"notebook",icon:"/tater/icons/margin-monsters.svg",slug:"margin-monsters",title:"Margin Monsters",tagline:"Finish the doodle. Unleash the weird.",description:"Give each unfinished monster the right power to cross its obstacle.",added:"2026-11-03"},
  {series:"q",icon:"/tater/icons/q-stick.svg",slug:"q-stick",title:"Q-STICK",tagline:"Small cube. Sticky situation.",description:"Cling, launch, and collect every qoin on the way to the flag.",added:"2026-11-03"},
  {series:"q",icon:"/tater/icons/q-stack.svg",slug:"q-stack",title:"Q-STACK",tagline:"One tap. How high can you go?",description:"Time each drop to build an endless tower. Overhang is cut off, and every mistake makes the next cube narrower.",added:"2026-11-03"},
  {series:"dude",icon:"/tater/icons/grabby.svg",slug:"grabby",title:"Grabby",tagline:"Hold. Swing. Let fly.",description:"Hold to attach a rope, release to fly, and swing to the finish with six free skins.",added:"2026-11-03"},
  {series:"dude",icon:"/tater/icons/normal-human.svg",slug:"normal-human",title:"Definitely a Normal Human",tagline:"Three creatures. One suspicious coat.",description:"Buy groceries and greet your neighbors without revealing the creatures in your coat.",added:"2026-11-03"},
  {series:"snack",icon:"/tater/icons/midnight-munch.svg",slug:"midnight-munch",title:"Midnight Munch",tagline:"One cookie. Past bedtime.",description:"Collect three crumbs, dodge the dog, and reach the cookie tin.",added:"2026-11-03"},
  {series:"snack",icon:"/tater/icons/toast-trouble.svg",slug:"toast-trouble",title:"Toast Trouble",tagline:"Breakfast has left the toaster.",description:"Land on the plate butter-side up. Watch the fan, fork, and cat.",added:"2026-11-03"},
  {series:"dude",icon:"/tater/icons/rooftop-rascal.svg",slug:"rooftop-rascal",title:"Rooftop Rascal",tagline:"A little dude. A big leap.",description:"Collect every coin, then reach the rooftop flag. Checkpoints save your place.",added:"2026-11-03"},
  {
    series: "notebook",
    icon: "/tater/icons/pencil-patrol.svg",
    slug: "pencil-patrol",
    title: "Pencil Patrol",
    tagline: "Hold the line. Save the doodles.",
    description: "Build a pencil defense, collect graphite, and stop erasers from wiping out your notebook. Five pages of stationery strategy.",
    added: "2026-11-03",
  },
  {
    series: "dude",
    icon: "/tater/icons/woobly.svg",
    slug: "woobly",
    title: "Woobly",
    tagline: "One foot. Then the other.",
    description:
      "Drag a pair of ridiculously long legs over crates and gaps. Keep your balance and beat your best distance with mouse or touch.",
    added: "2026-10-18",
  },
  {
    series: "snack",
    icon: "/tater/icons/snack-slash.svg",
    slug: "snack-slash",
    title: "Snack Slash",
    tagline: "Parent on a mission. Snacks in trouble.",
    description:
      "Swipe through flying junk food, chain combos, and spare the healthy snacks. Play Lunch Rush or slice just for fun with mouse or touch.",
    added: "2026-10-10",
  },
  {
    series: "q",
    icon: "/tater/icons/q-bee.svg",
    slug: "q-bee",
    title: "Q-BEE",
    tagline: "A little cube. A long way down.",
    description:
      "Steer a smiling cube through 20 themed drops, collect qoins, and land in jello. Story Mode, Free Play, and a wardrobe full of squish.",
    added: "2026-10-09",
  },
  {
    series: "notebook",
    icon: "/tater/icons/notebook-invasion.svg",
    slug: "notebook-invasion",
    title: "Notebook Invasion",
    tagline: "The margin is under attack.",
    description:
      "Play as the stick figure defending the neighborhood, or fly the UFO and beam up cows. Works with keyboard, mouse, or touch.",
    added: "2026-10-08",
  },
]
