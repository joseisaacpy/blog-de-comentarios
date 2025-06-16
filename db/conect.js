import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Função para conectar ao banco de dados
const conect = () =>
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Conectado ao MongoDB!"))
    .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Exportando a função
export default conect;
