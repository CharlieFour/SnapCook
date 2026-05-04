import { GoogleGenerativeAI } from '@google/generative-ai';
import sharp from 'sharp';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Detects ingredients from an image using Google Gemini 1.5 Flash Vision.
 * @param {string} imagePath - The local path to the image file.
 * @returns {Promise<string[]>} - A list of detected unique ingredients.
 */
export async function detectIngredients(imagePath) {
    try {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error('GEMINI_API_KEY is not set in the .env file');
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // Optimize image using sharp to keep it under 768px (saves Gemini tokens)
        const imageBuffer = await sharp(imagePath)
            .resize({
                width: 768,
                height: 768,
                fit: 'inside', // Maintains aspect ratio, limits max dimension to 768px
                withoutEnlargement: true // Doesn't upsize small images
            })
            .jpeg({ quality: 80 }) // Compress to save bandwidth
            .toBuffer();

        const mimeType = 'image/jpeg';

        const imagePart = {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType
            }
        };

        const prompt = "Analyze this image carefully and identify all the raw food ingredients present (e.g., tomato, onion, potato, ginger, garlic, red chilli). Reply ONLY with a simple comma-separated list of the ingredients you see. Do not include introductory text, categories, or descriptions.";

        const result = await model.generateContent([prompt, imagePart]);
        const responseText = result.response.text();

        // Clean up the response
        const ingredients = responseText
            .split(',')
            .map(item => item.trim().toLowerCase())
            // Filter out empty strings or accidental newlines
            .filter(item => item.length > 0 && !item.includes('\n'));

        const uniqueIngredients = [...new Set(ingredients)];

        return uniqueIngredients;
    } catch (error) {
        console.error('Error detecting ingredients:', error.message);
        throw error;
    }
}
