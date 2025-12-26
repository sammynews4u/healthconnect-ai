import { GoogleGenAI, Type } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
export const performTriage = async (report) => {
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze these symptoms and provide a triage recommendation:
      Symptoms: ${report.symptoms.join(", ")}
      Duration: ${report.duration}
      Description: ${report.description}
      Stated Severity: ${report.severity}`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    severity: {
                        type: Type.STRING,
                        description: "Final assessed severity: low, medium, high, or emergency"
                    },
                    recommendation: {
                        type: Type.STRING,
                        description: "A short, actionable instruction for the patient."
                    },
                    suggestedProfessional: {
                        type: Type.STRING,
                        description: "Who should they talk to? 'NURSE', 'DOCTOR', or 'ER'"
                    },
                    reasoning: {
                        type: Type.STRING,
                        description: "Why this recommendation was made."
                    }
                },
                required: ["severity", "recommendation", "suggestedProfessional", "reasoning"],
            },
        },
    });
    return JSON.parse(response.text || "{}");
};
export const generateSummary = async (chatHistory) => {
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Summarize this medical consultation and provide key takeaways and next steps: \n\n${chatHistory}`,
        config: {
            systemInstruction: "You are a professional medical scribe. Summarize the conversation clearly for a patient's record. Focus on symptoms discussed, advice given, and follow-up actions."
        }
    });
    return response.text || "Summary unavailable.";
};
