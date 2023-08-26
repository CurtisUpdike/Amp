import { MediaItem, playAtIndex, removeItemAtIndex } from "./musicKitHelpers";
import formatMilliseconds from "../../utils/formatMilliseconds";
import styles from "./PlaylistItem.module.css";

type PlaylistItemProps = {
  item: MediaItem;
  index: number;
  isCurrentItem: boolean;
};

const PlaylistItem = ({ item, index, isCurrentItem }: PlaylistItemProps) => {
  const {
    attributes: { name, artistName, durationInMillis },
  } = item;

  return (
    <li
      className={`${styles.item} + ${isCurrentItem ? styles.current : ""}`}
      onDoubleClick={() => playAtIndex(index)}
    >
      <div className={styles.container}>
        <span className={styles.info}>{`${name} — ${artistName}`}</span>
        <span className={styles.duration}>
          {formatMilliseconds(durationInMillis)}
        </span>
        <button
          className="material-symbols-sharp"
          onClick={() => removeItemAtIndex(item, index)}
        >
          playlist_remove
        </button>
      </div>
    </li>
  );
};

export default PlaylistItem;
