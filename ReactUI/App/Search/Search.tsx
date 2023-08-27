import { FormEvent, useEffect, useState } from "react";
import { MediaItem } from "../../types/MusicKitTypes";
import { search } from "./musicKitHelpers";
import Section from "../../components/Section";
import SongList from "./SongList";
import Scrollbox from "../../components/Scrollbox";
import styles from "./Search.module.css";

export default function Search() {
  const [query, setQuery] = useState("");
  const initialResults: MediaItem[] = [];
  const [results, setResults] = useState(initialResults);

  useEffect(() => {
    (async () => {
      const { songs } = await search(query);
      setResults(songs);
    })();
  }, [query]);

  function handleSearchChange(event: FormEvent<HTMLInputElement>) {
    setQuery((event.target as HTMLInputElement).value);
  }

  return (
    <Section>
      <label className={styles.searchInput}>
        Search:
        <input
          placeholder="Find your next song"
          onChange={handleSearchChange}
        />
      </label>
      <Scrollbox>
        {query.length > 0 && results.length > 0 && <SongList songs={results} />}
      </Scrollbox>
    </Section>
  );
}
