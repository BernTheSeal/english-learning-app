import axios from "axios";

import { DictionaryError } from "./dictionary.error";
import { HTTP_ERROR_STATUS } from "../../config/httpStatus";

const fetchWord = async (word: string): Promise<unknown> => {
  try {
    const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

    return res.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      throw new DictionaryError(
        `The word "${word}" was not found in the dictionary.`,
        HTTP_ERROR_STATUS.NOT_FOUND,
        { word }
      );
    }

    throw new DictionaryError(
      "The dictionary service is currently unavailable. Please try again later.",
      HTTP_ERROR_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

export default { fetchWord };
