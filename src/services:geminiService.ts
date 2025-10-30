import { GoogleGenAI } from "@google/genai";

// Fix: Per coding guidelines, initialize GoogleGenAI with process.env.API_KEY.
// This resolves the TypeScript error with `import.meta.env` and adheres to the requirement
// that the API key is provided by the execution environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateNotificationMessage = async (professorName: string, studentName: string): Promise<string> => {
  // Fix: Per coding guidelines, removed mock/fallback logic for a missing API key.
  // The application must assume the API key is always available.
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
