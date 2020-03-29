import React, { useEffect } from 'react';
import './index.css';
import Video from '../../atoms/Video';
import Sdp from '../../molecules/Sdp';
import { WebRtcState } from '../../../states';
import { AppActions } from '../../../containers/App';

interface OwnProps { }
type AppProps = OwnProps & WebRtcState & AppActions;

const App: React.FC<AppProps> = (props: AppProps) => {
  const { localStream, remoteStream, setLocalStream, setRemoteStream } = props;

  useEffect(() => {
    const f = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      // カメラ一覧を選択
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      // setCameraDevices(videoDevices);
    };
    f();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        React + WebRTC
      </header>
      <p>カメラとマイクにアクセスし映像を表示する</p>

      <div className="video-area">
        <div className="video-col">
          <Video
            stream={localStream}
            width={400}
            height={300}
          />
        </div>
        <div className="video-col">
          <Video
            stream={remoteStream}
            width={400}
            height={300}
          />
        </div>
      </div>
      <Sdp
        stream={localStream}
        setRemoteStream={setRemoteStream}
      />
    </div>
  );
}

export default App;
