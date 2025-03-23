export const isQuestion = (text: string): boolean => {
	const normalized = text.trim();
	if (normalized.includes("؟")) return true;
  
	const persianWords = ["چرا", "چگونه", "چطور", "کجا", "کی", "چه", "کدام", "آیا"];
	const turkishWords = ["ندن", "نه زمان", "نجه", "نه عجب", "نیه"];
  
	return [...persianWords, ...turkishWords].some(word =>
	  normalized.startsWith(word) || normalized.includes(` ${word} `)
	);
  };
  