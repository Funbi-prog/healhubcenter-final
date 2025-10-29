// src/AvatarCreatorPage.jsx
import React from "react";
import {
  AvatarCreator,
  AvatarCreatorConfig,
  AvatarExportedEvent,
} from "@readyplayerme/react-avatar-creator";

const config = {
  clearCache: true,
  bodyType: "fullbody",
  quickStart: false,
  language: "en",
};

const style = {
  width: "100%",
  height: "100vh",
  border: "none",
};

export default function AvatarCreatorPage() {
  const handleOnAvatarExported = (event) => {
    const avatarUrl = event.data.url;
    console.log("🎨 Avatar URL exported:", avatarUrl);

    // ✅ Optional: Save it to localStorage or your backend
    localStorage.setItem("bimpeAvatar", avatarUrl);

    // Redirect or pass to your 3D scene
    window.location.href = "/"; // or navigate to your main scene
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <AvatarCreator
        subdomain="healhubcenter" // 👈 your Ready Player Me subdomain
        config={config}
        style={style}
        onAvatarExported={handleOnAvatarExported}
      />
    </div>
  );
}
