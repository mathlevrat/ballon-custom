
import { GoogleGenAI, Type } from "@google/genai";

export const generateTextSuggestions = async (occasion: string): Promise<string[]> => {
  const API_KEY = process.env.API_KEY;
  if (!API_KEY) {
    console.warn("API_KEY environment variable not set.");
    return ["API Key not configured."];
  }
  const ai = new GoogleGenAI({ apiKey: API_KEY });

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
    const API_KEY = process.env.API_KEY;
    if (!API_KEY) {
      console.warn("API_KEY environment variable not set.");
      return ["#CCCCCC"];
    }
    const ai = new GoogleGenAI({ apiKey: API_KEY });

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
