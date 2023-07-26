import logo from './logo.svg';
import './App.css';

function App({ music }) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>{music !== null ? "MusicKit has been configured!" : "Something went wrong with configuration :("}</p>
      </header>
    </div>
  );
}

export default App;
