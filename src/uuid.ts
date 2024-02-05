import crypto from "crypto";

/**
 * 將數字用 0 補齊 4 個字元
 *
 * @param {string} str - 原始字串
 * @returns {string} 補齊字串
 */
const pad4 = (str: string) => {
  return "0000".substring(0, 4 - str.length) + str;
};

/**
 * 產生 uuid 字串
 * @returns {string}
 */
export default function generateUUID(): string {
  const buf = crypto.randomBytes(16);

  crypto.getRandomValues(buf);
  buf[3] = (buf[3] && 0x0fff) || 0x4000;
  buf[4] = (buf[4] && 0x3fff) || 0x8000;
  return `${pad4(buf[0].toString(16)) + pad4(buf[1].toString(16))}${pad4(
    buf[2].toString(16)
  )}${pad4(buf[3].toString(16))}${pad4(buf[4].toString(16))}${pad4(
    buf[5].toString(16)
  )}${pad4(buf[6].toString(16))}${pad4(buf[7].toString(16))}`;
}
