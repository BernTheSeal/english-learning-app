import { Word } from "../models/word.model";
import { createWordInput } from "../word.input";

const create = async ({ name, level, first3k, types }: createWordInput) => {
  return await Word.create({
    name,
    level,
    first3k,
    types,
  });
};

const getByName = async (name: string) => {
  return await Word.findOne({ name });
};

const getMultipleByName = async (names: string[]) => {
  return await Word.find({ name: { $in: names } });
};

const getById = async (wordId: string) => {
  return await Word.findById(wordId);
};

export default { create, getById, getByName, getMultipleByName };
