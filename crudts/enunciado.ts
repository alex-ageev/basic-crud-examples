/**
*! Criem uma API REST, com as seguintes funcionalidades:
** Autenticação por meio de JWT
** Registo de novos utilizadores, com validação de nome e palavra-passe
** Login para utilizadores já registados
** Listagem de todos os utilizadores registados
** Consulta de utilizadores específicos pelo seu ID
** Atualização de informações de utilizadores existentes
** Remoção de utilizadores existentes

*TODO:  Para criar esta API, devem:

*TODO: Instalar as dependências necessárias (Typescript, Express.js, jsonwebtoken, dotenv e express-validator)
*TODO: Utilizar o middleware express-validator para validar os dados de entrada
*TODO: Implementar as rotas necessárias para as funcionalidades mencionadas acima
*TODO: Utilizar o jsonwebtoken para gerar e verificar os tokens JWT
*TODO: Utilizar o dotenv para carregar as variáveis de ambiente

*? Notas:
*? Não se esqueçam de criar um ficheiro .env e definir a variável SECRET_KEY para gerar os tokens JWT.
*? Para instalar o middleware podem utilizar o seguinte código:
*/
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { check, validationResult } from "express-validator";
app.use((req: express.Request, res: express.Response, next) => {
  //para o middleware ignorar uma rota especifica, podemos adicionar o seguinte if:
  if (req.path === "/register") {
    next();
    return;
  }
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(401).json({ error: "Token não fornecido." });
  }
  const token = bearerHeader.split(" ")[1];
  console.log(token)
});
