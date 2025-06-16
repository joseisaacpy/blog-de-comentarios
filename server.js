// Imports
import express from "express";
import mongoose from "mongoose";
import conect from "./db/conect.js";
import Comentario from "./db/Comentario.js";
import { fileURLToPath } from "url";
import path from "path";
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

// CREATE
app.post("/comentarios", async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).send("Todos os campos devem ser preenchidos");
  }
  try {
    const comentario = await Comentario.create({ title, description });
    const savedComentario = await comentario.save();
    res.status(201).send(savedComentario);
  } catch (error) {
    console.error("Erro ao criar comentário:", error);
    res.status(500).send("Erro ao criar comentário");
  }
});

// READ
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/comentarios", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "form.html"));
});

app.get("/api/comentarios", async (req, res) => {
  const comentarios = await Comentario.find();
  if (!comentarios) {
    return res.status(404).send("Nenhum comentário encontrado");
  }
  try {
    res.status(200).json(comentarios);
  } catch (error) {
    console.error("Erro ao buscar comentários:", error);
    res.status(500).send("Erro ao buscar comentários");
  }
});

app.get("/api/comentarios/:id", async (req, res) => {
  const id = req.params.id;
  const comentario = await Comentario.findById(id);

  if (!comentario) {
    return res.status(404).send("Comentário nao encontrado");
  }

  try {
    res.status(200).json(comentario);
  } catch (error) {
    console.error("Erro ao buscar comentário:", error);
    res.status(500).send("Erro ao buscar comentário");
  }
});

// DELETE
app.delete("/api/comentarios/:id", async (req, res) => {
  const id = req.params.id;
  const comentario = await Comentario.findByIdAndDelete(id);
  if (!comentario) {
    return res.status(404).send("Comentário não encontrado");
  }
  try {
    res.status(200).send("Comentário deletado com sucesso");
  } catch (error) {
    console.error("Erro ao deletar comentário:", error);
    res.status(500).send("Erro ao deletar comentário");
  }
});

// PUT
app.put("/api/comentarios/:id", async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  try {
    const comentario = await Comentario.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (!comentario) {
      return res.status(404).send("Comentário nao encontrado");
    }
    res.status(200).json(comentario);
  } catch (error) {
    console.error("Erro ao atualizar comentário:", error);
    res.status(500).send("Erro ao atualizar comentário");
  }
});

// Função para iniciar o servidor
async function startServer() {
  try {
    await conect();
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
}

startServer();
