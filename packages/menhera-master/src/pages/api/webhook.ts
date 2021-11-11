import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<unknown> => {
  const { content, messageId } = req.body;

  const response =
    messageId.length > 10
      ? await axios
          .patch(`${process.env.WEBHOOK_URL}/messages/${messageId}`, {
            content,
            allowed_mentions: {
              parse: ['roles'],
            },
          })
          .catch(a => a.toJSON())
      : await axios
          .post(`${process.env.WEBHOOK_URL}`, {
            content,
            allowed_mentions: {
              parse: ['roles'],
            },
          })
          .catch(a => a.toJSON());

  return res.status(201).json({ code: response?.status });
};
