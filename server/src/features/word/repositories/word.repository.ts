import { Word } from "../models/word.model";
import { createWordInput } from "../word.input";

const create = async ({ name, level, first3k }: createWordInput) => {
  return await Word.create({
    name,
    level,
    first3k,
  });
};

const getByName = async (name: string) => {
  return await Word.findOne({ name });
};

const getById = async (wordId: string) => {
  return await Word.findById(wordId);
};

export default { create, getById, getByName };
