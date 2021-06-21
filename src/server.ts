import express from "express";

//@types/express
const app = express();

/**
* GET - Buscar uma informacao
* POST - Inserir (Criar) uma informacao
* PUT - alterar uma informacao
* DELETE - remover uma informacao
* PATCH - alterar uma informacao especifica
 */

app.get('/test', (request, response, next) => {
    //request - tudo que esta entrando
    //response - tudo que esta saindo
    return response.send("Ola NLW");
});

app.post('/test-post', (request, response, next) => {
    return response.send("Ola metdodo POST NLW");
});

app.listen(3000, () => console.log("Server is Running!"));
