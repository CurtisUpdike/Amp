import { useState, useEffect } from "react";
import { MusicKitInstance } from "../../types/MusicKitTypes";
import styles from "./PlaybackProgress.module.css";

const PlaybackProgress = ({
  playbackDuration,
}: {
  playbackDuration: number;
}) => {
  const MusicKit = window.MusicKit;
  const music: MusicKitInstance = MusicKit.getInstance();
  const [state, setState] = useState("released");
  const [playbackTime, setPlabackTime] = useState(music.currentPlaybackTime);
  const [playbackState, setPlaybackState] = useState(
    MusicKit.PlaybackStates[music.playbackState],
  );
  const [value, setValue] = useState(playbackTime);

  useEffect(() => {
    music.addEventListener("playbackTimeDidChange", updatePlaybackTime);
    music.addEventListener("playbackStateDidChange", updatePlaybackState);
    return () => {
      music.removeEventListener("playbackTimeDidChange", updatePlaybackTime);
      music.removeEventListener("playbackStateDidChange", updatePlaybackState);
    };
  });

  const updatePlaybackTime = () => setPlabackTime(music.currentPlaybackTime);

  const updatePlaybackState = () => {
    const currentPlaybackState = MusicKit.PlaybackStates[music.playbackState];
    if (currentPlaybackState === "stopped") {
      setPlabackTime(music.currentPlaybackTime);
    }
    setPlaybackState(MusicKit.PlaybackStates[music.playbackState]);
  };

  const isDisabled =
    ["playing", "paused", "stopped"].includes(
      window.MusicKit.PlaybackStates[playbackState],
    ) || music.queueIsEmpty;

  return (
    <>
      <input
        className={styles.playbackProgress}
        disabled={isDisabled}
        type="range"
        min="0"
        max={playbackDuration}
        value={state === "dragging" ? value : playbackTime}
        onChange={(e) => {
          if (state === "dragging") {
            setValue(Number(e.target.value));
          }
        }}
        onMouseDown={() => {
          setValue(playbackTime);
          setState("dragging");
        }}
        onMouseUp={async (e) => {
          if (playbackState === "stopped") {
            await music.play();
          }
          await music.seekToTime(e.target.value);
          setTimeout(() => setState("released"), 100);
        }}
      />
    </>
  );
};

export default PlaybackProgress;
