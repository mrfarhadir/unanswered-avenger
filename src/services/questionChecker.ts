import { config } from "../config";

export const isQuestion = (text: string): boolean => {
  const normalized = text.trim();
  if (normalized.includes("؟")) return true;

  const allWords = [...config.persianWords, ...config.turkishWords];
  return allWords.some(word =>
    normalized.startsWith(word) || normalized.includes(` ${word} `)
  );
};
