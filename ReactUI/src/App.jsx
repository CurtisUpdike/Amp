import { useCallback, useState } from "react";
import { debounce } from "./Utils";
import useAuth from "./hooks/useAuth";

import { Container, Menu, Input } from "semantic-ui-react";
import LoginMessage from "./features/LogInMessage";
import Player from "./features/Player";
import Home from "./pages/Home";
import Queue from "./pages/Queue";
import Search from "./pages/Search";

export default function App() {
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

    const pages = [
        {
            name: "home",
            component: <Home />,
        },
        {
            name: "queue",
            component: <Queue />,
        },
        {
            name: "search",
            component: <Search />,
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

    let currentPage;
    if (activePage === "search") {
        currentPage = <Search query={query} />;
    } else {
        currentPage = pages.find((p) => p.name === activePage).component;
    }

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
                            />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                {currentPage}
            </div>
        </Container>
    );
}
