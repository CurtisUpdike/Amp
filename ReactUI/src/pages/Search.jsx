import { Segment } from "semantic-ui-react";

export default function Search(props) {
    return (
        <Segment>
            <h1>Search</h1>
            <p>Your query: {props.query}</p>
        </Segment>
    );
}
