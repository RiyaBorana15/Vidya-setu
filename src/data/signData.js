// Hand Sign Language Lexicon & Visual Dataset (ISL & ASL Standard)

export const SIGN_ALPHABET = [
  {
    char: 'A',
    category: 'Alphabet',
    name: 'Letter A',
    description: 'Make a fist with the thumb resting alongside the curled index finger.',
    instructions: 'Close all 4 fingers firmly against your palm and keep your thumb straight against the side of index finger.',
    funFact: 'In Indian Sign Language, A is one of the most stable foundation signs.',
    iconSvg: `<svg viewBox="0 0 100 100" fill="currentColor"><path d="M40,25 C40,20 46,20 46,25 L46,65 C46,68 44,70 41,70 C38,70 36,68 36,65 Z"/><rect x="42" y="32" width="28" height="42" rx="10" fill="#6366f1"/><circle cx="38" cy="48" r="7" fill="#38bdf8"/></svg>`,
    landmarksTarget: { thumbUp: true, indexUp: false, middleUp: false, ringUp: false, pinkyUp: false }
  },
  {
    char: 'B',
    category: 'Alphabet',
    name: 'Letter B',
    description: 'Open flat hand with 4 fingers straight up together, thumb tucked across palm.',
    instructions: 'Hold your 4 fingers straight up touching each other, and fold your thumb across your palm.',
    funFact: 'Resembles a flat wall or book page.',
    iconSvg: `<svg viewBox="0 0 100 100" fill="currentColor"><rect x="36" y="15" width="28" height="60" rx="8" fill="#6366f1"/><circle cx="50" cy="65" r="9" fill="#38bdf8"/></svg>`,
    landmarksTarget: { thumbUp: false, indexUp: true, middleUp: true, ringUp: true, pinkyUp: true }
  },
  {
    char: 'C',
    category: 'Alphabet',
    name: 'Letter C',
    description: 'Curved hand forming a "C" cup shape with fingers and thumb.',
    instructions: 'Curve your fingers together and curve your thumb to match, looking like the letter C.',
    funFact: 'Directly mimics the shape of the written Latin and Devanagari arc.',
    iconSvg: `<svg viewBox="0 0 100 100" fill="currentColor"><path d="M65,25 C45,25 35,40 35,50 C35,60 45,75 65,75" fill="none" stroke="#6366f1" stroke-width="12" stroke-linecap="round"/></svg>`,
    landmarksTarget: { thumbUp: true, indexUp: true, middleUp: true, ringUp: true, pinkyUp: false }
  },
  {
    char: 'D',
    category: 'Alphabet',
    name: 'Letter D',
    description: 'Index finger pointing straight up, thumb touching middle, ring, and pinky tips to form an "O" base.',
    instructions: 'Point index finger straight to the sky; join thumb tip to middle, ring, and pinky tips.',
    funFact: 'The index finger forms the vertical line of the D, while the circle forms the curve.',
    iconSvg: `<svg viewBox="0 0 100 100" fill="currentColor"><rect x="42" y="15" width="10" height="55" rx="5" fill="#6366f1"/><circle cx="56" cy="55" r="14" fill="#38bdf8"/></svg>`,
    landmarksTarget: { thumbUp: false, indexUp: true, middleUp: false, ringUp: false, pinkyUp: false }
  },
  {
    char: 'E',
    category: 'Alphabet',
    name: 'Letter E',
    description: 'All four fingers curled tightly down into palm with thumb tucked underneath.',
    instructions: 'Curl your 4 fingers down tightly onto the top of your thumb resting under fingertips.',
    funFact: 'Looks like claws or the horizontal bars of an E.',
    iconSvg: `<svg viewBox="0 0 100 100" fill="currentColor"><rect x="35" y="35" width="30" height="35" rx="8" fill="#6366f1"/><line x1="35" y1="52" x2="65" y2="52" stroke="#38bdf8" stroke-width="6"/></svg>`,
    landmarksTarget: { thumbUp: false, indexUp: false, middleUp: false, ringUp: false, pinkyUp: false }
  },
  {
    char: 'F',
    category: 'Alphabet',
    name: 'Letter F / OK Sign',
    description: 'Index finger and thumb form a circle; middle, ring, and pinky fingers point straight up.',
    instructions: 'Pinch thumb and index together into a ring; extend your other three fingers upward.',
    funFact: 'Also universally understood as the "OK" gesture across cultures.',
    iconSvg: `<svg viewBox="0 0 100 100" fill="currentColor"><circle cx="42" cy="55" r="12" fill="#38bdf8"/><rect x="52" y="15" width="22" height="55" rx="6" fill="#6366f1"/></svg>`,
    landmarksTarget: { thumbUp: false, indexUp: false, middleUp: true, ringUp: true, pinkyUp: true }
  },
  {
    char: 'I',
    category: 'Alphabet',
    name: 'Letter I',
    description: 'Pinky finger points straight up, other fingers and thumb curled into a fist.',
    instructions: 'Curl your thumb and 3 fingers into a fist, extending only your small pinky finger upward.',
    funFact: 'The pinky finger naturally looks like the single slim dot-less stroke of I.',
    iconSvg: `<svg viewBox="0 0 100 100" fill="currentColor"><rect x="35" y="40" width="25" height="30" rx="6" fill="#6366f1"/><rect x="62" y="20" width="8" height="50" rx="4" fill="#38bdf8"/></svg>`,
    landmarksTarget: { thumbUp: false, indexUp: false, middleUp: false, ringUp: false, pinkyUp: true }
  },
  {
    char: 'L',
    category: 'Alphabet',
    name: 'Letter L',
    description: 'Index finger points straight up, thumb extends horizontally at a 90-degree right angle.',
    instructions: 'Extend your thumb out horizontally and index finger vertically to make a crisp L shape.',
    funFact: 'One of the most intuitive signs in all sign languages worldwide.',
    iconSvg: `<svg viewBox="0 0 100 100" fill="currentColor"><path d="M38,20 L38,68 L70,68" fill="none" stroke="#6366f1" stroke-width="12" stroke-linecap="round"/></svg>`,
    landmarksTarget: { thumbUp: true, indexUp: true, middleUp: false, ringUp: false, pinkyUp: false }
  },
  {
    char: 'O',
    category: 'Alphabet',
    name: 'Letter O',
    description: 'All 5 fingers curved together to touch tips with thumb, making an O circle.',
    instructions: 'Touch all your fingertips to your thumb tip to form a neat circular aperture.',
    funFact: 'Visually forms a complete round letter O.',
    iconSvg: `<svg viewBox="0 0 100 100" fill="currentColor"><circle cx="50" cy="50" r="24" fill="none" stroke="#6366f1" stroke-width="12"/></svg>`,
    landmarksTarget: { thumbUp: true, indexUp: false, middleUp: false, ringUp: false, pinkyUp: false }
  },
  {
    char: 'U',
    category: 'Alphabet',
    name: 'Letter U',
    description: 'Index and middle fingers extended straight up together side-by-side.',
    instructions: 'Extend index and middle fingers straight up tightly together; curl ring and pinky fingers down.',
    funFact: 'Looks like two vertical parallel bars of the letter U.',
    iconSvg: `<svg viewBox="0 0 100 100" fill="currentColor"><rect x="40" y="20" width="10" height="55" rx="5" fill="#6366f1"/><rect x="52" y="20" width="10" height="55" rx="5" fill="#38bdf8"/></svg>`,
    landmarksTarget: { thumbUp: false, indexUp: true, middleUp: true, ringUp: false, pinkyUp: false }
  },
  {
    char: 'V',
    category: 'Alphabet',
    name: 'Letter V / Peace Sign',
    description: 'Index and middle fingers extended straight up in a spread "V" shape.',
    instructions: 'Spread your index and middle fingers apart in a V, curling your other fingers inward with thumb.',
    funFact: 'Also universally known as the Peace and Victory sign!',
    iconSvg: `<svg viewBox="0 0 100 100" fill="currentColor"><path d="M35,22 L50,68 L65,22" fill="none" stroke="#10b981" stroke-width="12" stroke-linecap="round"/></svg>`,
    landmarksTarget: { thumbUp: false, indexUp: true, middleUp: true, ringUp: false, pinkyUp: false }
  },
  {
    char: 'W',
    category: 'Alphabet',
    name: 'Letter W',
    description: 'Index, middle, and ring fingers spread upward; pinky held down by thumb.',
    instructions: 'Extend index, middle, and ring fingers upward spread apart; hold down pinky with thumb.',
    funFact: 'The three upright fingers clearly display the three peaks of W.',
    iconSvg: `<svg viewBox="0 0 100 100" fill="currentColor"><path d="M30,22 L40,68 L50,30 L60,68 L70,22" fill="none" stroke="#6366f1" stroke-width="8" stroke-linecap="round"/></svg>`,
    landmarksTarget: { thumbUp: false, indexUp: true, middleUp: true, ringUp: true, pinkyUp: false }
  },
  {
    char: 'Y',
    category: 'Alphabet',
    name: 'Letter Y / Hang Loose',
    description: 'Thumb and pinky extended outwards, middle three fingers curled into palm.',
    instructions: 'Extend your thumb to the left and pinky to the right while keeping middle 3 fingers curled.',
    funFact: 'Forms the two upper diagonal branches of the letter Y (also the Shaka sign).',
    iconSvg: `<svg viewBox="0 0 100 100" fill="currentColor"><circle cx="28" cy="35" r="7" fill="#38bdf8"/><rect x="40" y="45" width="22" height="28" rx="6" fill="#6366f1"/><circle cx="72" cy="35" r="7" fill="#38bdf8"/></svg>`,
    landmarksTarget: { thumbUp: true, indexUp: false, middleUp: false, ringUp: false, pinkyUp: true }
  }
];

