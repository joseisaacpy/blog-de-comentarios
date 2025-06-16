// Imports
import express from "express";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
dotenv.config();

// Constants
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MOCK
const mock = [];

// CREATE
app.post("/comentarios", (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).send("Todos os campos devem ser preenchidos");
  }

  const comentario = {
    id: mock.length + 1,
    title,
    description,
    data_criacao: new Date(),
  };
  mock.push(comentario);
  res.status(201).send(comentario);
});

// READ
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/comentarios", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "form.html"));
});
app.get("/api/comentarios", (req, res) => {
  res.status(200).send(mock);
});

app.listen(port, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
