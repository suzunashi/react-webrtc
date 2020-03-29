import React from 'react';

type Props = {
  width: number;
  height: number;
}

class Video extends React.Component<Props> {

  ref: React.RefObject<HTMLVideoElement>;

  constructor(props:Props) {
    super(props);
    this.ref = React.createRef<HTMLVideoElement>();
  }

  componentDidMount() {
    const { ref } = this;
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (ref !== null && ref.current !== null) {
          ref.current.srcObject = stream
        }
      })
      .catch(console.log)
  }

  render() {
    const { width, height } = this.props;
    return (
      <video
        width={width}
        height={height}
        controls
        autoPlay={true}
        playsInline={true} // インライン再生（iPhone用）
        ref={this.ref}
      />
    );
  }
}

export default Video;
