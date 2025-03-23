
import { config } from "../config";
import { getMyReplies, getConversationReplies, muteOrBlockUser } from "../services/twitter";
import { isQuestion } from "../services/questionChecker";
import { logAction } from "../utils/logger";
import { sleep } from "../utils/delay";
import axios from "axios";

const unansweredMap: Record<string, number> = {};

export const runAvenger = async () => {
  try {
    console.log("🛡️ Avenger is running...");
    const replies = await getMyReplies(config.myUsername);
    const processedConversations = new Set<string>();
    const limitedReplies = replies.slice(0, 30); // Limit to avoid rate limits

    for (const reply of limitedReplies) {
      const { conversation_id, created_at, text } = reply;

      if (!isQuestion(text)) continue;
      if (processedConversations.has(conversation_id)) continue;
      processedConversations.add(conversation_id);

      const hoursPassed = (Date.now() - new Date(created_at).getTime()) / (1000 * 60 * 60);
      if (hoursPassed < config.timeLimitHours) continue;

      try {
        const convReplies = await getConversationReplies(conversation_id);
        await sleep(500);
		
		// todo: change this any later!
        const hasResponse = convReplies.some((t: any) => t.author_id !== config.myUserId);
        if (hasResponse) continue;

        const targetId = convReplies.length ? convReplies[0].author_id : "unknown";
        unansweredMap[targetId] = (unansweredMap[targetId] || 0) + 1;

        if (unansweredMap[targetId] >= config.unansweredLimit) {
          await muteOrBlockUser(config.myUserId, targetId, config.actionType);
          logAction(targetId, config.actionType, "Ignored question", unansweredMap[targetId]);
          delete unansweredMap[targetId];
        }
      } catch (err: any) {
        if (axios.isAxiosError(err) && err.response?.status === 429) {
          const resetTime = err.response.headers['x-rate-limit-reset'];
          const waitTime = resetTime
            ? Math.max(0, parseInt(resetTime) * 1000 - Date.now())
            : 15 * 60 * 1000;

          console.warn(`🚨 Rate limit hit! Sleeping for ${Math.ceil(waitTime / 1000)}s...`);
          await sleep(waitTime);
        } else {
          console.error("❌ Error fetching conversation replies:", err);
        }
      }
    }
  } catch (err) {
    console.error("❌ Fatal error in Avenger:", err);
  }
};