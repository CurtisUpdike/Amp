import LoginMessage from "./features/LogInMessage";
import Player from "./features/Player";
import useAuth from "./hooks/useAuth";
import { Container } from "semantic-ui-react";

export default function App() {
    const auth = useAuth();

    return (
        <Container style={{ marginTop: "3em" }} text>
            {!auth.isAuthorized && <LoginMessage login={auth.authorize} />}
            <Player />
        </Container>
    );
}
