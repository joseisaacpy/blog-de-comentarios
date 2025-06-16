const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  // Criar um objeto FormData com os dados do form
  const formData = new FormData(form);

  // Converter os dados do FormData para JSON (opcional, mas comum)
  const dados = Object.fromEntries(formData.entries());
  try {
    const response = await fetch("/comentarios", {
      method: "POST", // Enviar via POST
      headers: {
        "Content-Type": "application/json", // Indicando que o corpo é JSON
      },
      body: JSON.stringify(dados), // Transformar o objeto em string JSON
    });

    if (response.ok) {
      const resultado = await response.json();
      alert("Comentário enviado com sucesso!");
      // Aqui você pode limpar o formulário, atualizar a página, etc.
      form.reset();
    } else {
      alert("Erro ao enviar comentário");
    }
  } catch (error) {
    alert("Erro na comunicação com o servidor");
    console.error(error);
  }
});
