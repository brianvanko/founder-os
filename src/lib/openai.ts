import OpenAI from "openai";

// Lazy initialization - only create client when needed
let _openai: OpenAI | null = null;

export const getOpenAIClient = () => {
  if (!_openai) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "OpenAI API key not configured. Please set OPENAI_API_KEY environment variable."
      );
    }
    _openai = new OpenAI({ apiKey });
  }
  return _openai;
};

export const AI_MODEL = "gpt-4o-mini"; // Cost-effective model for insights
