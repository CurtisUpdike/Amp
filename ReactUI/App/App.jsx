import { useCallback, useState } from "react";
import debounce from "../utils/debounce";
import useAuth from "./useAuth";

import { Menu, Input } from "semantic-ui-react";
import LoginMessage from "./LogInMessage";
import Heading from "../components/Heading/Heading";
import Player from "./Player";
import Playlist from "./Playlist";
import Search from "./Search";
import styles from "./App.module.css";

function App() {
  const auth = useAuth();
  const [query, setQuery] = useState("");
  const [activePage, setActivePage] = useState("playlist");

  const handleSearchChange = useCallback(
    debounce((e) => {
      if (activePage != "search") setActivePage("search");
      setQuery(e.target.value);
    }),
    [],
  );

  const handleSearchFocus = () => {
    if (query.length > 0) {
      setActivePage("search");
    }
  };

  const pages = [
    {
      name: "playlist",
      component: <Playlist />,
    },
    {
      name: "search",
      component: <Search query={query} />,
    },
  ];

  const menuTabs = pages.map((p) => (
    <Menu.Item
      key={p.name}
      name={p.name}
      active={activePage === p.name}
      onClick={() => setActivePage(p.name)}
    />
  ));

  const currentPage = pages.find((p) => p.name === activePage).component;

  return (
    <div className={styles.app}>
      {!auth.isAuthorized && <LoginMessage login={auth.authorize} />}
      <Heading>AMP</Heading>
      <Player />
      <Heading>Playlist</Heading>
      <div>
        <Menu pointing>
          {menuTabs}
          <Menu.Menu position="right">
            <Menu.Item>
              <Input
                icon="search"
                placeholder="Search..."
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        {currentPage}
      </div>
    </div>
  );
}

export default App;
