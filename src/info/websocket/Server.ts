import { Server as HTTPServer } from 'node:http';
import { WebSocketServer } from 'ws';
import { IShardStatus } from '../utils/types';

export default class StatusBroker {
  private Ws: WebSocketServer;

  private static instance?: StatusBroker;

  private lastStatus: IShardStatus[];

  private connectedIPS: Set<string> = new Set();

  private constructor(httpServer: HTTPServer) {
    this.Ws = new WebSocketServer({ server: httpServer, path: '/info/ws' });

    this.Ws.on('connection', (socket, req) => {
      if (this.connectedIPS.has(req.socket.remoteAddress))
        return socket.close(3000, 'You are already connected');

      this.connectedIPS.add(req.socket.remoteAddress);
      socket.send(JSON.stringify(this.lastStatus));

      socket.on('close', () => {
        this.connectedIPS.delete(req.socket.remoteAddress);
      });

      return null;
    });
  }

  static get getInstance(): StatusBroker {
    return StatusBroker.instance;
  }

  static createInstance(httpServer: HTTPServer): void {
    this.instance = new StatusBroker(httpServer);
  }

  public emitStatus(shards: IShardStatus[]): void {
    this.lastStatus = shards;
    this.Ws.clients.forEach(client => {
      if (client.readyState === client.OPEN) client.send(JSON.stringify(shards));
    });
  }
}
