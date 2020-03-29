import React, { useState } from 'react';
import './index.css';

type Props = {
  /** SDPに付与するストリーム */
  stream: MediaStream | null;
  /** SDP生成を有効にする */
  isEnable: boolean;
}

const Sdp: React.FC<Props> = (props: Props) => {
  const { stream, isEnable } = props;

  // オファーSDPのテキスト表示
  const [offerSdpTxt, setOfferSdpTxt] = useState<string>('');
  // アンサーSDPのテキスト表示
  const [answerSdpTxt, setAnswerSdpTxt] = useState<string>('');

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
  const makeOfferSdp = async () => {
    const peerConnection = makeConnection();
    if (peerConnection) {
      const offer = await peerConnection.createOffer();
      peerConnection.setLocalDescription(offer);
      // setOfferSdpTxt((JSON.stringify(offer)).replace(/\\r\\n/g, '\n'));
      setOfferSdpTxt(JSON.stringify(offer));
    }

  }

  /**
   * Answer SDPを生成
   */
  const makeAnswerSdp = async () => {
    if (offerSdpTxt.length <= 0) {
      alert('オファーSDPを入力してください');
      return;
    }

    const peerConnection = makeConnection();
    if (peerConnection) {
      // 相手のSDPをリモートとして登録
      peerConnection.setRemoteDescription(JSON.parse(offerSdpTxt));
      // アンサーSDPを生成
      const answerSdp = await peerConnection.createAnswer();
      // 自分のアンサーSDPをローカルとして登録
      peerConnection.setLocalDescription(answerSdp);
      // setAnswerSdpTxt((JSON.stringify(answerSdp)).replace(/\\r\\n/g, '\n'));
      setAnswerSdpTxt(JSON.stringify(answerSdp));
    }
  }

  return (
    <div className="sdp-area">
      <button onClick={makeOfferSdp} disabled={isEnable}>オファーSDP生成</button>
      <textarea defaultValue={offerSdpTxt} readOnly={!isEnable} onChange={!isEnable ? () => { } : (e) => { setOfferSdpTxt(e.target.value) }} />
      <hr />
      <button onClick={makeAnswerSdp} disabled={!isEnable}>アンサーSDP生成</button>
      <textarea defaultValue={answerSdpTxt} readOnly={isEnable} onChange={isEnable ? () => { } : (e) => { setAnswerSdpTxt(e.target.value) }} />
    </div>
  );
}

export default Sdp;
