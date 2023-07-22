import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [hello ,setHello] = useState(null);

  useEffect(() => {
    fetch('/api')
      .then(response => response.text())
      .then(data => setHello(data));
    });

  return (
    <div className="App">
      <header className="App-header">
        {hello && <h1>{hello}</h1>}
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
      </header>
    </div>
  );
}

export default App;
