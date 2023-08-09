import { useEffect, useState } from "react";
import { Divider, Segment } from "semantic-ui-react";
import PlaybackProgress from "./PlaybackProgress";
import PlaybackControls from "./PlaybackControls";
import VolumeControls from "./VolumeControls";
import NowPlayingDisplay from "./NowPlayingDisplay";

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
        music.addEventListener(
            "mediaItemStateDidChange",
            handleMediaItemChange,
        );
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
        <Segment padded>
            <h1 style={{ fontSize: "1em", textAlign: "center" }}>AMP</h1>
            <Divider />
            <NowPlayingDisplay
                nowPlayingItem={nowPlayingItem}
                queueIsEmpty={music.queueIsEmpty}
            />
            <div style={{ margin: "1rem 0" }}>
                <PlaybackProgress playbackDuration={playbackDuration} />
            </div>
            <PlaybackControls music={music} />
            <VolumeControls />
        </Segment>
    );
}
