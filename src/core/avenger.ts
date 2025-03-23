import { getMyReplies, getConversationReplies, muteOrBlockUser, getMyUserInfo } from "../services/twitter";
import { isQuestion } from "../services/questionChecker";
import { logAction } from "../utils/logger";
import { config } from "../config";

const unansweredMap: Record<string, number> = {};

export const runAvenger = async () => {
  const me = await getMyUserInfo();
  const replies = await getMyReplies(me.username);

  for (const reply of replies) {
    const { conversation_id, created_at, text } = reply;
    if (!isQuestion(text)) continue;

    const hoursPassed = (Date.now() - new Date(created_at).getTime()) / (1000 * 60 * 60);
    if (hoursPassed < config.timeLimitHours) continue;

    const convReplies = await getConversationReplies(conversation_id);
	// todo: change this any later!
    const hasResponse = convReplies.some((t: any) => t.author_id !== me.id);
    if (hasResponse) continue;

    const targetId = convReplies.length ? convReplies[0].author_id : "unknown";
    unansweredMap[targetId] = (unansweredMap[targetId] || 0) + 1;

    if (unansweredMap[targetId] >= config.unansweredLimit) {
      await muteOrBlockUser(me.id, targetId, config.actionType);
      logAction(targetId, config.actionType, "Ignored question", unansweredMap[targetId]);
      delete unansweredMap[targetId];
    }
  }
};
