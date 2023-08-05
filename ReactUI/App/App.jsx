import { useCallback, useState } from "react";
import { debounce } from "./Utils";
import useAuth from "./hooks/useAuth";

import { Container, Menu, Input } from "semantic-ui-react";
import LoginMessage from "./features/LogInMessage";
import Player from "./Player";
import Home from "./pages/Home";
import Playlist from "./pages/Playlist/Playlist";
import Search from "./pages/Search";

function App() {
    const auth = useAuth();
    const [query, setQuery] = useState("");
    const [activePage, setActivePage] = useState("home");

    const handleSearchChange = useCallback(
        debounce((e) => {
            if (activePage != "search") setActivePage("search");
            setQuery(e.target.value);
        }),
        [],
    );

    const handelSearchFocus = () => {
        if (query.length > 0) {
            setActivePage("search");
        }
    };

    const pages = [
        {
            name: "home",
            component: <Home />,
        },
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
        <Container style={{ marginTop: "3em" }} text>
            {!auth.isAuthorized && <LoginMessage login={auth.authorize} />}
            <Player />
            <div>
                <Menu pointing>
                    {menuTabs}
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Input
                                icon="search"
                                placeholder="Search..."
                                onChange={handleSearchChange}
                                onFocus={handelSearchFocus}
                            />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                {currentPage}
            </div>
        </Container>
    );
}

export default App;
