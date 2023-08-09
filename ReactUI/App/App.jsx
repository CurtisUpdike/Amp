import { useCallback, useState } from "react";
import { debounce } from "./Utils";
import useAuth from "./useAuth";

import { Container, Menu, Input } from "semantic-ui-react";
import LoginMessage from "./LogInMessage";
import Player from "./Player";
import Playlist from "./Playlist";
import Search from "./Search";

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
                                onFocus={handleSearchFocus}
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
