import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("address_book.db");
db.query("CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phone TEXT, email TEXT)");

const router = new Router();

router
  .get('/contacts', listContacts)
  .post('/contacts', addContact);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

// Define route handlers
async function listContacts(ctx) {
  const contacts = await db.query("SELECT * FROM contacts");
  ctx.response.body = contacts;
}

async function addContact(ctx) {
  const body = await ctx.request.body();
  const { name, phone, email } = body.value;

  if (name && phone && email) {
    await db.query("INSERT INTO contacts (name, phone, email) VALUES (?, ?, ?)", [name, phone, email]);
    ctx.response.body = { message: 'Contact added successfully' };
  } else {
    ctx.response.status = 400;
    ctx.response.body = { error: 'Incomplete data. Please provide name, phone, and email.' };
  }
}

const port = 8000; // Set the desired port number
console.log(`Server is running on http://127.0.0.1:${port}`);
await app.listen({ port });
