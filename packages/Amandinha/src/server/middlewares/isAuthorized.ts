import { Request, Response, NextFunction } from 'express';
import nacl from 'tweetnacl';

export default (req: Request, res: Response, next: NextFunction): Response | void => {
  const PUBLIC_KEY = process.env.API_PUBLIC_KEY as string;

  const signature = req.get('X-Signature-Ed25519');
  const timestamp = req.get('X-Signature-Timestamp');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { rawBody } = req;

  if (!signature || !timestamp || !rawBody) return res.status(401).end('invalid request signature');

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + rawBody),
    Buffer.from(signature, 'hex'),
    Buffer.from(PUBLIC_KEY, 'hex')
  );

  if (!isVerified) {
    return res.status(401).end('invalid request signature');
  }

  return next();
};
