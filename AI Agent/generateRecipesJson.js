import fs from 'fs';
import { allRecipes } from '../frontend/src/data/mockData.js';

fs.writeFileSync('recipes.json', JSON.stringify(allRecipes, null, 2));
console.log('Recipes JSON generated successfully!');
