import crypto from "crypto";

export const hash = (str: string, length: number): string => {
  return crypto
    .createHash("md5")
    .update(str)
    .digest("hex")
    .slice(0, length)
    .toLowerCase();
};
