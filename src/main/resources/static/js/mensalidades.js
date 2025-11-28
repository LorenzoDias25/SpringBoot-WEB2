document.addEventListener("DOMContentLoaded", function () {
  let alunoCarregado = null;
  const inputPesquisa = document.getElementById("inputPesquisa");
  const botaoPesquisa = document.getElementById("botaoPesquisa");
  const radiosPesquisa = document.querySelectorAll(
    'input[name="pesquisarPor"]'
  );
  const selectStatus = document.getElementById("selectStatus");
  const tabela = document.getElementById("tabela");

  botaoPesquisa.addEventListener("click", carregarBoletosFiltrados);

  document
    .querySelectorAll('input[name="pesquisarPor"], input[name="ordenarPor"]')
    .forEach((radio) => {
      radio.addEventListener("change", carregarDadosUsuarioLogado);
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

        await buscaAluno(usuario);

        return true;
      }
    } catch (error) {
      console.error("Erro ao buscar usuário logado", error);
      return null;
    }
  }

  async function buscaAluno(usuario) {
    try {
      const response = await fetch(
        `/api/alunos/por-matricula/${usuario.codigo}`
      );

      if (response.ok) {
        const aluno = await response.json();
        alunoCarregado = aluno;
        await carregaBoletos(aluno);
        return true;
      }
    } catch (error) {
      console.error("Erro ao buscar usuário logado", error);
      return null;
    }
  }

  async function carregaBoletos(aluno) {
    try {
      const response = await fetch(`/api/boleto/por-aluno/${aluno.id}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar boletos:" + response.statusText);
      }

      const boletos = await response.json();

      const tabelaCorpo = document.getElementById("tabela");

      tabelaCorpo.innerHTML = "";

      for (const boleto of boletos) {
        const linha = document.createElement("tr");

        linha.innerHTML = `
          <td>${formatarData(boleto.dataEmissao)}</td>
          <td>${formatarData(boleto.dataVencimento)}</td>
          <td>${boleto.valor}</td>
          <td>${boleto.status}</td>
        `;

        tabelaCorpo.appendChild(linha);
      }
      return true;
    } catch (error) {
      console.log("Erro ao carregar boletos:", error);
      return null;
    }
  }

  async function carregarBoletosFiltrados() {
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
    const url = new URL("/api/boleto/pesquisar", window.location.origin);
    url.searchParams.append("termo", termo);
    url.searchParams.append("tipo", tipo);
    url.searchParams.append("matricula", alunoCarregado.matricula);
    // 4. Chama a API
    try {
      const response = await fetch(url);
      const boletos = await response.json();

      // 5. Renderiza a tabela (função que você já tem)
      renderizarTabelaBoletos(boletos);
    } catch (error) {
      console.error("Erro ao buscar boleto:", error);
    }
  }

  async function renderizarTabelaBoletos(boletos) {
    tabela.innerHTML = "";

    for (const boleto of boletos) {
      const linha = document.createElement("tr");

      linha.innerHTML = `
          <td>${formatarData(boleto.dataEmissao)}</td>
          <td>${formatarData(boleto.dataVencimento)}</td>
          <td>${boleto.valor}</td>
          <td>${boleto.status}</td>
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
