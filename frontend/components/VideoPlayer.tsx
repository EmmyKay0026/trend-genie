import ReactPlayer from "react-player";
import { useRef } from "react";

interface Props {
  url: string;
  onTimeUpdate: (time: number) => void;
}

const VideoPlayer: React.FC<Props> = ({ url, onTimeUpdate }) => {
  const playerRef = useRef<ReactPlayer | null>(null);

  return (
    <div className="aspect-video bg-black rounded-xl overflow-hidden shadow">
      <ReactPlayer
        ref={playerRef}
        url={url}
        controls
        width="100%"
        height="100%"
        onProgress={(state) => onTimeUpdate(state.playedSeconds)}
      />
    </div>
  );
};

export default VideoPlayer;
