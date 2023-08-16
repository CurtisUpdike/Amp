import { useCallback } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import PlaylistItem from "./PlaylistItem";
import Section from "../../components/Section";
import Scrollbox from "../../components/Scrollbox";
import useQueue from "./useQueue";
import styles from "./Playlist.module.css";

function Playlist() {
  const MusicKit = window.MusicKit;
  const music = MusicKit.getInstance();
  const { queue, moveQueueItem } = useQueue();

  const onDragEnd = useCallback((e) => {
    if (!e.source || !e.destination) return;
    moveQueueItem(e.source.index, e.source.destination);
  }, []);

  let content = queue.map((item, index) => (
    <PlaylistItem
      key={index}
      item={item}
      index={index}
      // remove={() => {
      //   const currentItem = music.queue.currentItem;
      //   music.queue.removeQueueItems(
      //     (q, i) => q.item.id === item.id && i === index,
      //   );
      //   music.queue._updatePosition(music.queue.indexForItem(currentItem));
      // }}
      play={async () => {
        await music.stop();
        music.queue.position = index;
        await music.play();
      }}
      isCurrentItem={index === music.queue.position}
    />
  ));

  return (
    <Section>
      <DragDropContext onDragEnd={onDragEnd}>
        <Scrollbox>
          <Droppable droppableId="playlist">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <ol className={styles.list}>
                  {content}
                  {provided.placeholder}
                </ol>
              </div>
            )}
          </Droppable>
        </Scrollbox>
      </DragDropContext>
      <div className={styles.buttonGroup}>
        <button
          onClick={() => {
            music.shuffleMode = MusicKit.PlayerShuffleMode.off;
            music.shuffleMode = MusicKit.PlayerShuffleMode.songs;
          }}
        >
          Shuffle
        </button>
        <button
          onClick={async () => {
            await music.clearQueue();
            await music.stop();
          }}
        >
          Clear
        </button>
      </div>
    </Section>
  );
}

export default Playlist;
