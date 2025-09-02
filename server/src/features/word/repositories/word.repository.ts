import { Word } from "../models/word.model";
import { createWordInput } from "../word.input";
import { Types } from "mongoose";

const findOrCreate = async ({ name, level, first3k, types }: createWordInput) => {
  return await Word.findOneAndUpdate(
    { name },
    { $setOnInsert: { name, level, first3k, types } },
    { new: true, upsert: true }
  );
};

const getByName = async (name: string) => {
  return await Word.findOne({ name });
};

const getMultipleByName = async (names: string[]) => {
  return await Word.find({ name: { $in: names } });
};

const getById = async (wordId: string | Types.ObjectId) => {
  return await Word.findById(wordId);
};

export default { findOrCreate, getById, getByName, getMultipleByName };
