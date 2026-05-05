import fs from 'fs';
import path from 'path';

/**
 * Loads recipes from the local dataset
 * @returns {Array} Array of recipe objects
 */
function loadRecipes() {
    const recipesPath = path.join(process.cwd(), 'recipes.json');
    const data = fs.readFileSync(recipesPath, 'utf8');
    return JSON.parse(data);
}

/**
 * Matches detected ingredients against the recipe dataset
 * @param {string[]} userIngredients - The ingredients detected by the AI
 * @returns {Array} Top 3 matching recipes with scores and missing ingredients
 */
export function generateRecipes(userIngredients) {
    const recipes = loadRecipes();

    // Standardize user ingredients for easy matching
    const userSet = new Set(userIngredients.map(ing => ing.toLowerCase()));

    const scoredRecipes = recipes.map(recipe => {
        const recipeIngredients = recipe.ingredients.map(ing => ing.name.toLowerCase());
        
        let matchedCount = 0;
        let missing = [];

        for (const reqIng of recipeIngredients) {
            // Basic matching (e.g. if user has "brown onion" and recipe needs "onion")
            // We use simple substring matching to be more flexible
            const isMatched = Array.from(userSet).some(userIng => 
                userIng.includes(reqIng) || reqIng.includes(userIng)
            );

            if (isMatched) {
                matchedCount++;
            } else {
                missing.push(reqIng);
            }
        }

        const matchScore = matchedCount / recipeIngredients.length;

        return {
            ...recipe,
            matchScore: matchScore,
            matchedCount: matchedCount,
            totalNeeded: recipeIngredients.length,
            missing: missing
        };
    });

    // Sort by matchScore descending
    scoredRecipes.sort((a, b) => b.matchScore - a.matchScore);

    // Return Top 3 recipes
    return scoredRecipes.slice(0, 3);
}
