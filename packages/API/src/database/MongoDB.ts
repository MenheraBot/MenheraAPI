import mongoose, { Schema, Document } from 'mongoose';

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const statusSchema: Schema = new mongoose.Schema({
  _id: { type: String },
  ping: { type: Number, default: 0 },
  disabledCommands: { type: Array },
  lastPingAt: { type: String },
});

interface PingLabel extends Document {
  ping: number;
  lastPingAt: number;
}
const status = mongoose.model<PingLabel>('status', statusSchema);

setInterval(async () => {
  const start = Date.now();
  const data = await status.findById('api');
  data.ping = Date.now() - start;
  data.lastPingAt = Date.now();
  await data.save();
}, 1000 * 30);
