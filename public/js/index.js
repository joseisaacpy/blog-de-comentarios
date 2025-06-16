const containerComentarios = document.querySelector(".container-comentarios");
// funcão para listar os comentários
async function listarComentarios() {
  const resquest = await fetch("/api/comentarios");
  const data = await resquest.json();
  console.log(data);

  data.forEach((comentario) => {
    // Formatando a data recebida da API:
    const dataObj = new Date(comentario.data_criacao);
    const dia = String(dataObj.getDate()).padStart(2, "0");
    const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
    const ano = dataObj.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;

    const comentarioElement = `<div class="item-comentario bg-white p-4 rounded shadow-2xl space-y-2 max-h-52 overflow-auto">
        <!-- Título do comentário -->
        <h2 class="text-xl font-semibold text-gray-800">${comentario.title}</h2>

        <!-- Texto do comentário -->
        <p class="text-gray-700">
          ${comentario.description}
        </p>

        <!-- Data de criação -->
        <p class="text-sm text-gray-500 text-right">${dataFormatada}</p>
      </div>`;

    containerComentarios.innerHTML += comentarioElement;
  });
}

// chama a função ao carregar o DOM
document.addEventListener("DOMContentLoaded", listarComentarios);
