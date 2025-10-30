import { GoogleGenAI } from "@google/genai";

// This check is to prevent errors in environments where process.env is not defined.
const apiKey = typeof process !== 'undefined' && process.env && process.env.API_KEY
  ? process.env.API_KEY
  : "";

if (!apiKey) {
    console.warn("API_KEY environment variable not found. Using a mock response.");
}

const ai = new GoogleGenAI({ apiKey });

export const generateNotificationMessage = async (professorName: string, studentName: string): Promise<string> => {
  if (!apiKey) {
    // Return a mock response if API key is not available
    return new Promise(resolve => setTimeout(() => resolve(`Hello ${studentName}, ${professorName} is ready to see you now. Please come in.`), 500));
  }
  
  const model = 'gemini-2.5-flash';
  const prompt = `Generate a very short, friendly, and professional text message for a student named "${studentName}" to let them know that ${professorName} is ready for their appointment now. The message must be concise and sound like an SMS notification.`;

  try {
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error(`Error generating notification via ${model}:`, error);
    // Provide a fallback message in case of an API error
    return `Hello ${studentName}, ${professorName} is ready to see you now.`;
  }
};