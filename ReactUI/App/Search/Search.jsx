import { useEffect, useState, useCallback } from "react";
import { search } from "./musicKitHelpers";
import debounce from "../../utils/debounce";
import Section from "../../components/Section";
import SongList from "./SongList";
import Scrollbox from "../../components/Scrollbox";
import styles from "./Search.module.css";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    (async () => {
      const { songs } = await search(query);
      setResults(songs);
    })();
  }, [query]);

  const handleSearchChange = useCallback(
    debounce((e) => {
      setQuery(e.target.value);
    }),
    [],
  );

  let content;
  if (query.length > 0 && results.length > 0) {
    content = <SongList songs={results} />;
  } else {
    content = null;
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
      <Scrollbox>{content}</Scrollbox>
    </Section>
  );
}
