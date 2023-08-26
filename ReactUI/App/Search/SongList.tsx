import { playLast, playNext, playNow } from "./musicKitHelpers";
import formatMilliseconds from "../../utils/formatMilliseconds";
import styles from "./SongList.module.css";

type Song = {
  id: number;
  attributes: {
    name: string;
    artistName: string;
    durationInMillis: number;
  };
};

export default function SongList({ songs }: { songs: Song[] }) {
  const songsListItems = songs.map((song) => {
    const {
      attributes: { name, artistName, durationInMillis },
    } = song;

    return (
      <li
        key={song.id}
        className={styles.item}
        onDoubleClick={() => playNow(song)}
      >
        <span className={styles.info}>{`${name} — ${artistName}`}</span>
        <span className={styles.duration}>
          {formatMilliseconds(durationInMillis)}
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
