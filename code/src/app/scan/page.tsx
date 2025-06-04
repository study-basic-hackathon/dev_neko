"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import ReactCrop, { centerCrop, makeAspectCrop, Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { HiCamera, HiLocationMarker, HiArrowRight, HiX } from "react-icons/hi";

export default function Receipts() {
  const [hasImage, setHasImage] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [isCropping, setIsCropping] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Start camera function
  const startCamera = useCallback(async () => {
    try {
      // まずカメラアクティブ状態にして、UIを切り替える
      setIsCameraActive(true);

      console.log("カメラへのアクセスをリクエスト中...");

      // 少し遅延させてからカメラにアクセス（UIの切り替えを先に行うため）
      setTimeout(async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: "environment",
              width: { ideal: 1280 },
              height: { ideal: 720 },
            },
            audio: false,
          });

          console.log("カメラストリームを取得しました");

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch((e) => {
              console.error("ビデオの再生に失敗しました:", e);
            });

            console.log("ビデオ要素にストリームをセットしました");
          } else {
            console.error("ビデオ要素が見つかりません");
          }
        } catch (innerErr) {
          console.error("カメラアクセス中にエラーが発生:", innerErr);
          alert(
            "カメラの起動に失敗しました。ブラウザの設定を確認してください。"
          );
          setIsCameraActive(false);
        }
      }, 500);
    } catch (err) {
      console.error("カメラ起動処理でエラー:", err);
      alert(
        "カメラへのアクセスができませんでした。カメラの許可設定を確認してください。"
      );
      setIsCameraActive(false);
    }
  }, []);

  // Stop camera function
  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  }, []);

  // Capture photo function
  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw video frame to canvas
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to data URL
        const imageDataUrl = canvas.toDataURL("image/jpeg");
        setCapturedImage(imageDataUrl);
        setHasImage(true);
        stopCamera();
      }
    }
  }, [stopCamera]);

  // Handle image click for cropping
  const handleImageClick = () => {
    if (capturedImage && !isCropping) {
      setIsCropping(true);
    }
  };

  // Handle crop complete
  const onCropComplete = useCallback((crop: Crop) => {
    setCrop(crop);
  }, []);

  // Apply crop to image
  const applyCrop = useCallback(() => {
    if (imgRef.current && crop && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

      canvas.width = crop.width;
      canvas.height = crop.height;

      ctx.drawImage(
        imgRef.current,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      const croppedImageUrl = canvas.toDataURL("image/jpeg");
      setCapturedImage(croppedImageUrl);
      setIsCropping(false);
    }
  }, [crop]);

  // Cancel cropping
  const cancelCrop = () => {
    setIsCropping(false);
  };

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="flex flex-col gap-8 p-12 pb-24">
      <h1 className="text-2xl font-bold">レシート記録</h1>

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side: Camera or Image */}
        <div className="flex-1">
          {isCropping && capturedImage ? (
            <div className="w-full flex flex-col items-center">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={onCropComplete}
              >
                <img
                  ref={imgRef}
                  src={capturedImage}
                  alt="Receipt to crop"
                  className="max-w-full max-h-[300px]"
                />
              </ReactCrop>
              <div className="flex gap-4 mt-4">
                <button className="btn-primary" onClick={applyCrop}>
                  トリミングを適用
                </button>
                <button className="btn-secondary" onClick={cancelCrop}>
                  <span className="flex items-center justify-center">
                    <HiX className="mr-1" />
                    キャンセル
                  </span>
                </button>
              </div>
            </div>
          ) : isCameraActive ? (
            <div className="w-full flex flex-col items-center">
              <div className="relative w-full">
                {/* カメラビューのコンテナ */}
                <div className="relative">
                  {/* カメラ映像 */}
                  <div className="w-full border-8 border-gray-800 rounded-lg overflow-hidden bg-black shadow-2xl">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    ></video>

                    {/* レシートガイド（半透明の枠） */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-[80%] h-[70%] border-2 border-dashed border-white opacity-50 rounded"></div>
                    </div>

                    {/* 撮影ヒント */}
                    <div className="absolute top-4 left-0 right-0 text-center">
                      <div className="bg-black bg-opacity-50 text-white py-1 px-3 rounded-full inline-block text-sm">
                        レシートを枠内に合わせてください
                      </div>
                    </div>
                  </div>

                  {/* シャッターボタン */}
                  <div className="absolute -bottom-12 left-0 right-0 flex justify-center">
                    <button
                      className="w-16 h-16 bg-primary-500 hover:bg-primary-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white transition-transform transform hover:scale-110"
                      onClick={capturePhoto}
                    >
                      <HiCamera className="text-2xl text-white" />
                    </button>
                  </div>
                </div>

                {/* カメラコントロール */}
                <div className="mt-16 flex flex-col gap-4 justify-between items-center w-full px-4">
                  <button className="btn-secondary" onClick={stopCamera}>
                    <span className="flex items-center justify-center">
                      <HiX className="mr-1" />
                      キャンセル
                    </span>
                  </button>
                  <div className="text-sm text-center text-gray-500">
                    シャッターボタンをタップして撮影
                  </div>
                </div>
              </div>

              {/* ヘルプテキスト */}
              <p className="text-sm text-gray-500 mt-6 text-center">
                カメラ映像が表示されない場合は、ブラウザのカメラ許可を確認してください
              </p>
            </div>
          ) : !hasImage ? (
            <>
              <div className="bg-gray-50 min-h-[400px] flex flex-col items-center justify-center rounded-lg">
                <div className="w-24 h-24 mb-6 flex items-center justify-center">
                  <HiCamera className="w-36 h-36 text-gray-500" />
                </div>
                <p className="text-gray-600 mb-8 text-center flex items-center justify-center gap-2">
                  カメラを起動してレシートを読み取ります
                </p>
                <button className="btn-primary" onClick={startCamera}>
                  レシートを記録
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="w-full flex flex-col items-center">
                <div
                  className=" bg-gray-100 rounded-lg flex items-center justify-center mb-6 border-4 border-gray-300 cursor-pointer"
                  onClick={handleImageClick}
                >
                  {capturedImage ? (
                    <img
                      src={capturedImage}
                      alt="Captured receipt"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-4xl">🖼️</div>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  画像をクリックするとトリミングできます
                </p>
                <button
                  className="btn-primary"
                  onClick={() => {
                    setHasImage(false);
                    setCapturedImage(null);
                    // 直接カメラを起動
                    startCamera();
                  }}
                >
                  レシートを撮り直す
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right side: Receipt content */}
        {hasImage && (
          <div className="flex-1">
            <div className="card min-h-[400px] flex flex-col">
              {!isEdit ? (
                <>
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                      <span className="font-bold">食費</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <HiLocationMarker className="text-gray-500 mr-2" />
                      <span>〇〇スーパー</span>
                    </div>

                    <div className="">
                      <div className="flex justify-between items-center py-4 border-b-1 border-solid border-lavender-light">
                        <div>
                          <div className="font-medium">スポーツドリンク</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <HiLocationMarker className="text-gray-500 mr-1" />
                            〇〇コンビニ
                          </div>
                        </div>
                        <div className="font-medium">240円</div>
                      </div>
                      <div className="flex justify-between items-center py-4 border-b-1 border-solid border-lavender-light">
                        <div>
                          <div className="font-medium">ハンバーガー</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <HiLocationMarker className="text-gray-500 mr-1" />
                            〇〇ファストフード
                          </div>
                        </div>
                        <div className="font-medium">300円</div>
                      </div>
                      <div className="flex justify-between items-center py-4 border-b-1 border-solid border-lavender-light">
                        <div>
                          <div className="font-medium">ハンバーガー</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <HiLocationMarker className="text-gray-500 mr-1" />
                            〇〇ファストフード
                          </div>
                        </div>
                        <div className="font-medium">300円</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button className="btn-primary flex-1">
                      レシートを記録する
                    </button>
                    <button
                      className="btn-secondary flex-1"
                      onClick={() => setIsEdit(true)}
                    >
                      <span className="flex items-center justify-center">
                        レシートを修正する <HiArrowRight className="ml-1" />
                      </span>
                    </button>
                  </div>
                </>
              ) : (
                <form className="space-y-6">
                  <div className="">
                    <div className="flex items-center mb-4">
                      <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                      <input className="input-field" defaultValue="食費" />
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <HiLocationMarker className="text-gray-500 mr-2" />
                      <input
                        className="input-field"
                        defaultValue="〇〇スーパー"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      className="input-field"
                      defaultValue="スポーツドリンク"
                    />
                    <input className="input-field" defaultValue="240円" />
                    <div className="col-span-2 flex items-center">
                      <HiLocationMarker className="text-gray-500 mr-1" />
                      <input
                        className="input-field flex-1"
                        defaultValue="〇〇コンビニ"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      className="input-field"
                      defaultValue="ハンバーガー"
                    />
                    <input className="input-field" defaultValue="300円" />
                    <div className="col-span-2 flex items-center">
                      <HiLocationMarker className="text-gray-500 mr-1" />
                      <input
                        className="input-field flex-1"
                        defaultValue="〇〇ファストフード"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      className="input-field"
                      defaultValue="ハンバーガー"
                    />
                    <input className="input-field" defaultValue="300円" />
                    <div className="col-span-2 flex items-center">
                      <HiLocationMarker className="text-gray-500 mr-1" />
                      <input
                        className="input-field flex-1"
                        defaultValue="〇〇ファストフード"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button
                      className="btn-primary flex-1"
                      type="submit"
                      onClick={() => setIsEdit(false)}
                    >
                      保存
                    </button>
                    <button
                      className="btn-secondary flex-1"
                      type="button"
                      onClick={() => setIsEdit(false)}
                    >
                      <span className="flex items-center justify-center">
                        <HiX className="mr-1" />
                        キャンセル
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
