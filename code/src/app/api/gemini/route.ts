// /app/api/gemini/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { imageBase64 } = await req.json();

  const apiKey = process.env.GEMINI_API_KEY!;
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=' + apiKey;

  const prompt = {
    contents: [
      {
        parts: [
          {
            text: `次のレシート画像から、商品名・価格・店舗名・合計金額を読み取ってJSONで返してください。出力形式:
{
  "store": "〇〇スーパー",
  "items": [
    { "name": "パン", "price": 120 },
    { "name": "コーヒー", "price": 180 }
  ],
  "total": 300
}`,
          },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: imageBase64.replace(/^data:image\/\w+;base64,/, ''),
            },
          },
        ],
      },
    ],
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(prompt),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    const geminiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return NextResponse.json({ result: geminiResponse });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'Gemini処理失敗' }, { status: 500 });
  }
}
