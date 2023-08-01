import { useEffect, useState } from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import TrackList from "../features/TrackList/TrackList";

export default function Search({ query }) {
    const [state, setState] = useState({ status: "loading", data: [] });

    useEffect(() => {
        (async () => {
            const tracks = await search(query);
            if (tracks.length > 0) {
                setState({
                    status: "success",
                    data: tracks,
                });
            } else {
                setState({ status: "failed", data: [] });
            }
        })();
    }, [query]);

    let content;
    if (state.status === "loading") {
        content = (
            <Dimmer active inverted>
                <Loader>Loading</Loader>
            </Dimmer>
        );
    }
    if (state.status === "success") {
        content = <TrackList tracks={state.data} />;
    }
    if (state.status === "failed") {
        content = (
            <div>
                Sorry! We could not find any results for <em>{query}</em>
            </div>
        );
    }
    if (query.length === 0) {
        content = null;
    }

    return (
        <Segment style={{ minHeight: "300px" }}>
            <h1>Search</h1>
            {content}
        </Segment>
    );
}

const search = async (query) => {
    const music = window.MusicKit.getInstance();
    query = query.trim();

    if (query.length === 0) return [];

    try {
        const response = await music.api.music(
            "/v1/catalog/{{storefrontId}}/search",
            {
                term: query,
                types: ["songs"],
                l: "en-us",
                limit: 15, // max is 25
            },
        );

        const {
            data: {
                results: {
                    songs: { data: tracks },
                },
            },
        } = response;

        return tracks;
    } catch {
        return [];
    }
};
