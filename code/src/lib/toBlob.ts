/**
 * Converts a base64 encoded string to a Blob object.
 * @param {string} base64String - The base64 encoded string, typically in the format "data:[<mediatype>];base64,[<data>]"
 * @param {string} mimeType - The MIME type of the data, e.g., "image/jpeg".
 * @returns {Blob} - The resulting Blob object.
 * @throws {Error} - If the input string is not in a valid base64 format.
 */
export default function toBlob(base64String: string, mimeType: string): Blob {

    const base64Data = base64String.replace(/^.*,/, "");
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    return new Blob([bytes], { type: mimeType });
}