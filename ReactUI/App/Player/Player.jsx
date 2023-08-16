import { useEffect, useState } from "react";
import PlaybackProgress from "./PlaybackProgress";
import PlaybackControls from "./PlaybackControls";
import VolumeControls from "./VolumeControls";
import NowPlayingDisplay from "./NowPlayingDisplay";
import styles from "./Player.module.css";

export default function Player() {
  const MusicKit = window.MusicKit;
  const music = MusicKit.getInstance();
  const [playbackDuration, setPlaybackDuration] = useState(
    music.currentPlaybackDuration,
  );
  const [nowPlayingItem, setNowPlayingItem] = useState(music.nowPlayingItem);

  useEffect(() => {
    // using "mediaItemStateDidChange" MusicKit.Event because
    // "playbackDurationDidChange" and "nowPlayingItemDidChange"
    //  are not currently updating when next song plays
    music.addEventListener("mediaItemStateDidChange", handleMediaItemChange);
    return () => {
      music.removeEventListener(
        "mediaItemStateDidChange",
        handleMediaItemChange,
      );
    };
  });

  const handleMediaItemChange = () => {
    setPlaybackDuration(music.currentPlaybackDuration);
    setNowPlayingItem(music.nowPlayingItem);
  };

  return (
    <section className={styles.player}>
      <NowPlayingDisplay
        nowPlayingItem={nowPlayingItem}
        queueIsEmpty={music.queueIsEmpty}
      />
      <div style={{ margin: "1rem 0" }}>
        <PlaybackProgress playbackDuration={playbackDuration} />
      </div>
      <PlaybackControls music={music} />
      <VolumeControls />
    </section>
  );
}
