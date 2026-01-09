const API_BASE_URL = "http://localhost:8000/api/v1";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJoZWFsaHViIiwiZXhwIjoxNzY0MzI3NTg3fQ.o8ErK6RqPRA1orlWlnOoS-ZX5q3vNmrdJc2Zb8AAnCY"
export async function sendMessage(conversationId, message) {
  const response = await fetch(
    `${API_BASE_URL}/conversations/${conversationId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ content: message }),
    }
  );

  return response.json();
}

export async function createConversation(title) {
  const response = await fetch(`${API_BASE_URL}/conversations`, {
    method: "POST",
       headers: {
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${token}`
      }, 
      body: JSON.stringify({title}) 

  });

  return response.json();
}

export async function getMessages(conversationId) {
  const response = await fetch(
    `${API_BASE_URL}/conversations/${conversationId}/messages`, {method:"GET",   headers: {
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${token}`
      },}
  );
  return response.json();
}
