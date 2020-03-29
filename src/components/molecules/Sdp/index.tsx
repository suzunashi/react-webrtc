import React, { useState } from 'react';

type Props = {}

const Sdp: React.FC<Props> = () => {

  const [sdpTxt, setSdpTxt] = useState<string>('');

  const makeConnection = () => {
    const pc_config = { iceServers: [] };
    let peer = null;
    try {
      peer = new RTCPeerConnection(pc_config);
      peer.onicecandidate = (e) => {
        if (e.candidate) {
          console.log(e.candidate);
        } else {
          console.log(e);
        }
      }
    } catch (e) {
      console.error(`Failed to create peerConnection:${e}`);
    }
    return peer;
  }

  const makeSdp = async () => {
    const peerConnection = makeConnection();
    if (peerConnection) {
      const offer = await peerConnection.createOffer();
      const sdpTemp = JSON.stringify(offer);
      setSdpTxt(sdpTemp);
    }

  }

  return (
    <div>
      <button onClick={makeSdp}>SDP生成</button>
      <textarea defaultValue={sdpTxt} />
    </div>
  );
}

export default Sdp;
