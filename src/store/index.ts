import { createStore, combineReducers } from 'redux';
import { WebRtcState, webrtcReducer } from '../states/webrtc';
import { DevicesState, devicesReducer } from '../states/devices';

export type AppState = {
  devices: DevicesState;
  webrtc: WebRtcState;
}

const store = createStore(
  combineReducers<AppState>({
    devices: devicesReducer,
    webrtc: webrtcReducer
  })
);

export default store;