export const COMMON_SIGNS = [
  {
    id: 'hello',
    title: 'Hello / Namaste',
    category: 'Greetings',
    handshape: 'Open Flat Hand to Forehead',
    meaning: 'Friendly greeting used to start a lesson or conversation.',
    actionGuide: 'Place your flat right hand near your temple, then wave it forward and outward smoothly with a smile.',
    difficulty: 'Beginner',
    tag: 'Essential'
  },
  {
    id: 'thank-you',
    title: 'Thank You / Dhanyavaad',
    category: 'Polite',
    handshape: 'Fingertips to Chin, Move Forward',
    meaning: 'Expressing gratitude to teachers, peers, or interpreters.',
    actionGuide: 'Touch your fingertips gently to your chin, then extend your open hand forward towards the person.',
    difficulty: 'Beginner',
    tag: 'Essential'
  },
  {
    id: 'yes',
    title: 'Yes / Sahi',
    category: 'Responses',
    handshape: 'Nodding Fist (S-hand)',
    meaning: 'Affirmative response or agreement during class questions.',
    actionGuide: 'Make a fist and tilt your wrist up and down twice, mimicking a person nodding their head in agreement.',
    difficulty: 'Beginner',
    tag: 'Core'
  },
  {
    id: 'no',
    title: 'No / Galat',
    category: 'Responses',
    handshape: 'Index & Middle Snap to Thumb',
    meaning: 'Negative response or indicating disagreement.',
    actionGuide: 'Extend your index and middle fingers together, then snap them down quickly to tap against your thumb.',
    difficulty: 'Beginner',
    tag: 'Core'
  },
  {
    id: 'help',
    title: 'Help / Sahayata',
    category: 'Classroom',
    handshape: 'Thumbs-up Fist on Flat Palm',
    meaning: 'Requesting assistance from the teacher, mentor, or assistant.',
    actionGuide: 'Place your closed fist with thumb pointing up on top of your flat non-dominant palm, and lift both hands upward together.',
    difficulty: 'Intermediate',
    tag: 'High Priority'
  },
  {
    id: 'teacher',
    title: 'Teacher / Guru',
    category: 'Classroom',
    handshape: 'Teach sign + Person marker',
    meaning: 'Referring to an educator, professor, or tutor.',
    actionGuide: 'Form two "O" hands near your temples, push them forward twice as "Teach", then bring both flat hands straight down for "Person".',
    difficulty: 'Intermediate',
    tag: 'Education'
  },
  {
    id: 'learn',
    title: 'Learn / Seekhna',
    category: 'Classroom',
    handshape: 'Take from Palm to Forehead',
    meaning: 'Absorbing knowledge or studying new concepts.',
    actionGuide: 'Place your dominant hand fingers on your open non-dominant palm as if picking up knowledge, then bring fingertips up to touch your forehead.',
    difficulty: 'Intermediate',
    tag: 'Education'
  },
  {
    id: 'question',
    title: 'Question / Prashna',
    category: 'Classroom',
    handshape: 'Index finger draws question mark in air',
    meaning: 'Asking to clarify a doubt or raise a question in live lecture.',
    actionGuide: 'Point your index finger forward, curl it into a hook shape, and uncurl it as if drawing a question mark.',
    difficulty: 'Intermediate',
    tag: 'Classroom'
  },
  {
    id: 'book',
    title: 'Book / Pustak',
    category: 'Study',
    handshape: 'Palms Together then Open like Book',
    meaning: 'Reading material, textbook, or study chapter.',
    actionGuide: 'Place your palms flat together with pinkies touching, then open your palms outward like opening a book.',
    difficulty: 'Beginner',
    tag: 'Study'
  },
  {
    id: 'good',
    title: 'Good / Shandar',
    category: 'Praise',
    handshape: 'Fingertips from Chin to Flat Palm',
    meaning: 'Expressing high quality, great answer, or positive encouragement.',
    actionGuide: 'Touch your chin with your dominant flat hand, then bring it down to rest on your non-dominant flat palm.',
    difficulty: 'Beginner',
    tag: 'Feedback'
  }
];
