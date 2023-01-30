import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { check, validationResult } from "express-validator";

dotenv.config();

const app = express();

app.use(express.json());

interface IUser {
  id: number;
  name: string;
  password: string;
}

let users: IUser[] = [{ id: 1, name: "Utilizador1", password: "123" }];
//!middleware
app.use((req: express.Request, res: express.Response, next) => {
  if (req.path === "/register") {
    next();
    return;
  }
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader)
    return res.status(401).json({ error: "Token não fornecido." });

  const token = bearerHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(String(token), String(process.env.SECRET_KEY));

    req.body.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
});
//getUsers
app.get("/users", (req: express.Request, res: express.Response) => {
  res.json(users);
});
//!register
app.post(
  "/register",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("Nome deve ser mais de 3 caratéres"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password deve ser mais de 5 caratéres"),
  ],
  (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const newUser: IUser = {
      id: users.length + 1,
      name: req.body.name,
      password: req.body.password,
    };
    const user = users.find((u) => u.name === req.body.name);

    if (user) return res.status(400).send("User already exists");

    users.push(newUser);
    const token = jwt.sign({ id: newUser.id }, String(process.env.SECRET_KEY));
    res.send(token);
  }
);
//!login
app.post("/login", (req: express.Request, res: express.Response) => {
  const user = users.find((u) => u.name === req.body.name);

  if (!user) return res.status(400).send("User not found");

  if (req.body.password !== user.password)
    return res.status(400).send("Invalid password");

  // Criar e assinar o token JWT
  const token = jwt.sign({ id: user.id }, String(process.env.SECRET_KEY));

  // Enviar o token como resposta
  res.send(token);
});
//get user by id
app.get("/users/:id", (req: express.Request, res: express.Response) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  res.json(user);
});
// create user
app.post("/users", (req: express.Request, res: express.Response) => {
  const user: IUser = {
    id: users.length + 1,
    name: req.body.name,
    password: req.body.password,
  };
  users.push(user);
  res.json(user);
});
// update user
app.put("/users/:id", (req: express.Request, res: express.Response) => {
  let user = users.find((u) => u.id === parseInt(req.params.id)) as IUser;
  if (!user) res.status(404).send("Utilizador não encontrado.");
  user.name = req.body.name;
  res.json(user);
});
// delete user
app.delete("/users/:id", (req: express.Request, res: express.Response) => {
  const user = users.find((u) => u.id === parseInt(req.params.id)) as IUser;
  if (!user) res.status(404).send("Utilizador não encontrado.");
  const index = users.indexOf(user);
  users.splice(index, 1);
  res.json(user);
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});