interface TranscriptBlock {
  start: number;
  end: number;
  text: string;
}

interface Props {
  transcript: TranscriptBlock[];
  onTimestampClick: (time: number) => void;
}

const TranscriptPanel: React.FC<Props> = ({ transcript, onTimestampClick }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow max-h-[80vh] overflow-y-auto">
      <h3 className="text-xl font-semibold mb-2">Transcript</h3>
      <div className="space-y-3">
        {transcript.map((block, i) => (
          <div
            key={i}
            onClick={() => onTimestampClick(block.start)}
            className="cursor-pointer hover:bg-gray-100 p-2 rounded"
          >
            <p className="text-sm text-gray-500">{formatTime(block.start)}</p>
            <p>{block.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export default TranscriptPanel;
