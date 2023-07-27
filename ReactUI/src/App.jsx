import { useState } from "react";
import LoginMessage from "./features/LogInMessage";
import Player from "./features/Player";
import useAuth from "./hooks/useAuth";
import { Container, Menu, Input } from "semantic-ui-react";
import Home from "./pages/Home";
import Queue from "./pages/Queue";
import Search from "./pages/Search";

export default function App() {
    const auth = useAuth();
    const [activePanel, setActivePanel] = useState("home");

    const handleItemClick = (e, { name }) => setActivePanel(name);

    let panel;
    switch (activePanel) {
        case "home":
            panel = <Home />;
            break;
        case "queue":
            panel = <Queue />;
            break;
        case "search":
            panel = <Search />;
            break;
        default:
            panel = <Home />;
    }

    return (
        <Container style={{ marginTop: "3em" }} text>
            {!auth.isAuthorized && <LoginMessage login={auth.authorize} />}
            <Player />
            <div>
                <Menu pointing>
                    <Menu.Item
                        name="home"
                        active={activePanel === "home"}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        name="queue"
                        active={activePanel === "queue"}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        name="search"
                        active={activePanel === "search"}
                        onClick={handleItemClick}
                    />
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Input icon="search" placeholder="Search..." />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                {panel}
            </div>
        </Container>
    );
}
