import { useEffect, useState } from "react";
import { Segment, List, Button } from "semantic-ui-react";
import PlaylistItem from "./PlaylistItem";

function Playlist() {
    const MusicKit = window.MusicKit;
    const music = MusicKit.getInstance();
    const [queue, setQueue] = useState(music.queue.items);

    useEffect(() => {
        music.addEventListener("queueItemsDidChange", updateQueue);
        music.addEventListener("queuePositionDidChange", updateQueue);

        return () => {
            music.removeEventListener("queueItemsDidChange", updateQueue);
            music.removeEventListener("queuePositionDidChange", updateQueue);
        };
    });

    const updateQueue = () => setQueue(music.queue.items);

    let content;
    if (queue.length > 0) {
        content = queue.map((item, position) => (
            <PlaylistItem
                key={position}
                item={item}
                remove={() => {
                    // TODO: queue.remove() is deprecated, but no alternative yet
                    music.queue.remove(position);
                }}
                isCurrentItem={position === music.queue.position}
            />
        ));
    } else {
        content = (
            <div style={{ textAlign: "center", padding: "3em" }}>
                Your playlist is empty
            </div>
        );
    }

    return (
        <Segment>
            <div>
                <Button
                    content="Shuffle"
                    icon="shuffle"
                    labelPosition="left"
                    onClick={() => {
                        music.shuffleMode = MusicKit.PlayerShuffleMode.off;
                        music.shuffleMode = MusicKit.PlayerShuffleMode.songs;
                    }}
                />
                <Button
                    content="Clear"
                    icon="trash"
                    labelPosition="left"
                    onClick={async () => {
                        await music.clearQueue();
                        await music.stop();
                    }}
                />
            </div>
            <List>{content}</List>
        </Segment>
    );
}

export default Playlist;
