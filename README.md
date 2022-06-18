<br />
<p align="center">
  <a href="https://github.com/MenheraBot/MenheraAPI">
    <img src="https://i.imgur.com/jjgBki0.png" alt="Logo" width="160" height="160">
  </a>

  <h3 align="center">🔧 Menhera API 🔧</h3>

  <p align="center">
    An HTTP API to help some functionalities of MenheraBot
    <br />
    <a href="https://github.com/MenheraBot/MenheraBot"><strong>MenheraBot »</strong></a>
    <br />
    <br />
  </p>
</p>

# 📡 | MenheraAPI

Menhera's API is intended to manage:

- Save command execution;
- Keep shard statistics updated;
- Save command info;
- Serve user statistics.
- Serve data to its [WebSite](https://menherabot.xyz).

## 🔀 | Routes

> This repository is divided into 2 main routes, which serves different type of data:

### [Data](src/data)

This is a private route protected with a secret token. It's used to update user statistics, save command execution.

### [Info](src/info)

This route is open to the public. It's used to serve command info and shards info to [MenheraBot's Website](https://menherabot.xyz)

## 🔥 | Running

To run the Api, you need to have [Docker](https://www.docker.com/) in your machine. You have two options of installation, follow the one that applies to you.

### 🔮 | Building the Image

> If you want to build the image yourself, you can do it by following these steps:

1. 🧹 Clone the repository

```bash
git clone https://github.com/MenheraBot/MenheraApi.git
```

2. 💻 Building the Image

```bash
docker build . --tag api
```

3. 🏃‍♂️ Running a Container

```bash
docker run --name MenheraApi \
-e "API_TOKEN=" \
-e "PORT=" \
-e "MENHERA_AGENT=" \
-e "DATABASE_URL=" \
--restart unless-stopped \
-d -t api
```

> Obs: API_TOKEN and MENHERA_AGENT is just for authentication purposes. Database_url is the url of your postgres database, and port is the exposed port of Dockerfile. Is never good to have your API down, so the `unless-stopped` policy should handle any kind of error that could kill our API.

The api is on fire right now!.

### 🎉 | Downloading the Image

> If you don't really want all the source code, and just want to execute the bot, you can just donwload the image from the Container Registry.

1. 📥 Download the image

```bash
docker pull ghcr.io/menherabot/api:latest
```

> You need to be [logged in](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#authenticating-to-the-container-registry)

2. 🏃‍♂️ Running a Container

```bash
docker run --name MenheraApi \
-e "API_TOKEN=" \
-e "PORT=25156" \
-e "MENHERA_AGENT=" \
-e "DATABASE_URL=" \
--restart unless-stopped \
-d -t ghcr.io/menherabot/api:latest
```

> Obs: API_TOKEN and MENHERA_AGENT is just for authentication purposes. Database_url is the url of your postgres database, and port is the exposed port of Dockerfile, in this image is `25156`. Is never good to have your API down, so the `unless-stopped` policy should handle any kind of error that could kill our API.

You have now a API running in you machine.

## 🔨 | Made With

- [Express](https://expressjs.com/pt-br/)
- [Prisma](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)

## 💖 | Contributors

| [<img src="https://avatars1.githubusercontent.com/u/59155752?s=400&u=8e971f52c061732abb996aa9618ea2fafba5c0ae&v=4" width=115><br><sub>@ySnoopyDogy</sub>](https://github.com/ySnoopyDogy) | [<img src="https://avatars2.githubusercontent.com/u/27602189?s=400&u=7954c97ada727d3a059d9b769f5a296ea599083b&v=4" width=115><br><sub>@Tsugami</sub>](https://github.com/Tsugami) |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |

## ⚖️ | License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 | Contact

Discord: **Luxanna#5757**

Twitter: **[@Luxanna_Dev](https://twitter.com/Luxanna_Dev)**

---

**MenheraBot** was made with ❤️ by Luxanna.
