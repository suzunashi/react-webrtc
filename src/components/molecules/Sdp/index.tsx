import React, { useState } from 'react';
import './index.css';

type Props = {
  /** SDPに付与するストリーム */
  stream: MediaStream | null;
}

const Sdp: React.FC<Props> = (props: Props) => {
  const { stream } = props;

  // 自分のRTCPeerConnection
  const [peer, setPeer] = useState<RTCPeerConnection>();

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
      const peerConnection = new RTCPeerConnection(pcConfig);
      peerConnection.onicecandidate = (e) => {
        if (e.candidate) {
          console.log(e.candidate);
        } else {
          console.log(e);
        }
      }
      // ストリームをRTCPeerConnectionに追加
      if (stream) {
        stream.getTracks().forEach(track => {
          peerConnection.addTrack(track);
        });
      }
      return peerConnection;
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
      console.log('登録', peerConnection);
      setPeer(peerConnection);
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

  const setAnswerSdp = () => {
    if (!peer) {
      alert('自分のPeerConnectionが登録されていません');
    }

    if (answerSdpTxt.length <= 0) {
      alert('アンサーSDPを入力してください');
      return;
    }
    if (peer) {
      peer.setRemoteDescription(JSON.parse(answerSdpTxt));
      setPeer(peer);
      console.error('登録', peer);

    }
  }

  return (
    <div className="sdp-area">
      <button onClick={makeOfferSdp}>オファーSDP生成</button>
      <textarea defaultValue={offerSdpTxt} onChange={e => setAnswerSdpTxt(JSON.stringify(e.target.value))} />
      <hr />
      <button onClick={makeAnswerSdp}>アンサーSDP生成</button>
      <textarea defaultValue={answerSdpTxt} onChange={e=> setAnswerSdpTxt(JSON.stringify(e.target.value))}/>
      <button onClick={setAnswerSdp}>アンサーSDP登録</button>
    </div>
  );
}

export default Sdp;
