// Pre-Lecture Decks, Post-Lecture Recap Decks & Adaptive Quizzes Dataset

export const FLASHCARD_DECKS = {
  preLecture: [
    {
      id: 'pre-1',
      title: 'Photosynthesis & Plant Biology (Pre-Lecture Deck)',
      subject: 'Science / Biology',
      targetClass: 'Class 9 & 10',
      difficulty: 'Introductory',
      timeToRead: '4 mins',
      cardsCount: 5,
      description: 'Prime your brain before the live science lecture! Master key terms and visual concepts.',
      cards: [
        {
          id: 'c1',
          frontWord: 'Photosynthesis',
          frontPhonetic: '/ˌfoʊ.toʊˈsɪn.θə.sɪs/',
          frontHint: 'Breaking down: Photo (Light) + Synthesis (Putting together)',
          frontImage: '🌱☀️',
          backDefinition: 'The biological process by which green plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of glucose sugar.',
          backKeyFormula: '6CO₂ + 6H₂O + Sunlight ➔ C₆H₁₂O₆ + 6O₂',
          backDyslexiaMnemonic: 'Remember: Green leaves are solar-powered sugar kitchens!',
          audioText: 'Photosynthesis. Photo means light, synthesis means putting together.'
        },
        {
          id: 'c2',
          frontWord: 'Chlorophyll',
          frontPhonetic: '/ˈklɔːr.ə.fɪl/',
          frontHint: 'The green pigment inside plant cells',
          frontImage: '🍃🔬',
          backDefinition: 'A specialized green pigment found in plant chloroplasts that absorbs light energy (mostly blue and red wavelengths, while reflecting green).',
          backKeyFormula: 'Active in Chloroplast thylakoid membranes',
          backDyslexiaMnemonic: 'Chlorophyll = "Color Fill" that makes leaves lush green!',
          audioText: 'Chlorophyll. The green pigment that captures solar energy.'
        },
        {
          id: 'c3',
          frontWord: 'Stomata',
          frontPhonetic: '/stoʊˈmɑː.tə/',
          frontHint: 'Microscopic breathing pores on leaf surfaces',
          frontImage: '🔍🌿',
          backDefinition: 'Tiny microscopic pores located primarily on the underside of leaves that open and close to regulate gas exchange (taking in CO₂ and releasing O₂) and water transpiration.',
          backKeyFormula: 'Guarded by kidney-shaped Guard Cells',
          backDyslexiaMnemonic: 'Stomata sounds like "Stomach mouths" opening to breathe air!',
          audioText: 'Stomata. Microscopic openings for gas exchange.'
        },
        {
          id: 'c4',
          frontWord: 'Xylem & Phloem',
          frontPhonetic: '/ˈzaɪ.ləm/ & /ˈfloʊ.em/',
          frontHint: 'The dual transport pipelines inside plant stems',
          frontImage: '💧🪴🍯',
          backDefinition: 'Xylem transports water & dissolved minerals upward from roots to leaves. Phloem transports soluble organic food (sucrose) up and down to growing tissues.',
          backKeyFormula: 'Xylem = Upward Water | Phloem = Bidirectional Food',
          backDyslexiaMnemonic: 'XYlem = High-lem (Water goes HIGH) | Phloem = Food-Flow (Flows everywhere)!',
          audioText: 'Xylem carries water up. Phloem flows food everywhere.'
        },
        {
          id: 'c5',
          frontWord: 'Glucose (C₆H₁₂O₆)',
          frontPhonetic: '/ˈɡluː.koʊs/',
          frontHint: 'The primary simple carbohydrate fuel made by plants',
          frontImage: '🍬⚡',
          backDefinition: 'A simple sugar molecule containing 6 Carbon, 12 Hydrogen, and 6 Oxygen atoms used by plant cells for respiration, growth, and starch storage.',
          backKeyFormula: 'Stores solar energy in chemical bonds',
          backDyslexiaMnemonic: 'Glucose gives plants the "Go Juice" energy!',
          audioText: 'Glucose. Simple sugar storing solar energy.'
        }
      ]
    },
    {
      id: 'pre-2',
      title: 'Pythagoras Theorem & Triangle Geometry (Pre-Lecture Deck)',
      subject: 'Mathematics',
      targetClass: 'Class 8 & 9',
      difficulty: 'Visual Math',
      timeToRead: '3 mins',
      cardsCount: 4,
      description: 'Visual intuition and formula priming before the live math session.',
      cards: [
        {
          id: 'm1',
          frontWord: 'Hypotenuse',
          frontPhonetic: '/haɪˈpɑː.tə.nuːs/',
          frontHint: 'The longest side in any right-angled triangle',
          frontImage: '📐🔺',
          backDefinition: 'The side directly opposite the 90-degree right angle. It is always the longest side of a right triangle.',
          backKeyFormula: 'Hypotenuse² = Base² + Perpendicular²',
          backDyslexiaMnemonic: 'Hypo-TEN-use = The BIG side stretching like a high-tension rope!',
          audioText: 'Hypotenuse is the longest side opposite the 90 degree angle.'
        },
        {
          id: 'm2',
          frontWord: 'Right Angle (90°)',
          frontPhonetic: '/raɪt ˈæŋ.ɡəl/',
          frontHint: 'The perfect square corner',
          frontImage: '⏹️📐',
          backDefinition: 'An angle that measures exactly 90 degrees, forming two perpendicular intersecting lines like the corner of a book.',
          backKeyFormula: 'Symbolized by a square box in the corner',
          backDyslexiaMnemonic: 'Corner of your screen or notebook = 90 degrees right angle!',
          audioText: 'A right angle measures exactly 90 degrees.'
        },
        {
          id: 'm3',
          frontWord: 'Pythagorean Triplet',
          frontPhonetic: '/pɪˌθæɡ.əˈriː.ən/',
          frontHint: 'Special sets of 3 whole numbers that fit a² + b² = c²',
          frontImage: '3️⃣ 4️⃣ 5️⃣',
          backDefinition: 'Three positive integers (a, b, c) such that a² + b² = c². The most famous fundamental triplet is (3, 4, 5) because 9 + 16 = 25.',
          backKeyFormula: 'Common triplets: (3,4,5), (5,12,13), (8,15,17)',
          backDyslexiaMnemonic: '3 squared (9) + 4 squared (16) = 5 squared (25)!',
          audioText: 'Pythagorean triplets are whole number side lengths for right triangles.'
        },
        {
          id: 'm4',
          frontWord: 'Perpendicular & Base',
          frontPhonetic: '/ˌpɜːr.pənˈdɪk.jə.lɚ/',
          frontHint: 'The two shorter legs enclosing the 90° corner',
          frontImage: '📏📐',
          backDefinition: 'The vertical leg (perpendicular/altitude) and horizontal leg (base) that meet at 90 degrees to form the right angle.',
          backKeyFormula: 'Area = 1/2 × Base × Height',
          backDyslexiaMnemonic: 'Base is the floor, Height is the wall!',
          audioText: 'Base is horizontal floor, perpendicular is vertical height.'
        }
      ]
    }
  ],

  postLecture: [
    {
      id: 'post-1',
      title: 'Photosynthesis Recap & Exam High-Yield Points (Post-Lecture Deck)',
      subject: 'Science / Biology',
      targetClass: 'Class 9 & 10',
      difficulty: 'Consolidation',
      timeToRead: '5 mins',
      cardsCount: 5,
      description: 'Reinforce what teacher explained in class. Spaced repetition for long-term memory!',
      cards: [
        {
          id: 'post-c1',
          frontWord: 'Light-Dependent vs Light-Independent (Calvin Cycle)',
          frontPhonetic: '/ˈlaɪt dɪˈpen.dənt/',
          frontHint: 'The two distinct stages of photosynthesis',
          frontImage: '☀️ vs 🌙',
          backDefinition: 'Light reactions happen in Thylakoids to create ATP & NADPH by splitting water (releasing O₂). Dark reactions happen in Stroma to fix CO₂ into glucose.',
          backKeyFormula: 'Stage 1: H₂O ➔ O₂ + ATP | Stage 2: CO₂ + ATP ➔ C₆H₁₂O₆',
          backDyslexiaMnemonic: 'Day Shift makes battery power (ATP); Night Shift bakes the sugar bread!',
          audioText: 'Stage 1 splits water with light; Stage 2 fixes carbon into glucose.'
        },
        {
          id: 'post-c2',
          frontWord: 'Transpiration Pull',
          frontPhonetic: '/ˌtræn.spəˈreɪ.ʃən pʊl/',
          frontHint: 'The giant suction pump that moves water up tall trees',
          frontImage: '🌲💧💨',
          backDefinition: 'Evaporation of water through stomata creates a continuous upward tension pulling water column all the way from root hairs to crown leaves.',
          backKeyFormula: 'Cohesion-Tension Mechanism',
          backDyslexiaMnemonic: 'Like drinking through a long straw: suction at the top pulls water from below!',
          audioText: 'Transpiration pull is the suction force caused by water evaporation.'
        },
        {
          id: 'post-c3',
          frontWord: 'Starch Storage Test (Iodine Reaction)',
          frontPhonetic: '/ˈaɪ.ə.diːn rɪˈæk.ʃən/',
          frontHint: 'How scientists test if a leaf did photosynthesis',
          frontImage: '🧪🍃🔵',
          backDefinition: 'Excess glucose is stored as starch. When Iodine solution is dropped on a de-colorized boiled leaf, starch turns blue-black, proving photosynthesis occurred.',
          backKeyFormula: 'Starch + Iodine ➔ Blue-Black Color',
          backDyslexiaMnemonic: 'Iodine on Starch turns Deep Blue like the ocean ink!',
          audioText: 'Iodine turns starch blue-black to prove photosynthesis happened.'
        }
      ]
    },
    {
      id: 'post-2',
      title: 'Geometry & Coordinate Geometry Exam Mastery (Post-Lecture Deck)',
      subject: 'Mathematics',
      targetClass: 'Class 8 & 9',
      difficulty: 'Review',
      timeToRead: '4 mins',
      cardsCount: 3,
      description: 'Quick formula recap after today live class.',
      cards: [
        {
          id: 'post-m1',
          frontWord: 'Distance Formula in 2D Cartesian Plane',
          frontPhonetic: '/ˈdɪs.təns ˈfɔːr.mjə.lə/',
          frontHint: 'Pythagoras theorem applied between two coordinate points',
          frontImage: '📈📍📍',
          backDefinition: 'Finds direct straight-line distance between Point A(x₁, y₁) and Point B(x₂, y₂).',
          backKeyFormula: 'd = √[ (x₂ - x₁)² + (y₂ - y₁)² ]',
          backDyslexiaMnemonic: 'Horizontal gap squared + Vertical gap squared, then square root!',
          audioText: 'Distance formula is square root of change in x squared plus change in y squared.'
        },
        {
          id: 'post-m2',
          frontWord: 'Midpoint Formula',
          frontPhonetic: '/ˈmɪdˌpɔɪnt/',
          frontHint: 'The exact center average of two points',
          frontImage: '⚖️📍',
          backDefinition: 'Calculates coordinates of the exact halfway point between two endpoints on a line segment.',
          backKeyFormula: 'Midpoint M = ( (x₁ + x₂)/2 , (y₁ + y₂)/2 )',
          backDyslexiaMnemonic: 'Simply find average of X values and average of Y values!',
          audioText: 'Midpoint is the average of x coordinates and average of y coordinates.'
        }
      ]
    }
  ]
};

