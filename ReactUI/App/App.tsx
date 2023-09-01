import Heading from "../components/Heading";
import Player from "./Player";
import Playlist from "./Playlist";
import Search from "./Search";
import styles from "./App.module.css";
import useAuth from "./useAuth";
import Login from "./Login";

function App() {
  const { isAuthorized, toggleAuthorization } = useAuth();

  return (
    <div className={styles.app}>
      <Heading>AMP</Heading>
      <Player />
      {!isAuthorized && <Login login={toggleAuthorization} />}
      <Heading>Playlist</Heading>
      <Playlist />
      <Heading>Search</Heading>
      <Search />
    </div>
  );
}

export default App;
