<br />
<p align="center">
  <a href="https://github.com/ySnoopyDogy/Menhera-Tools">
    <img src="https://i.imgur.com/jjgBki0.png" alt="Logo" width="160" height="160">
  </a>

  <h3 align="center"> Menhera API </h3>

  <p align="center">
    Menhera API é uma REST API feita com <a href="https://expressjs.com/pt-br/">Express</a> em TypeScript
    <br />
  </p>
</p>

## 🔀 | Rotas

| Tipo   | Endpoint                  | Descrição                                                                |
| ------ | ------------------------- | ------------------------------------------------------------------------ |
| GET    | `/api/activity`           | Retorna uma atividade aleatória                                          |
| GET    | `/api/activity/all`       | Retorna um array com todas as atividades                                 |
| POST   | `/api/activity`           | Adiciona uma nova atividade                                              |
| PUT    | `/api/activity`           | Reseta todas as atividades para as padrões                               |
| DELETE | `/api/activity`           | Deleta todas as atividades                                               |
| POST   | `/api/auth`               | Retorna se o usuário é autenticado                                       |
| GET    | `/api/coinflip`           | Retorna as informações dos coinflips de um usuário                       |
| POST   | `/api/coinflip`           | Atualiza os dados de um jogador de coinflip                              |
| GET    | `/api/commands`           | Retorna as execuções dos comandos                                        |
| POST   | `/api/commands`           | Adiciona uma execução de comando                                         |
| POST   | `/api/commands/clear`     | Limpa todas execuções                                                    |
| POST   | `/api/down`               | Envia um webhook mostrando que a Menhera caiu                            |
| POST   | `/api/ready`              | Envia um webhook mostrando que a Menehra está online                     |
| POST   | `/api/shard/disconnect`   | Envia um webhook mostrando que um shard está se reconectando             |
| POST   | `/api/shard/ready`        | Envia um webhook mostrando que um shard está online                      |
| POST   | `/api/shard/reconnecting` | Envia um webhook mostrando que um shard está se reconectando             |
| GET    | `/api/site/commands`      | Retorna os comandos existentes da Menhera                                |
| POST   | `/api/site/commands`      | Posta um novo comando                                                    |
| DELETE | `/api/site/commands`      | Zera os comandos existentes                                              |
| GET    | `/api/usages/most`        | Retorna o comando que mais foi usado, e o usuário que mais usou comandos |
| GET    | `/api/usages/top/command` | Retorna o top 10 comandos mais usados                                    |
| GET    | `/api/usages/top/user`    | Retorna o top 10 usuários que mais usaram comandos                       |
| GET    | `/api/usages/user`        | Retorna quantos comandos certo usuário ja usou                           |
