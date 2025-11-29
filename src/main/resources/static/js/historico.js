document.addEventListener("DOMContentLoaded", function () {
  let usuarioCarregado = null;
  const inputPesquisa = document.getElementById("inputPesquisa");
  const botaoPesquisa = document.getElementById("botaoPesquisa");
  const radiosPesquisa = document.querySelectorAll(
    'input[name="pesquisarPor"]'
  );
  const selectStatus = document.getElementById("selectStatus");
  const tabela = document.getElementById("tabela");

  botaoPesquisa.addEventListener("click", carregarHistoricoFiltrados);

  document
    .querySelectorAll('input[name="pesquisarPor"], input[name="ordenarPor"]')
    .forEach((radio) => {
      radio.addEventListener("change", carregaHistorico);
    });

  radiosPesquisa.forEach((radio) => {
    radio.addEventListener("change", alternarTipoInput);
  });

  //Funcoes APIs
  async function carregarDadosUsuarioLogado() {
    try {
      const response = await fetch("/api/auth/me");

      if (response.ok) {
        const usuario = await response.json();

        usuarioCarregado = usuario;
        console.log("Usuário carregado: ", usuarioCarregado);
        await carregaHistorico();

        return true;
      }
    } catch (error) {
      console.error("Erro ao buscar usuário logado", error);
      return null;
    }
  }

  async function carregaHistorico() {
    try {
      const response = await fetch(
        `/api/matriculas/por-matricula-aluno/${usuarioCarregado.codigo}`
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar historico:" + response.statusText);
      }

      const historico = await response.json();

      const tabelaCorpo = document.getElementById("tabela");

      tabelaCorpo.innerHTML = "";

      for (const matricula of historico) {
        const linha = document.createElement("tr");

        linha.innerHTML = `
          <td>${matricula.gradeDisciplinas.turmas.codigo}</td>
          <td>${matricula.gradeDisciplinas.turmas.semestre}</td>
          <td>${matricula.gradeDisciplinas.disciplinas.nome}</td>
          <td>${matricula.notaFinal}</td>
          <td>${matricula.statusDisciplina}</td>
        `;

        tabelaCorpo.appendChild(linha);
      }
      return true;
    } catch (error) {
      console.log("Erro ao carregar boletos:", error);
      return null;
    }
  }

  async function carregarHistoricoFiltrados() {
    // 2. Coleta os valores dos filtros

    const tipo = document.querySelector(
      'input[name="pesquisarPor"]:checked'
    ).value;

    let termo;

    if (tipo === "status") {
      // Pega direto do select (já vem como "true" ou "false" limpo)
      termo = document.getElementById("selectStatus").value;
    } else {
      termo = document.getElementById("inputPesquisa").value;
    }

    console.log("Termo:", termo);
    // 3. Monta a URL da API com os parâmetros
    const url = new URL("/api/matriculas/pesquisar", window.location.origin);
    url.searchParams.append("termo", termo);
    url.searchParams.append("tipo", tipo);
    url.searchParams.append("matricula", usuarioCarregado.codigo);
    // 4. Chama a API
    try {
      const response = await fetch(url);
      const historico = await response.json();

      // 5. Renderiza a tabela (função que você já tem)
      renderizarTabelaHistorico(historico);
    } catch (error) {
      console.error("Erro ao buscar boleto:", error);
    }
  }

  async function renderizarTabelaHistorico(historico) {
    tabela.innerHTML = "";

    for (const matricula of historico) {
      const linha = document.createElement("tr");

      linha.innerHTML = `
          <td>${matricula.gradeDisciplinas.turmas.codigo}</td>
          <td>${matricula.gradeDisciplinas.turmas.semestre}</td>
          <td>${matricula.gradeDisciplinas.disciplinas.nome}</td>
          <td>${matricula.notaFinal}</td>
          <td>${matricula.statusDisciplina}</td>
        `;

      tabela.appendChild(linha);
    }
  }

  //Funcoes auxiliares
  function formatarData(dataISO) {
    // Converte "2005-03-10" para "10/03/2005"
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  function alternarTipoInput() {
    // Verifica qual radio está marcado
    const radioSelecionado = document.querySelector(
      'input[name="pesquisarPor"]:checked'
    );

    if (radioSelecionado && radioSelecionado.value === "status") {
      // Se for Status: Esconde texto, Mostra Select
      inputPesquisa.style.display = "none";
      selectStatus.style.display = "block";

      // (Opcional) Limpa o texto para não atrapalhar
      inputPesquisa.value = "";
    } else {
      // Qualquer outro: Mostra texto, Esconde Select
      inputPesquisa.style.display = "block";
      selectStatus.style.display = "none";
    }
  }
  carregarDadosUsuarioLogado();
});
