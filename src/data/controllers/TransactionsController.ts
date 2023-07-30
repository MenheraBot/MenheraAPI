/* eslint-disable no-param-reassign */
import { Request, Response } from 'express';
import { createTransaction, getTransactions } from '../database/DatabaseQueries';

export default class TransactionsController {
  public static async postTransaction(req: Request, res: Response): Promise<Response> {
    const { authorId, targetId, amount, currencyType, reason } = req.body;
    if (!authorId || !targetId || !amount || !currencyType || !reason) {
      return res.sendStatus(400);
    }

    await createTransaction(
      authorId, targetId, amount, currencyType, reason
    );

    return res.sendStatus(201);
  }

  public static async getTransactionsFromUser(req: Request, res: Response): Promise<Response> {
    const { userId, page = 1 } = req.query;

    if (!userId) return res.sendStatus(400);

    const data = await getTransactions(userId.toString(), Number(page));

    if (!data) return res.sendStatus(404);

    return res.status(200).send(data);
  }
}
