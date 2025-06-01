import Image from 'next/image';
import { promises as fs } from 'fs';
import path from 'path';
import postGemini from '@/lib/postGemini';

const imageFileName = "/sample_image2.jpg";

async function getImageAsBase64() {
  try {
    const imagePath = path.join(process.cwd(), 'public', imageFileName);
    const imageBuffer = await fs.readFile(imagePath);
    const base64Image = imageBuffer.toString('base64');
    return base64Image;
  } catch (error) {
    console.error('画像の読み込みエラー:', error);
    return null;
  }
}

export default async function AiTestPage() {
  let caption = 'キャプションを取得中...';
  try {
    const base64Image = await getImageAsBase64();
    if (base64Image) {
      caption = await postGemini(base64Image, 'image/jpeg');
    } else {
      caption = '画像の読み込みに失敗しました';
    }
  } catch (error) {
    console.error('Gemini APIエラー:', error);
    caption = 'キャプションの取得に失敗しました';
  }

  return (
    <div>
      <h1>これはテストページです</h1>
      <div>
        <Image src={imageFileName} alt="サンプル画像" width={400} height={300} />
        <div style={{ marginTop: '20px' }}>
          <h2>Gemini APIによるキャプション:</h2>
          <p>{caption}</p>
        </div>
      </div>
    </div>
  );
}
