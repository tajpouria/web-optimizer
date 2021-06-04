const { readSync } = require("fs");

const schemasInfo = [
  {
    name: "optimizationMessage",
    path: "./optimization-message.json-schema",
  },
];

const jsonSchemas = {};

for (const s of schemasInfo) {
  const { name, path } = s;
  jsonSchemas[name] = JSON.parse(readSync(path));
}

module.exports = jsonSchemas;
