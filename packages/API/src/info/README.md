# Info API

> This API is only for serving data for the (WebSite)[https://menherabot.xyz]

## 🔀 | Rotas

> Esta API tem como base o endpoint `/info`.

| Tipo  | Endpoint    | Descrição                                                                                                             |
| ----- | ----------- | --------------------------------------------------------------------------------------------------------------------- |
| GET   | `/ping`     | Retorna o uptime da API                                                                                               |
| GET   | `/shards`   | Retorna um array com informações dos shards, como uptime, memória usada e servidores                                  |
| PUT   | `/shards`   | Edita os valores de um shard específico                                                                               |
| GET   | `/commands` | Retorna um array com informações dos comandos da Menhera, mostrando o nome, descrição, opções e se está em manutenção |
| POST  | `/commands` | Altera o array de comandos para os novos comandos passados                                                            |
| PATCH | `/commands` | Altera o estado de manutenção de algum comando                                                                        |
