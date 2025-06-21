import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";
import { structuredOutputSetting } from "@/lib/structuredOutputSetting";
import toBlob from "@/lib/toBlob";

export const dynamic = "force-dynamic"; // 動的ルートとして扱う（ISR回避）

export async function POST(req: Request) {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "❌ APIキーが設定されていません。" },
      { status: 500 }
    );
  }

  try {
    const { base64ImageFile, mimeType } = await req.json();

    const ai = new GoogleGenAI({ apiKey });

    const file = await ai.files.upload({
      file: toBlob(base64ImageFile, mimeType || "image/jpeg"),
      config: { mimeType: mimeType || "image/jpeg" },
    });

    if (!file?.uri || !file?.mimeType || !file?.name) {
      throw new Error("ファイルのアップロードに失敗しました。");
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: createUserContent([
        createPartFromUri(file.uri, file.mimeType),
        "レシートの内容を読み取ってください。 カテゴリーは「日用品」「交際費」「趣味」「食費」のいずれかで分類してください。レシートの内容はJSON形式で返してください。",
      ]),
      config: {
        responseMimeType: "application/json",
        responseSchema: structuredOutputSetting,
      },
    });

    await ai.files.delete({ name: file.name });

    return Response.json({ result: response.text || "No result." });
  } catch (error: unknown) {
    console.error("Gemini API エラー:", error);
    let errorMessage = "未知のエラー";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
    });
  }
}
