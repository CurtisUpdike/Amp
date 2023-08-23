import { Message, Button } from "semantic-ui-react";

export default function LoginBanner(props) {
  function handleClick() {
    props.login();
  }

  return (
    <Message info>
      Playback is limited to 30 seconds.{" "}
      <Button compact onClick={handleClick}>
        Log in
      </Button>{" "}
      or <a href="https://www.apple.com/apple-music/">Sign up</a> for the full
      experience.
    </Message>
  );
}
