export const categories = [
  { id: 'all', label: 'All' },
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'lunch', label: 'Lunch' },
  { id: 'dinner', label: 'Dinner' },
  { id: 'snacks', label: 'Snacks' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'quick', label: 'Quick <30min' },
];

export const cuisines = [
  { id: 'pakistani',    label: 'Pakistani',     emoji: '🫓', color: '#2D7A3A', count: 8,  gradient: 'linear-gradient(135deg,#1A5C28,#4AAA5C)', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&q=80' },
  { id: 'italian',      label: 'Italian',        emoji: '🍝', color: '#C84B31', count: 24, gradient: 'linear-gradient(135deg,#C84B31,#E8845A)', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80' },
  { id: 'mexican',      label: 'Mexican',        emoji: '🌮', color: '#C87B1A', count: 18, gradient: 'linear-gradient(135deg,#C87B1A,#E8A838)', image: 'https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=600&q=80' },
  { id: 'asian',        label: 'Asian',          emoji: '🍜', color: '#4A7C59', count: 32, gradient: 'linear-gradient(135deg,#3A6347,#6AAD7E)', image: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&q=80' },
  { id: 'mediterranean',label: 'Mediterranean',  emoji: '🫒', color: '#5A7FA8', count: 15, gradient: 'linear-gradient(135deg,#4A6888,#7AAAD8)', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80' },
  { id: 'indian',       label: 'Indian',         emoji: '🍛', color: '#A33A70', count: 21, gradient: 'linear-gradient(135deg,#A33A70,#D4956A)', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80' },
  { id: 'american',     label: 'American',       emoji: '🍔', color: '#8A6A3A', count: 19, gradient: 'linear-gradient(135deg,#6A4A1A,#A8845A)', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80' },
  { id: 'french',       label: 'French',         emoji: '🥐', color: '#7A4AB8', count: 12, gradient: 'linear-gradient(135deg,#5A3A90,#9A7AD8)', image: 'https://images.unsplash.com/photo-1608855238293-a8853e7f7c98?w=600&q=80' },
  { id: 'japanese',     label: 'Japanese',       emoji: '🍱', color: '#B83838', count: 17, gradient: 'linear-gradient(135deg,#8A2828,#D46A6A)', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80' },
  { id: 'middle-eastern',label:'Middle Eastern', emoji: '🥙', color: '#8A7A2A', count: 14, gradient: 'linear-gradient(135deg,#6A5A1A,#C8AA4A)', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&q=80' },
];

export const collections = [
  { id: 'comfort',    label: 'Comfort Food',  emoji: '🫕', color: '#F0C4BA' },
  { id: 'datenight',  label: 'Date Night',    emoji: '🕯️', color: '#C5DAC9' },
  { id: 'mealprep',   label: 'Meal Prep',     emoji: '🥡', color: '#F0D9C8' },
  { id: 'kidfriendly',label: 'Kid-Friendly',  emoji: '🧒', color: '#FBE9BC' },
  { id: 'highprotein',label: 'High Protein',  emoji: '💪', color: '#C5DAC9' },
  { id: 'budget',     label: 'Budget Meals',  emoji: '💰', color: '#F0C4BA' },
];

export const chefTips = [
  { id: 1, icon: '🧂', title: 'Salt pasta water generously', body: 'Your pasta water should taste like the sea — this is the only chance to season pasta from within.' },
  { id: 2, icon: '🥩', title: 'Rest your meat before cutting', body: 'Let grilled or roasted meat rest 5–10 min so juices redistribute. Skip this and they all pour out.' },
  { id: 3, icon: '🔥', title: "Don't crowd the pan", body: 'Overcrowding drops pan temperature and steams instead of sears. Cook in batches for golden results.' },
  { id: 4, icon: '🧄', title: 'Bloom your spices', body: 'Toast dry spices in oil for 30 seconds before adding liquids — it doubles the flavour depth.' },
  { id: 5, icon: '🍳', title: 'Room-temperature eggs cook better', body: 'Cold eggs crack when boiling and scramble unevenly. Take them out 15 min before cooking.' },
];

export const notifications = [
  { id: 1,  type: 'recipe',   read: false, emoji: '🍛', title: 'New recipe added!',            body: 'Chicken Karahi just landed in Pakistani Kitchen.',     link: '/recipe/14',           time: '2m ago' },
  { id: 2,  type: 'plan',     read: false, emoji: '📅', title: "Today's meal plan is ready",    body: 'You have 3 meals planned for today. Tap to review.',   link: '/meal-planner',        time: '1h ago' },
  { id: 3,  type: 'tip',      read: false, emoji: '💡', title: 'Chef tip of the day',           body: 'Bloom your spices in oil for 30 sec — doubles flavour.', link: '/',                  time: '3h ago' },
  { id: 4,  type: 'recipe',   read: true,  emoji: '🍝', title: 'Trending: Tuscan Chicken Pasta', body: 'This recipe is blowing up this week — 214 reviews!', link: '/recipe/1',            time: '5h ago' },
  { id: 5,  type: 'cuisine',  read: true,  emoji: '🫓', title: 'Explore Pakistani Kitchen',     body: '8 authentic recipes from Biryani to Seekh Kebab.',      link: '/cuisine/pakistani',   time: '1d ago' },
  { id: 6,  type: 'plan',     read: true,  emoji: '🗓️', title: 'Weekly plan reminder',         body: "You haven't planned meals for Thursday and Friday.",    link: '/meal-planner',        time: '1d ago' },
  { id: 7,  type: 'recipe',   read: true,  emoji: '🌮', title: 'New in Mexican Kitchen',        body: 'Classic Beef Tacos Al Pastor — 35 min, 480 kcal.',       link: '/cuisine/mexican',     time: '2d ago' },
  { id: 8,  type: 'feature',  read: true,  emoji: '✨', title: 'Snap feature improved',         body: 'AI ingredient recognition is now faster and smarter.',  link: '/snap',                time: '3d ago' },
  { id: 9,  type: 'tip',      read: true,  emoji: '🥩', title: 'Did you know?',                 body: 'Resting meat 5 min before slicing keeps it juicy.',     link: '/',                    time: '4d ago' },
  { id: 10, type: 'cuisine',  read: true,  emoji: '🍜', title: 'Asian Kitchen updated',         body: '32 recipes spanning Thai, Chinese and Vietnamese.',     link: '/cuisine/asian',       time: '5d ago' },
];

const g = (a, b) => `linear-gradient(160deg, ${a}, ${b})`;

export const allRecipes = [
  /* ── ITALIAN ── */
  {
    id: 1, title: 'Creamy Tuscan Chicken Pasta',
    cuisine: 'italian', category: 'dinner', time: 35, servings: 4, difficulty: 'Medium',
    rating: 4.8, reviewCount: 214, calories: 520, tags: ['pasta', 'chicken', 'creamy'],
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80',
    gradient: g('#C84B31', '#E8845A'),
    macros: { protein: 38, carbs: 52, fat: 18, fiber: 3, sugar: 5, sodium: 620 },
    ingredients: [
      { qty: '400', unit: 'g', name: 'penne pasta' }, { qty: '500', unit: 'g', name: 'chicken breast, sliced' },
      { qty: '200', unit: 'ml', name: 'heavy cream' }, { qty: '150', unit: 'g', name: 'sun-dried tomatoes' },
      { qty: '100', unit: 'g', name: 'baby spinach' }, { qty: '4', unit: 'cloves', name: 'garlic, minced' },
      { qty: '60', unit: 'g', name: 'parmesan, grated' }, { qty: '2', unit: 'tbsp', name: 'olive oil' },
      { qty: '1', unit: 'tsp', name: 'Italian seasoning' }, { qty: '', unit: '', name: 'Salt and black pepper to taste' },
    ],
    steps: [
      { step: 1, text: 'Cook pasta in well-salted boiling water until al dente. Reserve 1 cup pasta water, then drain.', time: '12 min' },
      { step: 2, text: 'Season chicken with salt, pepper, and Italian seasoning. Heat oil in a large skillet over medium-high heat.', time: '2 min' },
      { step: 3, text: 'Sear chicken 5–6 min per side until golden and cooked through. Remove and set aside.', time: '12 min' },
      { step: 4, text: 'In the same pan, sauté garlic 30 seconds. Add sun-dried tomatoes, cook 1 min.', time: '2 min' },
      { step: 5, text: 'Pour in cream, bring to gentle simmer. Add spinach and stir until wilted.', time: '3 min' },
      { step: 6, text: 'Add pasta and chicken back. Toss with parmesan, adding pasta water to loosen. Serve immediately.', time: '2 min' },
    ],
  },
  {
    id: 10, title: 'Caprese Salad',
    cuisine: 'italian', category: 'snacks', time: 8, servings: 2, difficulty: 'Easy',
    rating: 4.7, reviewCount: 89, calories: 220, tags: ['salad', 'vegetarian', 'quick'],
    image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=600&q=80',
    gradient: g('#C84B31', '#4A7C59'),
    macros: { protein: 12, carbs: 8, fat: 16, fiber: 2, sugar: 6, sodium: 280 },
    ingredients: [
      { qty: '250', unit: 'g', name: 'fresh mozzarella, sliced' }, { qty: '300', unit: 'g', name: 'ripe tomatoes, sliced' },
      { qty: '1', unit: 'bunch', name: 'fresh basil leaves' }, { qty: '3', unit: 'tbsp', name: 'extra virgin olive oil' },
      { qty: '1', unit: 'tbsp', name: 'balsamic glaze' }, { qty: '', unit: '', name: 'Flaky sea salt & black pepper' },
    ],
    steps: [
      { step: 1, text: 'Alternate slices of tomato and mozzarella on a plate.', time: '3 min' },
      { step: 2, text: 'Tuck basil leaves between slices.', time: '2 min' },
      { step: 3, text: 'Drizzle olive oil and balsamic glaze. Season generously and serve.', time: '1 min' },
    ],
  },

  /* ── MEXICAN ── */
  {
    id: 3, title: 'Smoky Black Bean Tacos',
    cuisine: 'mexican', category: 'lunch', time: 20, servings: 4, difficulty: 'Easy',
    rating: 4.7, reviewCount: 156, calories: 380, tags: ['vegan', 'tacos', 'quick'],
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80',
    gradient: g('#C87B1A', '#E8A838'),
    macros: { protein: 14, carbs: 55, fat: 10, fiber: 12, sugar: 4, sodium: 540 },
    ingredients: [
      { qty: '2', unit: 'cans', name: 'black beans, drained' }, { qty: '8', unit: '', name: 'small corn tortillas' },
      { qty: '1', unit: '', name: 'avocado, sliced' }, { qty: '1', unit: 'cup', name: 'red cabbage, shredded' },
      { qty: '1', unit: 'tsp', name: 'smoked paprika' }, { qty: '1', unit: 'tsp', name: 'cumin' },
      { qty: '2', unit: 'tbsp', name: 'lime juice' }, { qty: '', unit: '', name: 'Fresh coriander & salsa to serve' },
    ],
    steps: [
      { step: 1, text: 'Heat beans in a pan with smoked paprika, cumin, and a splash of water. Simmer 5 min.', time: '6 min' },
      { step: 2, text: 'Warm tortillas in a dry pan or directly over flame for 30 sec each side.', time: '5 min' },
      { step: 3, text: 'Assemble: beans, cabbage, avocado. Squeeze lime over all. Top with coriander and salsa.', time: '3 min' },
    ],
  },

  /* ── JAPANESE ── */
  {
    id: 4, title: 'Miso Glazed Salmon',
    cuisine: 'japanese', category: 'dinner', time: 25, servings: 2, difficulty: 'Medium',
    rating: 4.9, reviewCount: 302, calories: 460, tags: ['salmon', 'asian', 'healthy'],
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80',
    gradient: g('#B83838', '#D46A6A'),
    macros: { protein: 44, carbs: 18, fat: 22, fiber: 1, sugar: 8, sodium: 720 },
    ingredients: [
      { qty: '2', unit: '180g', name: 'salmon fillets, skin on' }, { qty: '3', unit: 'tbsp', name: 'white miso paste' },
      { qty: '2', unit: 'tbsp', name: 'mirin' }, { qty: '1', unit: 'tbsp', name: 'soy sauce' },
      { qty: '1', unit: 'tbsp', name: 'honey' }, { qty: '1', unit: 'tsp', name: 'sesame oil' },
      { qty: '', unit: '', name: 'Sesame seeds & spring onion to serve' },
    ],
    steps: [
      { step: 1, text: 'Mix miso, mirin, soy sauce, honey and sesame oil to form glaze.', time: '3 min' },
      { step: 2, text: 'Pat salmon dry, coat flesh side generously with glaze. Marinate at least 30 min.', time: '30 min' },
      { step: 3, text: 'Broil on high heat 10–12 min until glaze caramelises and fish is cooked through.', time: '12 min' },
      { step: 4, text: 'Garnish with sesame seeds and sliced spring onion. Serve with steamed rice.', time: '2 min' },
    ],
  },

  /* ── MIDDLE EASTERN ── */
  {
    id: 5, title: 'Golden Lentil Soup',
    cuisine: 'middle-eastern', category: 'lunch', time: 30, servings: 6, difficulty: 'Easy',
    rating: 4.7, reviewCount: 198, calories: 290, tags: ['vegan', 'soup', 'healthy', 'quick'],
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80',
    gradient: g('#8A7A2A', '#C8AA4A'),
    macros: { protein: 16, carbs: 42, fat: 7, fiber: 14, sugar: 5, sodium: 480 },
    ingredients: [
      { qty: '300', unit: 'g', name: 'red lentils, rinsed' }, { qty: '1', unit: 'large', name: 'onion, diced' },
      { qty: '3', unit: 'cloves', name: 'garlic' }, { qty: '1', unit: 'tsp', name: 'ground cumin' },
      { qty: '1', unit: 'tsp', name: 'turmeric' }, { qty: '1/2', unit: 'tsp', name: 'smoked paprika' },
      { qty: '1.2', unit: 'L', name: 'vegetable broth' }, { qty: '1', unit: '', name: 'lemon, juiced' },
      { qty: '2', unit: 'tbsp', name: 'olive oil' },
    ],
    steps: [
      { step: 1, text: 'Sauté onion in oil until soft and golden, 7–8 min. Add garlic, cook 1 min.', time: '9 min' },
      { step: 2, text: 'Add spices, stir 30 seconds until fragrant. Add lentils and broth.', time: '2 min' },
      { step: 3, text: 'Bring to boil, reduce heat, simmer 20 min until lentils are completely soft.', time: '20 min' },
      { step: 4, text: 'Blend partially for creamy texture. Season with lemon juice, salt and pepper.', time: '3 min' },
    ],
  },

  /* ── FRENCH ── */
  {
    id: 6, title: 'Chocolate Lava Cakes',
    cuisine: 'french', category: 'desserts', time: 22, servings: 4, difficulty: 'Medium',
    rating: 4.9, reviewCount: 421, calories: 395, tags: ['dessert', 'chocolate', 'quick'],
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=80',
    gradient: g('#5A3A90', '#9A7AD8'),
    macros: { protein: 7, carbs: 42, fat: 22, fiber: 2, sugar: 32, sodium: 120 },
    ingredients: [
      { qty: '200', unit: 'g', name: 'dark chocolate 70%, chopped' }, { qty: '100', unit: 'g', name: 'unsalted butter' },
      { qty: '4', unit: '', name: 'eggs' }, { qty: '4', unit: '', name: 'egg yolks' },
      { qty: '80', unit: 'g', name: 'caster sugar' }, { qty: '40', unit: 'g', name: 'plain flour' },
      { qty: '', unit: '', name: 'Cocoa powder for dusting' }, { qty: '', unit: '', name: 'Vanilla ice cream to serve' },
    ],
    steps: [
      { step: 1, text: 'Preheat oven 200°C. Butter and dust 4 ramekins with cocoa powder.', time: '5 min' },
      { step: 2, text: 'Melt chocolate and butter together in bowl over simmering water. Cool slightly.', time: '5 min' },
      { step: 3, text: 'Whisk eggs, yolks and sugar until pale and fluffy. Fold into chocolate mixture with flour.', time: '5 min' },
      { step: 4, text: 'Pour into ramekins. Bake 10–12 min — edges set, centre jiggly. Rest 1 min, invert and serve.', time: '12 min' },
    ],
  },

  /* ── MEDITERRANEAN ── */
  {
    id: 7, title: 'Greek Chicken Bowl',
    cuisine: 'mediterranean', category: 'lunch', time: 28, servings: 2, difficulty: 'Easy',
    rating: 4.6, reviewCount: 143, calories: 430, tags: ['chicken', 'bowl', 'healthy'],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
    gradient: g('#4A6888', '#7AAAD8'),
    macros: { protein: 42, carbs: 35, fat: 14, fiber: 6, sugar: 7, sodium: 560 },
    ingredients: [
      { qty: '400', unit: 'g', name: 'chicken thighs, boneless' }, { qty: '1', unit: 'cup', name: 'cooked brown rice or quinoa' },
      { qty: '1', unit: '', name: 'cucumber, diced' }, { qty: '200', unit: 'g', name: 'cherry tomatoes, halved' },
      { qty: '80', unit: 'g', name: 'feta cheese, crumbled' }, { qty: '1/2', unit: '', name: 'red onion, thinly sliced' },
      { qty: '2', unit: 'tbsp', name: 'tzatziki' }, { qty: '2', unit: 'tbsp', name: 'olive oil' },
      { qty: '1', unit: 'tsp', name: 'dried oregano' }, { qty: '', unit: '', name: 'Kalamata olives & pita to serve' },
    ],
    steps: [
      { step: 1, text: 'Marinate chicken with olive oil, oregano, garlic, lemon juice, salt and pepper for 15 min.', time: '15 min' },
      { step: 2, text: 'Grill or pan-cook chicken on medium-high 5–6 min per side. Rest, then slice.', time: '12 min' },
      { step: 3, text: 'Assemble bowls: base of rice/quinoa, top with chicken, cucumber, tomatoes, onion.', time: '3 min' },
      { step: 4, text: 'Add feta, olives and a generous dollop of tzatziki.', time: '1 min' },
    ],
  },

  /* ── INDIAN ── */
  {
    id: 8, title: 'Butter Chicken',
    cuisine: 'indian', category: 'dinner', time: 45, servings: 4, difficulty: 'Medium',
    rating: 4.9, reviewCount: 387, calories: 510, tags: ['chicken', 'curry', 'comfort'],
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&q=80',
    gradient: g('#A33A70', '#D4956A'),
    macros: { protein: 36, carbs: 22, fat: 28, fiber: 3, sugar: 10, sodium: 680 },
    ingredients: [
      { qty: '700', unit: 'g', name: 'chicken breast, cubed' }, { qty: '400', unit: 'ml', name: 'canned crushed tomatoes' },
      { qty: '200', unit: 'ml', name: 'heavy cream' }, { qty: '3', unit: 'tbsp', name: 'butter' },
      { qty: '1', unit: 'large', name: 'onion, finely diced' }, { qty: '4', unit: 'cloves', name: 'garlic' },
      { qty: '1', unit: 'inch', name: 'fresh ginger, grated' }, { qty: '2', unit: 'tsp', name: 'garam masala' },
      { qty: '1', unit: 'tsp', name: 'turmeric' }, { qty: '1', unit: 'tsp', name: 'chilli powder' },
      { qty: '', unit: '', name: 'Naan bread & basmati rice to serve' },
    ],
    steps: [
      { step: 1, text: 'Marinate chicken in yogurt, half the spices and salt for 1 hour (or overnight).', time: '60 min' },
      { step: 2, text: 'Char chicken in a hot pan or grill until lightly charred. Set aside.', time: '8 min' },
      { step: 3, text: 'Melt butter, sauté onion until golden. Add garlic and ginger, cook 2 min.', time: '10 min' },
      { step: 4, text: 'Add remaining spices, cook 1 min. Add tomatoes, simmer 15 min until thickened.', time: '16 min' },
      { step: 5, text: 'Blend sauce smooth. Return to pan with chicken and cream. Simmer 5 min.', time: '8 min' },
    ],
  },

  /* ── AMERICAN ── */
  {
    id: 2, title: 'Avocado & Egg Toast',
    cuisine: 'american', category: 'breakfast', time: 12, servings: 2, difficulty: 'Easy',
    rating: 4.6, reviewCount: 187, calories: 340, tags: ['breakfast', 'quick', 'healthy'],
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80',
    gradient: g('#4A7C59', '#6AAD7E'),
    macros: { protein: 16, carbs: 28, fat: 20, fiber: 8, sugar: 2, sodium: 380 },
    ingredients: [
      { qty: '2', unit: 'slices', name: 'sourdough bread, thick cut' }, { qty: '1', unit: 'large', name: 'ripe avocado' },
      { qty: '2', unit: '', name: 'eggs' }, { qty: '1', unit: 'tbsp', name: 'lemon juice' },
      { qty: '1/4', unit: 'tsp', name: 'chilli flakes' }, { qty: '', unit: '', name: 'Flaky sea salt & black pepper' },
      { qty: '', unit: '', name: 'Microgreens or sprouts to serve' },
    ],
    steps: [
      { step: 1, text: 'Toast bread until golden and sturdy.', time: '3 min' },
      { step: 2, text: 'Mash avocado with lemon juice, salt and pepper until creamy but slightly chunky.', time: '2 min' },
      { step: 3, text: 'Poach or fry eggs to your liking.', time: '4 min' },
      { step: 4, text: 'Spread avocado on toast, top with egg, chilli flakes, and microgreens.', time: '1 min' },
    ],
  },
  {
    id: 9, title: 'Banana Oat Pancakes',
    cuisine: 'american', category: 'breakfast', time: 18, servings: 2, difficulty: 'Easy',
    rating: 4.5, reviewCount: 112, calories: 310, tags: ['breakfast', 'healthy', 'quick'],
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600&q=80',
    gradient: g('#6A5A1A', '#A8845A'),
    macros: { protein: 12, carbs: 48, fat: 9, fiber: 6, sugar: 18, sodium: 180 },
    ingredients: [
      { qty: '2', unit: 'large', name: 'ripe bananas' }, { qty: '1', unit: 'cup', name: 'rolled oats' },
      { qty: '2', unit: '', name: 'eggs' }, { qty: '1', unit: 'tsp', name: 'baking powder' },
      { qty: '1', unit: 'tsp', name: 'vanilla extract' }, { qty: '1/2', unit: 'tsp', name: 'cinnamon' },
      { qty: '', unit: '', name: 'Fresh berries & maple syrup to serve' },
    ],
    steps: [
      { step: 1, text: 'Blend all ingredients until smooth batter forms. Rest 5 min.', time: '5 min' },
      { step: 2, text: 'Heat non-stick pan on medium, lightly grease. Pour small rounds of batter.', time: '2 min' },
      { step: 3, text: 'Cook until bubbles form and edges set, flip and cook 1 min more. Repeat.', time: '10 min' },
      { step: 4, text: 'Stack and serve with fresh berries and maple syrup.', time: '2 min' },
    ],
  },

  /* ══════════════════════════════════
     PAKISTANI RECIPES
  ══════════════════════════════════ */
  {
    id: 11, title: 'Chicken Biryani',
    cuisine: 'pakistani', category: 'dinner', time: 90, servings: 6, difficulty: 'Hard',
    rating: 4.9, reviewCount: 612, calories: 580, tags: ['rice', 'chicken', 'spicy', 'comfort'],
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&q=80',
    gradient: g('#1A5C28', '#4AAA5C'),
    macros: { protein: 38, carbs: 65, fat: 18, fiber: 3, sugar: 4, sodium: 820 },
    ingredients: [
      { qty: '1', unit: 'kg', name: 'basmati rice, soaked 30 min' },
      { qty: '1', unit: 'kg', name: 'chicken, bone-in pieces' },
      { qty: '2', unit: 'large', name: 'onions, thinly sliced' },
      { qty: '400', unit: 'g', name: 'yogurt' },
      { qty: '400', unit: 'g', name: 'tomatoes, chopped' },
      { qty: '4', unit: 'tbsp', name: 'biryani masala' },
      { qty: '1', unit: 'tbsp', name: 'ginger-garlic paste' },
      { qty: '1/2', unit: 'tsp', name: 'saffron dissolved in warm milk' },
      { qty: '4', unit: 'tbsp', name: 'ghee or oil' },
      { qty: '2', unit: '', name: 'bay leaves' },
      { qty: '4', unit: '', name: 'cardamom pods' },
      { qty: '1', unit: '', name: 'cinnamon stick' },
      { qty: '', unit: '', name: 'Fried onions, mint & coriander to garnish' },
    ],
    steps: [
      { step: 1, text: 'Fry sliced onions in ghee until deep golden brown. Remove half for garnish.', time: '15 min' },
      { step: 2, text: 'Marinate chicken with yogurt, biryani masala, ginger-garlic paste, salt. Rest 1 hour.', time: '60 min' },
      { step: 3, text: 'Cook chicken in the same pot with onions and tomatoes until oil separates. Set aside.', time: '20 min' },
      { step: 4, text: 'Boil rice with whole spices (bay, cardamom, cinnamon) until 70% cooked. Drain well.', time: '12 min' },
      { step: 5, text: 'Layer rice over chicken in pot. Drizzle saffron milk and fried onions. Seal and dum-cook on low heat.', time: '25 min' },
      { step: 6, text: 'Gently mix layers from bottom. Serve with raita and salad.', time: '5 min' },
    ],
  },
  {
    id: 12, title: 'Karahi Gosht',
    cuisine: 'pakistani', category: 'dinner', time: 60, servings: 4, difficulty: 'Medium',
    rating: 4.8, reviewCount: 438, calories: 490, tags: ['lamb', 'curry', 'spicy', 'comfort'],
    image: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=600&q=80',
    gradient: g('#8B2500', '#D4602A'),
    macros: { protein: 42, carbs: 12, fat: 30, fiber: 2, sugar: 5, sodium: 740 },
    ingredients: [
      { qty: '800', unit: 'g', name: 'lamb or mutton, bone-in' },
      { qty: '4', unit: 'large', name: 'tomatoes, quartered' },
      { qty: '1', unit: 'tbsp', name: 'ginger-garlic paste' },
      { qty: '2', unit: 'tsp', name: 'red chilli flakes' },
      { qty: '1', unit: 'tsp', name: 'black pepper, coarsely ground' },
      { qty: '1', unit: 'tsp', name: 'cumin seeds' },
      { qty: '3', unit: 'tbsp', name: 'oil' },
      { qty: '2', unit: 'stalks', name: 'fresh ginger, julienned' },
      { qty: '3', unit: '', name: 'green chillies, slit' },
      { qty: '', unit: '', name: 'Fresh coriander & naan to serve' },
    ],
    steps: [
      { step: 1, text: 'Heat oil in a heavy karahi (wok). Add cumin seeds, then lamb. Stir-fry on high heat until browned.', time: '10 min' },
      { step: 2, text: 'Add ginger-garlic paste, red chilli, black pepper. Stir 2 min until fragrant.', time: '3 min' },
      { step: 3, text: 'Add tomatoes, cover and cook on medium heat 30 min until meat is tender and oil separates.', time: '30 min' },
      { step: 4, text: 'Remove lid, increase heat to dry out excess moisture and intensify the sauce.', time: '10 min' },
      { step: 5, text: 'Finish with julienned ginger, green chillies, and coriander. Serve with fresh naan.', time: '2 min' },
    ],
  },
  {
    id: 13, title: 'Nihari',
    cuisine: 'pakistani', category: 'breakfast', time: 240, servings: 6, difficulty: 'Hard',
    rating: 4.9, reviewCount: 501, calories: 620, tags: ['beef', 'slow-cook', 'comfort', 'breakfast'],
    image: 'https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=600&q=80',
    gradient: g('#6B2A0A', '#C86030'),
    macros: { protein: 52, carbs: 18, fat: 38, fiber: 2, sugar: 3, sodium: 920 },
    ingredients: [
      { qty: '1', unit: 'kg', name: 'beef shank, bone-in' },
      { qty: '4', unit: 'tbsp', name: 'nihari masala' },
      { qty: '1', unit: 'tbsp', name: 'ginger-garlic paste' },
      { qty: '4', unit: 'tbsp', name: 'ghee or oil' },
      { qty: '3', unit: 'tbsp', name: 'whole wheat flour (for thickening)' },
      { qty: '1.5', unit: 'L', name: 'water' },
      { qty: '1', unit: 'tbsp', name: 'dried fenugreek leaves' },
      { qty: '', unit: '', name: 'Fried onions, lemon wedges, ginger strips, green chillies, naan to serve' },
    ],
    steps: [
      { step: 1, text: 'Heat ghee in a heavy pot. Add ginger-garlic paste, cook 1 min. Add nihari masala, stir 30 sec.', time: '3 min' },
      { step: 2, text: 'Add beef, coat well with spices. Brown on all sides on high heat.', time: '8 min' },
      { step: 3, text: 'Add water, bring to boil. Reduce heat to very low, cook 3 hours until meat falls off bone.', time: '180 min' },
      { step: 4, text: 'Mix flour with 4 tbsp water into a paste. Slowly stir into stew to thicken. Simmer 20 min.', time: '25 min' },
      { step: 5, text: 'Finish with dried fenugreek. Serve with garnishes in separate bowls so guests can customise.', time: '5 min' },
    ],
  },
  {
    id: 14, title: 'Chicken Karahi',
    cuisine: 'pakistani', category: 'dinner', time: 40, servings: 4, difficulty: 'Medium',
    rating: 4.8, reviewCount: 329, calories: 420, tags: ['chicken', 'curry', 'quick', 'spicy'],
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80',
    gradient: g('#2D7A3A', '#5AAA6A'),
    macros: { protein: 40, carbs: 10, fat: 24, fiber: 2, sugar: 4, sodium: 680 },
    ingredients: [
      { qty: '1', unit: 'kg', name: 'chicken, bone-in pieces' },
      { qty: '4', unit: 'large', name: 'tomatoes, chopped' },
      { qty: '1', unit: 'tbsp', name: 'ginger-garlic paste' },
      { qty: '1', unit: 'tsp', name: 'red chilli powder' },
      { qty: '1', unit: 'tsp', name: 'coriander powder' },
      { qty: '1/2', unit: 'tsp', name: 'turmeric' },
      { qty: '1/2', unit: 'tsp', name: 'garam masala' },
      { qty: '3', unit: 'tbsp', name: 'oil' },
      { qty: '1', unit: 'cup', name: 'yogurt' },
      { qty: '', unit: '', name: 'Green chillies, ginger strips & coriander to garnish' },
    ],
    steps: [
      { step: 1, text: 'Heat oil in a karahi on high heat. Add chicken pieces and sear until golden, 5–7 min.', time: '7 min' },
      { step: 2, text: 'Add ginger-garlic paste, stir 1 min. Add all dry spices, stir 30 sec.', time: '2 min' },
      { step: 3, text: 'Add tomatoes, cook on medium-high heat until tomatoes break down and oil separates, 15 min.', time: '15 min' },
      { step: 4, text: 'Stir in yogurt, cook 5 more min. Add garam masala, adjust salt.', time: '6 min' },
      { step: 5, text: 'Garnish with ginger strips, green chillies, and fresh coriander. Serve with naan.', time: '2 min' },
    ],
  },
  {
    id: 15, title: 'Halwa Puri with Chana',
    cuisine: 'pakistani', category: 'breakfast', time: 50, servings: 4, difficulty: 'Medium',
    rating: 4.9, reviewCount: 284, calories: 680, tags: ['breakfast', 'comfort', 'vegetarian', 'traditional'],
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80',
    gradient: g('#C87B1A', '#E8A838'),
    macros: { protein: 18, carbs: 88, fat: 28, fiber: 10, sugar: 24, sodium: 540 },
    ingredients: [
      { qty: '2', unit: 'cups', name: 'semolina (suji)' },
      { qty: '1', unit: 'cup', name: 'sugar' },
      { qty: '4', unit: 'tbsp', name: 'ghee' },
      { qty: '2', unit: 'cups', name: 'all-purpose flour (for puris)' },
      { qty: '1', unit: 'can', name: 'chickpeas (chana), drained' },
      { qty: '2', unit: '', name: 'tomatoes, chopped' },
      { qty: '1', unit: 'tsp', name: 'cumin seeds' },
      { qty: '1', unit: 'tsp', name: 'chana masala' },
      { qty: '', unit: '', name: 'Oil for deep-frying' },
      { qty: '', unit: '', name: 'Cardamom and saffron for halwa' },
    ],
    steps: [
      { step: 1, text: 'For halwa: heat ghee, roast semolina on medium until golden and fragrant, 8 min. Add 3 cups water + sugar, stir until thick.', time: '15 min' },
      { step: 2, text: 'For chana: sauté cumin in oil, add tomatoes, chana masala, chickpeas. Cook 15 min.', time: '18 min' },
      { step: 3, text: 'For puris: knead dough with flour, water, salt, 1 tsp oil. Rest 20 min.', time: '22 min' },
      { step: 4, text: 'Roll puris thin, deep-fry in hot oil until puffed and golden. Drain on paper.', time: '12 min' },
      { step: 5, text: 'Serve halwa, chana and puris together with achaar (pickle) on the side.', time: '2 min' },
    ],
  },
  {
    id: 16, title: 'Beef Seekh Kebab',
    cuisine: 'pakistani', category: 'dinner', time: 35, servings: 4, difficulty: 'Medium',
    rating: 4.7, reviewCount: 197, calories: 380, tags: ['beef', 'kebab', 'grilled', 'quick'],
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80',
    gradient: g('#5A1A00', '#A84020'),
    macros: { protein: 36, carbs: 8, fat: 22, fiber: 2, sugar: 2, sodium: 560 },
    ingredients: [
      { qty: '500', unit: 'g', name: 'minced beef (double-minced)' },
      { qty: '1', unit: 'large', name: 'onion, finely grated' },
      { qty: '2', unit: 'tbsp', name: 'fresh coriander, chopped' },
      { qty: '1', unit: 'tbsp', name: 'fresh mint, chopped' },
      { qty: '2', unit: 'tsp', name: 'cumin powder' },
      { qty: '1', unit: 'tsp', name: 'red chilli powder' },
      { qty: '1', unit: 'tsp', name: 'garam masala' },
      { qty: '1', unit: 'tsp', name: 'ginger-garlic paste' },
      { qty: '', unit: '', name: 'Raita, sliced onions & lemon to serve' },
    ],
    steps: [
      { step: 1, text: 'Squeeze excess moisture from grated onion. Mix all ingredients with mince until combined.', time: '8 min' },
      { step: 2, text: 'Chill mixture 30 min. Mould around flat metal skewers into sausage shapes.', time: '30 min' },
      { step: 3, text: 'Grill over charcoal or in oven at 220°C for 12–15 min, turning halfway, until charred.', time: '15 min' },
      { step: 4, text: 'Serve with raita, sliced raw onion rings, mint chutney and lemon wedges.', time: '2 min' },
    ],
  },
  {
    id: 17, title: 'Daal Makhani',
    cuisine: 'pakistani', category: 'lunch', time: 55, servings: 4, difficulty: 'Easy',
    rating: 4.6, reviewCount: 156, calories: 340, tags: ['lentil', 'vegetarian', 'comfort'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80',
    gradient: g('#4A2800', '#8A5020'),
    macros: { protein: 16, carbs: 44, fat: 14, fiber: 12, sugar: 5, sodium: 480 },
    ingredients: [
      { qty: '200', unit: 'g', name: 'black lentils (urad daal), soaked overnight' },
      { qty: '50', unit: 'g', name: 'kidney beans, soaked overnight' },
      { qty: '2', unit: 'tbsp', name: 'butter' },
      { qty: '1', unit: 'tbsp', name: 'oil' },
      { qty: '1', unit: 'large', name: 'onion, finely chopped' },
      { qty: '200', unit: 'g', name: 'tomato puree' },
      { qty: '1', unit: 'tbsp', name: 'ginger-garlic paste' },
      { qty: '1', unit: 'tsp', name: 'red chilli powder' },
      { qty: '100', unit: 'ml', name: 'heavy cream' },
      { qty: '', unit: '', name: 'Butter to finish, naan to serve' },
    ],
    steps: [
      { step: 1, text: 'Pressure cook soaked lentils and kidney beans with salt and water until soft, 20 min.', time: '22 min' },
      { step: 2, text: 'Heat butter + oil, sauté onion until golden. Add ginger-garlic paste, cook 2 min.', time: '12 min' },
      { step: 3, text: 'Add tomato puree and chilli powder. Cook 8 min until oil separates.', time: '9 min' },
      { step: 4, text: 'Add cooked daal to the masala. Simmer on low heat 15 min, stirring often.', time: '15 min' },
      { step: 5, text: 'Stir in cream and a knob of butter. Serve with a swirl of cream and fresh naan.', time: '2 min' },
    ],
  },
  {
    id: 18, title: 'Samosa Chaat',
    cuisine: 'pakistani', category: 'snacks', time: 20, servings: 4, difficulty: 'Easy',
    rating: 4.8, reviewCount: 244, calories: 310, tags: ['snack', 'street food', 'quick', 'vegetarian'],
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80',
    gradient: g('#8A6A00', '#C8A020'),
    macros: { protein: 10, carbs: 42, fat: 14, fiber: 6, sugar: 12, sodium: 520 },
    ingredients: [
      { qty: '4', unit: '', name: 'samosas (store-bought or homemade)' },
      { qty: '1', unit: 'can', name: 'chickpeas, drained and rinsed' },
      { qty: '1', unit: 'cup', name: 'plain yogurt, whisked smooth' },
      { qty: '3', unit: 'tbsp', name: 'tamarind chutney' },
      { qty: '3', unit: 'tbsp', name: 'green mint chutney' },
      { qty: '1', unit: 'tsp', name: 'chaat masala' },
      { qty: '1', unit: 'tsp', name: 'cumin powder, roasted' },
      { qty: '', unit: '', name: 'Sev (crispy noodles), pomegranate seeds & coriander to garnish' },
    ],
    steps: [
      { step: 1, text: 'Crush or break samosas into large pieces on a serving plate.', time: '2 min' },
      { step: 2, text: 'Top generously with chickpeas.', time: '1 min' },
      { step: 3, text: 'Drizzle yogurt, tamarind chutney, and mint chutney over everything.', time: '2 min' },
      { step: 4, text: 'Sprinkle chaat masala, cumin, sev, pomegranate and coriander. Serve immediately.', time: '2 min' },
    ],
  },
];

export const featuredRecipe = allRecipes[0];
export const trendingRecipes = [allRecipes[3], allRecipes[7], allRecipes[0], allRecipes[5]];
export const quickRecipes = allRecipes.filter(r => r.time <= 25);
export const pakistaniRecipes = allRecipes.filter(r => r.cuisine === 'pakistani');

export const sampleReviews = [
  { id: 1, name: 'Sofia M.', initial: 'S', rating: 5, date: '2 days ago', comment: 'Absolutely incredible! Made this for the family and everyone asked for seconds. The sauce is perfectly balanced.' },
  { id: 2, name: 'James R.', initial: 'J', rating: 4, date: '1 week ago', comment: 'Really good recipe. I added a pinch of chilli for heat. Took a bit longer than stated but worth every minute.' },
  { id: 3, name: 'Priya K.', initial: 'P', rating: 5, date: '2 weeks ago', comment: 'This is now my go-to weekend recipe. Simple ingredients, restaurant-quality result. Highly recommend!' },
];

export const weekPlan = {
  Mon: { breakfast: allRecipes[7], lunch: null, dinner: allRecipes[0] },
  Tue: { breakfast: null, lunch: allRecipes[2], dinner: allRecipes[10] },
  Wed: { breakfast: allRecipes[14], lunch: null, dinner: allRecipes[11] },
  Thu: { breakfast: null, lunch: allRecipes[4], dinner: allRecipes[3] },
  Fri: { breakfast: allRecipes[7], lunch: allRecipes[6], dinner: allRecipes[13] },
  Sat: { breakfast: null, lunch: null, dinner: allRecipes[5] },
  Sun: { breakfast: allRecipes[14], lunch: allRecipes[17], dinner: allRecipes[10] },
};

export const userStats = {
  recipiesTried: 12, savedRecipes: 7, weeklyMeals: 4, streak: 5,
};

export const activityFeed = [
  { id: 1, action: 'Cooked', recipe: 'Chicken Biryani', date: 'Today', rating: 5 },
  { id: 2, action: 'Saved', recipe: 'Miso Glazed Salmon', date: 'Yesterday', rating: null },
  { id: 3, action: 'Cooked', recipe: 'Karahi Gosht', date: '3 days ago', rating: 5 },
  { id: 4, action: 'Cooked', recipe: 'Smoky Black Bean Tacos', date: '5 days ago', rating: 4 },
  { id: 5, action: 'Saved', recipe: 'Halwa Puri with Chana', date: '1 week ago', rating: null },
];

export const achievements = [
  { id: 1, icon: '🏅', label: 'First Recipe', earned: true },
  { id: 2, icon: '🔥', label: '5 Day Streak', earned: true },
  { id: 3, icon: '🥦', label: 'Veggie Week', earned: false },
  { id: 4, icon: '👨‍🍳', label: 'Master Chef', earned: false },
];

export const mockSnapHistory = [
  {
    id: 's1',
    label: 'Today, 9:15 AM',
    ingredients: ['chicken', 'tomatoes', 'onion', 'garlic'],
    diet: 'All', meal: 'Dinner', servings: 2,
    recipeIds: [14, 1, 4],
  },
  {
    id: 's2',
    label: 'Yesterday, 1:40 PM',
    ingredients: ['eggs', 'cheese', 'bell pepper', 'mushroom'],
    diet: 'Vegetarian', meal: 'Breakfast', servings: 1,
    recipeIds: [15, 7, 9],
  },
  {
    id: 's3',
    label: 'May 9, 7:00 PM',
    ingredients: ['beef', 'ginger', 'onion', 'spices'],
    diet: 'All', meal: 'Dinner', servings: 4,
    recipeIds: [12, 16, 13],
  },
  {
    id: 's4',
    label: 'May 7, 12:00 PM',
    ingredients: ['salmon', 'lemon', 'garlic', 'butter'],
    diet: 'Keto', meal: 'Lunch', servings: 2,
    recipeIds: [3, 6, 10],
  },
];

export function getCuisineEmoji(cuisine) {
  const map = {
    italian: '🍝', mexican: '🌮', asian: '🍜', mediterranean: '🫒',
    indian: '🍛', american: '🍔', french: '🥐', japanese: '🍱',
    'middle-eastern': '🥙', pakistani: '🫓',
  };
  return map[cuisine] || '🍽️';
}

export function getCuisineInfo(id) {
  return cuisines.find(c => c.id === id);
}
