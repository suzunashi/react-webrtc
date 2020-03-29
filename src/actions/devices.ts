import actionCreatorFactory from 'typescript-fsa';

/**
 * マイク・カメラのデバイス
 */
export interface Device {
  /** デバイスID */
  id: string;
  /** デバイスのラベル */
  label: string;
}

const actionCreator = actionCreatorFactory();

export const devicesActions = {
  setCameraDeviceId: actionCreator<string>('SET_CAMERA_DEVICE_ID'),
  setCameraDeviceList: actionCreator<Device[]>('SET_CAMERA_DEVICE_LIST'),
}
