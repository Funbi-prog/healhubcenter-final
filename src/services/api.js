import { customFetch } from "../utils/customFetch";

export async function sendMessage(conversationId, message) {
  const response = await customFetch.post(
    `/conversations/${conversationId}/messages`,
    { content: message },
    { headers: { "Content-Type": "application/json" } },
  );
  return response.data;
}

export async function createConversation(title) {
  const response = await customFetch.post(
    "/conversations",
    { title },
    { headers: { "Content-Type": "application/json" } },
  );
  return response.data;
}

export async function getMessages(conversationId) {
  const response = await customFetch.get(
    `/conversations/${conversationId}/messages`,
    { headers: { "Content-Type": "application/json" } },
  );
  return response.data;
}
