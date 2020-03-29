import React, { ChangeEvent } from 'react';
import { Device } from '../../../actions/devices';

type Props = {
  /** デバイス一覧 */
  deviceList: Device[];
  /** デバイス変更 */
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const DeviceList = (props:Props) => {
  const { deviceList, onChange } = props;

  return (
    <select onChange={onChange}>
      {deviceList.map(device =>
        <option key={`device-${device.id}`} value={device.id}>{device.label}</option>
      )}
    </select>
  )
}

export default DeviceList;
