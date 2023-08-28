import { MediaItem } from "../../types/MusicKitTypes";
import { toggleShuffle, clearQueue } from "./musicKitHelpers";
import PlaylistItem from "./PlaylistItem";
import Section from "../../components/Section";
import Scrollbox from "../../components/Scrollbox";
import useQueue from "./useQueue";
import styles from "./Playlist.module.css";

function Playlist() {
  const { queue, position } = useQueue();

  return (
    <Section>
      <Scrollbox>
        <ol className={styles.list}>
          {queue.map((item: MediaItem, index: number) => (
            <PlaylistItem
              key={index}
              item={item}
              index={index}
              isCurrentItem={index === position}
            />
          ))}
        </ol>
      </Scrollbox>
      <div className={styles.buttonGroup}>
        <button onClick={toggleShuffle}>Shuffle</button>
        <button onClick={clearQueue}>Clear</button>
      </div>
    </Section>
  );
}

export default Playlist;
