import { Action } from 'typescript-fsa';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { webrtcActions } from '../actions';
import App from '../components/pages/App';

export interface AppActions {
  setLocalStream: (localStream: MediaStream) => Action<MediaStream>;
  setRemoteStream: (remoteStream: MediaStream) => Action<MediaStream>;
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.webrtc);
}

function mapDispatchToProps(dispatch: Dispatch<Action<MediaStream>>) {
  return {
    setLocalStream: (localStream: MediaStream) => dispatch(webrtcActions.setLocalStream(localStream)),
    setRemoteStream: (remoteStream: MediaStream) => dispatch(webrtcActions.setRemoteStream(remoteStream))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
