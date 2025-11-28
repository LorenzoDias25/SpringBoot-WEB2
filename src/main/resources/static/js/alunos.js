document.addEventListener("DOMContentLoaded", function () {
  carregarAlunos();

  // --- Variáveis Globais de Estado ---
  let alunoSelecionado = null;
  let historicoSelecionado = null;
  let mensalidadeSelecionada = null;

  //tipo de alert
  const tipoAlert = Object.freeze({
    DANGER: "danger",
    SUCESS: "primary",
  });

  // Referência dos elementos de filtro
  const inputPesquisa = document.getElementById("inputPesquisa");
  const botaoPesquisa = document.getElementById("botaoPesquisa");

  // --- Seletores da Tabela Principal ---
  const tabelaAlunosBody = document.getElementById("tabelaAlunosBody");
  const btnEditarAluno = document.getElementById("btnEditarAluno");
  //   const btnDesativarAluno = document.getElementById("btnDesativarAluno");

  // --- Seletores Tabela Histórico ---
  const tabelaHistoricoBody = document.getElementById("tabelaHistoricoBody");
  const btnEditarHistorico = document.getElementById("btnEditarHistorico");

  // --- Seletores Tabela Mensalidades ---
  const tabelaMensalidadesBody = document.getElementById(
    "tabelaMensalidadesBody"
  );
  const btnInserirMensalidade = document.getElementById(
    "btnInserirMensalidade"
  );
  const btnEditarMensalidade = document.getElementById("btnEditarMensalidade");

  //   // --- Seletores Modal Desativar Alunos ---
  //   const modalDesativar = document.getElementById("modalDesativar");
  //   const desativarMensagem = document.getElementById("desativarMensagem");
  //   const desativarInstrucao = document.getElementById("desativarInstrucao");
  //   const inputConfirmarCodigo = document.getElementById("inputConfirmarCodigo");
  //   const btnConfirmarDesativacao = document.getElementById(
  //     "btnConfirmarDesativacao"
  //   );
  //   const alertaModalDesativarAlunos = document.getElementById(
  //     "alertaModalDesativarAlunos"
  //   );

  //Seletores do Modal Gerenciar Alunos
  const modalGerenciarAluno = document.getElementById("modalGerenciarAluno");
  const modalAlunoTitulo = document.getElementById("modalAlunoTitulo");
  // const listaDisciplinasCheckboxes = document.getElementById(
  //   "listaDisciplinasCheckboxes"
  // );
  const btnSalvarAluno = document.getElementById("btnSalvarAluno");
  const alertaModalGerenciarAluno = document.getElementById(
    "alertaModalGerenciarAluno"
  );

  // Inputs - Dados Pessoais
  const alunoNome = document.getElementById("alunoNome");
  const alunoCPF = document.getElementById("alunoCPF");
  const alunoEmail = document.getElementById("alunoEmail");
  const alunoCelular = document.getElementById("alunoCelular");
  const alunoNascimento = document.getElementById("alunoNascimento");

  // Inputs - Endereço
  const alunoRua = document.getElementById("alunoRua");
  const alunoNumero = document.getElementById("alunoNumero");
  const alunoBairro = document.getElementById("alunoBairro");
  const alunoCidade = document.getElementById("alunoCidade");
  const alunoCEP = document.getElementById("alunoCEP");
  const alunoComplemento = document.getElementById("alunoComplemento");

  // --- Seletores Modal Editar Histórico ---
  const modalEditarHistorico = document.getElementById("modalEditarHistorico");
  const editHistoricoDisciplina = document.getElementById(
    "editHistoricoDisciplina"
  );
  const editHistoricoNota = document.getElementById("editHistoricoNota");
  const editHistoricoStatus = document.getElementById("editHistoricoStatus");
  const btnSalvarEdicaoHistorico = document.getElementById(
    "btnSalvarEdicaoHistorico"
  );
  const alertaModalEdicaoHistorico = document.getElementById(
    "alertaModalEdicaoHistorico"
  );

  // --- Seletores Modal Mensalidade ---
  const modalEditarMensalidade = document.getElementById(
    "modalEditarMensalidade"
  );

  const modalInserirMensalidade = document.getElementById(
    "modalInserirMensalidade"
  );

  const modalMensalidadeTitulo = document.getElementById(
    "modalMensalidadeTitulo"
  );
  const editMensalidadeEmissao = document.getElementById(
    "editMensalidadeEmissao"
  );
  const editMensalidadeVencimento = document.getElementById(
    "editMensalidadeVencimento"
  );
  const editMensalidadeValor = document.getElementById("editMensalidadeValor");
  const editMensalidadeStatus = document.getElementById(
    "editMensalidadeStatus"
  );
  const btnSalvarEdicaoMensalidade = document.getElementById(
    "btnSalvarEdicaoMensalidade"
  );
  const inserirMensalidadeEmissao = document.getElementById(
    "inserirMensalidadeEmissao"
  );
  const inserirMensalidadeVencimento = document.getElementById(
    "inserirMensalidadeVencimento"
  );
  const inserirMensalidadeValor = document.getElementById(
    "inserirMensalidadeValor"
  );
  const inserirMensalidadeStatus = document.getElementById(
    "inserirMensalidadeStatus"
  );
  const btnSalvarInserirMensalidade = document.getElementById(
    "btnSalvarInserirMensalidade"
  );
  const alertaModalEdicaoMensalidade = document.getElementById(
    "alertaModalEdicaoMensalidade"
  );
  const alertaModalInserirMensalidade = document.getElementById(
    "alertaModalInserirMensalidade"
  );

  // --- LÓGICA DE PESQUISAR ALUNOS ---

  botaoPesquisa.addEventListener("click", carregarAlunosFiltrados);

  document
    .querySelectorAll('input[name="pesquisarPor"], input[name="ordenarPor"]')
    .forEach((radio) => {
      radio.addEventListener("change", carregarAlunos);
    });

  // --- LÓGICA 1: SELEÇÃO DE ALUNO (TABELA PRINCIPAL) ---
  if (tabelaAlunosBody) {
    tabelaAlunosBody.addEventListener("click", function (event) {
      const linhaClicada = event.target.closest("tr");
      if (!linhaClicada) return;

      // Pega dados da linha
      const celulas = linhaClicada.cells;
      alunoSelecionado = {
        id: linhaClicada.dataset.alunoId,
        matricula: celulas[0].textContent.trim(),
        nome: celulas[1].textContent.trim(),
        email: celulas[2].textContent.trim(),
        cpf: celulas[3].textContent.trim(),
        nascimento: celulas[4].textContent.trim(),
        celular: celulas[5].textContent.trim(),
        cep: linhaClicada.dataset.cep,
        rua: linhaClicada.dataset.rua,
        numero: linhaClicada.dataset.numero,
        bairro: linhaClicada.dataset.bairro,
        cidade: linhaClicada.dataset.cidade,
        complemento: linhaClicada.dataset.complemento,
      };

      // Habilita botões principais
      btnEditarAluno.disabled = false;
      //   btnDesativarAluno.disabled = false;
      btnInserirMensalidade.disabled = false;

      // Highlight
      tabelaAlunosBody
        .querySelectorAll("tr")
        .forEach((row) => row.classList.remove("table-active"));
      linhaClicada.classList.add("table-active");

      // Limpa tabelas secundárias e reseta seus botões
      resetarSelecaoHistorico(true); // true = limpar <tbody>
      resetarSelecaoMensalidade(true); // true = limpar <tbody>

      console.clear();
      console.log("Aluno selecionado:", alunoSelecionado);
      carregarHistorico(alunoSelecionado.id);
      carregarMensalidades(alunoSelecionado.id);
    });
  }

  // --- LÓGICA 3: SELEÇÃO TABELA HISTÓRICO ---
  tabelaHistoricoBody.addEventListener("click", function (event) {
    const linhaClicada = event.target.closest("tr");
    if (!linhaClicada || linhaClicada.cells.length === 1) return; // Ignora msg de "carregando"

    const celulas = linhaClicada.cells;
    historicoSelecionado = {
      id: linhaClicada.dataset.historicoId, // Supondo que tenhamos um data-id
      disciplina: celulas[0].textContent.trim(),
      nota: celulas[1].textContent.trim(),
      status: celulas[2].textContent.trim(),
    };

    btnEditarHistorico.disabled = false;
    tabelaHistoricoBody
      .querySelectorAll("tr")
      .forEach((row) => row.classList.remove("table-active"));
    linhaClicada.classList.add("table-active");
    console.log("--- ✅ Histórico Selecionado ---", historicoSelecionado);
  });

  // --- LÓGICA 4: SELEÇÃO TABELA MENSALIDADES ---
  tabelaMensalidadesBody.addEventListener("click", function (event) {
    const linhaClicada = event.target.closest("tr");
    if (!linhaClicada || linhaClicada.cells.length === 1) return;

    const celulas = linhaClicada.cells;
    mensalidadeSelecionada = {
      id: linhaClicada.dataset.mensalidadeId, // Supondo que tenhamos um data-id
      emissao: celulas[0].textContent.trim(),
      vencimento: celulas[1].textContent.trim(),
      valor: celulas[2].textContent.trim(),
      status: celulas[3].textContent.trim(),
    };

    btnEditarMensalidade.disabled = false;
    tabelaMensalidadesBody
      .querySelectorAll("tr")
      .forEach((row) => row.classList.remove("table-active"));
    linhaClicada.classList.add("table-active");
    console.log("--- ✅ Mensalidade Selecionada ---", mensalidadeSelecionada);
  });

  // --- LÓGICA 5: MODAL DESAIVAR ---

  //   // Modal Desativar Alunos
  //   modalDesativar.addEventListener("show.bs.modal", function () {
  //     if (alunoSelecionado) {
  //       desativarMensagem.textContent = `O aluno(a) ${alunoSelecionado.nome} será desativado`;
  //       desativarInstrucao.innerHTML = `Digite "<strong>${alunoSelecionado.matricula}</strong>" para confirmar`;
  //       btnConfirmarDesativacao.dataset.codigoCorreto =
  //         alunoSelecionado.matricula;
  //     }
  //     inputConfirmarCodigo.value = "";
  //     alertaDesativar.classList.add("d-none");
  //   });

  //--- LÓGICA 6: GERENCIAR ALUNOS
  modalGerenciarAluno.addEventListener("show.bs.modal", function (event) {
    const triggerButton = event.relatedTarget;

    if (triggerButton && triggerButton.id === "btnEditarAluno") {
      // --- MODO EDIÇÃO ---
      modalAlunoTitulo.textContent = "Editar Aluno";
      if (!alunoSelecionado) return; // Segurança

      // Carrega dados pessoais (da tabela)
      alunoNome.value = alunoSelecionado.nome;
      alunoCPF.value = alunoSelecionado.cpf;
      alunoEmail.value = alunoSelecionado.email;
      alunoCelular.value = alunoSelecionado.celular;
      alunoNascimento.value = alunoSelecionado.nascimento;

      // Carrega endereço
      alunoRua.value = alunoSelecionado.rua;
      alunoNumero.value = alunoSelecionado.numero;
      alunoBairro.value = alunoSelecionado.bairro;
      alunoCidade.value = alunoSelecionado.cidade;
      alunoCEP.value = alunoSelecionado.cep;
      alunoComplemento.value = alunoSelecionado.complemento;

      // Carrega disciplinas (marcando as que o aluno já tem)
      //carregarDisciplinas(dadosExtras.disciplinasMatriculadas);
    } else {
      // --- MODO CADASTRO ---
      modalAlunoTitulo.textContent = "Cadastrar Novo Aluno";
      // Limpa dados pessoais
      alunoNome.value = "";
      alunoCPF.value = "";
      alunoEmail.value = "";
      alunoCelular.value = "";
      alunoNascimento.value = "";

      // Limpa endereço
      alunoRua.value = "";
      alunoNumero.value = "";
      alunoBairro.value = "";
      alunoCidade.value = "";
      alunoCEP.value = "";
      alunoComplemento.value = "";

      alunoSelecionado = false;
      // Carrega disciplinas (sem nenhuma marcada)
      //carregarDisciplinas([]);
    }
    alertaModalGerenciarAluno.classList.add("d-none");
  });

  // Confirmar Cadastro/Edicao Aluno
  btnSalvarAluno.addEventListener("click", async function () {
    if (alunoNome.value == "") {
      mostrarAlerta(
        "Nome em branco",
        tipoAlert.DANGER,
        alertaModalGerenciarAluno
      );
      return;
    } else if (alunoCPF.value == "") {
      mostrarAlerta(
        "CPF em branco",
        tipoAlert.DANGER,
        alertaModalGerenciarAluno
      );
      return;
    } else if (!validarCPF(alunoCPF.value)) {
      mostrarAlerta(
        "CPF inválido",
        tipoAlert.DANGER,
        alertaModalGerenciarAluno
      );
      return;
    } else if (alunoEmail.value == "") {
      mostrarAlerta(
        "Email em branco",
        tipoAlert.DANGER,
        alertaModalGerenciarAluno
      );
      return;
    } else if (alunoCelular.value == "") {
      mostrarAlerta(
        "Celular em branco",
        tipoAlert.DANGER,
        alertaModalGerenciarAluno
      );
      return;
    } else if (alunoNascimento.value == "") {
      mostrarAlerta(
        "Nascimento em branco",
        tipoAlert.DANGER,
        alertaModalGerenciarAluno
      );
      return;
    } else if (!validarDataBR(alunoNascimento.value)) {
      mostrarAlerta(
        "Data não está no formato dd/MM/yyyy",
        tipoAlert.DANGER,
        alertaModalGerenciarAluno
      );
      return;
    } else if (alunoRua.value == "") {
      mostrarAlerta(
        "Rua em branco",
        tipoAlert.DANGER,
        alertaModalGerenciarAluno
      );
      return;
    } else if (alunoNumero.value == "") {
      mostrarAlerta(
        "Numero em branco",
        tipoAlert.DANGER,
        alertaModalGerenciarAluno
      );
      return;
    } else if (alunoBairro.value == "") {
      mostrarAlerta(
        "Bairro em branco",
        tipoAlert.DANGER,
        alertaModalGerenciarAluno
      );
      return;
    } else if (alunoCidade.value == "") {
      mostrarAlerta(
        "Cidade em branco",
        tipoAlert.DANGER,
        alertaModalGerenciarAluno
      );
      return;
    } else if (alunoCEP.value == "") {
      mostrarAlerta(
        "CEP em branco",
        tipoAlert.DANGER,
        alertaModalGerenciarAluno
      );
      return;
    }

    // Coleta todos os dados do formulário
    const dados = {
      id: null,
      nome: alunoNome.value,
      cpf: alunoCPF.value,
      email: alunoEmail.value,
      celular: alunoCelular.value,
      nascimento: formatarDataParaAPI(alunoNascimento.value),

      rua: alunoRua.value,
      cep: alunoCEP.value,
      numero: alunoNumero.value,
      bairro: alunoBairro.value,
      cidade: alunoCidade.value,
      complemento: alunoComplemento.value,
    };

    if (alunoSelecionado) {
      // MODO EDIÇÃO
      dados.id = alunoSelecionado.id;

      console.log("--- SALVANDO (EDIÇÃO) ---");
      let sucesso = await salvarAluno(dados);

      if (sucesso === false) {
        mostrarAlerta(
          "Erro ao atualizar aluno",
          tipoAlert.DANGER,
          alertaModalGerenciarAluno
        );
        return;
      }
    } else {
      // MODO CADASTRO
      console.log("--- SALVANDO (CADASTRO) ---");
      let sucesso = await salvarAluno(dados);

      if (sucesso === false) {
        mostrarAlerta(
          "Erro ao inserir aluno",
          tipoAlert.DANGER,
          alertaModalGerenciarAluno
        );
        return;
      }
    }

    // Fecha o modal
    mostrarAlerta(
      "Operação concluída",
      tipoAlert.SUCESS,
      alertaModalGerenciarAluno
    );

    setTimeout(() => {
      bootstrap.Modal.getInstance(modalGerenciarAluno).hide();
    }, 500);
    // Reseta a seleção na tabela principal
  });

  //   //Confirma desativacao aluno
  //   btnConfirmarDesativacao.addEventListener("click", function () {
  //     const codigoDigitado = inputConfirmarCodigo.value;
  //     const codigoCorreto = this.dataset.codigoCorreto;

  //     if (codigoDigitado == "") {
  //       mostrarAlerta(
  //         "Matricula em branco",
  //         tipoAlert.SUCESS,
  //         alertaModalDesativarAlunos
  //       );
  //       return;
  //     }

  //     if (codigoCorreto != codigoDigitado) {
  //       mostrarAlerta(
  //         "Matricula incorreta",
  //         tipoAlert.SUCESS,
  //         alertaModalDesativarAlunos
  //       );
  //       return;
  //     }

  //     mostrarAlerta(
  //       "Operação concluída",
  //       tipoAlert.SUCESS,
  //       alertaModalDesativarAlunos
  //     );

  //     setTimeout(() => {
  //       bootstrap.Modal.getInstance(modalDesativar).hide();
  //     }, 500);
  //   });

  // Modal Editar Mensalidade
  modalEditarMensalidade.addEventListener("show.bs.modal", function (event) {
    modalMensalidadeTitulo.textContent = "Editar Mensalidade";
    editMensalidadeEmissao.value = mensalidadeSelecionada.emissao;
    editMensalidadeVencimento.value = mensalidadeSelecionada.vencimento;
    editMensalidadeValor.value = mensalidadeSelecionada.valor;
    editMensalidadeStatus.value = mensalidadeSelecionada.status;

    alertaModalEdicaoMensalidade.classList.add("d-none");
  });

  //Confirma Edicao Mensalidade
  btnSalvarEdicaoMensalidade.addEventListener("click", async function () {
    if (
      editMensalidadeEmissao.value == "" ||
      !validarDataBR(editMensalidadeEmissao.value)
    ) {
      mostrarAlerta(
        "Data de emissão inválida",
        tipoAlert.DANGER,
        alertaModalEdicaoMensalidade
      );
      return;
    } else if (
      editMensalidadeVencimento.value == "" ||
      !validarDataBR(editMensalidadeVencimento.value)
    ) {
      mostrarAlerta(
        "Data de vencimento inválida",
        tipoAlert.DANGER,
        alertaModalEdicaoMensalidade
      );
      return;
    } else if (
      !verificarDiferencaMinima(
        editMensalidadeEmissao.value,
        editMensalidadeVencimento.value
      )
    ) {
      mostrarAlerta(
        "Data de vencimento precisar ter no minimo 30 dias a mais que a data de emissão",
        tipoAlert.DANGER,
        alertaModalEdicaoMensalidade
      );
      return;
    } else if (editMensalidadeValor.value <= 0) {
      mostrarAlerta(
        "Valor inválido",
        tipoAlert.DANGER,
        alertaModalEdicaoMensalidade
      );
      return;
    } else if (editMensalidadeStatus.value == "") {
      mostrarAlerta(
        "Status em branco",
        tipoAlert.DANGER,
        alertaModalEdicaoMensalidade
      );
      return;
    }

    switch (editMensalidadeStatus.value.toLowerCase()) {
      case "prazo":
        {
        }
        break;
      case "vencida":
        {
        }
        break;
      case "paga":
        {
        }
        break;
      case "cancelada":
        {
        }
        break;
      default: {
        mostrarAlerta(
          "Status inválido. Válidos: Prazo, Vencida, Paga, Cancelada",
          tipoAlert.DANGER,
          alertaModalEdicaoMensalidade
        );
        return;
      }
    }

    const dados = {
      id: mensalidadeSelecionada.id,
      valor: editMensalidadeValor.value,
      data_emissao: formatarDataParaAPI(editMensalidadeEmissao.value),
      data_vencimento: formatarDataParaAPI(editMensalidadeVencimento.value),
      status: editMensalidadeStatus.value.toLowerCase(),
    };

    let sucesso = await salvarMensalidade(dados);
    if (sucesso === false) {
      mostrarAlerta(
        "Erro ao salvar mensalidade",
        tipoAlert.DANGER,
        alertaModalEdicaoMensalidade
      );
      return;
    }

    mostrarAlerta(
      "Operação concluída",
      tipoAlert.SUCESS,
      alertaModalEdicaoMensalidade
    );

    setTimeout(() => {
      bootstrap.Modal.getInstance(modalEditarMensalidade).hide();
    }, 500);
  });

  //Modal Inserir Mensalidade
  modalInserirMensalidade.addEventListener("show.bs.modal", function (event) {
    // MODO INSERIR
    modalMensalidadeTitulo.textContent = "Inserir Mensalidade";
    inserirMensalidadeEmissao.value = dataDeHojeFormatada();
    inserirMensalidadeVencimento.value = avancarTrintaDias(
      dataDeHojeFormatada()
    );
    inserirMensalidadeValor.value = "";
    inserirMensalidadeStatus.value = "Prazo";

    alertaModalInserirMensalidade.classList.add("d-none");
  });

  //Confirma Inserir Mensalidade
  btnSalvarInserirMensalidade.addEventListener("click", async function () {
    if (
      inserirMensalidadeEmissao.value == "" ||
      !validarDataBR(inserirMensalidadeEmissao.value)
    ) {
      mostrarAlerta(
        "Data de emissão inválida",
        tipoAlert.DANGER,
        alertaModalInserirMensalidade
      );
      return;
    } else if (
      inserirMensalidadeVencimento.value == "" ||
      !validarDataBR(inserirMensalidadeVencimento.value)
    ) {
      mostrarAlerta(
        "Data de vencimento inválida",
        tipoAlert.DANGER,
        alertaModalInserirMensalidade
      );
      return;
    } else if (
      !verificarDiferencaMinima(
        inserirMensalidadeEmissao.value,
        inserirMensalidadeVencimento.value
      )
    ) {
      mostrarAlerta(
        "Data de vencimento precisar ter no minimo 30 dias a mais que a data de emissão",
        tipoAlert.DANGER,
        alertaModalInserirMensalidade
      );
      return;
    } else if (inserirMensalidadeValor.value <= 0) {
      mostrarAlerta(
        "Valor inválido",
        tipoAlert.DANGER,
        alertaModalInserirMensalidade
      );
      return;
    }

    const dados = {
      id_aluno_fk: alunoSelecionado.id,
      valor: inserirMensalidadeValor.value,
      data_emissao: formatarDataParaAPI(inserirMensalidadeEmissao.value),
      data_vencimento: formatarDataParaAPI(inserirMensalidadeVencimento.value),
      status: inserirMensalidadeStatus.value.toLowerCase(),
    };

    let sucesso = await salvarMensalidade(dados);
    if (sucesso === false) {
      mostrarAlerta(
        "Erro ao criar mensalidade",
        tipoAlert.DANGER,
        alertaModalInserirMensalidade
      );
      return;
    }

    mostrarAlerta(
      "Operação concluída",
      tipoAlert.SUCESS,
      alertaModalInserirMensalidade
    );

    setTimeout(() => {
      bootstrap.Modal.getInstance(modalInserirMensalidade).hide();
    }, 500);
  });

  // Modal Editar Histórico
  modalEditarHistorico.addEventListener("show.bs.modal", function () {
    if (historicoSelecionado) {
      editHistoricoDisciplina.value = historicoSelecionado.disciplina;
      editHistoricoNota.value = historicoSelecionado.nota;
      editHistoricoStatus.value = historicoSelecionado.status;
    }

    alertaModalEdicaoHistorico.classList.add("d-none");
  });

  //Confirmar Edição histórico
  btnSalvarEdicaoHistorico.addEventListener("click", async function () {
    if (editHistoricoNota.value < 0 || editHistoricoNota.value > 10) {
      mostrarAlerta(
        "Nota inválida",
        tipoAlert.DANGER,
        alertaModalEdicaoHistorico
      );
      return;
    } else if (editHistoricoStatus.value == "") {
      mostrarAlerta(
        "Nota em branco",
        tipoAlert.DANGER,
        alertaModalEdicaoHistorico
      );
      return;
    }

    switch (editHistoricoStatus.value.toLowerCase()) {
      case "cursando":
        {
        }
        break;
      case "trancado":
        {
        }
        break;
      case "aprovado":
        {
        }
        break;
      case "reprovado":
        {
        }
        break;
      default: {
        mostrarAlerta(
          "Status inválido. Válidos: Aprovado, Reprovado, Cursando, Trancado",
          tipoAlert.DANGER,
          alertaModalEdicaoHistorico
        );
        return;
      }
    }

    const dados = {
      id_matricula: historicoSelecionado.id,
      nota_final: editHistoricoNota.value,
      status: editHistoricoStatus.value.toLowerCase(),
    };

    console.log("--- ✅ SALVANDO (EDIÇÃO) ---");

    let sucesso = await salvarHistorico(dados);
    if (sucesso === false) {
      mostrarAlerta(
        "Erro ao salvar histórico",
        tipoAlert.DANGER,
        alertaModalEdicaoHistorico
      );
      return;
    }

    mostrarAlerta(
      "Operação concluída",
      tipoAlert.SUCESS,
      alertaModalEdicaoHistorico
    );

    setTimeout(() => {
      bootstrap.Modal.getInstance(modalEditarHistorico).hide();
    }, 500);
  });

  // --- FUNÇÕES AUXILIARES ---

  //   //Gera a Lista de checkboxes de disciplinas
  //   function carregarDisciplinas(disciplinasMatriculadas = []) {
  //     let htmlCheckboxes = "";

  //     TODAS_DISCIPLINAS.forEach((disciplina) => {
  //       // Verifica se o ID da disciplina está na lista de matriculadas
  //       const estaMarcado = disciplinasMatriculadas.includes(disciplina.id);
  //       const checkedAttr = estaMarcado ? "checked" : "";

  //       htmlCheckboxes += `
  //                   <div class="form-check">
  //                     <input class="form-check-input" type="checkbox" value="${disciplina.id}" id="check-${disciplina.id}" ${checkedAttr}>
  //                     <label class="form-check-label" for="check-${disciplina.id}">
  //                       ${disciplina.nome} - Turma ${disciplina.turma}
  //                     </label>
  //                   </div>
  //               `;
  //     });

  //     listaDisciplinasCheckboxes.innerHTML = htmlCheckboxes;
  //   }

  // Função de Reset da Tabela Histórico
  function resetarSelecaoHistorico(limparTabela = false) {
    btnEditarHistorico.disabled = true;
    historicoSelecionado = null;
    if (limparTabela) {
      tabelaHistoricoBody.innerHTML =
        '<tr><td colspan="3">Selecione um aluno".</td></tr>';
    } else {
      tabelaHistoricoBody
        .querySelectorAll("tr")
        .forEach((row) => row.classList.remove("table-active"));
    }
  }

  // Função de Reset da Tabela Mensalidades
  function resetarSelecaoMensalidade(limparTabela = false) {
    btnEditarMensalidade.disabled = true;
    mensalidadeSelecionada = null;
    if (limparTabela) {
      tabelaMensalidadesBody.innerHTML =
        '<tr><td colspan="3">Selecione um alunor".</td></tr>';
    } else {
      tabelaMensalidadesBody
        .querySelectorAll("tr")
        .forEach((row) => row.classList.remove("table-active"));
    }
  }

  function renderizarTabelaAlunos(alunos) {
    tabelaAlunosBody.innerHTML = "";

    // 5. Itera sobre cada aluno na lista
    alunos.forEach((aluno) => {
      // 6. Cria uma nova linha <tr>
      const linha = document.createElement("tr");

      linha.dataset.alunoId = aluno.id;

      // 7. Adiciona os dados do JSON em células <td>
      linha.innerHTML = `
                <td>${aluno.matricula}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.email}</td>
                <td>${aluno.cpf}</td>
                <td>${formatarData(aluno.data_nascimento)}</td> 
                <td>${aluno.celular}</td>
            `;

      // 8. Adiciona a linha preenchida ao corpo da tabela
      tabelaAlunosBody.appendChild(linha);
    });
  }

  function mostrarAlerta(mensagem, tipo, modal) {
    modal.textContent = mensagem;
    modal.className = `alert alert-${tipo}`;
  }

  async function carregarAlunos() {
    try {
      // 2. Chama a API do seu RestController
      const response = await fetch("/api/alunos/todos");

      if (!response.ok) {
        throw new Error("Erro ao buscar alunos: " + response.statusText);
      }

      // 3. Converte a resposta para JSON (uma lista de alunos)
      const alunos = await response.json();

      // 4. Pega o "gancho" da tabela (o <tbody>)
      const tabelaCorpo = document.getElementById("tabelaAlunosBody");

      // Limpa a tabela (caso já tenha algo)
      tabelaCorpo.innerHTML = "";

      // 5. Itera sobre cada aluno na lista
      alunos.forEach((aluno) => {
        // 6. Cria uma nova linha <tr>
        const linha = document.createElement("tr");

        linha.dataset.alunoId = aluno.id;
        linha.dataset.cep = aluno.endereco.cep;
        linha.dataset.rua = aluno.endereco.rua;
        linha.dataset.numero = aluno.endereco.numero;
        linha.dataset.bairro = aluno.endereco.bairro;
        linha.dataset.cidade = aluno.endereco.cidade;
        linha.dataset.complemento = aluno.endereco.complemento;

        // 7. Adiciona os dados do JSON em células <td>
        linha.innerHTML = `
                <td>${aluno.matricula}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.email}</td>
                <td>${aluno.cpf}</td>
                <td>${formatarData(aluno.data_nascimento)}</td> 
                <td>${aluno.celular}</td>
            `;

        // 8. Adiciona a linha preenchida ao corpo da tabela
        tabelaCorpo.appendChild(linha);
      });
    } catch (error) {
      console.error("Falha ao carregar alunos:", error);
      // Você pode querer mostrar uma mensagem de erro amigável na tela
    }
  }

  function formatarData(dataISO) {
    // Converte "2005-03-10" para "10/03/2005"
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  // Carregamento do Histórico
  async function carregarHistorico(alunoId) {
    try {
      // 2. Chama a API do seu RestController
      const response = await fetch(`/api/matriculas/por-aluno/${alunoId}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar matriculas: " + response.statusText);
      }

      // 3. Converte a resposta para JSON (uma lista de alunos)
      const matriculas = await response.json();

      // 4. Pega o "gancho" da tabela (o <tbody>)
      const tabelaCorpo = document.getElementById("tabelaHistoricoBody");

      // Limpa a tabela (caso já tenha algo)
      tabelaCorpo.innerHTML = "";

      // 5. Itera sobre cada aluno na lista
      matriculas.forEach((matricula) => {
        // 6. Cria uma nova linha <tr>
        const linha = document.createElement("tr");

        linha.dataset.historicoId = matricula.id_matricula;

        // 7. Adiciona os dados do JSON em células <td>
        linha.innerHTML = `
                <td>${matricula.gradeDisciplinas.disciplinas.nome}</td>
                <td>${matricula.nota_final}</td>
                <td>${matricula.status_disciplina}</td>
            `;

        // 8. Adiciona a linha preenchida ao corpo da tabela
        tabelaCorpo.appendChild(linha);
      });
    } catch (error) {
      console.error("Falha ao carregar matriculas:", error);
      // Você pode querer mostrar uma mensagem de erro amigável na tela
    }
  }

  // Carregamento das Mensalidades
  async function carregarMensalidades(alunoId) {
    try {
      // 2. Chama a API do seu RestController
      const response = await fetch(`/api/boleto/por-aluno/${alunoId}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar mensalidades: " + response.statusText);
      }

      // 3. Converte a resposta para JSON (uma lista de alunos)
      const mensalidades = await response.json();

      // 4. Pega o "gancho" da tabela (o <tbody>)
      const tabelaCorpo = document.getElementById("tabelaMensalidadesBody");

      // Limpa a tabela (caso já tenha algo)
      tabelaCorpo.innerHTML = "";

      // 5. Itera sobre cada aluno na lista
      mensalidades.forEach((mensalidade) => {
        // 6. Cria uma nova linha <tr>
        const linha = document.createElement("tr");

        linha.dataset.mensalidadeId = mensalidade.id_boleto;

        // 7. Adiciona os dados do JSON em células <td>
        linha.innerHTML = `
                <td>${formatarData(mensalidade.dataEmissao)}</td>
                <td>${formatarData(mensalidade.dataVencimento)}</td>
                <td>${mensalidade.valor}</td>
                <td>${mensalidade.status}</td>
            `;

        // 8. Adiciona a linha preenchida ao corpo da tabela
        tabelaCorpo.appendChild(linha);
      });
    } catch (error) {
      console.error("Falha ao carregar mensalidade:", error);
      // Você pode querer mostrar uma mensagem de erro amigável na tela
    }
  }

  function formatarDataParaAPI(dataDDMMYYYY) {
    if (!dataDDMMYYYY) return null;

    // Quebra a data "15/01/2006" em [15, 01, 2006]
    const partes = dataDDMMYYYY.split("/");
    if (partes.length === 3) {
      // Remonta como "2006-01-15"
      return `${partes[2]}-${partes[1]}-${partes[0]}`;
    }
    return dataDDMMYYYY; // Retorna original se o formato for inesperado
  }

  function validarDataBR(dataString) {
    // 1. Verifica o formato básico: dd/MM/yyyy
    // ^ = inicio, \d{2} = 2 digitos, \/ = barra, $ = fim
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dataString)) {
      return false;
    }

    // 2. Verifica se os números são válidos
    const partes = dataString.split("/");
    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10);
    const ano = parseInt(partes[2], 10);

    // Checagens básicas de intervalo
    if (ano < 1900 || ano > 2100) return false;
    if (mes < 1 || mes > 12) return false;

    // Verifica dias do mês (incluindo anos bissextos)
    const diasNoMes = new Date(ano, mes, 0).getDate();
    if (dia < 1 || dia > diasNoMes) return false;

    return true;
  }

  function validarCPF(cpf) {
    // 1. Remove tudo o que não for dígito (pontos, traços, espaços)
    cpf = cpf.replace(/[^\d]+/g, "");

    // 2. Validação básica: Tamanho e sequências de números iguais
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }

    // 3. Validação do 1º Dígito Verificador
    let soma = 0;
    let resto;

    // Percorre os 9 primeiros dígitos
    for (let i = 1; i <= 9; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    // 4. Validação do 2º Dígito Verificador
    soma = 0;

    // Percorre os 10 primeiros dígitos (agora incluindo o 1º verificador)
    for (let i = 1; i <= 10; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(10, 11))) {
      return false;
    }

    // Se passou por tudo, é válido!
    return true;
  }

  async function carregarAlunosFiltrados() {
    // 2. Coleta os valores dos filtros
    const termo = inputPesquisa.value;
    const tipo = document.querySelector(
      'input[name="pesquisarPor"]:checked'
    ).value;
    const ordem = document.querySelector(
      'input[name="ordenarPor"]:checked'
    ).value;

    // 3. Monta a URL da API com os parâmetros
    const url = new URL("/api/alunos/pesquisar", window.location.origin);
    url.searchParams.append("termo", termo);
    url.searchParams.append("tipo", tipo);
    url.searchParams.append("ordem", ordem);

    // 4. Chama a API
    try {
      const response = await fetch(url);
      const alunos = await response.json();

      // 5. Renderiza a tabela (função que você já tem)
      renderizarTabelaAlunos(alunos);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }
  }

  // Crie uma função que é chamada quando você clica em "Salvar" no modal
  async function salvarAluno(dados) {
    //Logica de decisao
    let url;
    let metodo;

    if (dados.id) {
      // Têm ID? Então é EDIÇÃO (PUT)
      url = `/api/alunos/salvar/${dados.id}`;
      metodo = "PUT";
    } else {
      // Não tem ID? Então é CADASTRO (POST)
      url = "/api/alunos/salvar";
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
        carregarAlunos();
        return true;
      } else {
        console.log("Erro na requisição");
        return false;
      }
    } catch (error) {
      console.log("Erro na requisição:", error);
      return false;
    }
  }

  async function salvarHistorico(dados) {
    //Logica de decisao

    // 2. Envia a requisição PUT para a API
    try {
      const response = await fetch("/api/matriculas/salvar", {
        // A URL deve ter o ID do aluno
        method: "PUT", // O método HTTP para atualizar
        headers: {
          "Content-Type": "application/json", // Diz ao Spring que você está enviando JSON
        },
        body: JSON.stringify(dados), // Converte o objeto JS para uma string JSON
      });

      if (response.ok) {
        resetarSelecaoHistorico();
        carregarHistorico(alunoSelecionado.id);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Erro na requisição:", error);
      return false;
    }
  }

  async function salvarMensalidade(dados) {
    //Logica de decisao
    let url;
    let metodo;

    if (dados.id) {
      // Têm ID? Então é EDIÇÃO (PUT)
      url = `/api/boleto/salvar/${dados.id}`;
      metodo = "PUT";
    } else {
      // Não tem ID? Então é CADASTRO (POST)
      url = "/api/boleto/salvar";
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
        resetarSelecaoMensalidade();
        carregarMensalidades(alunoSelecionado.id);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Erro na requisição:", error);
      return false;
    }
  }

  function verificarDiferencaMinima(dataAStr, dataBStr) {
    // --- FUNÇÃO AUXILIAR PARA CONVERTER DD/MM/YYYY PARA OBJETO Date ---
    function parseDate(dateString) {
      // Assume o formato DD/MM/YYYY
      if (!dateString) return null;

      const parts = dateString.split("/");

      // CUIDADO: O construtor do Date usa mês baseado em zero (0=Jan)
      // Por isso, subtraímos 1 do mês.
      // new Date(ano, mesIndex, dia)
      return new Date(parts[2], parts[1] - 1, parts[0]);
    }
    // -----------------------------------------------------------------

    const dataA = parseDate(dataAStr);
    const dataB = parseDate(dataBStr);

    // 1. Validação básica de que as datas foram convertidas
    if (isNaN(dataA.getTime()) || isNaN(dataB.getTime())) {
      console.error(
        "Erro: Uma das datas está em formato inválido. Use DD/MM/YYYY."
      );
      return false;
    }

    // 2. Definir a diferença mínima de 30 dias em milissegundos
    const DIAS_MINIMOS = 30;
    const TRINTA_DIAS_MS = DIAS_MINIMOS * 24 * 60 * 60 * 1000;

    // 3. Calcular a diferença em milissegundos (Data B - Data A)
    const diferencaMS = dataB.getTime() - dataA.getTime();

    // 4. Retornar true se a diferença for maior ou igual a 30 dias
    // (O operador >= atende ao "pelo menos 30 dias maior")
    return diferencaMS >= TRINTA_DIAS_MS;
  }

  function dataDeHojeFormatada() {
    const hoje = new Date();

    // Obter dia, mês e ano
    const dia = String(hoje.getDate()).padStart(2, "0");
    // Mês é base 0 (0=Janeiro), então adicionamos 1
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const ano = hoje.getFullYear();

    // Retorna a string formatada
    return `${dia}/${mes}/${ano}`;
  }

  function avancarTrintaDias(dataAStr) {
    // Função de parse segura para DD/MM/YYYY
    function parseDateBR(dateString) {
      const parts = dateString.split("/");
      // new Date(ano, mesIndex, dia) - mesIndex é baseado em 0
      return new Date(parts[2], parts[1] - 1, parts[0]);
    }

    // 1. Converte a string de entrada para objeto Date
    const dataA = parseDateBR(dataAStr);

    // 2. Verifica se a data é válida
    if (isNaN(dataA.getTime())) {
      console.error("Erro: Data de entrada inválida. Use dd/MM/yyyy.");
      return null;
    }

    // 3. Avança 30 dias: O método setDate() ajusta o mês e o ano automaticamente
    dataA.setDate(dataA.getDate() + 30);

    // 4. Formata a nova data
    const diaNovo = String(dataA.getDate()).padStart(2, "0");
    const mesNovo = String(dataA.getMonth() + 1).padStart(2, "0");
    const anoNovo = dataA.getFullYear();

    return `${diaNovo}/${mesNovo}/${anoNovo}`;
  }

  // Exemplo:
  // const dataInicial = "01/11/2025";
  // const dataFutura = avancarTrintaDias(dataInicial);
  // console.log(`30 dias depois de ${dataInicial} é: ${dataFutura}`); // "01/12/2025"
});
// Função de Reset: Tabela Principal
// function resetarSelecaoAluno() {
//   btnEditarAluno.disabled = true;
//   btnDesativarAluno.disabled = true;
//   alunoSelecionado = null;
//   tabelaAlunosBody
//     .querySelectorAll("tr")
//     .forEach((row) => row.classList.remove("table-active"));
// }
