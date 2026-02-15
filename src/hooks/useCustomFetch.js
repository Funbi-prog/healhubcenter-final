import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { customFetch, setCustomFetchLogoutHandler } from "../utils/customFetch";

export function useCustomFetch() {
  const navigate = useNavigate();

  useEffect(() => {
    setCustomFetchLogoutHandler(() => navigate("/login", { replace: true }));

    return () => {
      setCustomFetchLogoutHandler(null);
    };
  }, [navigate]);

  return customFetch;
}
