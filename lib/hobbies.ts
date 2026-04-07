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
    color: 'hobby-coral'
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
    color: 'hobby-blue'
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
    color: 'hobby-green'
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
    color: 'hobby-pink'
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
    color: 'hobby-yellow'
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
    color: 'hobby-blue'
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
    color: 'hobby-green'
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
    color: 'hobby-pink'
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
    color: 'hobby-yellow'
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
    color: 'hobby-green'
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
    color: 'hobby-coral'
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
    color: 'hobby-pink'
  }
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
