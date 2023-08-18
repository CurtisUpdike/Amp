import { playAtIndex } from "./musicKitHelpers";
import formatMilliseconds from "../../utils/formatMilliseconds";
import styles from "./PlaylistItem.module.css";

const PlaylistItem = ({ item, index, isCurrentItem }) => {
  const {
    attributes: { name, artistName, durationInMillis },
  } = item;

  return (
    <li
      className={`${styles.item} + ${isCurrentItem ? styles.current : ""}`}
      onDoubleClick={() => playAtIndex(index)}
    >
      <div className={styles.info}>
        <span className={styles.mainText}>{`${name} — ${artistName}`}</span>
        <span className={styles.duration}>
          {formatMilliseconds(durationInMillis)}
        </span>
      </div>
    </li>
  );
};

export default PlaylistItem;
