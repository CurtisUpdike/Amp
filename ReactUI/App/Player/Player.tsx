import { useEffect, useState } from "react";
import PlaybackProgress from "./PlaybackProgress";
import PlaybackControls from "./PlaybackControls";
import VolumeControls from "./VolumeControls";
import NowPlayingDisplay from "./NowPlayingDisplay";
import Section from "../../components/Section";
import { MusicKitInstance } from "../../types/MusicKitTypes";

export default function Player() {
  const MusicKit = window.MusicKit;
  const music: MusicKitInstance = MusicKit.getInstance();
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
    <Section>
      <NowPlayingDisplay
        nowPlayingItem={nowPlayingItem}
        queueIsEmpty={music.queueIsEmpty}
      />
      <PlaybackProgress playbackDuration={playbackDuration} />
      <PlaybackControls
        skipPrevious={async () => await music.skipToPreviousItem()}
        play={async () => await music.play()}
        pause={async () => await music.pause()}
        stop={async () => await music.stop()}
        skipNext={async () => await music.skipToNextItem()}
      />
      <VolumeControls />
    </Section>
  );
}
