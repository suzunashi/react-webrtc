import React, { useEffect } from 'react';

type Props = {
  width: number;
  height: number;
  setStream: (stream: MediaStream) => void;
}

export const useDidMount = (func: Function) => useEffect(() => { func() }, []);

const Video: React.FC<Props> = (props: Props) => {
  const { width, height, setStream } = props;

  useDidMount(async () => {
    const mySteram = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    const elm = document.getElementById("player") as HTMLVideoElement;
    if (elm) {
      elm.srcObject = mySteram;
    }
    setStream(mySteram);
  });

  return (
    <video
      id="player"
      width={width}
      height={height}
      controls
      autoPlay={true}
      playsInline={true} // インライン再生（iPhone用）
    />
  );
}

export default Video;
