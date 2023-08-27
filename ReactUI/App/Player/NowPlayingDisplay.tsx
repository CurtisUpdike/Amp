import { MediaItem } from "../../types/MusicKitTypes";
import styles from "./NowPlayingDisplay.module.css";

interface Props {
  nowPlayingItem: MediaItem | undefined;
  queueIsEmpty: boolean;
}

const NowPlayingDisplay = ({ nowPlayingItem, queueIsEmpty }: Props) => {
  let content;
  if (!nowPlayingItem || queueIsEmpty) {
    content = " ";
  } else {
    const { title, artistName } = nowPlayingItem;
    content = title + " - " + artistName;
  }

  return <div className={styles.container}>{content}</div>;
};

export default NowPlayingDisplay;
