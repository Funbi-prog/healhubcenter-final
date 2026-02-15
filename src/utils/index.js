export function objectifyJSON(data) {
  if (typeof data === "string") return JSON.parse(data);
  return JSON.parse(JSON.stringify(data));
}

// Web version exports
export { customFetch } from "./customFetch";
export { useCustomFetch } from "../hooks/useCustomFetch";
