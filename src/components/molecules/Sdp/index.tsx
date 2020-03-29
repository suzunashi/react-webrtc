import React, { useState, useEffect } from 'react';
import './index.css';

type Props = {
  /** SDPに付与するストリーム */
  stream: MediaStream | null;
  /** 受信するストリーム */
  setRemoteStream: (steam: MediaStream) => void;
}

interface IceCandidate {
  sdpMLineIndex: any,
  sdpMid: any,
  candidate: any
}

const Sdp: React.FC<Props> = (props: Props) => {
  const { stream, setRemoteStream } = props;

  // 自分のRTCPeerConnection
  const [peer, setPeer] = useState<RTCPeerConnection>();
  // オファーSDPのテキスト表示
  const [offerSdpTxt, setOfferSdpTxt] = useState<string>('');
  // アンサーSDPのテキスト表示
  const [answerSdpTxt, setAnswerSdpTxt] = useState<string>('');
  // ICEcandidate
  const [iceCandidates, setIceCandidates] = useState<IceCandidate[]>([]);

  /**
   * RTCPeerConnectionのインスタンスを生成
   */
  const makeConnection = () => {
    const pcConfig = { iceServers: [] };
    try {
      const peerConnection = new RTCPeerConnection(pcConfig);
      peerConnection.onicecandidate = (e) => {
        if (e.candidate) {
          const candidate = {
            sdpMLineIndex: e.candidate.sdpMLineIndex,
            sdpMid: e.candidate.sdpMid,
            candidate: e.candidate.candidate
          }
          iceCandidates.push(candidate);
          setIceCandidates(iceCandidates);
          const elm = document.getElementById('icecandidates') as HTMLTextAreaElement;
          if (elm) {
            elm.value = JSON.stringify(iceCandidates);
          }
        } else {
          console.log(e);
        }
      }
      // ストリームをRTCPeerConnectionに追加
      if (stream) {
        stream.getTracks().forEach(track => {
          peerConnection.addTrack(track, stream);
        });
      }

      peerConnection.ontrack = e => {
        console.log("トラックスタート");
        if (e.streams && e.streams.length > 0) {
          setRemoteStream(e.streams[0]);
        }
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
      setPeer(peerConnection);
    }
  }

  /**
   * Answer SDPを生成
   */
  const makeAnswerSdp = async () => {
    const offerSdp = (document.getElementById("offer-sdp") as HTMLTextAreaElement).value;

    if (offerSdp.length <= 0) {
      alert('オファーSDPを入力してください');
      return;
    }

    const peerConnection = makeConnection();
    if (peerConnection) {
      // 相手のSDPをリモートとして登録
      peerConnection.setRemoteDescription(JSON.parse(offerSdp));
      // アンサーSDPを生成
      const answerSdp = await peerConnection.createAnswer();
      // 自分のアンサーSDPをローカルとして登録
      peerConnection.setLocalDescription(answerSdp);
      // setAnswerSdpTxt((JSON.stringify(answerSdp)).replace(/\\r\\n/g, '\n'));
      setAnswerSdpTxt(JSON.stringify(answerSdp));
    }
  }

  const setAnswerSdp = () => {
    const answerSdp = (document.getElementById("answer-sdp") as HTMLTextAreaElement).value;

    if (!peer) {
      alert('自分のPeerConnectionが登録されていません');
    }

    if (answerSdp.length <= 0) {
      alert('アンサーSDPを入力してください');
      return;
    }
    if (peer) {
      try {
        peer.setRemoteDescription(JSON.parse(answerSdp));
        setPeer(peer);
        console.log("アンサーSDPの登録に成功しました");
      } catch (e) {
        console.error("アンサーSDPの登録に失敗しました");
      }
    }
  }

  const setOnIceCandidate = () => {
    const recieveIce = (document.getElementById("recieve-ice-candidates") as HTMLTextAreaElement).value;

    if (recieveIce.length <= 0) {
      alert('受信するICE Candidatesを入力してください');
      return;
    }

    const recieveIceArr = JSON.parse(recieveIce) as Array<IceCandidate>;
    recieveIceArr.forEach((ice: IceCandidate) => {
      const candidate = new RTCIceCandidate(
        {
          sdpMLineIndex: ice.sdpMLineIndex,
          sdpMid: ice.sdpMid,
          candidate: ice.candidate
        });
      if (peer) {
        peer.addIceCandidate(candidate);
      }
    });
    setPeer(peer);
  }

  const confirmPeer = () => {
    console.log('Peerコネクションの状態');
    console.log(peer);
  }

  return (
    <>
      <div className="sdp-area">
        <button onClick={makeOfferSdp}>オファーSDP生成</button>
        <textarea id="offer-sdp" defaultValue={offerSdpTxt} onChange={e => setOfferSdpTxt(JSON.stringify(e.target.value))} />
        <hr />
        <button onClick={makeAnswerSdp}>アンサーSDP生成</button>
        <textarea id="answer-sdp" defaultValue={answerSdpTxt} onChange={e=> setAnswerSdpTxt(JSON.stringify(e.target.value))}/>
        <button onClick={setAnswerSdp}>アンサーSDP登録</button>
      </div>
      <hr />
      <div className="sdp-area">
        <span>送信ICE Canididate一覧</span>
        <textarea id="icecandidates" />
        <hr />
        <span>受信ICE Canididate一覧</span>
        <textarea id="recieve-ice-candidates" />
        <button onClick={setOnIceCandidate}>ICE Candidate一覧登録</button>
      </div>
      <hr />
      <button onClick={confirmPeer}>確認</button>
    </>
  );
}

export default Sdp;
