import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { devicesActions, Device } from '../actions/devices';

export interface DevicesState {
  /** マイク・カメラのデバイス一覧 */
  cameraDeviceList: Device[];
  /** 選択したカメラのID */
  cameraDeivceId: string | null;
}

const initialState: DevicesState = {
  cameraDeviceList: [],
  cameraDeivceId: null
}

export const devicesReducer = reducerWithInitialState(initialState)
  .case(devicesActions.setCameraDeviceList, (state, cameraDeviceList) => {
    return Object.assign({}, state, { cameraDeviceList });
  })
  .case(devicesActions.setCameraDeviceId, (state, cameraDeivceId) => {
    return Object.assign({}, state, { cameraDeivceId });
  })
;
