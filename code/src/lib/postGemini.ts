// import {
//   GoogleGenAI,
//   createUserContent,
//   createPartFromUri,
// } from "@google/genai";
// import toBlob from "./toBlob";
// import { structuredOutputSetting } from "./structuredOutputSetting";

// const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

// export default async function postGemini(base64ImageFile: string, mimeType: string = "image/jpeg"): Promise<string> {

//   const myfile = await ai.files.upload({
//     file: toBlob(base64ImageFile, mimeType),
//     config: { mimeType },
//   });
//   if(!myfile || !myfile.uri || !myfile.mimeType || !myfile.name) {
//     throw new Error("File upload failed, no file URI returned.");
//   }
//   console.log("File uploaded successfully:", myfile.uri);

//   const response = await ai.models.generateContent({
//     model: "gemini-2.0-flash",
//     contents: createUserContent([
//       createPartFromUri(myfile.uri, myfile.mimeType),
//       "内容を読み取ってください。",
//     ]),
//     config: {
//       responseMimeType: "application/json",
//       responseSchema: structuredOutputSetting,
//     }
//   });
//   console.log(response.text);

//   const fileName = myfile.name;
//   await ai.files.delete({name: fileName});

//   return response.text || "No caption generated.";
// }
