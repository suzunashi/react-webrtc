import React from 'react';
import './index.css';
import Video from '../../atoms/Video';
import Sdp from '../../molecules/Sdp';
import { WebRtcState } from '../../../states';
import { AppActions } from '../../../containers/App';

interface OwnProps { }
type AppProps = OwnProps & WebRtcState & AppActions;

const App: React.FC<AppProps> = (props: AppProps) => {
  const { localStream, setLocalStream } = props;

  return (
    <div className="App">
      <header className="App-header">
        React + WebRTC
      </header>
      <p>カメラとマイクにアクセスし映像を表示する</p>
      <Video
        setStream={setLocalStream}
        width={640}
        height={480}
      />
      <Sdp
        stream={localStream}
      />
    </div>
  );
}

export default App;
