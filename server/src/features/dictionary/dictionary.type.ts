import { z } from "zod";
import { getWordFromDictionarySChema } from "./dictionary.schema";
import { ValidatedRequestHandler } from "../../types/ValidateRequestHandler";

export interface Phonetics {
  text: string;
  audio: string;
  accent: string;
}

export interface Definitions {
  definition: string;
  example: string;
}

export interface Meanings {
  partOfSpeech: string;
  synonyms: string[];
  antonyms: string[];
  definitions: Definitions[];
}

export interface NormalizedWord {
  word: string;
  phonetics: Phonetics[];
  meanings: Meanings[];
}

export type GetWordFromDictionaryDTO = z.infer<typeof getWordFromDictionarySChema>;

export type GetWordFromDictionaryHandler = ValidatedRequestHandler<GetWordFromDictionaryDTO, any, {}, {}>;
