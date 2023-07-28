import { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";

export default function Search({ query }) {
    const [searchResults, setSearchResults] = useState(null);

    useEffect(() => {
        searchCatalog(query, setSearchResults);
    }, [query]);

    return (
        <Segment>
            <h1>Search</h1>
            {searchResults &&
                searchResults.map((s) => (
                    <p key={s.id}>
                        {s.attributes.name + ", by " + s.attributes.artistName}
                    </p>
                ))}
        </Segment>
    );
}

const searchCatalog = async (query, callback) => {
    const music = window.MusicKit.getInstance();

    if (query === "") return;

    const queryParameters = {
        term: query,
        types: ["songs"],
        l: "en-us",
    };

    const response = await music.api.music(
        "/v1/catalog/{{storefrontId}}/search",
        queryParameters,
    );

    const {
        data: {
            results: {
                songs: { data: songs },
            },
        },
    } = response;
    callback(songs);
};
