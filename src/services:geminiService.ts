import { GoogleGenAI } from "@google/genai";

// Fix: Corrected API key initialization to align with coding guidelines.
// The API key is now sourced from `process.env.API_KEY`, assuming it's available in the execution environment.
// This resolves the TypeScript error related to `import.meta.env`.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateNotificationMessage = async (professorName: string, studentName: string): Promise<string> => {
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
