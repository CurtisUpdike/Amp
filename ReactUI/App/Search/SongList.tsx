import { MediaItem } from "../../types/MusicKitTypes";
import { playLast, playNext, playNow } from "./musicKitHelpers";
import formatMilliseconds from "../../utils/formatMilliseconds";
import styles from "./SongList.module.css";

export default function SongList({ songs }: { songs: MediaItem[] }) {
  const songsListItems = songs.map((song) => {
    const { title, artistName, playbackDuration } = song;

    return (
      <li
        key={song.id}
        className={styles.item}
        onDoubleClick={() => playNow(song)}
      >
        <span className={styles.info}>{`${title} — ${artistName}`}</span>
        <span className={styles.duration}>
          {formatMilliseconds(playbackDuration)}
        </span>
        <div className={styles.fade} />
        <button
          className="material-symbols-sharp"
          onClick={() => playNext(song)}
        >
          playlist_play
        </button>
        <button
          className="material-symbols-sharp"
          onClick={() => playLast(song)}
        >
          playlist_add
        </button>
      </li>
    );
  });

  return <ul className={styles.list}>{songsListItems}</ul>;
}
