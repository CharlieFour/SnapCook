import { detectIngredients } from './agent.js';
import { generateRecipes } from './recipeEngine.js';
import fs from 'fs';
import path from 'path';

async function runTest() {
    // Check if an image path was provided via command line arguments
    const args = process.argv.slice(2);
    let imagePath = args[0];

    // If no argument provided, look for a default test image
    if (!imagePath) {
        imagePath = path.join(process.cwd(), 'sample.jpg');
        console.log(`No image path provided. Defaulting to ${imagePath}`);
    }

    if (!fs.existsSync(imagePath)) {
        console.error(`❌ Error: Image file not found at ${imagePath}`);
        console.log('Please provide a valid image path or place a "sample.jpg" in this folder.');
        console.log('Usage: node test.js [path/to/image.jpg]');
        process.exit(1);
    }

    console.log('🔍 Analyzing image for ingredients...');
    console.log('Using Model: Google Gemini 2.5 Flash');

    try {
        const ingredients = await detectIngredients(imagePath);
        
        if (ingredients.length === 0) {
            console.log('⚠️ No ingredients detected.');
        } else {
            console.log('✅ Detected Ingredients:');
            ingredients.forEach((ing, index) => {
                console.log(`  ${index + 1}. ${ing}`);
            });

            console.log('\n======================================');
            console.log('🍽️  GENERATING RECIPE RECOMMENDATIONS');
            console.log('======================================');
            
            const recommendations = generateRecipes(ingredients);

            recommendations.forEach((recipe, index) => {
                console.log(`\nOption ${index + 1}: ${recipe.name}`);
                console.log(`Match Score: ${(recipe.matchScore * 100).toFixed(0)}%`);
                if (recipe.missing.length > 0) {
                    console.log(`Missing Ingredients: ${recipe.missing.join(', ')}`);
                } else {
                    console.log(`Missing Ingredients: None! You have everything!`);
                }
            });
            console.log('\n');
        }
    } catch (error) {
        console.error('❌ Failed to detect ingredients.');
        // The error message is already logged by the agent
    }
}

runTest();
