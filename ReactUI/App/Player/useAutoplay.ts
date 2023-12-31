import { MusicKitInstance } from "../../types/MusicKitTypes";
import { useEffect, useState } from "react";

export default function useAutoplay() {
  const music: MusicKitInstance = window.MusicKit.getInstance();
  const [autoplayEnabled, setAutoplayEnabled] = useState(music.autoplayEnabled);

  useEffect(() => {
    music.addEventListener("autoplayEnabledDidChange", updateAutoplay);
    return () => {
      music.removeEventListener("autoplayEnabledDidChange", updateAutoplay);
    };
  });

  function updateAutoplay() {
    setAutoplayEnabled(music.autoplayEnabled);
  }

  function toggleAutoplay() {
    music.autoplayEnabled = !music.autoplayEnabled;
  }

  return { autoplayEnabled, toggleAutoplay };
}
