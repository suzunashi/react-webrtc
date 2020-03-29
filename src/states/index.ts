import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { webrtcActions } from '../actions';

export interface WebRtcState {
  localStream: MediaStream | null;
}

const initialState: WebRtcState = {
  localStream: null
}

export const webrtcReducer = reducerWithInitialState(initialState)
  .case(webrtcActions.setLocalStream, (state, localStream) => {
    return Object.assign({}, state, { localStream });
  })
