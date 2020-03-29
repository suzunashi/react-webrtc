import React, { useEffect, useRef } from 'react';

type Props = {
  width: number;
  height: number;
  stream: MediaStream | null;
}
const Video: React.FC<Props> = (props: Props) => {
  const { width, height, stream } = props;
  const videoElm = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoElm.current !== null) {
      videoElm.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      ref={videoElm}
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
