import { Header } from "semantic-ui-react";

const NowPlayingDisplay = ({ nowPlayingItem, queueIsEmpty }) => {
    let content;
    if (!nowPlayingItem || queueIsEmpty) {
        content = " ";
    } else {
        const {
            attributes: { name, artistName },
        } = nowPlayingItem;
        content = name + " - " + artistName;
    }
    return (
        <Header as="h4" block>
            {content}
        </Header>
    );
};

export default NowPlayingDisplay;
