import { MediaItem } from "../../types/MusicKitTypes";
import { playAtIndex, removeAtIndex } from "./musicKitHelpers";
import formatMilliseconds from "../../utils/formatMilliseconds";
import styles from "./PlaylistItem.module.css";
import IconButton from "../../components/IconButton";

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
        <IconButton
          iconName="playlist_remove"
          ariaLabel={`Remove ${title} from playlist`}
          tooltipText="Remove"
          onClick={() => removeAtIndex(index)}
          disabled={isCurrentItem}
        />
      </div>
    </li>
  );
};

export default PlaylistItem;
