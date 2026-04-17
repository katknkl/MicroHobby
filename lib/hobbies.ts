export interface Hobby {
  id: string;
  name: string;
  category: string;
  duration: number; // minutes
  difficulty: 'easy' | 'medium' | 'hard';
  materials: string[];
  description: string;
  steps: string[];
  tags: string[];
  emoji: string;
  color: string;
  mediaUrl?: string; // optional photo shown on card + in modal
}

export interface UserProgress {
  hobbiesCompleted: string[];
  currentStreak: number;
  longestStreak: number;
  favorites: string[];
  lastActivityDate: string;
  totalMinutes: number;
}

export const categories = [
  { id: 'crafts', name: 'Crafts', emoji: '🧶', color: 'hobby-coral' },
  { id: 'art', name: 'Art', emoji: '🎨', color: 'hobby-blue' },
  { id: 'outdoor', name: 'Outdoor', emoji: '🌿', color: 'hobby-green' },
  { id: 'cooking', name: 'Cooking', emoji: '🍳', color: 'hobby-yellow' },
  { id: 'wellness', name: 'Wellness', emoji: '🧘', color: 'hobby-pink' },
  { id: 'music', name: 'Music', emoji: '🎵', color: 'hobby-blue' },
];

export const hobbies: Hobby[] = [
  {
    id: 'origami-crane',
    name: 'Fold an Origami Crane',
    category: 'crafts',
    duration: 15,
    difficulty: 'easy',
    materials: ['Square paper (any size)', 'Flat surface'],
    description: 'Learn the classic paper crane - a symbol of peace and good fortune. Perfect for beginners!',
    steps: [
      'Start with a square piece of paper, colored side down',
      'Fold in half diagonally both ways, then unfold',
      'Fold in half horizontally and vertically, unfold',
      'Bring corners together to form a smaller square',
      'Fold the top layers to the center crease',
      'Fold the top triangle down and unfold',
      'Open the top layer and fold it upward',
      'Repeat on the other side',
      'Fold the legs up to create the head and tail',
      'Fold the head down and spread the wings'
    ],
    tags: ['paper', 'relaxing', 'gift', 'traditional'],
    emoji: '🦢',
    color: 'hobby-coral',
    mediaUrl: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=600&q=80',
  },
  {
    id: 'watercolor-sunset',
    name: 'Paint a Simple Sunset',
    category: 'art',
    duration: 25,
    difficulty: 'easy',
    materials: ['Watercolor paper', 'Watercolor paints', 'Brush', 'Water cup', 'Paper towel'],
    description: 'Create a beautiful sunset using wet-on-wet technique. No experience needed!',
    steps: [
      'Wet your entire paper with clean water',
      'Start at the top with a warm yellow',
      'Add orange below the yellow while still wet',
      'Blend coral/pink in the middle section',
      'Add deep purple or blue at the horizon',
      'Let colors naturally blend together',
      'Add a simple silhouette while damp (trees, mountains)',
      'Let dry completely - colors will lighten!'
    ],
    tags: ['painting', 'creative', 'relaxing', 'colorful'],
    emoji: '🌅',
    color: 'hobby-blue',
    mediaUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80',
  },
  {
    id: 'herb-windowsill',
    name: 'Start a Windowsill Herb',
    category: 'outdoor',
    duration: 20,
    difficulty: 'easy',
    materials: ['Small pot with drainage', 'Potting soil', 'Herb seeds (basil, mint, or cilantro)', 'Spray bottle'],
    description: 'Plant your own herb garden starting with just one pot. Fresh herbs in weeks!',
    steps: [
      'Fill your pot with moist potting soil',
      'Leave about 1 inch from the top',
      'Sprinkle 3-5 seeds on the surface',
      'Cover lightly with 1/4 inch of soil',
      'Mist gently with water',
      'Place in a sunny windowsill',
      'Keep soil moist but not soggy',
      'Watch for sprouts in 5-10 days!'
    ],
    tags: ['gardening', 'sustainable', 'cooking', 'patience'],
    emoji: '🌱',
    color: 'hobby-green',
    mediaUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
  },
  {
    id: 'friendship-bracelet',
    name: 'Make a Friendship Bracelet',
    category: 'crafts',
    duration: 30,
    difficulty: 'medium',
    materials: ['Embroidery floss (3+ colors)', 'Tape or safety pin', 'Scissors'],
    description: 'Create a classic chevron pattern bracelet. Perfect for gifting!',
    steps: [
      'Cut 4 strands of different colors, each 60 inches long',
      'Fold in half and knot at the top, leaving a loop',
      'Tape or pin the loop to a surface',
      'Arrange colors in a mirror pattern',
      'Start with the leftmost strand, make forward knots',
      'Work toward the center, then repeat from the right',
      'Meet in the middle and knot the two center strands',
      'Repeat the pattern until desired length',
      'Tie off with a knot and trim excess'
    ],
    tags: ['friendship', 'gift', 'colorful', 'portable'],
    emoji: '📿',
    color: 'hobby-pink',
    mediaUrl: 'https://images.unsplash.com/photo-1573408301185-9519eb606f27?w=600&q=80',
  },
  {
    id: 'cloud-bread',
    name: 'Bake Cloud Bread',
    category: 'cooking',
    duration: 25,
    difficulty: 'easy',
    materials: ['3 eggs', '3 tbsp cream cheese', '1/4 tsp cream of tartar', 'Pinch of salt'],
    description: 'Make fluffy, pillowy cloud bread with just 4 ingredients. Keto-friendly and delicious!',
    steps: [
      'Preheat oven to 300°F (150°C)',
      'Separate egg yolks and whites',
      'Beat yolks with softened cream cheese until smooth',
      'In another bowl, beat whites with cream of tartar until stiff peaks',
      'Gently fold yolk mixture into whites',
      'Spoon onto parchment-lined baking sheet',
      'Form 6 mounds, about 3 inches wide',
      'Bake 25-30 minutes until golden',
      'Let cool before handling - they deflate slightly!'
    ],
    tags: ['baking', 'simple', 'trending', 'healthy'],
    emoji: '☁️',
    color: 'hobby-yellow',
    mediaUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80',
  },
  {
    id: 'mindful-sketch',
    name: 'Zentangle Doodle',
    category: 'art',
    duration: 20,
    difficulty: 'easy',
    materials: ['Paper', 'Fine-tip pen', 'Pencil (optional)'],
    description: 'Create meditative patterns with repetitive strokes. Relaxing and mindful!',
    steps: [
      'Draw a square or circle border lightly in pencil',
      'Divide into 4-6 random sections with curved lines',
      'Choose a simple pattern for each section (dots, lines, waves)',
      'Fill one section at a time with your pattern',
      'Breathe slowly and focus only on your strokes',
      'Vary line thickness for interest',
      'Add shading to give dimension',
      'No erasing - embrace imperfections!'
    ],
    tags: ['meditation', 'relaxing', 'creative', 'mindful'],
    emoji: '🖊️',
    color: 'hobby-blue',
    mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80',
  },
  {
    id: 'press-flowers',
    name: 'Press Flowers',
    category: 'outdoor',
    duration: 15,
    difficulty: 'easy',
    materials: ['Fresh flowers or leaves', 'Heavy book', 'Parchment paper', 'Paper towels'],
    description: 'Preserve beautiful blooms for cards, bookmarks, or art. Start today, enjoy in 2 weeks!',
    steps: [
      'Collect fresh flowers on a dry day',
      'Choose flat flowers or gently flatten thicker ones',
      'Open your book to the middle',
      'Place paper towel, then parchment paper',
      'Arrange flowers flat with space between',
      'Cover with parchment and paper towel',
      'Close book and stack more books on top',
      'Wait 2-4 weeks - check weekly!',
      'Use for cards, bookmarks, or frame them'
    ],
    tags: ['nature', 'patience', 'gift', 'seasonal'],
    emoji: '🌸',
    color: 'hobby-green',
    mediaUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
  {
    id: 'hand-stretches',
    name: '5-Minute Hand Yoga',
    category: 'wellness',
    duration: 5,
    difficulty: 'easy',
    materials: ['Just your hands!'],
    description: 'Relieve tension from typing and scrolling with gentle hand stretches.',
    steps: [
      'Shake out your hands for 10 seconds',
      'Make tight fists, hold 5 seconds, release',
      'Spread fingers wide, hold 5 seconds',
      'Touch each fingertip to thumb, both hands',
      'Interlace fingers and push palms outward',
      'Make prayer position, press gently',
      'Rotate wrists slowly in circles',
      'Finish by massaging each palm with thumb'
    ],
    tags: ['quick', 'wellness', 'office-friendly', 'daily'],
    emoji: '🤲',
    color: 'hobby-pink',
    mediaUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
  },
  {
    id: 'mug-cake',
    name: 'Make a 2-Minute Mug Cake',
    category: 'cooking',
    duration: 10,
    difficulty: 'easy',
    materials: ['Microwave-safe mug', '4 tbsp flour', '4 tbsp sugar', '2 tbsp cocoa', '3 tbsp milk', '2 tbsp oil', 'Pinch of salt'],
    description: 'Satisfy your chocolate craving in minutes with this single-serving treat!',
    steps: [
      'Mix dry ingredients in a mug (flour, sugar, cocoa, salt)',
      'Add milk and oil, stir until smooth',
      'Add a splash of vanilla if you have it',
      'Optional: drop in a few chocolate chips',
      'Microwave for 60-90 seconds (watch it rise!)',
      'Let cool for 1 minute',
      'Top with whipped cream or ice cream',
      'Eat straight from the mug!'
    ],
    tags: ['quick', 'chocolate', 'comfort-food', 'solo'],
    emoji: '🍫',
    color: 'hobby-yellow',
    mediaUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80',
  },
  {
    id: 'nature-walk-bingo',
    name: 'Nature Walk Bingo',
    category: 'outdoor',
    duration: 30,
    difficulty: 'easy',
    materials: ['Phone or paper for list', 'Comfortable shoes'],
    description: 'Turn a regular walk into an adventure. Find items from your nature bingo list!',
    steps: [
      'Create a 3x3 bingo card with nature items',
      'Include: bird, squirrel, yellow flower, pinecone, etc.',
      'Head outside to your nearest park or trail',
      'Walk slowly and observe your surroundings',
      'Mark off items as you spot them',
      'Take photos as proof!',
      'Try to get 3 in a row (or blackout!)',
      'Bonus: identify species with a plant app'
    ],
    tags: ['active', 'mindful', 'family-friendly', 'seasonal'],
    emoji: '🚶',
    color: 'hobby-green',
    mediaUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80',
  },
  {
    id: 'simple-embroidery',
    name: 'Beginner Embroidery',
    category: 'crafts',
    duration: 30,
    difficulty: 'medium',
    materials: ['Embroidery hoop', 'Fabric', 'Needle', 'Embroidery floss', 'Pencil'],
    description: 'Learn the running stitch and backstitch to create a simple design.',
    steps: [
      'Secure fabric in embroidery hoop',
      'Draw a simple design (heart, flower, word)',
      'Thread needle with 2 strands of floss',
      'Knot the end and start from behind',
      'Practice running stitch: up-down-up-down',
      'Try backstitch for solid lines',
      'Fill shapes with satin stitch',
      'Knot off on the back when done',
      'Trim excess and display your work!'
    ],
    tags: ['traditional', 'gift', 'relaxing', 'portable'],
    emoji: '🪡',
    color: 'hobby-coral',
    mediaUrl: 'https://images.unsplash.com/photo-1550159930-40066082a4fc?w=600&q=80',
  },
  {
    id: 'breathing-exercise',
    name: '4-7-8 Breathing',
    category: 'wellness',
    duration: 5,
    difficulty: 'easy',
    materials: ['Quiet space', 'Timer (optional)'],
    description: 'A calming breathing technique to reduce stress and improve sleep.',
    steps: [
      'Find a comfortable seated position',
      'Rest the tip of your tongue behind upper teeth',
      'Exhale completely through your mouth',
      'Close mouth and inhale through nose for 4 counts',
      'Hold your breath for 7 counts',
      'Exhale completely through mouth for 8 counts',
      'This is one breath cycle',
      'Repeat 4 times total',
      'Notice the calm settling in'
    ],
    tags: ['quick', 'calming', 'sleep', 'daily'],
    emoji: '🌬️',
    color: 'hobby-pink',
    mediaUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80',
  },
  {
    id: 'music-beat-making',
    name: 'Beat Making',
    category: 'music',
    duration: 25,
    difficulty: 'easy',
    materials: ['Computer or phone', 'Free browser DAW (Soundtrap, BandLab, or Chrome Music Lab)'],
    description: 'Create a simple drum pattern or lo-fi beat using a free browser DAW. No experience needed — just hit play and layer sounds.',
    steps: [
      'Open a free browser DAW: try Soundtrap, BandLab, or Chrome Music Lab and start a new project',
      'Add a kick drum sample and place it on beats 1 and 3 of a 4-bar loop',
      'Layer a snare hit on beats 2 and 4 — this gives your beat its backbone',
      'Fill in eighth notes with a hi-hat sample to add groove and momentum',
      'Hit play and listen — does it feel right? Adjust volume levels between layers',
      'Add a simple bass note or melody on top if you\'re feeling adventurous',
      'Loop it and vibe — you just made a beat!',
    ],
    tags: ['music', 'creative', 'digital', 'beginner'],
    emoji: '🥁',
    color: 'hobby-coral',
    mediaUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80',
  },
  {
    id: 'music-compose-melody',
    name: 'Compose a Melody',
    category: 'music',
    duration: 20,
    difficulty: 'easy',
    materials: ['Phone (Voice Memos app)', 'Optional: virtual piano at virtualpiano.net'],
    description: 'Hum or whistle a short melody into your phone\'s voice memo app, then try to recreate it on a virtual piano keyboard.',
    steps: [
      'Open Voice Memos on your phone and press record',
      'Hum or whistle a short 8-note melody that feels good to you — don\'t overthink it',
      'Play it back and listen — do you like it? Record again until you have something you love',
      'Open virtualpiano.net or Chrome Music Lab\'s Song Maker in your browser',
      'Play around on the keyboard to find the notes that match your hummed melody',
      'Write down the key letters in order (C, D, E, F, G, A, B) so you can revisit it',
      'Play your melody back on the virtual piano — you just composed something original!',
    ],
    tags: ['music', 'creative', 'beginner', 'songwriting'],
    emoji: '🎵',
    color: 'hobby-blue',
    mediaUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80',
  },
  {
    id: 'music-air-drumming',
    name: 'Air Drumming Session',
    category: 'music',
    duration: 20,
    difficulty: 'easy',
    materials: ['Your favorite song', 'Optional: pencils or chopsticks as drum sticks'],
    description: 'Put on your favorite song and air-drum along with the beat. It\'s a genuine workout and surprisingly great for rhythm training.',
    steps: [
      'Pick a song with a clear, driving beat — rock, hip-hop, or funk all work great',
      'Grab pencils, chopsticks, or just use your hands as drumsticks',
      'Listen to the song once through and just feel the rhythm before playing',
      'Tap your foot on the kick drum beat to lock in your timing foundation',
      'Add your right hand for the hi-hat pattern, tapping along with the beat',
      'Bring in your left hand for the snare hits on beats 2 and 4',
      'Play through the whole song without stopping — mistakes are part of the fun!',
    ],
    tags: ['music', 'active', 'fun', 'rhythm'],
    emoji: '🪘',
    color: 'hobby-yellow',
    mediaUrl: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=600&q=80',
  },
  {
    id: 'music-playlist-curation',
    name: 'Playlist Curation',
    category: 'music',
    duration: 25,
    difficulty: 'easy',
    materials: ['Spotify, Apple Music, or YouTube', 'Optional: paper to jot down track ideas'],
    description: 'Curate the perfect mood playlist from scratch — pick a vibe, research tracks, and craft an arc from opener to closer.',
    steps: [
      'Choose a specific mood or scenario: "Sunday morning", "late-night drive", "getting pumped up"',
      'Pick 3 anchor songs you absolutely love for this mood — these are your foundation',
      'Use Spotify\'s "Go to Song Radio" or YouTube autoplay to discover similar tracks',
      'Aim for 10-15 songs total and think about flow — how does one song lead to the next?',
      'Order your playlist with an arc: start calm, build to a peak, then wind down (or reverse it)',
      'Listen through from start to finish and swap out anything that breaks the mood',
      'Give your playlist a creative name that captures the feeling — make it feel real!',
    ],
    tags: ['music', 'curation', 'relaxing', 'creative'],
    emoji: '🎧',
    color: 'hobby-pink',
    mediaUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
  },
  {
    id: 'music-lyric-writing',
    name: 'Write Song Lyrics',
    category: 'music',
    duration: 25,
    difficulty: 'medium',
    materials: ['Pen and paper or notes app', 'Optional: a song instrumental to write over'],
    description: 'Pick an emotion you\'ve felt recently and write a verse and chorus. Rhyming is optional — just let it flow.',
    steps: [
      'Pick one specific emotion you\'ve felt recently: nostalgia, excitement, heartbreak, relief',
      'Set a timer for 5 minutes and free-write every word or phrase associated with that feeling',
      'Read back what you wrote and circle the lines that feel most true or interesting',
      'Shape your best lines into a 4–6 line verse — don\'t worry about rhyming yet',
      'Write a chorus: it should be the emotional peak, memorable, and easy to sing along to',
      'Read your lyrics out loud to hear how they flow — fix anything that feels awkward',
      'Optional: put on an instrumental track and try singing your lyrics over it',
    ],
    tags: ['music', 'writing', 'creative', 'emotional'],
    emoji: '✍️',
    color: 'hobby-green',
    mediaUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80',
  },
];

export const getRandomHobby = (excludeIds: string[] = []): Hobby => {
  const available = hobbies.filter(h => !excludeIds.includes(h.id));
  return available[Math.floor(Math.random() * available.length)] || hobbies[0];
};

export const getHobbiesByCategory = (categoryId: string): Hobby[] => {
  return hobbies.filter(h => h.category === categoryId);
};

export const getHobbyById = (id: string): Hobby | undefined => {
  return hobbies.find(h => h.id === id);
};
