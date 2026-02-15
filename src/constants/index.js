const DEFAULT_DEV_URL = "https://dev.healhubcenter.com/api/v1";
const DEFAULT_PROD_URL = "https://api.healhubcenter.com/api/v1";
const DEFAULT_DEV_WS_URL = "https://dev.healhubcenter.com/ai-chat";
const DEFAULT_PROD_WS_URL = "https://api.healhubcenter.com/ai-chat";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  (import.meta.env.PROD ? DEFAULT_PROD_URL : DEFAULT_DEV_URL);

export const WS_BASE_URL =
  import.meta.env.VITE_WS_BASE_URL ??
  (import.meta.env.PROD ? DEFAULT_PROD_WS_URL : DEFAULT_DEV_WS_URL);
