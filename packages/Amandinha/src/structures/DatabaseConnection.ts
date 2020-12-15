import mongoose from 'mongoose';
import logger from '@menhera-tools/logger';

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err: Error) => {
    if (err) return logger.error(`(x) Error to connecting to database \n${err}`);
    return logger.info('Conectado com sucesso à database');
  }
);

const familiaSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  abilities: {
    type: Array,
  },
  boost: {
    type: Object,
  },
  members: {
    type: Array,
    default: [],
  },
  levelFamilia: {
    type: Number,
    default: 1,
  },
  bank: {
    type: String,
    default: '0',
  },
  nextLevel: {
    type: String,
    default: '15000',
  },
});

const familia = mongoose.model('Familia', familiaSchema);
export default familia;
