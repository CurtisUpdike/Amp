import styles from "./NowPlayingDisplay.module.css";

const NowPlayingDisplay = ({ nowPlayingItem, queueIsEmpty }) => {
  let content;
  if (!nowPlayingItem || queueIsEmpty) {
    content = " ";
  } else {
    const {
      attributes: { name, artistName },
    } = nowPlayingItem;
    content = name + " - " + artistName;
  }
  return <div className={styles.container}>{content}</div>;
};

export default NowPlayingDisplay;
