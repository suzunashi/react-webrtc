import React, { useEffect } from 'react';

type Props = {
  width: number;
  height: number;
  localStream: MediaStream | null;
  setStream: (stream: MediaStream) => void;
}
const Video: React.FC<Props> = (props: Props) => {
  const { width, height, localStream, setStream } = props;

  useEffect(() => {
    const f = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(stream);
    };
    f();
  }, []);

  useEffect(() => {
    const elm = document.getElementById("player") as HTMLVideoElement;
    if (elm) {
      elm.srcObject = localStream;
    }
  }, [localStream]);

  return (
    <video
      id="player"
      width={width}
      height={height}
      controls
      autoPlay={true}
      playsInline={true} // インライン再生（iPhone用）
      muted={true} // 無音
    />
  );
}

export default Video;
