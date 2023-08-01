import { List, Card, Button } from "semantic-ui-react";
import { formatArtworkURL, formatMilliseconds } from "../../Utils";
import styles from "./TrackList.module.css";

const trackListStyles = {
    padding: "8px",
    display: "grid",
    gridTemplateColumns: "30px 3fr 2fr 2fr 0.5fr 1fr",
    gridColumnGap: "10px",
    alignItems: "center",
};

const textStyles = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    wordWrap: "normal",
};

const buttonStyles = {
    margin: 0,
    padding: 0,
};

const renderDuration = (duration) => <div>{formatMilliseconds(duration)}</div>;

export default function TrackList(props) {
    const music = window.MusicKit.getInstance();

    const tracks = props.tracks || [];

    const Track = (t) => {
        async function playNow() {
            await music.setQueue({ song: t.id, startPlaying: true });
        }

        async function playNext() {
            if (music.queue.isEmpty) {
                playNow();
            } else {
                await music.playNext({ song: t.id });
            }
        }

        async function playLast() {
            if (music.queue.isEmpty) {
                playNow();
            } else {
                await music.playLater({ song: t.id });
            }
        }

        return (
            <List.Item key={t.id}>
                <Card fluid style={trackListStyles}>
                    <div className={styles.albumDislpay}>
                        <img
                            alt=""
                            src={formatArtworkURL(t.attributes.artwork, 60)}
                        ></img>
                        <Button
                            icon="play"
                            style={buttonStyles}
                            onClick={playNow}
                            title="Play"
                        />
                    </div>
                    <div style={textStyles}>{t.attributes.name}</div>
                    <div style={textStyles}>{t.attributes.artistName}</div>
                    <div style={textStyles}>{t.attributes.albumName}</div>
                    {renderDuration(t.attributes.durationInMillis)}
                    <Button.Group basic size="small">
                        <Button
                            icon="sort amount up"
                            onClick={playNext}
                            title="Play next"
                        />
                        <Button
                            icon="sort amount down"
                            onClick={playLast}
                            title="Play last"
                        />
                    </Button.Group>
                </Card>
            </List.Item>
        );
    };

    return <List>{tracks.map(Track)}</List>;
}