export const QUIZ_QUESTIONS = [
  {
    id: 'q1',
    subject: 'Biology / Inclusive Science',
    question: 'During photosynthesis, which gas is absorbed by plant stomata from the atmosphere?',
    hint: 'This is the gas humans exhale and burning fuels emit.',
    options: [
      { id: 'opt1', text: 'Carbon Dioxide (CO₂)', isCorrect: true, explanation: 'Correct! Plants absorb atmospheric CO₂ through open stomata to build glucose sugar.' },
      { id: 'opt2', text: 'Pure Nitrogen (N₂)', isCorrect: false, explanation: 'Incorrect. Nitrogen makes up 78% of air, but plants absorb nitrogen from soil nitrates via roots.' },
      { id: 'opt3', text: 'Noble Helium (He)', isCorrect: false, explanation: 'Incorrect. Helium is an inert noble gas not involved in photosynthesis.' },
      { id: 'opt4', text: 'Carbon Monoxide (CO)', isCorrect: false, explanation: 'Incorrect. CO is a toxic pollutant; plants need Carbon Dioxide (CO₂).' }
    ],
    dyslexiaTip: 'Focus on the "Di" in Dioxide (meaning 2 oxygen atoms).'
  },
  {
    id: 'q2',
    subject: 'Sign Language & Accessibility',
    question: 'In Indian Sign Language (ISL), which hand gesture corresponds to "Peace / Letter V"?',
    hint: 'Two fingers pointing upwards in a split V shape.',
    options: [
      { id: 'opt1', text: 'Closed fist with thumb extended sideways (Letter A)', isCorrect: false, explanation: 'Incorrect. That is the letter A or fist gesture.' },
      { id: 'opt2', text: 'Index and Middle fingers extended upward in a spread V', isCorrect: true, explanation: 'Brilliant! Index and middle fingers spread upwards forms the letter V and victory/peace sign.' },
      { id: 'opt3', text: 'Thumb and Pinky extended outwards (Letter Y / Shaka)', isCorrect: false, explanation: 'Incorrect. Thumb and pinky extended corresponds to letter Y.' },
      { id: 'opt4', text: 'Flat open palm with 4 fingers together', isCorrect: false, explanation: 'Incorrect. Flat open palm corresponds to Letter B or Hello.' }
    ],
    dyslexiaTip: 'Think of 2 fingers making the two angled lines of the letter V.'
  },
  {
    id: 'q3',
    subject: 'Mathematics',
    question: 'In a right-angled triangle, if base = 3 cm and perpendicular = 4 cm, what is the length of the hypotenuse?',
    hint: 'Use Pythagoras theorem: c² = a² + b² (9 + 16 = 25).',
    options: [
      { id: 'opt1', text: '7 cm', isCorrect: false, explanation: 'Incorrect. You added 3 + 4 directly, but remember to add their squares (3² + 4²).' },
      { id: 'opt2', text: '5 cm', isCorrect: true, explanation: 'Spot on! 3² (9) + 4² (16) = 25. The square root of 25 is 5 cm (the classic 3-4-5 triplet).' },
      { id: 'opt3', text: '12 cm', isCorrect: false, explanation: 'Incorrect. 3 × 4 = 12, but hypotenuse is found using square roots.' },
      { id: 'opt4', text: '6 cm', isCorrect: false, explanation: 'Incorrect. 6² is 36, which exceeds 25.' }
    ],
    dyslexiaTip: 'Break it into steps: 3×3=9, 4×4=16, 9+16=25, √25=5.'
  },
  {
    id: 'q4',
    subject: 'Biology / Plant Physiology',
    question: 'Which plant vascular tissue is responsible for transporting water and dissolved minerals upward from roots to leaves?',
    hint: 'Sounds like "High-lem" (moving high up).',
    options: [
      { id: 'opt1', text: 'Xylem', isCorrect: true, explanation: 'Correct! Xylem vessels conduct water and minerals unidirectionally upwards.' },
      { id: 'opt2', text: 'Phloem', isCorrect: false, explanation: 'Incorrect. Phloem transports food sugars (sucrose) in both directions.' },
      { id: 'opt3', text: 'Epidermis', isCorrect: false, explanation: 'Incorrect. Epidermis is the protective outer layer of plant organs.' },
      { id: 'opt4', text: 'Pith', isCorrect: false, explanation: 'Incorrect. Pith stores nutrients in the stem center.' }
    ],
    dyslexiaTip: 'Xylem = X-treme water upward pipeline!'
  },
  {
    id: 'q5',
    subject: 'Inclusive Smart Education',
    question: 'How does "Bionic Reading" assist dyslexic and ADHD students in reading comprehension?',
    hint: 'It emphasizes initial letters to guide eye fixation points.',
    options: [
      { id: 'opt1', text: 'By removing all consonants from sentences', isCorrect: false, explanation: 'Incorrect. All letters remain, but prefixes are emphasized.' },
      { id: 'opt2', text: 'By bolding the initial fixation letters of words so the brain automatically completes the rest', isCorrect: true, explanation: 'Exact! Bionic reading guides saccadic eye jumps, reducing cognitive fatigue and boosting reading speed by up to 3x.' },
      { id: 'opt3', text: 'By converting all text to uppercase only', isCorrect: false, explanation: 'Incorrect. All uppercase can actually increase reading fatigue for dyslexic readers.' },
      { id: 'opt4', text: 'By translating text into binary code', isCorrect: false, explanation: 'Incorrect.' }
    ],
    dyslexiaTip: 'Bionic reading works like guide rails for your eyes.'
  }
];
