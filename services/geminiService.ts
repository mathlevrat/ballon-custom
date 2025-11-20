
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this context, we assume the API key is set.
  console.warn("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateTextSuggestions = async (occasion: string): Promise<string[]> => {
  if (!API_KEY) return ["API Key not configured."];
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate 5 short, fun, and creative messages for a balloon for a "${occasion}" occasion.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
        },
      },
    });

    if (response.text) {
        const jsonResponse = JSON.parse(response.text);
        return jsonResponse.suggestions || [];
    }
    return [];

  } catch (error) {
    console.error("Error generating text suggestions:", error);
    return ["Error fetching ideas."];
  }
};

export const generateColorPalette = async (theme: string): Promise<string[]> => {
    if (!API_KEY) return ["#FFFFFF"];
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate a harmonious color palette of 5 hex codes for a balloon based on the theme: "${theme}".`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        colors: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                                description: "A color in hex format, e.g., #RRGGBB"
                            }
                        }
                    }
                }
            }
        });

        if (response.text) {
            const jsonResponse = JSON.parse(response.text);
            return jsonResponse.colors || [];
        }
        return [];
    } catch (error) {
        console.error("Error generating color palette:", error);
        return ["#CCCCCC"];
    }
};
