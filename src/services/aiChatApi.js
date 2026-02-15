import { customFetch } from "../utils/customFetch";

export async function getConversationMessages(conversationId) {
  if (!conversationId) return [];

  const response = await customFetch.get(
    `/ai-chat/conversations/${conversationId}/messages`,
    { headers: { "Content-Type": "application/json" } },
  );

  const payload = response?.data?.data ?? response?.data;
  const list = payload?.data ?? payload;
  return Array.isArray(list) ? list : [];
}

export async function sendAiChatMessageRest({ conversationId, content }) {
  const response = await customFetch.post(
    "/ai-chat/message",
    conversationId ? { conversationId, content } : { content },
    { headers: { "Content-Type": "application/json" } },
  );

  return response?.data?.data ?? response?.data;
}

export async function sendAiChatMessageMultipart({
  conversationId,
  content,
  files,
}) {
  const formData = new FormData();

  const normalizedFiles = Array.isArray(files) ? files.filter(Boolean) : [];
  if (normalizedFiles.length === 0) throw new Error("Missing files");
  if (normalizedFiles.length > 3) throw new Error("Max 3 files allowed");

  const fileTypes = normalizedFiles
    .map((f) => (f instanceof File ? f.type : f?.type))
    .filter(Boolean);
  const hasAudio = fileTypes.some((t) => String(t).startsWith("audio/"));
  const hasNonAudio = fileTypes.some((t) => !String(t).startsWith("audio/"));

  // Backend rules:
  // - Only images (image/) are allowed (max 3)
  // - Voice notes (audio/) must be sent alone (no text/other files)
  if (hasAudio) {
    if (normalizedFiles.length !== 1) {
      throw new Error("Voice notes must be sent as a single file");
    }
    if (typeof content === "string" && content.trim()) {
      throw new Error("Voice notes cannot include content text");
    }
    if (hasNonAudio) {
      throw new Error("Voice notes cannot be mixed with other files");
    }
  } else {
    // Images-only (as per backend spec)
    const hasNonImage = fileTypes.some((t) => !String(t).startsWith("image/"));
    if (hasNonImage) {
      throw new Error(
        "Only image/* files are allowed (or a single audio/* voice note)",
      );
    }
  }

  if (conversationId) formData.append("conversationId", conversationId);
  if (typeof content === "string" && content.trim()) {
    formData.append("content", content.trim());
  }

  // IMPORTANT: backend expects files under the "files" field.
  for (const file of normalizedFiles) {
    if (file instanceof File) {
      formData.append("files", file);
    } else {
      formData.append("files", file, `upload-${Date.now()}`);
    }
  }

  const response = await customFetch.post("/ai-chat/message", formData);
  return response?.data?.data ?? response?.data;
}
