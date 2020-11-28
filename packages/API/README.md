# Menhera API

## Rotas

| Tipo   | Endpoint                  | Descrição                                                    |
| ------ | ------------------------- | ------------------------------------------------------------ |
| GET    | `/api/activity`           | Retorna uma atividade aleatória                              |
| GET    | `/api/activity/all`       | Retorna um array com todas as atividades                     |
| POST   | `/api/activity`           | Adiciona uma nova atividade                                  |
| PUT    | `/api/activity`           | Reseta todas as atividades para as padrões                   |
| DELETE | `/api/activity`           | Deleta todas as atividades                                   |
| GET    | `/api/commands`           | Retorna as execuções dos comandos                            |
| POST   | `/api/commands`           | Adiciona uma execução de comando                             |
| POST   | `/api/commands/clear`     | Limpa todas execuções                                        |
| POST   | `/api/ready`              | Envia um webhook mostrando que a Menehra está online         |
| POST   | `/api/down`               | Envia um webhook mostrando que a Menhera caiu                |
| POST   | `/api/shard/ready`        | Envia um webhook mostrando que um shard está online          |
| POST   | `api/shard/disconnect`    | Envia um webhook mostrando que um shard está se reconectando |
| POST   | `/api/shard/reconnecting` | Envia um webhook mostrando que um shard está se reconectando |
