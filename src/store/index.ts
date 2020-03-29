import { createStore, combineReducers } from 'redux';
import { webrtcReducer, WebRtcState } from '../states';

export type AppState = {
  webrtc: WebRtcState;
}

const store = createStore(
  combineReducers<AppState>({
    webrtc: webrtcReducer
  })
);

export default store;
