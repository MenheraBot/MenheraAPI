import { EmbedOptions } from '@menhera-tools/execute-webhook';
import { Request, Response } from 'express';
import moment from 'moment';
import SendStatus from '../util/statusMessage';

moment.locale('pt-br');
export default class StatusController {
  private Colors = {
    OPERATIONAL: 0x30f030,
    UNDERMAINTENANCE: 0x70a6ff,
    DEGRADEDPERFORMANCE: 0xf0ee62,
    PARTIALOUTAGE: 0xfaf742,
    MINOROUTAGE: 0xf39d0b,
    MAJOROUTAGE: 0xff3000,
    INVESTIGATING: 0xdba153,
    IDENTIFIED: 0xfff5a1,
    MONITORING: 0x33e6d7,
    RESOLVED: 0x33e671,
    NOTSTARTEDYET: 0x5f5f5f,
    INPROGRESS: 0x2369f5,
    COMPLETED: 0x57d321,
  };

  private Titles = {
    OPERATIONAL: 'Operacional',
    UNDERMAINTENANCE: 'Em Manutenção',
    DEGRADEDPERFORMANCE: 'Desempenho Degradado',
    PARTIALOUTAGE: 'Interrupção Parcial',
    MINOROUTAGE: 'Interrupção Mínima',
    MAJOROUTAGE: 'Interrupção Máxima',
    INVESTIGATING: 'Investigando',
    IDENTIFIED: 'Identificado',
    MONITORING: 'Monitorando',
    RESOLVED: 'Resolvido',
    NOTSTARTEDYET: 'Manutenção Programada',
    INPROGRESS: 'Manutenção em Andamento',
    COMPLETED: 'Manutenção Completa',
  };

  public async status(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    if (body.component) this.SendComponent(body);
    if (body.incident) this.SendIncident(body);
    if (body.maintenance) this.SendMaintenance(body);

    return res.sendStatus(201);
  }

  private async SendComponent(body): Promise<void> {
    const embed: EmbedOptions = {
      color: this.Colors[body.component.status],
      title: body.component.name,
      footer: {
        text: moment.utc(Date.now()).format('L [às] LTS'),
      },
      fields: [
        {
          name: 'Antigo Status ->',
          value: `\`${this.Titles[body.component_update.old_status]}\` ->`,
          inline: true,
        },
        {
          name: 'Status Atual',
          value: `**${this.Titles[body.component_update.new_status]}**`,
          inline: true,
        },
      ],
    };
    SendStatus(embed);
  }

  private async SendIncident(body): Promise<void> {
    const embed: EmbedOptions = {
      color: this.Colors[body.incident.status],
      title: body.incident.name,
      description: body.incident_updates[body.incident_updates.length - 1].body
        .slice(0, -4)
        .slice(3),
      footer: {
        text: moment.utc(Date.now()).format('L [às] LTS'),
      },
    };
    SendStatus(embed);
  }

  private async SendMaintenance(body): Promise<void> {
    const embed: EmbedOptions = {
      color: this.Colors[body.maintenance.status],
      title: body.maintenance.name,
      description: body.incident_updates[body.maintenance_updates.length - 1].body
        .slice(0, -4)
        .slice(3),
      footer: {
        text: moment.utc(Date.now()).format('L [às] LTS'),
      },
    };
    SendStatus(embed);
  }
}
