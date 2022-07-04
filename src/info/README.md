<br />
<p align="center">
  <a href="https://github.com/ySnoopyDogy/Menhera-Tools">
    <img src="https://i.imgur.com/jjgBki0.png" alt="Logo" width="160" height="160">
  </a>

  <h3 align="center"> Info Routes </h3>

  <p align="center">
    This route is only for serving data for the <a href="https://menherabot.xyz">WebSite</a>
    <br />
  </p>
</p>

## 🔀 | Routes

> This routes are based on the `/info` endpoint.

| Method | Endpoint    | Description                                                                                 |
| ------ | ----------- | ------------------------------------------------------------------------------------------- |
| GET    | `/ping`     | Returns the API uptime                                                                      |
| GET    | `/shards`   | Returns an array with information about the shards, such as uptime, memory used and servers |
| PUT    | `/shards`   | Edit the values ​​of a specific shard                                                       |
| GET    | `/hunts`    | Returns an array with weekly hunters data                                                   |
| GET    | `/commands` | Returns an array with information about Menhera's commands                                  |
| POST   | `/commands` | Change the array of commands to the new commands passed                                     |
| PATCH  | `/commands` | Change the maintenance state of some command                                                |
