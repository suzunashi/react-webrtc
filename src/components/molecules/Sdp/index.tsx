import React, { useState } from 'react';

type Props = {
  /** SDPに付与するストリーム */
  stream: MediaStream | null;
}

const Sdp: React.FC<Props> = (props: Props) => {
  const { stream } = props;

  // SDPのテキスト表示
  const [sdpTxt, setSdpTxt] = useState<string>('');

  /**
   * RTCPeerConnectionのインスタンスを生成
   */
  const makeConnection = () => {
    const pcConfig = { iceServers: [] };
    try {
      const peer = new RTCPeerConnection(pcConfig);
      peer.onicecandidate = (e) => {
        if (e.candidate) {
          console.log(e.candidate);
        } else {
          console.log(e);
        }
      }
      // ストリームをRTCPeerConnectionに追加
      if (stream) {
        stream.getTracks().forEach(track => {
          peer.addTrack(track);
        });
      }
      return peer;
    } catch (e) {
      console.error(`Failed to create peerConnection: ${e}`);
    }
    return null;
  }

  /**
   * Offer SDPを生成
   */
  const makeSdp = async () => {
    const peerConnection = makeConnection();
    if (peerConnection) {
      const offer = await peerConnection.createOffer();
      peerConnection.setLocalDescription(offer);
      setSdpTxt((JSON.stringify(offer)).replace(/\\r\\n/g,'\n'));
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
