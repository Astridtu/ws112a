import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const books = new Map();

const classrooms = new Map();
classrooms.set("e320", {
    id: "e320",
    class: "Multimedia Classroom",
});
classrooms.set("e319", {
    id: "e319",
    class: "Embedded Systems Lab",
});

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Hello world!";
  })
  .get("/nqu", (context) => {
    context.response.body = `
<html>
    <body>
        <a href="https://www.nqu.edu.tw/">National Quemoy University</a>
    </body>
</html>`
})
.get("/nqu/csie", (context) => {
    context.response.body = `
<html>
    <body>
        <a href="https://csie.nqu.edu.tw/">Computer Science And information Engineering Department</a>
    </body>
</html>`
})
.get("/to/nqu", (context) => {
    context.response.redirect('https://www.nqu.edu.tw/')
})
.get("/to/nqu/csie", (context) => {
    context.response.redirect('https://csie.nqu.edu.tw/')
})
.get("/room", (context) => {
  context.response.body = Array.from(classrooms.values());
})
.get("/room/:id", (context) => {
  if (context.params && context.params.id && classrooms.has(context.params.id)) {
    context.response.body = classrooms.get(context.params.id);
}
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });
