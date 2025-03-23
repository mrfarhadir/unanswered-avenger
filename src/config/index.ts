import dotenv from 'dotenv';
dotenv.config();

export const config = {
  bearerToken: process.env.TWITTER_BEARER_TOKEN!,
  unansweredLimit: parseInt(process.env.UNANSWERED_LIMIT || '3'),
  timeLimitHours: parseInt(process.env.TIME_LIMIT_HOURS || '24'),
  actionType: process.env.ACTION_TYPE || 'mute',
  checkInterval: parseInt(process.env.CHECK_INTERVAL || '3600000'),
  persianWords: (process.env.PERSIAN_QUESTION_WORDS || '').split(',').map(w => w.trim()),
  turkishWords: (process.env.TURKISH_QUESTION_WORDS || '').split(',').map(w => w.trim())
};
