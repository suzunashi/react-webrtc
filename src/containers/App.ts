import { Action } from 'typescript-fsa';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { webrtcActions } from '../actions/webrtc';
import { devicesActions, Device } from '../actions/devices';
import App from '../components/pages/App';

export interface AppActions {
  setLocalStream: (localStream: MediaStream) => Action<MediaStream>;
  setRemoteStream: (remoteStream: MediaStream) => Action<MediaStream>;
  setCameraDeviceList: (deviceList: Device[]) => Action<Device[]>;
  setCameraDeviceId: (deiceId: string) => Action<string>;
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, { ...appState.webrtc, ...appState.devices});
}

function mapDispatchToProps(dispatch: Dispatch<Action<any>>) {
  return {
    setLocalStream: (localStream: MediaStream) => dispatch(webrtcActions.setLocalStream(localStream)),
    setRemoteStream: (remoteStream: MediaStream) => dispatch(webrtcActions.setRemoteStream(remoteStream)),
    setCameraDeviceList: (deviceList: Device[]) => dispatch(devicesActions.setCameraDeviceList(deviceList)),
    setCameraDeviceId: (deiceId: string) => dispatch(devicesActions.setCameraDeviceId(deiceId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
