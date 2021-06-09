import { EmbedOptions } from '@menhera-tools/execute-webhook';
import { Request, Response } from 'express';
import moment from 'moment';
import SendStatus from '../util/statusMessage';
import { Colors, Titles } from '../util/interfaces';

moment.locale('pt-br');
export default class StatusController {
  public static async status(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    if (body.component) StatusController.SendComponent(body);
    if (body.incident) StatusController.SendIncident(body);
    if (body.maintenance) StatusController.SendMaintenance(body);

    return res.sendStatus(201);
  }

  public static async SendComponent(body): Promise<void> {
    const embed: EmbedOptions = {
      color: Colors[body.component.status],
      title: body.component.name,
      footer: {
        text: moment.utc(Date.now()).format('L [às] LTS'),
      },
      fields: [
        {
          name: 'Antigo Status ->',
          value: `\`${Titles[body.component_update.old_status]}\` ->`,
          inline: true,
        },
        {
          name: 'Status Atual',
          value: `**${Titles[body.component_update.new_status]}**`,
          inline: true,
        },
      ],
    };
    SendStatus(embed);
  }

  public static async SendIncident(body): Promise<void> {
    const embed: EmbedOptions = {
      color: Colors[body.incident.status],
      title: body.incident.name,
      description: `${Titles[body.incident.status]}\n${body.incident_updates[
        body.incident_updates.length - 1
      ].body
        .slice(0, -4)
        .slice(3)}`,

      footer: {
        text: moment.utc(Date.now()).format('L [às] LTS'),
      },
    };
    SendStatus(embed);
  }

  public static async SendMaintenance(body): Promise<void> {
    const embed: EmbedOptions = {
      color: Colors[body.maintenance.status],
      title: body.maintenance.name,
      description: `${Titles[body.maintenance.status]}\n${body.maintenance_updates[
        body.maintenance_updates.length - 1
      ].body
        .slice(0, -4)
        .slice(3)}`,
      footer: {
        text: moment.utc(Date.now()).format('L [às] LTS'),
      },
    };
    SendStatus(embed);
  }
}
