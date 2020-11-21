module.exports = {
  apps: [{
    name: "Amandinha",
    cwd: "./packages/Amandinha",
    script: "npm",
    args: "start"
  }, {
    name: "Menhera API",
    cwd: "./packages/API",
    script: "npm",
    args: "start"
  }, {
    name: "Menhera Dashboard",
    cwd: "./packages/Dashboard",
    script: "npm",
    args: "start"
  }],
};