import React from 'react';
import './App.css';
import Video from './components/atoms/Video';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        React + WebRTC
      </header>
      <p>カメラとマイクにアクセスし映像を表示する</p>
      <Video
        width={640}
        height={480}
        />
    </div>
  );
}

export default App;
