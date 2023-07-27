import useMusicKit from "./hooks/useMusicKit";

export default function App() {
    const music = useMusicKit();

    if (music === null) {
        return <h1>Loading...</h1>;
    }

    return <div>MusicKit has been configured!</div>;
}
