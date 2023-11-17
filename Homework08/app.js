import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { acceptWebSocket, isWebSocketCloseEvent } from "https://deno.land/std/ws/mod.ts";

const db = new DB("address_book.db");
db.query("CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phone TEXT, email TEXT)");

const router = new Router();

router
  .get('/contacts', listContacts)
  .post('/contacts', addContact);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx) => {
  const { conn, r: bufReader, w: bufWriter, headers } = ctx.request.serverRequest;
  const websocket = await acceptWebSocket({ conn, bufReader, bufWriter, headers });

  try {
    for await (const ev of websocket) {
      if (typeof ev === "string") {
      } else if (isWebSocketCloseEvent(ev)) {
      }
    }
  } catch (err) {
    console.error("WebSocket error:", err);
  }
});

async function listContacts(ctx) {
}

async function addContact(ctx) {
}
const httpPort = 8000;
console.log(`HTTP server is running on http://127.0.0.1:${httpPort}`);
await app.listen({ port: httpPort });
const wsPort = 8080; // Choose a WebSocket port
const wss = new WebSocketServer({ port: wsPort });
console.log(`WebSocket server is running on ws://127.0.0.1:${wsPort}`);
wss.on("connection", (ws) => {
});
