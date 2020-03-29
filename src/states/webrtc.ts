import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { webrtcActions } from '../actions/webrtc';

export interface WebRtcState {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
}

const initialState: WebRtcState = {
  localStream: null,
  remoteStream: null
}

export const webrtcReducer = reducerWithInitialState(initialState)
  .case(webrtcActions.setLocalStream, (state, localStream) => {
    return Object.assign({}, state, { localStream });
  })
  .case(webrtcActions.setRemoteStream, (state, remoteStream) => {
    return Object.assign({}, state, { remoteStream });
  })
;
