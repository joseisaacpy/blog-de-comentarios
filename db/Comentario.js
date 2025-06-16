import { mongoose } from "mongoose";

const comentarioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  data_criacao: {
    type: Date,
    default: Date.now,
  },
});

const Comentario = mongoose.model("Comentario", comentarioSchema);

export default Comentario;
