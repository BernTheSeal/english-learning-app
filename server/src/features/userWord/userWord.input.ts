import { CreateUserWordDTO, TrackUserWordActivityDTO } from "./userWord.dto";
import { Types } from "mongoose";

export type idsInput = { userId: string; wordId: Types.ObjectId };

export type createUserWordInput = Omit<CreateUserWordDTO, "word"> & idsInput;

export type trackUserWordActivityInput = TrackUserWordActivityDTO["words"][0];
