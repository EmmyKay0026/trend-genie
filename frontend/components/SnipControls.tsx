interface Props {
  currentTime: number;
  snip: { start: number; end: number } | null;
  setSnip: (snip: { start: number; end: number } | null) => void;
}

const SnipControls: React.FC<Props> = ({ currentTime, snip, setSnip }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gray-100 p-4 rounded-xl">
      <div className="space-x-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setSnip({ ...(snip! || {}), start: currentTime })}
        >
          Mark Start
        </button>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => setSnip({ ...(snip! || {}), end: currentTime })}
        >
          Mark End
        </button>
      </div>

      {snip?.start != null && snip?.end != null && (
        <div className="text-sm text-gray-700 mt-2 sm:mt-0">
          Selected clip: {formatTime(snip.start)} – {formatTime(snip.end)}
        </div>
      )}
    </div>
  );
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export default SnipControls;
