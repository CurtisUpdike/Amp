import LoginMessage from "./features/LogInMessage";
import useAuth from "./hooks/useAuth";
import { Container } from "semantic-ui-react";

export default function App() {
    const auth = useAuth();

    return (
        <Container>
            {!auth.isAuthorized && <LoginMessage login={auth.authorize} />}
        </Container>
    );
}
