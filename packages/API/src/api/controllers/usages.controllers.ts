/* eslint-disable no-param-reassign */
import { Request, Response } from 'express';
import {
  getInactiveUsersLastCommand,
  getMostUserAndCommand,
  getTopCommands,
  getTopUsers,
} from '../database/databaseUtils';
import pool from '../database/pool';

export default class UsagesController {
  static async mostUsersAndCommands(_req: Request, res: Response): Promise<Response> {
    const usages = await getMostUserAndCommand();
    return res.status(200).send(usages);
  }

  static async getInactiveUsers(req: Request, res: Response): Promise<Response> {
    const { users } = req.body.data;

    console.log(users);

    const data = await getInactiveUsersLastCommand(users);

    return res.status(200).json(data);
  }

  static async getAllUsersIdsThatDoNotUseMenheraAnymore(
    _req: Request,
    res: Response
  ): Promise<Response> {
    const { rows } = await pool.query('SELECT id FROM users WHERE uses < 10');
    return res.status(200).send({ ids: rows });
  }

  static async topUsers(_req: Request, res: Response): Promise<Response> {
    const rows = await getTopUsers();
    return res.status(200).send(rows);
  }

  static async getUserInfo(req: Request, res: Response): Promise<Response> {
    const { userId } = req.body;
    const commandsExecuted = await pool.query('SELECT uses AS count FROM users WHERE id = $1', [
      userId,
    ]);

    if (!commandsExecuted?.rows[0] || commandsExecuted.rows[0]?.count === 0)
      return res.status(404).send('Este usuário não exsite em meu banco de dados');
    const allCommands = await pool.query(
      'SELECT cmds.name, COUNT(cmds.name) FROM uses INNER JOIN cmds ON uses.cmd_id = cmds.id WHERE user_id = $1 GROUP BY cmds.name ORDER BY count DESC LIMIT 10',
      [userId]
    );

    return res.send({ cmds: commandsExecuted.rows[0], array: allCommands.rows });
  }

  static async topCommands(_req: Request, res: Response): Promise<Response> {
    const rows = await getTopCommands();
    return res.status(200).send(rows);
  }

  static async getUserDeleteCommand(req: Request, res: Response): Promise<Response> {
    const { userId } = req.body;
    if (!userId) return res.sendStatus(400);
    const commandsExecuted = await pool.query(
      'SELECT count(*) FROM uses WHERE user_id = $1 AND cmd_id = 272',
      [userId]
    );

    return res.status(200).send(commandsExecuted.rows[0]);
  }
}
