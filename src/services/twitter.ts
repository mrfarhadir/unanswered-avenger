import axios from 'axios';
import { config } from '../config';

const API = 'https://api.twitter.com/2';
const headers = { Authorization: `Bearer ${config.bearerToken}` };

export const getMyReplies = async (username: string) => {
  const res = await axios.get(`${API}/tweets/search/recent`, {
    headers,
    params: {
      query: `from:${username}`,
      "tweet.fields": "conversation_id,created_at,text"
    }
  });
  return res.data.data || [];
};

export const getConversationReplies = async (conversationId: string) => {
  const res = await axios.get(`${API}/tweets/search/recent`, {
    headers,
    params: {
      query: `conversation_id:${conversationId}`,
      "tweet.fields": "author_id,created_at"
    }
  });
  return res.data.data || [];
};

export const muteOrBlockUser = async (myUserId: string, targetUserId: string, action: string) => {
  const endpoint = action === 'mute'
    ? `${API}/users/${myUserId}/muting`
    : `${API}/users/${myUserId}/blocking`;
    
	return true
  // return axios.post(endpoint, { target_user_id: targetUserId }, { headers });
};
