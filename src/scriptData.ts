import references from './data/shot-references.json';
// Translated + condensed shot scripts for portfolio display.
// Format: one line of scene direction (what's on screen) + the spoken/on-screen line.
// Internal production notes (voice casting specs, animation timing, etc.) are intentionally
// stripped out here — this is the audience-facing version, not the production doc.

export interface ScriptShot {
  n: number;
  scene: string;
  line?: string;
  reference?: {src: string; alt: string};
}

export interface ScriptProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  shots: ScriptShot[];
  referenceVideo?: string;
}

export const scripts: ScriptProject[] = [
  {
    id: "ae01",
    title: "AE01",
    subtitle: "Gacha Rewards — UA Creative",
    description: "A character-led creative that turns gacha frustration into a reward reveal, then builds momentum through character pulls and combat highlights.",
    shots: [
      {
        n: 1,
        reference: references.ae01["1"],
        scene: "Close-up on the host character, crestfallen, a dejected sticker overlay flashing beside her",
        line: "Still grinding for that guaranteed pull?! Your ten-pulls keep coming up empty!",
      },
      {
        n: 2,
        scene: "Same close-up flips to a beaming expression, celebratory stickers bounce in, confetti bursts behind her",
        line: "Now we've got great news for you — unprecedented rewards, just for you!",
      },
      {
        n: 3,
        scene: "Sticker shakes with excitement; her portrait flips like a trading card to a higher-tier art",
        line: "This is the moment fate changes. Ready?",
      },
      {
        n: 4,
        reference: references.ae01["4"],
        scene: "Flash transition, \"150 pulls\" bursts forward in perspective as the screen shakes",
        line: "Pre-register now for up to 150 free pulls!",
      },
      {
        n: 5,
        scene: "Four characters check-board in around the flattening \"150 pulls\" title",
        line: "A grand gacha event is live — don't miss your last chance!",
      },
      {
        n: 6,
        scene: "Cut to a live gacha-pull screen recording",
        line: "Now! This is the moment — pull the rarest character!",
      },
      {
        n: 7,
        reference: references.ae01["7"],
        scene: "Pull result reveal: a radiant rare character bursts out under flashy light FX, close-up",
        line: "Ohhh — ohhh — ohhh!!",
      },
      {
        n: 8,
        scene: "Five- and six-star characters flash into frame one after another, each ringed in particle light",
        line: "There it is, there it is! Beauty and power in one character!",
      },
      {
        n: 9,
        reference: references.ae01["9"],
        scene: "Three six-star characters unleash their ultimates in rapid cuts",
        line: "Gorgeous combat, an electrifying ride — sweep your enemies with your strongest skill!",
      },
    ],
  },
  {
    id: "ae02",
    title: "AE02",
    subtitle: "Meet Your Next Companion — UA Creative",
    description: "A roster-led creative that introduces the cast, reveals pre-registration rewards, and closes with a character invitation.",
    shots: [
      {
        n: 1,
        reference: references.ae02["1"],
        scene: "Full roster of eleven characters scrolls sideways across the frame",
      },
      {
        n: 2,
        reference: references.ae02["2"],
        scene: "Bold title flares in from the side, shudders, flashes to white",
        line: "Who's your next companion?",
      },
      {
        n: 3,
        scene: "Roster keeps sliding behind the title card",
        line: "Pre-register now for up to 150 free pulls!",
      },
      {
        n: 4,
        scene: "Roster slides on as the title bursts out with a shake and a confetti pop",
        line: "A fateful gacha — take the challenge now!",
      },
      {
        n: 5,
        scene: "Cut to a live gacha-pull screen recording",
      },
      {
        n: 6,
        reference: references.ae02["6"],
        scene: "Pull result reveal: a radiant rare character bursts out under flashy light FX, close-up",
      },
      {
        n: 7,
        scene: "Five- and six-star characters flash in at a readable pace, each ringed in particle light",
        line: "So many — there's actually this many. This is amazing!",
      },
      {
        n: 8,
        scene: "Group lineup with overlapping character voice lines building a lively crowd feel",
        line: "Don't miss this — pre-register for even more surprise rewards!",
      },
      {
        n: 9,
        scene: "Gift-code popup types itself out, a tap sends rewards bursting across the screen",
      },
      {
        n: 10,
        reference: references.ae02["10"],
        scene: "Closing shot: the host character relaxes over tea",
        line: "So many rewards — we'll be waiting for you here, director!",
      },
    ],
  },
  {
    id: "qy06",
    title: "QY06",
    subtitle: "QY06 — Reference creative",
    description: "Reference video for QY06. Script copy and storyboard images are being revised.",
    referenceVideo: "/media/script-qy06-reference.mp4",
    shots: [],
  },
];
