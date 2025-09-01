import { getMyWordHistory } from "../../features/word-history/wordHistorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { timeAgo } from "../../utils/timeAgo";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";

const MyHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { history, loading } = useSelector((store) => store.wordHistory);

  const handleGoWordInfo = (word) => {
    navigate(`/dictionary/${word}`);
  };

  useEffect(() => {
    dispatch(getMyWordHistory());
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="text-white">
      <div className="flex flex-col gap-2  ">
        {history && history.length > 0 ? (
          history.map((h, index) => (
            <div
              onClick={() => handleGoWordInfo(h.wordName)}
              key={index}
              className="flex gap-2 items-center p-4 justify-between sm:hover:bg-neutral-900 sm:cursor-pointer"
            >
              <div className="font-medium text-sm"> {h.wordName}</div>
              <div className="font-medium text-xs text-neutral-500">
                {timeAgo(h.lastSearch)}
              </div>
            </div>
          ))
        ) : (
          <div>There is no history</div>
        )}
      </div>
    </div>
  );
};

export default MyHistory;
