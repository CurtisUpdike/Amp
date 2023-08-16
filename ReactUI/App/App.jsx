import useAuth from "./useAuth";
import Heading from "../components/Heading";
import Player from "./Player";
import Playlist from "./Playlist";
import Search from "./Search";
import styles from "./App.module.css";

function App() {
  const auth = useAuth();

  return (
    <div className={styles.app}>
      <Heading>AMP</Heading>
      <Player />
      <Heading>Playlist</Heading>
      <Playlist />
      <Heading>Search</Heading>
      <Search />
    </div>
  );
}

export default App;
