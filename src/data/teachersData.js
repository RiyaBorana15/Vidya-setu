// Special Educators, Sign Language Interpreters & Mentors Dataset

export const TEACHERS_DATA = [
  {
    id: 't-1',
    name: 'Dr. Ananya Sen',
    title: 'Senior Dyslexia & Phonics Specialist',
    qualification: 'Ph.D. in Cognitive Neuropsychology, RCI Certified',
    rating: 4.96,
    reviewsCount: 142,
    experience: '12+ Years',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    specialties: ['Dyslexia Remediation', 'Orton-Gillingham Phonics', 'ADHD Learning Support', 'Reading Fluency'],
    languages: ['English', 'Hindi', 'Bengali'],
    hourlyRate: '₹0 (AICTE Free Quota) / ₹450',
    badge: 'Top Rated',
    bio: 'Dedicated to empowering neurodivergent students using multi-sensory phonetic techniques, bionic reading strategies, and cognitive empathy.',
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat'],
    availableSlots: [
      { id: 's1', time: '09:00 AM - 09:45 AM', type: '1-on-1 Remedial Class', isBooked: false },
      { id: 's2', time: '11:00 AM - 11:45 AM', type: 'Phonological Diagnostic', isBooked: false },
      { id: 's3', time: '04:00 PM - 04:45 PM', type: 'Reading Fluency Workshop', isBooked: false },
      { id: 's4', time: '06:00 PM - 06:45 PM', type: 'Parent & Educator Consultation', isBooked: true }
    ]
  },
  {
    id: 't-2',
    name: 'Rajesh Varma',
    title: 'Lead Indian Sign Language (ISL) Master Instructor',
    qualification: 'Certified ISL Interpreter, National Association of the Deaf',
    rating: 4.98,
    reviewsCount: 218,
    experience: '9+ Years',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    specialties: ['Indian Sign Language (ISL)', 'Live Classroom Interpreting', 'STEM Sign Vocabulary', 'Deaf Culture & Communication'],
    languages: ['ISL', 'English', 'Hindi', 'Marathi'],
    hourlyRate: '₹0 (AICTE Free Quota) / ₹400',
    badge: 'Master Interpreter',
    bio: 'Specializes in bridging classroom lectures with dynamic real-time ISL interpretations, technical STEM sign lexicons, and conversational fluency.',
    availableDays: ['Tue', 'Thu', 'Fri', 'Sun'],
    availableSlots: [
      { id: 's5', time: '10:00 AM - 10:45 AM', type: 'ISL Live Tutoring', isBooked: false },
      { id: 's6', time: '01:30 PM - 02:15 PM', type: 'STEM Sign Vocabulary', isBooked: false },
      { id: 's7', time: '05:00 PM - 05:45 PM', type: 'Conversational Sign Practice', isBooked: false }
    ]
  },
  {
    id: 't-3',
    name: 'Prof. Priya Sharma',
    title: 'STEM & Interactive Visual Math Specialist',
    qualification: 'M.Sc. Mathematics, B.Ed. in Inclusive Pedagogy',
    rating: 4.92,
    reviewsCount: 165,
    experience: '8+ Years',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
    specialties: ['Dyscalculia Support', 'Visual Geometry', 'Interactive Physics Simulations', 'Memory Mapping'],
    languages: ['English', 'Hindi'],
    hourlyRate: '₹0 (AICTE Free Quota) / ₹420',
    badge: 'STEM Innovator',
    bio: 'Pioneered tactile and visual mathematics techniques to turn abstract formulas into intuitive visual patterns for students with learning variations.',
    availableDays: ['Mon', 'Tue', 'Thu', 'Sat'],
    availableSlots: [
      { id: 's8', time: '11:30 AM - 12:15 PM', type: 'Visual Math & Dyscalculia', isBooked: false },
      { id: 's9', time: '03:00 PM - 03:45 PM', type: 'Physics Concept Clarity', isBooked: false },
      { id: 's10', time: '06:30 PM - 07:15 PM', type: 'Pre-Quiz Concept Booster', isBooked: false }
    ]
  },
  {
    id: 't-4',
    name: 'Dr. Michael Fernandes',
    title: 'Speech-Language Pathologist & Assistive Tech Guide',
    qualification: 'M.S. in Speech & Hearing Sciences, AIIMS Fellowship',
    rating: 4.89,
    reviewsCount: 97,
    experience: '10+ Years',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    specialties: ['Speech Articulation', 'Auditory Processing', 'AAC Device Training', 'Expressive Language'],
    languages: ['English', 'Hindi', 'Konkani'],
    hourlyRate: '₹0 (AICTE Free Quota) / ₹500',
    badge: 'Clinical Expert',
    bio: 'Expert in pediatric speech clarity, assistive communication tools, and confidence building for learners with expressive challenges.',
    availableDays: ['Wed', 'Fri', 'Sat', 'Sun'],
    availableSlots: [
      { id: 's11', time: '09:30 AM - 10:15 AM', type: 'Speech Articulation Clinic', isBooked: false },
      { id: 's12', time: '02:00 PM - 02:45 PM', type: 'Auditory Memory Session', isBooked: false }
    ]
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 'BK-89021',
    teacherId: 't-1',
    teacherName: 'Dr. Ananya Sen',
    teacherTitle: 'Dyslexia & Phonics Specialist',
    teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    studentName: 'Aarav Patel (You)',
    date: '2026-08-28',
    time: '09:00 AM - 09:45 AM',
    sessionType: '1-on-1 Remedial Class',
    meetingLink: 'https://divya-smartedu.aicte.gov.in/live/room-89021',
    status: 'Confirmed',
    accommodations: 'OpenDyslexic captions enabled, Bionic review materials shared'
  }
];
