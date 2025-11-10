export interface EmotionResponse {
  emotion: string;
  voice: string;
}

/**
 * Detects emotion by calling your FastAPI backend.
 * The backend securely uses the OpenAI API key.
 */
export async function detectEmotion(
  text: string
): Promise<EmotionResponse> {
  try {
    const formData = new FormData();
    formData.append("text", text);

    const response = await fetch("http://127.0.0.1:8000/detect-emotion", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.error("❌ Emotion detection API error:", response.status);
      return { emotion: "neutral", voice: "en-US-JennyNeural" };
    }

    const data = await response.json();
    return data as EmotionResponse;
  } catch (err) {
    console.error("❌ Emotion detection failed:", err);
    return { emotion: "neutral", voice: "en-US-JennyNeural" };
  }
}
