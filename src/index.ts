import { randomUUID } from "crypto";
import { Usuario } from "./app/models";
import { RedisConnection } from "./main/database";

async function teste() {
  await RedisConnection.connect();

  const redis = RedisConnection.connection;
  redis.set("nome", "João da Silva");
  redis.set("idade", 27);
  console.log(await redis.get("nome"));
  await redis.del("nome");
  console.log(await redis.get("nome"));
  console.log(await redis.get("idade"));

  const usuario = new Usuario(
    randomUUID(),
    "Gabriel",
    "teste@teste.com",
    "admin"
  );

  redis.set("usuario-1", JSON.stringify(usuario.toJSON()));
  const usuarioCache = await redis.get("usuario-1");
  console.log(JSON.parse(usuarioCache ?? "{}"));
}

teste();
