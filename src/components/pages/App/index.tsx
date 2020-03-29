import React, { useEffect, ChangeEvent } from 'react';
import './index.css';
import Video from '../../atoms/Video';
import Sdp from '../../molecules/Sdp';
import { DevicesState } from '../../../states/devices';
import { WebRtcState } from '../../../states/webrtc';
import { AppActions } from '../../../containers/App';
import { Device } from '../../../actions/devices';
import DeviceList from '../../atoms/DeviceList';

interface OwnProps { }
type AppProps = OwnProps & DevicesState & WebRtcState & AppActions;

const App: React.FC<AppProps> = (props: AppProps) => {
  const { localStream, remoteStream, setLocalStream, setRemoteStream, cameraDeviceList, setCameraDeviceId,setCameraDeviceList } = props;

  useEffect(() => {
    const f = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      // カメラ一覧を選択
      const devices = await navigator.mediaDevices.enumerateDevices();
      let cameraDevices: Device[] = [];
      devices.forEach(device => {
        if (device.kind === 'videoinput') {
          cameraDevices.push({ id: device.deviceId, label: device.label });
        }
      });
      setCameraDeviceList(cameraDevices);
    };
    f();
  }, []);

  /**
   * カメラデバイス変更アクション
   * @param e
   */
  const onChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const deviceId = e.target.value;
    const stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId }, audio: true });
    setLocalStream(stream);
    setCameraDeviceId(deviceId);
  }

  return (
    <div className="App">
      <header className="App-header">
        WebRTCによる双方向通信（SDP, ICEの手動交換） on React + Typescript
      </header>
      <div className="video-area">
        <div className="video-col">
          <span>ローカル</span>
          <Video stream={localStream} width={400} height={400 / 16 * 9} />
          <DeviceList deviceList={cameraDeviceList} onChange={onChange} />
        </div>
        <div className="video-col">
          <span>リモート</span>
          <Video stream={remoteStream} width={400} height={400 / 16 * 9} />
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
