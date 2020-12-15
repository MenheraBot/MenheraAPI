/* eslint-disable no-param-reassign */
import { Request, Response } from 'express';
import { getMostUserAndCommand, getTopCommands, getTopUsers } from '../database/databaseUtils';
import pool from '../database/pool';

interface commandsList {
  name: string;
  count: number;
}

interface commandName {
  name: string;
}

export default class UsagesController {
  static async mostUsersAndCommands(_req: Request, res: Response): Promise<Response> {
    const usages = await getMostUserAndCommand();
    return res.status(200).send(usages);
  }

  static async topUsers(_req: Request, res: Response): Promise<Response> {
    const rows = await getTopUsers();
    return res.status(200).send(rows);
  }

  static async getUserInfo(req: Request, res: Response): Promise<Response> {
    const { userId } = req.body;
    const commandsExecuted = await pool.query('SELECT COUNT(*) FROM uses WHERE user_id = $1', [
      userId,
    ]);

    if (commandsExecuted.rows[0].count === '0')
      return res.status(404).send('Este usuário não exsite em meu banco de dados');
    const allCommands = await pool.query(
      'SELECT cmds.name FROM uses INNER JOIN cmds ON uses.cmd_id = cmds.id WHERE user_id = $1',
      [userId]
    );

    const mostUsedCommand = allCommands.rows.reduce((p: Array<commandsList>, c: commandName) => {
      const has = p.filter(a => a.name === c.name);
      if (has.length !== 0) {
        const index = p.findIndex(a => a.name === c.name);
        p[index].count += 1;
        return p;
      }
      p.push({
        name: c.name,
        count: 1,
      });
      return p;
    }, []);

    mostUsedCommand.sort((a: commandsList, b: commandsList) => b.count - a.count);

    return res.send({ cmds: commandsExecuted.rows[0], array: mostUsedCommand });
  }

  static async topCommands(_req: Request, res: Response): Promise<Response> {
    const rows = await getTopCommands();
    return res.status(200).send(rows);
  }
}
