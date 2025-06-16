let containerComentarios = document.querySelector(".container-comentarios");
async function listarComentarios() {
  const resquest = await fetch("/api/comentarios");
  const data = await resquest.json();

  containerComentarios.innerHTML = ""; // limpa antes de inserir

  data.forEach((comentario) => {
    const dataObj = new Date(comentario.data_criacao);
    const dia = String(dataObj.getDate()).padStart(2, "0");
    const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
    const ano = dataObj.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;

    const comentarioElement = `<div class="item-comentario bg-white p-4 rounded shadow-2xl space-y-2 max-h-52 overflow-auto">
        <h2 class="text-xl font-semibold text-gray-800">${comentario.title}</h2>
        <p class="text-gray-700">${comentario.description}</p>
        <p class="text-sm text-gray-500 text-right">${dataFormatada}</p>
        <ul class="flex gap-2 flex-col">
          <li>
            <button data-id="${comentario._id}"
              class="btn-editar flex w-full bg-slate-800 text-white justify-center items-center font-bold p-1 rounded-2xl"
            >
              Editar
            </button>
          </li>
          <li>
            <button data-id="${comentario._id}"
              class="btn-excluir flex w-full bg-slate-800 text-white justify-center items-center font-bold p-1 rounded-2xl"
            >
              Excluir
            </button>
          </li>
        </ul>
      </div>`;

    containerComentarios.innerHTML += comentarioElement;
  });

  const botoesEditar = document.querySelectorAll(".btn-editar");
  botoesEditar.forEach((botao) => {
    botao.addEventListener("click", async () => {
      const id = botao.getAttribute("data-id");
      try {
        // Buscar o comentário atual
        const response = await fetch(`/api/comentarios/${id}`);
        const comentario = await response.json();

        // Pedir novos dados via prompt, já mostrando o valor atual
        const novoTitle = prompt("Digite o novo título:", comentario.title);
        if (novoTitle === null) return; // cancelou o prompt

        const novaDescription = prompt(
          "Digite a nova descrição:",
          comentario.description
        );
        if (novaDescription === null) return; // cancelou o prompt

        // Montar objeto com os dados novos
        const dadosAtualizados = {
          title: novoTitle,
          description: novaDescription,
        };

        // Enviar PUT para atualizar
        const responsePut = await fetch(`/api/comentarios/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosAtualizados),
        });

        if (!responsePut.ok) {
          throw new Error("Erro ao atualizar comentário");
        }

        listarComentarios(); // Atualiza a lista na página
      } catch (error) {
        console.error("Erro ao editar comentário:", error);
      }
    });
  });

  const botoesExcluir = document.querySelectorAll(".btn-excluir");
  botoesExcluir.forEach((botao) => {
    botao.addEventListener("click", async () => {
      const id = botao.getAttribute("data-id");
      try {
        const resquest = await fetch(`/api/comentarios/${id}`, {
          method: "DELETE",
        });
        const confirmacao = confirm(
          "Deseja realmente excluir esse comentário?"
        );
        if (!confirmacao) {
          return;
        }
        if (!resquest.ok) {
          throw new Error("Erro na resposta da API");
        }

        listarComentarios(); // recarrega a lista após excluir
      } catch (error) {
        console.error("Erro ao excluir comentário:", error);
      }
    });
  });
}
document.addEventListener("DOMContentLoaded", listarComentarios);
