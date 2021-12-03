import Logger from '@menhera-tools/logger';
import { connect, Schema, model } from 'mongoose';

connect(process.env.MONGO_URI as string).then(() => Logger.info('[DATABASE] Conectada'));

const userSchema = new Schema({
  id: String,
  estrelinhas: Number,
});

const userModel = model('usersdb', userSchema);

export default async (userId: string, total: number): Promise<void> => {
  await userModel.updateOne({ id: userId }, { $inc: { estrelinhas: total } });
};
