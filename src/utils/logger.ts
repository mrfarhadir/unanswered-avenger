import fs from 'fs';
import path from 'path';

export const logAction = (userId: string, action: string, reason: string, attempts: number) => {
  const logDir = path.join(__dirname, '../../logs');
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

  const logFile = path.join(logDir, `${new Date().toISOString().split('T')[0]}.log`);
  const entry = `[${new Date().toISOString()}] User: ${userId} | Action: ${action} | Attempts: ${attempts} | Reason: ${reason}\n`;

  fs.appendFile(logFile, entry, (err) => {
    if (err) console.error("Failed to write log:", err);
  });
};
