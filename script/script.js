// Pega o formulário principal pelo ID 'formMeta'.
const form = document.getElementById('formMeta');

// Pega a lista <ul> ou <ol> onde os novos itens de meta serão adicionados.
const lista = document.getElementById('metasContainer');

// Pega o elemento HTML de erro.
const erro = form.querySelector('.erro');


// Adiciona um 'listener' (ouvinte) de evento ao formulário.
form.addEventListener('submit', function (e) {

  e.preventDefault();

  // --- Captura de Valores ---
  const titulo = document.getElementById('titulo').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const prioridade = document.getElementById('prioridade').value;
  const data = document.getElementById('data').value;

  erro.textContent = '';

  // --- Validações (Omitidas para brevidade, são as mesmas do código anterior) ---
  if (!titulo) { erro.textContent = "⚠️ Digite um título válido."; return; }
  if (!descricao) { erro.textContent = "⚠️ Digite uma descrição válida."; return; }
  if (!prioridade) { erro.textContent = "⚠️ Selecione uma prioridade válida."; return; }
  if (!data) { erro.textContent = "⚠️ Selecione uma data válida."; return; }

  const hoje = new Date().setHours(0, 0, 0, 0);
  const dataMeta = new Date(data).setHours(0, 0, 0, 0);

  if (dataMeta < hoje) { erro.textContent = "⚠️ A data não pode ser anterior ao dia atual."; return; }


  // --- Criação do Elemento da Meta (<li>) ---

  const li = document.createElement('li');
  li.classList.add(prioridade.toLowerCase());

  // ADICIONADO: Um <span> com a classe 'status-meta' para exibir o texto de status.
  li.innerHTML = `
        <strong>${titulo}</strong> 
        <span class="status-meta"></span> (${prioridade}) - ${descricao} | Limite: ${data}
        <div class="actions">
            <button class="concluir">Concluir</button>
            <button class="remover">Remover</button>
        </div>
    `;

  // Seleciona o novo elemento de status.
  const statusSpan = li.querySelector('.status-meta');

  // --- Lógica do Botão "Concluir" (Alternância) ---

  li.querySelector('.concluir').addEventListener('click', (event) => {
    // Alterna a classe 'concluida'.
    li.classList.toggle('concluida');

    // Se a meta foi concluída (a classe 'concluida' existe):
    if (li.classList.contains('concluida')) {
      // Define o texto de status para "Concluído"
      statusSpan.textContent = 'Concluido com  sucesso';
      // O botão muda para a próxima ação
      event.target.textContent = 'Faça Novamente';
    } else {
      // Se a meta foi desfeita:
      // Limpa o texto de status
      statusSpan.textContent = '';
      // O botão volta para a próxima ação
      event.target.textContent = 'Concluir';
    }
  });


  // --- Lógica do Botão "Remover" ---
  li.querySelector('.remover').addEventListener('click', () => {
    lista.removeChild(li);
  });

  // --- Adição à Página e Limpeza ---
  lista.appendChild(li);
  form.reset();
});