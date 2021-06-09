export type ActivityType = 'PLAYING' | 'LISTENING' | 'WATCHING' | 'STREAMING';

export interface Activity {
  name: string;
  type: ActivityType;
}

export const StatusRole = '<@&758706770675105802>';

export const Colors = {
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

export const Titles = {
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
