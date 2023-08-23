import { useEffect, useState } from "react";

export default function useRepeatMode() {
  const music = window.MusicKit.getInstance();
  const [repeatEnabled, setRepeatEnabled] = useState(music.repeatMode === 2);

  useEffect(() => {
    music.addEventListener("repeatModeDidChange", handleRepeatModeChange);
    return () => {
      music.removeEventListener("repeatModeDidChange", handleRepeatModeChange);
    };
  });

  function handleRepeatModeChange() {
    setRepeatEnabled(music.repeatMode);
  }

  function toggleRepeat() {
    music.repeatMode = music.repeatMode === 0 ? 2 : 0;
  }

  return { repeatEnabled, toggleRepeat };
}
