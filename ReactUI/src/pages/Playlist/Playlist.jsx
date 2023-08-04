import { useCallback, useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
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

    const onDragEnd = useCallback((e) => {
        if (!e.source || !e.destination) return;
        if (e.source.index === e.source.destination) return;

        const newQueue = Array.from(queue);
        const [removedItem] = newQueue.splice(e.source.index, 1);
        newQueue.splice(e.destination.index, 0, removedItem);

        const currentItem = music.queue.currentItem;
        music.queue.updateItems(newQueue);
        music.queue._updatePosition(music.queue.indexForItem(currentItem));
    }, []);

    let content;
    if (queue.length > 0) {
        content = queue.map((item, index) => (
            <PlaylistItem
                key={index}
                item={item}
                index={index}
                remove={() => {
                    const currentItem = music.queue.currentItem;
                    music.queue.removeQueueItems(
                        (q, i) => q.item.id === item.id && i === index,
                    );
                    music.queue._updatePosition(
                        music.queue.indexForItem(currentItem),
                    );
                }}
                isCurrentItem={index === music.queue.position}
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
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="playlist">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <List style={{ paddingTop: "10px" }}>
                                {content}
                                {provided.placeholder}
                            </List>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </Segment>
    );
}

export default Playlist;
