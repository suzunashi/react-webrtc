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

      <div className="video-area">
        <div className="video-col">
          <Video
            setStream={setLocalStream}
            width={400}
            height={300}
          />
          <Sdp
            stream={localStream}
            isEnable={false}
          />
        </div>
        <div className="video-col">
          <Video
            setStream={setLocalStream}
            width={400}
            height={300}
          />
          <Sdp
            stream={localStream}
            isEnable={true}
          />
        </div>
      </div>


    </div>
  );
}

export default App;
