import "reflect-metadata";
import express, { Request, Response, NextFunction } from 'express'
import "express-async-errors"
import { router } from "./routes";

import "../db"

const app = express();

app.use(express.json())
app.use(router);

// ESSE É UM MIDDLEWARE DE TRATAMENTO DE ERRO
// USANDO AS ROTAS
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    // SE O ERRO FOR DO TPIO THROW ELE VAI RESPONDER
    // O STATUS 400 COM A MENSAGEM QUE FOI DESCRITA
    if(err instanceof Error) {
        return response.status(400).json({
            error: err.message
        })
    }

    // SE FOR ERRO INTERNO DO SERVIDOR ELE RESPONDE 
    // ERRO 500 COM A MENSAGEM ABAIXO
    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
});
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

