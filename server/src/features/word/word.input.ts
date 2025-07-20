import { CreateWordDTO, CreateWordFrequencyDTO, getWordFrequencyByWordIdDTO } from "./word.dto";

export type createWordInput = CreateWordDTO;
export type toggleWordFrequencyInput = CreateWordFrequencyDTO &
  getWordFrequencyByWordIdDTO & { userId: string };
