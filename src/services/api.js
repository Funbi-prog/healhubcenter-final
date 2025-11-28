const API_BASE_URL = "http://192.168.0.183:8000/api/v1";

export async function sendMessage(conversationId, message) {
  const response = await fetch(
    `${API_BASE_URL}/conversations/${conversationId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: message }),
    }
  );

  return response.json();
}

export async function createConversation() {
  const response = await fetch(`${API_BASE_URL}/conversations`, {
    method: "POST",
  });

  return response.json();
}

export async function getMessages(conversationId) {
  const response = await fetch(
    `${API_BASE_URL}/conversations/${conversationId}/messages`
  );
  return response.json();
}
