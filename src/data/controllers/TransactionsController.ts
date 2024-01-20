/* eslint-disable no-param-reassign */
import { Request, Response } from 'express';
import { createTransaction, getTransactions } from '../database/DatabaseQueries';

export default class TransactionsController {
  public static async postTransaction(req: Request, res: Response): Promise<Response> {
    const { authorId, targetId, amount, currencyType, reason } = req.body;
    if (!authorId || !targetId || !amount || !currencyType || !reason) {
      console.log(
        new Date().toISOString(),
        `Transaction error! ${authorId} ${targetId} ${amount} ${currencyType} ${reason}`
      );
      return res.sendStatus(400);
    }

    await createTransaction(authorId, targetId, amount, currencyType, reason);

    return res.sendStatus(201);
  }

  public static async getTransactionsFromUser(req: Request, res: Response): Promise<Response> {
    const { page = 1, types, users, currency } = req.query;

    if (!Array.isArray(users)) return res.sendStatus(400);

    if (!Array.isArray(types)) return res.sendStatus(400);

    if (!Array.isArray(currency)) return res.sendStatus(400);

    const data = await getTransactions(
      users as string[],
      Number(page),
      types as string[],
      currency as string[]
    );

    if (!data) return res.sendStatus(404);

    return res.status(200).send(data);
  }
}
