import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

async function main() {
  const MusicKit = window.MusicKit;
  try {
    const response = await fetch('/api/developerToken');
    const { developerToken } = await response.json();
    await MusicKit.configure({
      developerToken: developerToken,
      app: {
        name: 'Amp',
      },
    });
  } catch (err) {
    console.error(err);
  }

  root.render(
    <React.StrictMode>
      <App music={MusicKit.getInstance()} />
    </React.StrictMode>
  );
}

document.addEventListener('musickitloaded', main);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
