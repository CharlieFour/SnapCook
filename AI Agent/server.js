import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { detectIngredients } from './agent.js';
import { generateRecipes } from './recipeEngine.js';
import fs from 'fs';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

// Set up CORS
app.use(cors());
app.use(express.json());

// Set up multer for temporary file uploads
const upload = multer({ dest: 'uploads/' });

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// POST /api/snap
app.post('/api/snap', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const imagePath = req.file.path;

    // 1. Detect ingredients using AI
    console.log('Detecting ingredients for image:', imagePath);
    const ingredients = await detectIngredients(imagePath);
    console.log('Detected ingredients:', ingredients);

    // 2. Generate/Match recipes based on ingredients
    const recipes = generateRecipes(ingredients);
    
    // Clean up uploaded file
    fs.unlinkSync(imagePath);

    // 3. Return recipes (which now include full macros and details from the JSON database)
    res.json({
      success: true,
      ingredients,
      recipes
    });

  } catch (error) {
    console.error('Error in /api/snap:', error);
    // Cleanup on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: error.message || 'Failed to process image' });
  }
});

app.listen(port, () => {
  console.log(`SnapCook AI Agent Backend running on http://localhost:${port}`);
});
