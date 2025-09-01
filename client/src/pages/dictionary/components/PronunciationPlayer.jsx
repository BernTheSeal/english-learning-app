import { HiMiniSpeakerWave } from "react-icons/hi2";

const PronunciationPlayer = ({ phonetics }) => {
  const handlePlay = (url) => {
    if (!url) return;
    const audio = new Audio(url);
    audio.play();
  };

  return (
    <>
      {phonetics.map((p, index) => (
        <div
          key={index}
          onClick={() => handlePlay(p.audio)}
          className="p-2 border-1 border-neutral-800 
            sm:hover:bg-neutral-800 sm:hover:text-blue-400 sm:cursor-pointer 
            rounded-2xl flex items-center gap-1"
        >
          <p>{p.accent}</p>
          <p className="text-sm text-neutral-500">{p.text}</p>
          <HiMiniSpeakerWave className="text-xl " />
        </div>
      ))}
    </>
  );
};

export default PronunciationPlayer;
