import mongoose, { Schema, Document } from 'mongoose';

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const initiatedAt = Date.now();

const statusSchema: Schema = new mongoose.Schema({
  _id: { type: String },
  ping: { type: Number, default: 0 },
  disabledCommands: { type: Array },
  lastPingAt: { type: String },
  uptime: { type: Number },
});

interface PingLabel extends Document {
  ping: number;
  lastPingAt: number;
  uptime: number;
}
const status = mongoose.model<PingLabel>('status', statusSchema);

setInterval(async () => {
  const start = Date.now();
  const data = await status.findById('api');
  data.ping = Date.now() - start;
  data.lastPingAt = Date.now();
  data.uptime = Date.now() - initiatedAt;
  await data.save();
}, 1000 * 30);
