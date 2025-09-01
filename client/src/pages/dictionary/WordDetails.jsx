import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getWordFromDictionary } from "../../features/dictionary/dictionarySlice";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import { IoIosArrowRoundBack } from "react-icons/io";
import { TbPointFilled } from "react-icons/tb";
import { FaStar } from "react-icons/fa";

import { BsPatchCheckFill } from "react-icons/bs";
import PronunciationPlayer from "./components/PronunciationPlayer";
import FrequencyVote from "./components/FrequencyVote";

const WordDetails = () => {
  const { word } = useParams();
  const { loading, wordInfo } = useSelector((store) => store.dictionary);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWordFromDictionary(word));
  }, [word]);

  if (loading) return <Loading />;

  return (
    <div className="text-white  w-full">
      <div className="inline-flex p-4">
        <Link to="/dictionary" className=" flex gap-1  items-center text-neutral-500">
          <IoIosArrowRoundBack className="text-2xl" />
          <span> back</span>
        </Link>
      </div>
      <div className="flex flex-col mt-4 w-full">
        {wordInfo && (
          <div>
            <div className="px-4 flex flex-col gap-4">
              <div className="flex gap-3 items-center flex-wrap ">
                <h3 className="text-3xl font-semibold  ">{wordInfo.word}</h3>
                {wordInfo.first3k && (
                  <div className="relative group ">
                    <BsPatchCheckFill className="text-blue-500" />
                    <div
                      className="absolute bottom-full mb-1 text-xs bg-black text-white px-2 py-1 rounded opacity-0 
                    group-hover:opacity-100 transition whitespace-nowrap"
                    >
                      first 3000 words
                    </div>
                  </div>
                )}
                <PronunciationPlayer phonetics={wordInfo.phonetics} />
              </div>
              <FrequencyVote frequency={wordInfo.frequency} wordId={wordInfo._id} />
            </div>

            <div className="flex flex-col">
              {wordInfo.meanings.map((m, index) => (
                <div
                  className=" border-t border-neutral-800 mt-4 p-4 flex flex-col gap-4"
                  key={index}
                >
                  <h4 className="text-xl font-semibold  self-start  px-2 py-1 rounded text-white bg-neutral-800">
                    {m.partOfSpeech}
                  </h4>

                  {m.definitions.length > 0 && (
                    <div className="text-sm   flex flex-col gap-8">
                      {m.definitions.map((d, index) => (
                        <div className="space-y-1" key={index}>
                          <div className="font-bold text-neutral-300 flex">
                            <TbPointFilled className=" w-1/20" />
                            <p className=" w-19/20">{d.definition}</p>
                          </div>
                          {d.example !== "" && (
                            <div className="text-neutral-500  flex gap-1">
                              <FaStar className="w-1/20 text-xs " />
                              <p className=" w-19/20"> {d.example}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {m.synonyms.length > 0 && (
                    <div className="p-4 rounded-xl bg-neutral-900 flex flex-col gap-2">
                      <h4 className="font-bold text-blue-300">synonyms</h4>
                      <div className="flex  justify-start flex-wrap gap-2 text-sm">
                        {m.synonyms.map((s, index) => (
                          <p className="text-neutral-500" key={index}>
                            {s}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {m.antonyms.length > 0 && (
                    <div className="p-4 rounded-xl bg-neutral-900 flex flex-col gap-2">
                      <h4 className="font-bold text-red-300"> antonyms</h4>
                      <div className="flex  justify-start flex-wrap gap-2 text-sm">
                        {m.antonyms.map((a, index) => (
                          <p className="text-neutral-500" key={index}>
                            {" "}
                            {a}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordDetails;
