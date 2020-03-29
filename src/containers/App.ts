import { Action } from 'typescript-fsa';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { webrtcActions } from '../actions';
import App from '../components/pages/App';

export interface AppActions {
  setLocalStream: (localStream:MediaStream) => Action<any>;
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.webrtc);
}

function mapDispatchToProps(dispatch: Dispatch<Action<any>>) {
  return {
    setLocalStream: (localStream: MediaStream) => dispatch(webrtcActions.setLocalStream(localStream))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
