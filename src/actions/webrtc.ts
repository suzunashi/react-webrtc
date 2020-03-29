import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const webrtcActions = {
  setLocalStream: actionCreator<MediaStream>('SET_LOCAL_STREAM'),
  setRemoteStream: actionCreator<MediaStream>('SET_REMOTE_STREAM')
}
