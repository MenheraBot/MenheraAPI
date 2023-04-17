<br />
<p align="center">
  <a href="https://github.com/ySnoopyDogy/Menhera-Tools">
    <img src="https://i.imgur.com/jjgBki0.png" alt="Logo" width="160" height="160">
  </a>

  <h3 align="center"> Data Routes </h3>

  <p align="center">
    This is a route that handles Menhera's data. The data are only auxiliary, they do not directly imply the operation of the main application. These are just for the best user experience, and help with development.
    <br />
  </p>
</p>

## 🔀 | Rotas

> This routes are based on the `/data` endpoint.

| Method | Endpoint                         | Description                                                                                  |
| ------ | -------------------------------- | -------------------------------------------------------------------------------------------- |
| GET    | `/statistics/bicho`              | Returns the statistics of a user in Jogo do Bicho                                            |
| GET    | `/statistics/bicho/top`          | Returns the top users of the Jogo do Bicho                                                   |
| POST   | `/statistics/bicho`              | Updates a player's data on the Jogo do Bicho                                                 |
| GET    | `/statistics/blackjack`          | Returns a user's Blackjack game information                                                  |
| GET    | `/statistics/blackjack/top`      | Returns the top blackjack players                                                            |
| POST   | `/statistics/blackjack`          | Updates a Blackjack player's data                                                            |
| GET    | `/statistics/coinflip`           | Returns a user's coinflips information                                                       |
| GET    | `/statistics/coinflip/top`       | Top coinflip players returns                                                                 |
| POST   | `/statistics/coinflip`           | Update a coinflip player's data                                                              |
| GET    | `/statistics/roulette`           | Returns a user's roulette information                                                        |
| GET    | `/statistics/roulette/top`       | Top Roulette Players Returns                                                                 |
| POST   | `/statistics/roulette`           | Updates a Roulette Player's Data                                                             |
| GET    | `/statistics/hunt`               | Returns the user's hunt status                                                               |
| GET    | `/statistics/hunt/top`           | Returns the top hunters                                                                      |
| POST   | `/statistics/hunt`               | Updates a Player's Data on Hunts                                                             |
| POST   | `/usages/commands`               | Post a command execution                                                                     |
| GET    | `/usages/ban`                    | Get the date of the last ban of a user                                                       |
| GET    | `/usages/inactive`               | Returns the ID of all users who have been inactive for more than a week                      |
| GET    | `/usages/top/command`            | Returns the top 10 most used commands                                                        |
| GET    | `/usages/top/user`               | Returns the top 10 users who most used commands                                              |
| GET    | `/usages/user`                   | Returns the number of commands that a user has used, along with the command most used by him |
