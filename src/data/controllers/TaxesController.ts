/* eslint-disable no-param-reassign */
import { Request, Response } from 'express';
import { getTopTaxes } from '../database/DatabaseQueries';

export default class TaxesController {
  public static async getTopTaxes(req: Request, res: Response): Promise<Response> {
    const { skip = 0 } = req.query;
    const { bannedUsers = [] } = req.body;

    const data = await getTopTaxes(Number(skip), bannedUsers);

    return res.status(200).send(data);
  }
}
