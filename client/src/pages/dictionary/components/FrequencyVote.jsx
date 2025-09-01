import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { toggleWordFrequency } from "../../../features/word/wordSlice";

const FrequencyVote = ({ frequency, wordId }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(frequency?.userPoint || 0);
  const [hovered, setHovered] = useState(0);

  const handleVote = (value) => {
    if (value === selected) {
      setSelected(null);
    } else {
      setSelected(value);
    }

    dispatch(toggleWordFrequency({ wordId, point: value }));
  };

  const avg = frequency?.averagePoint || 0;
  const totalVoters = frequency?.totalVoters || 0;

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(avg);
    const partialFill = avg % 1;

    for (let i = 1; i <= fullStars; i++) {
      stars.push(
        <FaStar
          key={`full-${i}`}
          className={`w-5 h-5 ${hovered >= i ? "text-blue-400" : "text-yellow-400"}`}
        />
      );
    }

    if (partialFill > 0.1 && fullStars < 5) {
      stars.push(
        <div key="partial-star" className="relative w-5 h-5">
          <FaStar
            className={`absolute w-5 h-5 ${
              hovered > fullStars ? "text-blue-400" : "text-neutral-500"
            }`}
          />
          <div
            className="absolute overflow-hidden"
            style={{ width: `${partialFill * 100}%` }}
          >
            <FaStar
              className={`w-5 h-5 ${
                hovered > fullStars ? "text-blue-400" : "text-yellow-400"
              }`}
            />
          </div>
        </div>
      );
    }

    const emptyStars = 5 - Math.ceil(avg);
    for (let i = 1; i <= emptyStars; i++) {
      const starValue = fullStars + (partialFill > 0.1 ? 1 : 0) + i;
      stars.push(
        <FaStar
          key={`empty-${i}`}
          className={`w-5 h-5 ${
            hovered >= starValue ? "text-blue-400" : "text-neutral-500"
          }`}
        />
      );
    }

    return stars;
  };

  return (
    <div className="flex flex-col items-start gap-1 relative">
      <p>frequency</p>
      <div
        className="flex items-center gap-1 relative"
        onMouseLeave={() => setHovered(0)}
      >
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <div
              key={`hover-area-${value}`}
              className="w-5 h-5 relative"
              onMouseEnter={() => setHovered(value)}
              onClick={() => handleVote(value)}
            >
              <div className="absolute inset-0 z-10 cursor-pointer" />
            </div>
          ))}
        </div>

        <div className="flex items-center absolute gap-1 pointer-events-none">
          {renderStars()}
        </div>

        {selected > 0 && (
          <span className="ml-2 text-sm text-green-500">Your vote: {selected}</span>
        )}
      </div>

      <div className="text-xs text-neutral-400">
        {totalVoters === 0 ? (
          "Votes: 0"
        ) : (
          <>
            {totalVoters} voter{totalVoters > 1 && "s"} (avg: {avg.toFixed(1)})
          </>
        )}
      </div>
    </div>
  );
};

export default FrequencyVote;
