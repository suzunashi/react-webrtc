import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const webrtcActions = {
  setLocalStream: actionCreator<any>('SET_LOCAL_STREAM')
}
