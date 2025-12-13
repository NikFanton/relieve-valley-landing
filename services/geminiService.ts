import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using gemini-2.5-flash-image for image generation and editing tasks
const MODEL_NAME = 'gemini-2.5-flash-image';

export interface ImageGenerationResult {
  imageUrl: string | null;
  error?: string;
}

export const generateDogVariant = async (
  base64Image: string,
  prompt: string
): Promise<ImageGenerationResult> => {
  try {
    // Remove header if present (e.g., "data:image/png;base64,")
    const cleanBase64 = base64Image.split(',')[1] || base64Image;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: 'image/jpeg', // Assuming jpeg/png input, model is flexible
            },
          },
          {
            text: `Create a cartoon vector art illustration of this dog character. Keep the colors and markings exactly the same. ${prompt}. The style should be cute, flat vector art with thick outlines, suitable for a mobile game app. White background.`,
          },
        ],
      },
      config: {
        // Nano banana models don't support responseMimeType/responseSchema
        // Just rely on the model returning an image part
      }
    });

    // Iterate through parts to find the image
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          const mimeType = part.inlineData.mimeType || 'image/png';
          return {
            imageUrl: `data:${mimeType};base64,${part.inlineData.data}`,
          };
        }
      }
    }

    return { imageUrl: null, error: "No image generated." };

  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    return { imageUrl: null, error: error instanceof Error ? error.message : "Unknown error" };
  }
};

export const generateInitialCharacter = async (): Promise<ImageGenerationResult> => {
   try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            text: "Create a cute cartoon mascot for a relaxation app. It is a golden yellow puppy with floppy grey ears, smiling happily. Flat vector art style, thick outlines, pastel colors. White background.",
          },
        ],
      },
    });

     const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          const mimeType = part.inlineData.mimeType || 'image/png';
          return {
            imageUrl: `data:${mimeType};base64,${part.inlineData.data}`,
          };
        }
      }
    }
    return { imageUrl: null, error: "No image generated." };
   } catch (error) {
     return { imageUrl: null, error: "Failed to generate initial character."}
   }
}