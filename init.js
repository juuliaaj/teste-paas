const { Client } = require("pg");
const fs = require("fs");

async function init() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  console.log("Conectando ao banco...");
  await client.connect();

  const schema = fs.readFileSync("./schema.sql", "utf8");
  console.log("Aplicando schema...");
  await client.query(schema);

  console.log("Schema aplicado com sucesso!");
  await client.end();
}

init().catch((err) => {
  console.error("Erro ao inicializar banco:", err);
  process.exit(1);
});
