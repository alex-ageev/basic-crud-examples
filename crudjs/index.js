import express from "express";

const app = express();
app.use(express.json());
app.listen(4000, () => {
  console.log("Server started on port 4000");
});

let users = [
  { id: 1, name: "Utilizador1" },
  { id: 2, name: "Utilizador2" },
  { id: 3, name: "Utilizador3" },
];

app.get("/", (req, res) => {
  res.json("ok");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  console.log(users.find((u) => u.id === parseInt(req.params.id)))
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) res.status(404).send("Utilizador não encontrado.");
  res.json(user);
});

app.post("/users", (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(user);
  res.json(user);
});

app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) res.status(404).send("Utilizador não encontrado.");
  user.name = req.body.name;
  res.json(user);
});

app.delete("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) res.status(404).send("Utilizador não encontrado.");
  const index = users.indexOf(user);
  users.splice(index, 1);
  res.json(user);
});

