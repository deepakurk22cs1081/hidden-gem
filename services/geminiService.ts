
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Suggestions will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  if (hour < 21) return 'evening';
  return 'late night';
}

export const generateFoodSuggestion = async (): Promise<string> => {
  if (!API_KEY) {
    return "AI suggestions are offline. How about trying a local favorite?";
  }
  try {
    const timeOfDay = getGreeting();
    const prompt = `Generate a short, fun, and creative food suggestion for the ${timeOfDay}. Be enthusiastic and keep it under 20 words. Example: 'It's lunch time! How about a spicy ramen bowl to power through your afternoon?'`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating suggestion:", error);
    return "Couldn't get an AI suggestion right now. Maybe try something new nearby?";
  }
};
