document.addEventListener("DOMContentLoaded", function () {
  carregarContas();
  // --- Variável Global do Script ---
  let contaSelecionada = null;

  //tipo de alert
  const tipoAlert = Object.freeze({
    DANGER: "danger",
    SUCESS: "primary",
    INFO: "info",
  });

  // --- Seleção de Elementos (COMPLETA) ---

  // Referência dos elementos de filtro
  const inputPesquisa = document.getElementById("inputPesquisa");
  const botaoPesquisa = document.getElementById("botaoPesquisa");
  const radiosPesquisa = document.querySelectorAll(
    'input[name="pesquisarPor"]'
  );
  const selectStatus = document.getElementById("selectStatus");

  // Botões de ação da Tabela Contas
  const btnCadastrarTabela = document.getElementById("btnCadastrarTabela");
  const btnEditarTabela = document.getElementById("btnEditarTabela");
  const btnDesativarTabela = document.getElementById("btnDesativarTabela");

  // Elementos do Formulário de Endereço (da Lógica 3)
  const btnEditarEndereco = document.getElementById("btnEditarEndereco");
  const btnSalvarEndereco = document.getElementById("btnSalvarEndereco");
  const camposEndereco = document.querySelectorAll(".address-field");
  const editRua = document.getElementById("editRua");
  const editBairro = document.getElementById("editBairro");
  const editCidade = document.getElementById("editCidade");
  const editNumero = document.getElementById("editNumero");
  const editCEP = document.getElementById("editCEP");
  const editComplemento = document.getElementById("editComplemento");
  const alertaEndereco = document.getElementById("alertaEndereco");

  // Elementos da Tabela Contas
  const tabelaContasBody = document.getElementById("tabelaContasBody");

  // Elementos do Modal de Desativação (da Lógica 2)
  const modalDesativar = document.getElementById("modalDesativar");
  const desativarMensagem = document.getElementById("desativarMensagem");
  const desativarInstrucao = document.getElementById("desativarInstrucao");
  const inputConfirmarCodigo = document.getElementById("inputConfirmarCodigo");
  const btnConfirmarDesativacao = document.getElementById(
    "btnConfirmarDesativacao"
  );
  const alertaDesativar = document.getElementById("alertaDesativar");
  const alertaEditar = document.getElementById("alertaEditar");

  // Elementos do Modal de Edição (da Lógica 4)
  const modalEditarConta = document.getElementById("modalEditarConta");
  const modalGerenciarContaTitulo = document.getElementById(
    "modalGerenciarContaTitulo"
  );
  const editCodigo = document.getElementById("editCodigo");
  const editEmail = document.getElementById("editEmail");
  const editCargo = document.getElementById("editCargo");
  const editSenha = document.getElementById("editSenha");
  const btnSalvarEdicaoConta = document.getElementById("btnSalvarEdicaoConta");

  // --- LÓGICA DE PESQUISAR EVENTOS ---
  botaoPesquisa.addEventListener("click", carregarContasFiltrados);

  document
    .querySelectorAll('input[name="pesquisarPor"], input[name="ordenarPor"]')
    .forEach((radio) => {
      radio.addEventListener("change", carregarContas);
    });

  radiosPesquisa.forEach((radio) => {
    radio.addEventListener("change", alternarTipoInput);
  });

  // --- Lógica 1: Clique na Tabela CONTAS---
  if (tabelaContasBody) {
    tabelaContasBody.addEventListener("click", async function (event) {
      const linhaClicada = event.target.closest("tr");

      if (!linhaClicada) return;

      // Pega TODOS os dados da linha
      const celulas = linhaClicada.cells;
      contaSelecionada = {
        contaId: linhaClicada.dataset.contaId,
        enderecoId: linhaClicada.dataset.enderecoId,
        nome: celulas[0].textContent.trim(),
        codigo: celulas[1].textContent.trim(),
        email: celulas[2].textContent.trim(),
        cargo: celulas[3].textContent.trim(),
        status: celulas[4].textContent.trim(),
      };

      if (contaSelecionada.enderecoId != 0) {
        await buscarEnderco(contaSelecionada.enderecoId);
        alertaEndereco.classList.add("d-none");
        btnEditarEndereco.disabled = false;
      } else {
        btnEditarEndereco.disabled = true;
        resetarEndereco();
        mostrarAlerta(
          "Endereço não encontrado",
          tipoAlert.DANGER,
          alertaEndereco
        );
      }

      if (contaSelecionada.status == "Desativado") {
        btnDesativarTabela.textContent = "Ativar";
      } else {
        btnDesativarTabela.textContent = "Desativar";
      }

      // Habilita os botões
      btnEditarTabela.disabled = false;
      btnDesativarTabela.disabled = false;

      //Highlight
      tabelaContasBody
        .querySelectorAll("tr")
        .forEach((row) => row.classList.remove("table-active"));
      linhaClicada.classList.add("table-active");

      console.clear();
      console.log("--- Conta Selecionada ---", contaSelecionada);
    });
  }

  // --- Lógica 2: Modal de Desativação (COMPLETA) ---
  modalDesativar.addEventListener("show.bs.modal", function () {
    if (contaSelecionada && contaSelecionada.status === "Ativado") {
      // Preenche os textos dinâmicos
      desativarMensagem.textContent = `O usuário ${contaSelecionada.nome} será desativado`;
      desativarInstrucao.innerHTML = `Digite "<strong>${contaSelecionada.codigo}</strong>" para confirmar`;

      // Armazena o código correto no próprio botão para verificação
      btnConfirmarDesativacao.dataset.codigoCorreto = contaSelecionada.codigo;
    } else {
      // Preenche os textos dinâmicos
      desativarMensagem.textContent = `O usuário ${contaSelecionada.nome} será ativado`;
      desativarInstrucao.innerHTML = `Digite "<strong>${contaSelecionada.codigo}</strong>" para confirmar`;

      // Armazena o código correto no próprio botão para verificação
      btnConfirmarDesativacao.dataset.codigoCorreto = contaSelecionada.codigo;
    }
    // Limpa o estado anterior
    inputConfirmarCodigo.value = "";
    alertaDesativar.classList.add("d-none");
  });

  // Lógica ao clicar no botão "Confirmar" DENTRO do modal de desativação
  btnConfirmarDesativacao.addEventListener("click", async function () {
    const codigoDigitado = inputConfirmarCodigo.value;
    const codigoCorreto = this.dataset.codigoCorreto;

    if (codigoDigitado != codigoCorreto) {
      mostrarAlerta("Codigo inválido", tipoAlert.DANGER, alertaDesativar);
      return;
    }

    let dadosAntes = "";
    if (contaSelecionada.status === "Ativado") {
      dadosAntes = {
        id: contaSelecionada.contaId,
        ativo: false,
      };
    } else {
      dadosAntes = {
        id: contaSelecionada.contaId,
        ativo: true,
      };
    }

    const dados = dadosAntes;
    let sucesso = await salvarConta(dados);

    if (sucesso === false) {
      mostrarAlerta("Erro ao alterar conta", tipoAlert.DANGER, alertaDesativar);
      return;
    }

    // SUCESSO
    console.log("Desativando conta: ", contaSelecionada);

    mostrarAlerta("Operação concluída", tipoAlert.SUCESS, alertaDesativar);

    setTimeout(() => {
      bootstrap.Modal.getInstance(modalDesativar).hide();
    }, 500);
    resetarSelecao();
  });

  // --- Lógica 3: Formulário de Endereço (COMPLETA) ---
  btnEditarEndereco.addEventListener("click", function () {
    camposEndereco.forEach((campo) => {
      campo.readOnly = false;
      campo.style.backgroundColor = "#FFFFFF";
    });
    btnSalvarEndereco.classList.remove("d-none");
  });

  btnSalvarEndereco.addEventListener("click", async function () {
    if (!contaSelecionada) return;

    if (editRua.value == "") {
      mostrarAlerta("Rua em branco", tipoAlert.DANGER, alertaEndereco);
      return;
    } else if (editBairro.value == "") {
      mostrarAlerta("Bairro em branco", tipoAlert.DANGER, alertaEndereco);
      return;
    } else if (editCidade.value == "") {
      mostrarAlerta("Cidade em branco", tipoAlert.DANGER, alertaEndereco);
      return;
    } else if (editNumero.value <= 0) {
      mostrarAlerta("Numero inválido", tipoAlert.DANGER, alertaEndereco);
      return;
    } else if (editCEP.value == "") {
      mostrarAlerta("CEP em branco", tipoAlert.DANGER, alertaEndereco);
      return;
    } else if (editComplemento.value == "") {
      mostrarAlerta("Complemento em branco", tipoAlert.DANGER, alertaEndereco);
      return;
    }

    const dados = {
      id: contaSelecionada.enderecoId,
      rua: editRua.value,
      bairro: editBairro.value,
      cidade: editCidade.value,
      numero: editNumero.value,
      cep: editCEP.value,
      complemento: editComplemento.value,
    };

    mostrarAlerta("Carregando...", tipoAlert.INFO, alertaEndereco);
    camposEndereco.forEach((campo) => {
      campo.readOnly = true;
      campo.style.backgroundColor = "#EEEEEE";
    });
    let sucesso = await salvarEvento(dados);

    if (sucesso === false) {
      mostrarAlerta(
        "Erro ao salvar endereco",
        tipoAlert.DANGER,
        alertaEndereco
      );
      camposEndereco.forEach((campo) => {
        campo.readOnly = false;
        campo.style.backgroundColor = "#FFFFFF";
      });
      return;
    }

    //Fecha o salvar
    mostrarAlerta("Operação concluída", tipoAlert.SUCESS, alertaEndereco);
    setTimeout(() => {
      btnSalvarEndereco.classList.add("d-none");
      alertaEndereco.classList.add("d-none");
    }, 1000);
  });

  // --- Lógica 4: Modal de Edição/Cadastro (COMPLETA) ---
  modalEditarConta.addEventListener("show.bs.modal", function (event) {
    const triggerButton = event.relatedTarget;

    if (triggerButton && triggerButton.id === "btnEditarTabela") {
      // --- MODO EDIÇÃO ---
      if (!contaSelecionada) return;
      modalGerenciarContaTitulo.textContent = "Editar Conta";
      editCodigo.value = contaSelecionada.codigo;
      editEmail.value = contaSelecionada.email;
      editCargo.value = contaSelecionada.cargo;
      editSenha.value = "";
      editCodigo.disabled = false;
    } else {
      // --- MODO CADASTRO ---
      modalGerenciarContaTitulo.textContent = "Cadastrar Conta";
      editCodigo.value = "";
      editEmail.value = "";
      editCargo.value = "";
      editSenha.value = "";
      editCodigo.disabled = false;
      resetarSelecao();
    }

    alertaEditar.classList.add("d-none");
  });

  // Lógica ao clicar no botão "Confirmar" (do modal de edição)
  btnSalvarEdicaoConta.addEventListener("click", async function () {
    let dadosParaEnviar;

    if (editCodigo.value == "") {
      mostrarAlerta("Código em branco", tipoAlert.DANGER, alertaEditar);
      return;
    } else if (editEmail.value == "") {
      mostrarAlerta("Email em branco", tipoAlert.DANGER, alertaEditar);
      return;
    } else if (editCargo.value == "") {
      mostrarAlerta("Conta em branco", tipoAlert.DANGER, alertaEditar);
      return;
    }

    switch (editCargo.value.toLowerCase()) {
      case "aluno":
      case "secretario":
      case "professor":
      case "ti":
      case "adm":
        break;
      default:
        mostrarAlerta(
          "Conta inválida (Ex: Aluno, Secretario, Professor, Ti, ADM",
          tipoAlert.DANGER,
          alertaEditar
        );
        return;
    }

    if (editSenha.value != "" && editSenha.value.length < 6) {
      mostrarAlerta(
        "Senha menor que seis digitos",
        tipoAlert.DANGER,
        alertaEditar
      );
      return;
    }

    const dados = {
      id: null,
      codigo: editCodigo.value,
      tipo: editCargo.value.toLowerCase(),
      email: editEmail.value,
      senha: null,
      ativo: null,
    };

    if (contaSelecionada) {
      // MODO EDIÇÃO
      dados.id = contaSelecionada.contaId;

      if (editSenha.value != "") {
        dados.senha = editSenha.value;
      }

      if (contaSelecionada.status == "Desativado") {
        dados.status = false;
      } else {
        dados.status = true;
      }

      let sucesso = await salvarConta(dados);
      if (sucesso === false) {
        mostrarAlerta("Erro ao editar conta", tipoAlert.DANGER, alertaEditar);
        return;
      }

      console.log("--- Enviando (Modo EDIÇÃO) ---", dados);

      // Atualiza a linha na tabela
    } else {
      if (editSenha.value == "") {
        mostrarAlerta("Senha em branco", tipoAlert.DANGER, alertaEditar);
        return;
      }
      dados.ativo = false;
      dados.senha = editSenha.value;
      let sucesso = await salvarConta(dados);
      if (sucesso === false) {
        mostrarAlerta("Erro ao editar conta", tipoAlert.DANGER, alertaEditar);
        return;
      }

      console.log("--- Enviando (Modo CADASTRO) ---", dados);
    }

    resetarSelecao();
    // await carregarContas();
    //Fecha modal
    mostrarAlerta("Operação concluída", tipoAlert.SUCESS, alertaEditar);

    setTimeout(() => {
      bootstrap.Modal.getInstance(modalEditarConta).hide();
    }, 500);
  });

  // --- FUNCOES APIS ---

  async function carregarContas() {
    try {
      const response = await fetch(`/api/contas/todos`);

      if (!response.ok) {
        throw new Error("Erro ao buscar contas:" + response.statusText);
      }

      const contas = await response.json();

      const tabelaCorpo = document.getElementById("tabelaContasBody");

      tabelaCorpo.innerHTML = "";

      for (const conta of contas) {
        //Teste depuracao
        // console.log(`Processando conta: ${conta.id_conta}`);
        // console.log(`Tipo: ${conta.tipo_usuario}, Código: ${conta.codigo}`);

        // const usuario = await buscarUsuario(conta.codigo, conta.tipo_usuario);

        const linha = document.createElement("tr");

        linha.dataset.contaId = conta.id_conta;

        const usuario = await buscarUsuario(conta.codigo, conta.tipoUsuario);

        const nome = usuario ? usuario.nome : "Nao encontrado";
        const status = conta.ativo ? "Ativado" : "Desativado";

        linha.dataset.enderecoId = usuario ? usuario.endereco.id : 0;

        //console.log("Usuario da API: ", usuario);

        linha.innerHTML = `
          <td>${nome}</td>
          <td>${conta.codigo}</td>
          <td>${conta.email}</td>
          <td>${conta.tipoUsuario}</td>
          <td>${status}</td>
        `;

        tabelaCorpo.appendChild(linha);
      }
    } catch (error) {
      console.log("Erro ao carregar contas:", error);
    }
  }

  async function buscarUsuario(codigo, tipo) {
    try {
      let url;

      if (tipo && tipo.toLowerCase() === "aluno") {
        url = `/api/alunos/por-matricula/${codigo}`;
      } else {
        url = `/api/funcionarios/por-codigo/${codigo}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Erro ao buscar usuario:" + response.statusText);
      }

      const usuario = await response.json();

      return usuario;
    } catch (error) {
      console.log("Erro ao buscar usuario:", error);
      return null;
    }
  }

  async function buscarEnderco(id) {
    try {
      const response = await fetch(`api/endereco/por-id/${id}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar endereco:" + response.statusText);
      }

      const endereco = await response.json();

      await carregarEndereco(endereco);

      return true;
    } catch (error) {
      console.log("Erro ao buscar endereco:", error);
      return null;
    }
  }

  async function salvarEvento(dados) {
    try {
      const response = await fetch(`/api/endereco/salvar/${dados.id}`, {
        method: "PUT", // O método HTTP para atualizar
        headers: {
          "Content-Type": "application/json", // Diz ao Spring que você está enviando JSON
        },
        body: JSON.stringify(dados), // Converte o objeto JS para uma string JSON
      });

      if (response.ok) {
        buscarEnderco(contaSelecionada.enderecoId);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Erro na requisição:", error);
      return false;
    }
  }

  async function salvarConta(dados) {
    //Logica de decisao
    let url;
    let metodo;

    if (dados.id) {
      // Têm ID? Então é EDIÇÃO (PUT)
      url = `/api/contas/salvar/${dados.id}`;
      metodo = "PUT";
    } else {
      // Não tem ID? Então é CADASTRO (POST)
      url = "/api/contas/salvar";
      metodo = "POST";
    }

    // 2. Envia a requisição PUT para a API
    try {
      const response = await fetch(url, {
        // A URL deve ter o ID do aluno
        method: metodo, // O método HTTP para atualizar
        headers: {
          "Content-Type": "application/json", // Diz ao Spring que você está enviando JSON
        },
        body: JSON.stringify(dados), // Converte o objeto JS para uma string JSON
      });

      if (response.ok) {
        carregarContas();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Erro na requisição:", error);
      return false;
    }
  }

  async function carregarContasFiltrados() {
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

    const ordem = document.querySelector(
      'input[name="ordenarPor"]:checked'
    ).value;

    console.log("Termo:", termo);
    // 3. Monta a URL da API com os parâmetros
    const url = new URL("/api/contas/pesquisar", window.location.origin);
    url.searchParams.append("termo", termo);
    url.searchParams.append("tipo", tipo);
    url.searchParams.append("ordem", ordem);

    // 4. Chama a API
    try {
      const response = await fetch(url);
      const contas = await response.json();

      // 5. Renderiza a tabela (função que você já tem)
      renderizarTabelaContas(contas);
    } catch (error) {
      console.error("Erro ao buscar conta:", error);
    }
  }

  // --- Funções Auxiliares (COMPLETAS) ---

  async function carregarEndereco(endereco) {
    try {
      editRua.value = endereco.rua;
      editBairro.value = endereco.bairro;
      editCidade.value = endereco.cidade;
      editNumero.value = endereco.numero;
      editCEP.value = endereco.cep;
      editComplemento.value = endereco.complemento;

      return true;
    } catch (error) {
      console.log("Erro ao completar endereco:", error);
      return null;
    }
  }

  function resetarEndereco() {
    editRua.value = "";
    editBairro.value = "";
    editCidade.value = "";
    editNumero.value = "";
    editCEP.value = "";
    editComplemento.value = "";
  }

  function mostrarAlerta(mensagem, tipo, modal) {
    modal.textContent = mensagem;
    modal.className = `alert alert-${tipo}`;
  }

  function resetarSelecao() {
    btnEditarTabela.disabled = true;
    btnDesativarTabela.disabled = true;
    contaSelecionada = null;
    const linhaAtiva = tabelaContasBody.querySelector(".table-active");
    if (linhaAtiva) {
      linhaAtiva.classList.remove("table-active");
    }
  }

  async function renderizarTabelaContas(contas) {
    tabelaContasBody.innerHTML = "";

    // 5. Itera sobre cada aluno na lista
    for (const conta of contas) {
      const linha = document.createElement("tr");

      linha.dataset.contaId = conta.id_conta;

      const usuario = await buscarUsuario(conta.codigo, conta.tipoUsuario);

      const nome = usuario ? usuario.nome : "Nao encontrado";
      const status = conta.ativo ? "Ativado" : "Desativado";

      linha.dataset.enderecoId = usuario ? usuario.endereco.id : 0;

      linha.innerHTML = `
          <td>${nome}</td>
          <td>${conta.codigo}</td>
          <td>${conta.email}</td>
          <td>${conta.tipoUsuario}</td>
          <td>${status}</td>
        `;

      tabelaContasBody.appendChild(linha);
    }
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

  alternarTipoInput();
});
