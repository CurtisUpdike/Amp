import { MediaItem } from "../../types/MusicKitTypes";
import { playAtIndex, removeItemAtIndex } from "./musicKitHelpers";
import formatMilliseconds from "../../utils/formatMilliseconds";
import styles from "./PlaylistItem.module.css";

type Props = {
  item: MediaItem;
  index: number;
  isCurrentItem: boolean;
};

const PlaylistItem = ({ item, index, isCurrentItem }: Props) => {
  const { title, artistName, playbackDuration } = item;

  return (
    <li
      className={`${styles.item} + ${isCurrentItem ? styles.current : ""}`}
      onDoubleClick={() => playAtIndex(index)}
    >
      <div className={styles.container}>
        <span className={styles.info}>{`${title} — ${artistName}`}</span>
        <span className={styles.duration}>
          {formatMilliseconds(playbackDuration)}
        </span>
        <button
          className="material-symbols-sharp"
          onClick={() => removeItemAtIndex(item, index)}
          disabled={isCurrentItem}
        >
          playlist_remove
        </button>
      </div>
    </li>
  );
};

export default PlaylistItem;
