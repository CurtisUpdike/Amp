import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [token ,setToken] = useState(null);

  useEffect(() => {
    fetch('/api/token')
      .then(response => response.json())
      .then(data => setToken(data.token));
    }, []);

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
        {token && <p>{token}</p>}
      </header>
    </div>
  );
}

export default App;
