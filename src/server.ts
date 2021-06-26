import "reflect-metadata";
import express from 'express'
import { router } from "./routes";

import "../db"

const app = express();

app.use(express.json())
app.use(router);
/**
 * !ANOTE ISSO NO CADERNO DEPOIS
 * TIPOS DE PARAMETROS
 * Route Params => Parametros que fazem parte da rota
 * Ex.: localhost:3000/produtos/123118883 ou localhost:3000/produtos/{id}
 * 
 * Query Params => Normalmente usado para filtros, são parametros também passados por url
 * Eles são parametros não obrigatórios e podem não pertencer a url
 * Ex.: localhost:3000/produtos?name=teclado&description=teclado+bom
 * 
 * Body Params => Parametros que vem no corpo da requisição, são parametros normalmente enviados via form ou json
 * !ANOTE ISSO NO CADERNO DEPOIS
 */

app.listen(3002, () => console.log("Server is running"))

