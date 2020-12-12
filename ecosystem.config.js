module.exports = {
  apps: [
    {
      name: 'Amandinha',
      script: 'yarn',
      args: 'bot start',
    },
    {
      name: 'Menhera API',
      script: 'yarn',
      args: 'api start',
    },
    {
      name: 'Menhera Dashboard',
      script: 'yarn',
      args: 'dashboard start',
    },
  ],
};
