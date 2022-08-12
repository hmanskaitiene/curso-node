import { Application, Router } from "https://deno.land/x/oak/mod.ts";

localStorage.clear();

const app = new Application();

const router = new Router();
const PORT = 8000
const HOST = 'localhost'

router
  .get('/color', (context) => {
    const color = localStorage.getItem('color')
    const msj =  color ? `El color asignado es el ${color}` :'Todavia no se asignó ningun color'
    context.response.body = msj;
  })
  .get('/color/:color', (context) => {
    localStorage.setItem("color", context.params.color);
    context.response.body = `Se ha asignado el color: ${context.params.color}`;
  });



app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server iniciado en el puerto ${PORT}...`)
await app.listen(`${HOST}:${PORT}`)