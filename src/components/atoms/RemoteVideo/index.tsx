import React, { useEffect } from 'react';

type Props = {
  width: number;
  height: number;
  stream: MediaStream | null;
}

const RemoteVideo: React.FC<Props> = (props: Props) => {
  const { width, height, stream } = props;

  useEffect(() => {
    const elm = document.getElementById("remoteVideo") as HTMLVideoElement;
    if (elm && stream) {
      elm.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      id="remoteVideo"
      width={width}
      height={height}
      controls
      autoPlay={true}
      playsInline={true} // インライン再生（iPhone用）
      muted={true} // 無音
    />
  );
}

export default RemoteVideo;
