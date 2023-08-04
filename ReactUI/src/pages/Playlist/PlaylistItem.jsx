import { List, Card, Button } from "semantic-ui-react";
import { formatArtworkURL, formatMilliseconds } from "../../Utils";
import { Draggable } from "react-beautiful-dnd";

const playlistItemStyles = {
    padding: "8px",
    display: "grid",
    gridTemplateColumns: "30px 3fr 2fr 2fr 0.5fr 0.5fr",
    gridColumnGap: "10px",
    alignItems: "center",
};

const imgStyles = {
    width: "30px",
    height: "30px",
};

const textStyles = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    wordWrap: "normal",
};

const PlaylistItem = ({ item, index, remove, isCurrentItem }) => (
    <Draggable draggableId={`${item.id}-${index}`} index={index}>
        {(provided) => (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <List.Item
                    style={{ padding: "5px 0", boxSizing: "border-box" }}
                >
                    <Card fluid style={playlistItemStyles}>
                        <div>
                            <img
                                alt=""
                                src={formatArtworkURL(
                                    item.attributes.artwork,
                                    60,
                                )}
                                style={imgStyles}
                            ></img>
                        </div>
                        <div style={textStyles}>{item.attributes.name}</div>
                        <div style={textStyles}>
                            {item.attributes.artistName}
                        </div>
                        <div style={textStyles}>
                            {item.attributes.albumName}
                        </div>
                        <div>
                            {formatMilliseconds(
                                item.attributes.durationInMillis,
                            )}
                        </div>
                        <Button
                            basic
                            icon="x"
                            onClick={remove}
                            title="Play next"
                            disabled={isCurrentItem}
                        />
                    </Card>
                </List.Item>
            </div>
        )}
    </Draggable>
);

export default PlaylistItem;
