document.addEventListener("DOMContentLoaded", function () {
  carregarDisciplinas();

  //tipo de alert
  const tipoAlert = Object.freeze({
    DANGER: "danger",
    SUCESS: "primary",
  });

  // --- Variáveis Globais de Estado ---
  let disciplinaSelecionada = null;
  let alunoSelecionado = null;
  let gradeSelecionada = null;

  // --- Seletores da Tabela Principal ---
  const tabelaDisciplinasBody = document.getElementById(
    "tabelaDisciplinasBody"
  );
  const btnInserirDisciplina = document.getElementById("btnInserirDisciplina");
  const btnEditarDisciplina = document.getElementById("btnEditarDisciplina");

  // --- Seletores Tabela Alunos ---
  const tabelaAlunosBody = document.getElementById("tabelaAlunosBody");
  const btnCadastrarAluno = document.getElementById("btnCadastrarAluno");
  const btnEditarAluno = document.getElementById("btnEditarAluno");

  // --- Seletores Tabela Grade ---
  const tabelaGradeBody = document.getElementById("tabelaGradeBody");
  const btnCadastrarGrade = document.getElementById("btnCadastrarGrade");
  const btnEditarGrade = document.getElementById("btnEditarGrade");

  // --- Seletores Modal Disciplina (PRINCIPAL)---
  const modalGerenciarDisciplina = document.getElementById(
    "modalGerenciarDisciplina"
  );
  const modalDisciplinaTitulo = document.getElementById(
    "modalDisciplinaTitulo"
  );
  const editCodigo = document.getElementById("editCodigo");
  const editNome = document.getElementById("editNome");
  const editCarga = document.getElementById("editCarga");
  const editValor = document.getElementById("editValor");
  const btnSalvarDisciplina = document.getElementById("btnSalvarDisciplina");
  const alertaModalDisciplina = document.getElementById(
    "alertaModalDisciplina"
  );

  // --- Seletores Modal Aluno ---
  const modalGerenciarAluno = document.getElementById("modalGerenciarAluno");
  const modalAlunoTitulo = document.getElementById("modalAlunoTitulo");
  const btnDropdownAlunos = document.getElementById("btnDropdownAlunos");
  const dropdownMenuAlunos = document.getElementById("dropdownMenuAlunos");
  const btnConfirmarAlunos = document.getElementById("btnConfirmarAlunos");
  const alertaModalAlunos = document.getElementById("alertaModalAlunos");
  //  const btnDropdownTurmas = document.getElementById("btnDropdownTurmas");
  const editProfessor = document.getElementById("editProfessor");
  const editHorarioAluno = document.getElementById("editHorarioAluno");
  const editNotaAluno = document.getElementById("editNotaAluno");
  const editStatusAluno = document.getElementById("editStatusAluno");
  const btnDropdownTurmas = document.getElementById("btnDropdownTurmas");
  const dropdownMenuTurmas = document.getElementById("dropdownMenuTurmas");

  // --- Seletores Modal Grade Disciplinar ---
  const modalGerenciarGrade = document.getElementById("modalGerenciarGrade");
  const modalGradeTitulo = document.getElementById("modalGradeTitulo");
  const btnDropdownProfessor = document.getElementById("btnDropdownProfessor");
  const dropdownMenuProfessor = document.getElementById(
    "dropdownMenuProfessor"
  );
  const editGradeDisciplina = document.getElementById("editGradeDisciplina");
  const btnDropdownGradeTurmas = document.getElementById(
    "btnDropdownGradeTurmas"
  );
  const dropdownMenuGradeTurmas = document.getElementById(
    "dropdownMenuGradeTurmas"
  );
  const editDia = document.getElementById("editDia");
  const editHorario = document.getElementById("editHorario");
  const btnSalvarGrade = document.getElementById("btnSalvarGrade");
  const alertaModalGrade = document.getElementById("alertaModalGrade");

  // Referência dos elementos de filtro
  const inputPesquisa = document.getElementById("inputPesquisa");
  const botaoPesquisa = document.getElementById("botaoPesquisa");

  // --- LÓGICA DE PESQUISAR EVENTOS ---

  botaoPesquisa.addEventListener("click", carregarDisciplinasFiltrados);

  document
    .querySelectorAll('input[name="pesquisarPor"], input[name="ordenarPor"]')
    .forEach((radio) => {
      radio.addEventListener("change", carregarDisciplinas);
    });

  // --- LÓGICA 1: SELEÇÃO DE DISCIPLINA (TABELA PRINCIPAL) ---
  if (tabelaDisciplinasBody) {
    tabelaDisciplinasBody.addEventListener("click", function (event) {
      const linhaClicada = event.target.closest("tr");
      if (!linhaClicada) return;

      // Pega dados da linha
      const celulas = linhaClicada.cells;
      disciplinaSelecionada = {
        disciplinaId: linhaClicada.dataset.disciplinaId,
        codigo: celulas[0].textContent.trim(),
        nome: celulas[1].textContent.trim(),
        carga: celulas[2].textContent.trim(),
        valor: celulas[3].textContent.trim(),
      };

      // Habilita botão de editar
      btnEditarDisciplina.disabled = false;
      btnCadastrarAluno.disabled = false;

      // Highlight
      tabelaDisciplinasBody
        .querySelectorAll("tr")
        .forEach((row) => row.classList.remove("table-active"));
      linhaClicada.classList.add("table-active");

      carregarTabelasAlunos(disciplinaSelecionada.codigo);
      carregarTabelasGrade(disciplinaSelecionada.codigo);

      // Limpa e reseta tabelas secundárias
      // resetarSelecaoAluno(true);
      // resetarSelecaoGrade(true);

      console.clear();
      console.log("--- Disciplina Selecionada ---", disciplinaSelecionada);
    });
  }

  // --- LÓGICA 2: SELEÇÃO TABELA ALUNOS ---
  tabelaAlunosBody.addEventListener("click", function (event) {
    const linhaClicada = event.target.closest("tr");
    if (!linhaClicada || linhaClicada.cells.length === 1) return; // Ignora msg de "carregando"

    const celulas = linhaClicada.cells;
    alunoSelecionado = {
      alunoId: linhaClicada.dataset.alunoId,
      nome: celulas[0].textContent.trim(),
      notaFinal: celulas[1].textContent.trim(),
      statusDisciplina: celulas[2].textContent.trim(),
      matriculaId: linhaClicada.dataset.matriculaId,
      nomeTurma: linhaClicada.dataset.nomeTurma,
      professor: linhaClicada.dataset.professor,
      horario: linhaClicada.dataset.horario,
    };

    btnEditarAluno.disabled = false;
    tabelaAlunosBody
      .querySelectorAll("tr")
      .forEach((row) => row.classList.remove("table-active"));
    linhaClicada.classList.add("table-active");

    console.log("--- Aluno Selecionado ---", alunoSelecionado);
  });

  // --- LÓGICA 3: SELEÇÃO TABELA GRADE DISCIPLINA---
  tabelaGradeBody.addEventListener("click", function (event) {
    const linhaClicada = event.target.closest("tr");
    if (!linhaClicada || linhaClicada.cells.length === 1) return;

    const celulas = linhaClicada.cells;
    gradeSelecionada = {
      gradeId: linhaClicada.dataset.gradeId, // Supondo que tenhamos um data-id
      professor: celulas[0].textContent.trim(),
      turma: celulas[1].textContent.trim(),
      horario: celulas[2].textContent.trim(),
      dia: celulas[3].textContent.trim(),
      professorId: linhaClicada.dataset.professorId,
      turmaId: linhaClicada.dataset.turmaId,
    };

    btnEditarGrade.disabled = false;
    tabelaGradeBody
      .querySelectorAll("tr")
      .forEach((row) => row.classList.remove("table-active"));
    linhaClicada.classList.add("table-active");
    console.log("--- Grade Selecionada ---", gradeSelecionada);
  });

  // --- LÓGICA 4: MODAL GERENCIAR DISCIPLINA (Cadastro e Edição) ---
  modalGerenciarDisciplina.addEventListener("show.bs.modal", function (event) {
    const triggerButton = event.relatedTarget;

    if (triggerButton && triggerButton.id === "btnEditarDisciplina") {
      // --- MODO EDIÇÃO ---
      modalDisciplinaTitulo.textContent = "Editar Disciplina";
      if (!disciplinaSelecionada) return;

      editCodigo.value = disciplinaSelecionada.codigo;
      editNome.value = disciplinaSelecionada.nome;
      editCarga.value = disciplinaSelecionada.carga;
      editValor.value = disciplinaSelecionada.valor;
      editCodigo.disabled = true; // Não permite editar o código
    } else {
      // --- MODO CADASTRO ---
      modalDisciplinaTitulo.textContent = "Inserir Disciplina";
      editCodigo.value = "";
      editNome.value = "";
      editCarga.value = "";
      editValor.value = "";
      editCodigo.disabled = false; // Permite inserir novo código
    }

    alertaModalDisciplina.classList.add("d-none");
  });

  // Lógica do botão Salvar do modal
  btnSalvarDisciplina.addEventListener("click", async function () {
    if (editCodigo.value == "") {
      mostrarAlerta(
        "Código em branco",
        tipoAlert.DANGER,
        alertaModalDisciplina
      );
      return;
    } else if (editNome.value == "") {
      mostrarAlerta("Nome em branco", tipoAlert.DANGER, alertaModalDisciplina);
      return;
    } else if (editCarga.value == "") {
      mostrarAlerta("Carga em branco", tipoAlert.DANGER, alertaModalDisciplina);
      return;
    } else if (editValor.value == "") {
      mostrarAlerta("Valor em branco", tipoAlert.DANGER, alertaModalDisciplina);
      return;
    } else if (editValor.value <= 0) {
      mostrarAlerta("Valor inválido", tipoAlert.DANGER, alertaModalDisciplina);
      return;
    }

    const dados = {
      id: null,
      codigo: editCodigo.value,
      nome: editNome.value,
      carga_horaria: editCarga.value,
      valor: editValor.value,
    };

    if (editCodigo.disabled) {
      // MODO EDIÇÃO
      console.log("--- SALVANDO (EDIÇÃO) ---", dados);

      dados.id = disciplinaSelecionada.disciplinaId;

      let sucesso = await salvarDisciplina(dados);

      if (sucesso === false) {
        mostrarAlerta(
          "Erro ao editar disciplina",
          tipoAlert.DANGER,
          alertaModalDisciplina
        );
        return;
      }

      // Atualiza a linha na tabela principal
      const linhaAtiva = tabelaDisciplinasBody.querySelector(".table-active");
      if (linhaAtiva) {
        linhaAtiva.cells[1].textContent = dados.nome;
        linhaAtiva.cells[2].textContent = dados.carga;
        linhaAtiva.cells[3].textContent = dados.valor;
      }
    } else {
      // MODO CADASTRO
      console.log("--- SALVANDO (CADASTRO) ---", dados);

      let sucesso = await salvarDisciplina(dados);

      if (sucesso === false) {
        mostrarAlerta(
          "Erro ao cadastrar disciplina",
          tipoAlert.DANGER,
          alertaModalDisciplina
        );
        return;
      }
    }

    // Fecha o modal
    mostrarAlerta(
      "Operação concluída",
      tipoAlert.SUCESS,
      alertaModalDisciplina
    );

    setTimeout(() => {
      bootstrap.Modal.getInstance(modalGerenciarDisciplina).hide();
    }, 500);
    // Reseta a seleção na tabela principal
    resetarSelecaoAluno();
    resetarSelecaoGrade();
    resetarSelecaoDisciplina();
  });

  // --- LÓGICA 5: MODAL GERENCIAR Alunos (Cadastro e Edição) ---
  modalGerenciarAluno.addEventListener("show.bs.modal", async function (event) {
    let sucesso = await carregarTurmasAlunosDropdown();

    if (sucesso === false) {
      return;
    }

    const triggerButton = event.relatedTarget;

    if (triggerButton && triggerButton.id === "btnEditarAluno") {
      // --- MODO EDIÇÃO ---
      sucesso = await carregarMatriculasAlunosDropdown();

      if (sucesso === false) {
        return;
      }

      modalAlunoTitulo.textContent = "Editar Aluno";
      if (!alunoSelecionado) return;
      if (!disciplinaSelecionada) return;
      btnDropdownAlunos.disabled = true;
      btnDropdownAlunos.textContent = alunoSelecionado.nome;
      btnDropdownAlunos.dataset.selectedId = alunoSelecionado.alunoId;
      editNotaAluno.value = alunoSelecionado.notaFinal;
      editStatusAluno.value = alunoSelecionado.statusDisciplina;
      editNotaAluno.disabled = false;
      editStatusAluno.disabled = false;

      btnDropdownTurmas.disabled = true;
      btnDropdownTurmas.textContent = alunoSelecionado.nomeTurma;
      editProfessor.value = alunoSelecionado.professor;
      editHorarioAluno.value = alunoSelecionado.horario;
    } else {
      // --- MODO CADASTRO ---

      sucesso = await carregarTodosAlunosDropdown();

      if (sucesso === false) {
        return;
      }
      btnDropdownAlunos.disabled = false;
      modalAlunoTitulo.textContent = "Inserir Aluno";
      btnDropdownAlunos.textContent = "Selecione o(a) Aluno(a)";
      btnDropdownTurmas.textContent = "Seleciona a turma";
      btnDropdownTurmas.disabled = false;
      editNotaAluno.value = "0";
      editStatusAluno.value = "Cursando";
      editNotaAluno.disabled = true;
      editStatusAluno.disabled = true;
      delete btnDropdownAlunos.dataset.selectedId;

      resetarSelecaoAluno();
    }

    alertaModalAlunos.classList.add("d-none");
  });

  // Lógica do botão Salvar do modal
  btnConfirmarAlunos.addEventListener("click", async function () {
    const nomeAlunoSelecionado = dropdownMenuAlunos.textContent;

    if (nomeAlunoSelecionado == "Selecione o(a) Aluno(a)") {
      mostrarAlerta(
        "Selecione o(a) Aluno(a)",
        tipoAlert.DANGER,
        alertaModalAlunos
      );
      return;
    } else if (btnDropdownTurmas.textContent == "Seleciona a turma") {
      mostrarAlerta("Seleciona a turma", tipoAlert.DANGER, alertaModalAlunos);
      return;
    } else if (editNotaAluno.value == "") {
      mostrarAlerta("Nota em branco", tipoAlert.DANGER, alertaModalAlunos);
      return;
    } else if (editNotaAluno.value < 0) {
      mostrarAlerta("Nota inválida", tipoAlert.DANGER, alertaModalAlunos);
      return;
    } else if (editStatusAluno.value == "") {
      mostrarAlerta("Status em branco", tipoAlert.DANGER, alertaModalAlunos);
      return;
    }
    switch (editStatusAluno.value.toLowerCase()) {
      case "cursando":
      case "trancado":
      case "aprovado":
      case "reprovado":
        break;
      default:
        mostrarAlerta("Status inválido", tipoAlert.DANGER, alertaModalAlunos);
        return;
    }

    const dados = {
      id_matricula: null,
      id_aluno: btnDropdownAlunos.dataset.selectedId,
      id_grade: btnDropdownTurmas.dataset.selectedId,
      codigo: disciplinaSelecionada.codigo,
      nota_final: editNotaAluno.value,
      status: editStatusAluno.value.toLowerCase(),
    };

    if (alunoSelecionado) {
      // MODO EDIÇÃO
      console.log("--- ENVIANDO DADOS PARA (EDITAR) ---", dados);

      dados.id_matricula = alunoSelecionado.matriculaId;

      let sucesso = await salvarMatricula(dados);

      if (sucesso === false) {
        mostrarAlerta(
          "Erro ao editar matricula",
          tipoAlert.DANGER,
          alertaModalAlunos
        );
        return;
      }
      console.log("--- SALVANDO (EDIÇÃO) ---", dados);

      const linhaAtiva = tabelaAlunosBody.querySelector(".table-active");
      if (linhaAtiva) {
        linhaAtiva.cells[0].textContent = btnDropdownAlunos.textContent;
      }
    } else {
      // MODO CADASTRO
      console.log("--- ENVIANDO DADOS PARA (CADASTRO) ---", dados);

      let sucesso = await salvarMatricula(dados);

      if (sucesso === false) {
        mostrarAlerta(
          "Erro ao editar matricula",
          tipoAlert.DANGER,
          alertaModalAlunos
        );
        return;
      }

      console.log("--- SALVANDO (CADASTRO) ---", dados);
      // (Aqui você adicionaria a nova linha na tabela principal)
    }

    // Fecha o modal
    mostrarAlerta("Operação concluída", tipoAlert.SUCESS, alertaModalAlunos);

    setTimeout(() => {
      bootstrap.Modal.getInstance(modalGerenciarAluno).hide();
    }, 500);
    // Reseta a seleção na tabela principal
  });

  // --- LÓGICA 6: MODAL GERENCIAR GRADE (Cadastro e Edição) ---
  modalGerenciarGrade.addEventListener("show.bs.modal", async function (event) {
    let sucesso = await carregarTodasTurmasDropdown();

    if (sucesso === false) {
      return;
    }

    sucesso = await carregarTodosProfessoresDropdown();

    if (sucesso === false) {
      return;
    }

    const triggerButton = event.relatedTarget;

    if (triggerButton && triggerButton.id === "btnEditarGrade") {
      // --- MODO EDIÇÃO ---

      modalGradeTitulo.textContent = "Editar grade";
      if (!gradeSelecionada) return;
      if (!disciplinaSelecionada) return;

      editGradeDisciplina.value = disciplinaSelecionada.nome;

      btnDropdownProfessor.textContent = gradeSelecionada.professor;
      btnDropdownProfessor.dataset.selectedId = gradeSelecionada.professorId;

      btnDropdownGradeTurmas.textContent = gradeSelecionada.turma;
      btnDropdownGradeTurmas.dataset.selectedId = gradeSelecionada.turmaId;

      editDia.value = gradeSelecionada.dia;
      editHorario.value = gradeSelecionada.horario;
    } else {
      // --- MODO CADASTRO ---
      modalGradeTitulo.textContent = "Cadastrar grade";
      editGradeDisciplina.value = disciplinaSelecionada.nome;

      btnDropdownProfessor.textContent = "Selecione o(a) professor(a)";
      delete btnDropdownProfessor.dataset.selectedId;

      btnDropdownGradeTurmas.textContent = "Selecione a turma";
      delete btnDropdownGradeTurmas.dataset.selectedId;

      editDia.value = "";
      editHorario.value = "";

      resetarSelecaoGrade();
    }

    alertaModalGrade.classList.add("d-none");
  });

  // Lógica do botão Salvar do modal
  btnSalvarGrade.addEventListener("click", async function () {
    if (btnDropdownProfessor.textContent == "Selecione o(a) professor(a)") {
      mostrarAlerta(
        "Selecion o(a) professor(a)",
        tipoAlert.DANGER,
        alertaModalGrade
      );
      return;
    } else if (btnDropdownGradeTurmas.textContent == "Selecione a turma") {
      mostrarAlerta("Seleciona a turma", tipoAlert.DANGER, alertaModalGrade);
      return;
    } else if (editDia.value == "") {
      mostrarAlerta("Dia em branco", tipoAlert.DANGER, alertaModalGrade);
      return;
    } else if (editHorario.value == "") {
      mostrarAlerta("Horário em branco", tipoAlert.DANGER, alertaModalGrade);
      return;
    }

    switch (editDia.value.toLowerCase()) {
      case "segunda":
      case "terça":
      case "qarta":
      case "quinta":
      case "sexta":
      case "sábado":
      case "domingo":
        break;
      default:
        mostrarAlerta("Dia inválido", tipoAlert.DANGER, alertaModalGrade);
        return;
    }

    if (!validarHorarioAula(editHorario.value)) {
      return;
    }

    const dados = {
      id: null,
      id_turma: btnDropdownGradeTurmas.dataset.selectedId,
      id_disciplina: disciplinaSelecionada.disciplinaId,
      id_funcionario: btnDropdownProfessor.dataset.selectedId,
      horario: juntarDiaHorario(editDia.value, editHorario.value),
    };

    if (gradeSelecionada) {
      // MODO EDIÇÃO
      console.log("--- ENVIANDO DADOS PARA (EDITAR) ---", dados);

      dados.id = gradeSelecionada.gradeId;

      let sucesso = await salvarGrade(dados);

      if (sucesso === false) {
        mostrarAlerta(
          "Erro ao editar grade",
          tipoAlert.DANGER,
          alertaModalGrade
        );
        return;
      }
      console.log("--- SALVANDO (EDIÇÃO) ---", dados);

      const linhaAtiva = tabelaGradeBody.querySelector(".table-active");
      if (linhaAtiva) {
        linhaAtiva.cells[0].textContent = btnDropdownProfessor.textContent;
      }
    } else {
      // MODO CADASTRO
      console.log("--- ENVIANDO DADOS PARA (CADASTRO) ---", dados);

      let sucesso = await salvarGrade(dados);

      if (sucesso === false) {
        mostrarAlerta(
          "Erro ao editar grade",
          tipoAlert.DANGER,
          alertaModalGrade
        );
        return;
      }

      console.log("--- SALVANDO (CADASTRO) ---", dados);
      // (Aqui você adicionaria a nova linha na tabela principal)
    }

    // Fecha o modal
    mostrarAlerta("Operação concluída", tipoAlert.SUCESS, alertaModalGrade);

    setTimeout(() => {
      bootstrap.Modal.getInstance(modalGerenciarGrade).hide();
    }, 500);
    // Reseta a seleção na tabela principal
  });

  // ----FUNCOES API-----
  async function carregarDisciplinas() {
    try {
      // 2. Chama a API do seu RestController
      const response = await fetch(`/api/disciplinas/todos`);

      if (!response.ok) {
        throw new Error("Erro ao buscar disciplina: " + response.statusText);
      }

      // 3. Converte a resposta para JSON (uma lista de alunos)
      const disciplinas = await response.json();

      // 4. Pega o "gancho" da tabela (o <tbody>)
      const tabelaCorpo = document.getElementById("tabelaDisciplinasBody");

      // Limpa a tabela (caso já tenha algo)
      tabelaCorpo.innerHTML = "";

      // 5. Itera sobre cada aluno na lista
      disciplinas.forEach((disciplina) => {
        // 6. Cria uma nova linha <tr>
        const linha = document.createElement("tr");

        linha.dataset.disciplinaId = disciplina.id_disciplina;
        linha.dataset.codigo = disciplina.codigo;
        // 7. Adiciona os dados do JSON em células <td>
        linha.innerHTML = `
                <td>${disciplina.codigo}</td>
                <td>${disciplina.nome}</td>
                <td>${disciplina.carga_horaria}</td>
                <td>${disciplina.valor}</td>
            `;

        // 8. Adiciona a linha preenchida ao corpo da tabela
        tabelaCorpo.appendChild(linha);
      });
    } catch (error) {
      console.error("Falha ao carregar disciplina:", error);
      // Você pode querer mostrar uma mensagem de erro amigável na tela
    }
  }

  async function carregarTabelasAlunos(codigo) {
    try {
      // 2. Chama a API do seu RestController
      const response = await fetch(`/api/matriculas/por-disciplina/${codigo}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar matriculas: " + response.statusText);
      }

      // 3. Converte a resposta para JSON (uma lista de alunos)
      const matriculas = await response.json();

      // 4. Pega o "gancho" da tabela (o <tbody>)
      const tabelaCorpo = document.getElementById("tabelaAlunosBody");

      // Limpa a tabela (caso já tenha algo)
      tabelaCorpo.innerHTML = "";

      // 5. Itera sobre cada aluno na lista
      matriculas.forEach((matricula) => {
        // 6. Cria uma nova linha <tr>
        const linha = document.createElement("tr");

        linha.dataset.alunoId = matricula.alunos.id;
        linha.dataset.matriculaId = matricula.id_matricula;
        linha.dataset.nomeTurma = matricula.gradeDisciplinas.turmas.nome;
        linha.dataset.professor = matricula.gradeDisciplinas.funcionarios.nome;
        linha.dataset.horario = matricula.gradeDisciplinas.horario;

        // 7. Adiciona os dados do JSON em células <td>
        linha.innerHTML = `
                <td>${matricula.alunos.nome}</td>
                <td>${matricula.notaFinal}</td>
                <td>${matricula.statusDisciplina}</td>
            `;

        // 8. Adiciona a linha preenchida ao corpo da tabela
        tabelaCorpo.appendChild(linha);
      });
    } catch (error) {
      console.error("Falha ao carregar disciplina:", error);
      // Você pode querer mostrar uma mensagem de erro amigável na tela
    }
  }

  async function carregarMatriculasAlunosDropdown() {
    try {
      const response = await fetch(
        `/api/matriculas/por-disciplina/${disciplinaSelecionada.codigo}`
      );

      if (!response.ok) {
        console.log("Falha ao carregar alunos:", response.statusText);
        return false;
      }
      const matriculas = await response.json();

      let htmlDropdown = "";

      matriculas.forEach((matricula) => {
        const alunoId = matricula.alunos.id;
        const alunoNome = matricula.alunos.nome;
        const notaFinal = matricula.notaFinal;
        const statusDisciplina = matricula.statusDisciplina;

        htmlDropdown += `
                  <li>
                    <a class="dropdown-item" href="#" data-aluno-id="${alunoId}" data-aluno-nome="${alunoNome}" data-nota-final="${notaFinal}" data-status-disciplina="${statusDisciplina}" >
                      ${alunoNome}
                    </a>
                  </li>
              `;
      });

      dropdownMenuAlunos.innerHTML = htmlDropdown;

      // Eventos de clique
      dropdownMenuAlunos.querySelectorAll(".dropdown-item").forEach((item) => {
        item.addEventListener("click", function (e) {
          e.preventDefault();
          const dados = {
            alunoId: this.dataset.alunoId,
            alunoNome: this.dataset.alunoNome,
            notaFinal: this.dataset.notaFinal,
            statusDisciplina: this.dataset.statusDisciplina,
          };

          btnDropdownAlunos.textContent = dados.alunoNome;
          btnDropdownAlunos.dataset.selectedId = dados.alunoId;

          editNotaAluno.value = dados.notaFinal;
          editStatusAluno.value = dados.statusDisciplina;
          console.log("Aluno(a) selecionado: ", dados);
        });
      });
      return true;
    } catch (error) {
      console.log("Falha ao carregar alunos:", error);
      return false;
    }
  }

  async function carregarTurmasAlunosDropdown() {
    try {
      const response = await fetch(
        `/api/grade/por-disciplina/${disciplinaSelecionada.codigo}`
      );

      if (!response.ok) {
        console.log("Falha ao carregar turmas:", response.statusText);
        return false;
      }
      const grades = await response.json();

      let htmlDropdown = "";

      grades.forEach((grade) => {
        const gradeId = grade.id_grade;
        const turmaNome = grade.turmas.nome;
        const professor = grade.funcionarios.nome;
        const horario = grade.horario;

        htmlDropdown += `
                  <li>
                    <a class="dropdown-item" href="#" data-grade-id="${gradeId}" data-turma-nome="${turmaNome}" data-professor="${professor}" data-horario="${horario}">
                      ${turmaNome}
                    </a>
                  </li>
              `;
      });

      dropdownMenuTurmas.innerHTML = htmlDropdown;

      // Eventos de clique
      dropdownMenuTurmas.querySelectorAll(".dropdown-item").forEach((item) => {
        item.addEventListener("click", function (e) {
          e.preventDefault();
          const dados = {
            gradeId: this.dataset.gradeId,
            turmaNome: this.dataset.turmaNome,
            professor: this.dataset.professor,
            horario: this.dataset.horario,
          };

          btnDropdownTurmas.textContent = dados.turmaNome;
          btnDropdownTurmas.dataset.selectedId = dados.gradeId;

          editProfessor.value = dados.professor;
          editHorarioAluno.value = dados.horario;

          console.log("Dados da turma selecionada: ", dados);
        });
      });
      return true;
    } catch (error) {
      console.log("Falha ao carregar alunos:", error);
      return false;
    }
  }

  async function carregarTodosAlunosDropdown() {
    try {
      const response = await fetch(`/api/alunos/todos`);

      if (!response.ok) {
        console.log("Falha ao carregar alunos:", response.statusText);
        return false;
      }
      const alunos = await response.json();

      let htmlDropdown = "";

      alunos.forEach((aluno) => {
        const alunoId = aluno.id;
        const alunoNome = aluno.nome;

        htmlDropdown += `
                  <li>
                    <a class="dropdown-item" href="#" data-aluno-id="${alunoId}" data-aluno-nome="${alunoNome}">
                      ${alunoNome}
                    </a>
                  </li>
              `;
      });

      dropdownMenuAlunos.innerHTML = htmlDropdown;

      // Eventos de clique
      dropdownMenuAlunos.querySelectorAll(".dropdown-item").forEach((item) => {
        item.addEventListener("click", function (e) {
          e.preventDefault();
          const dados = {
            alunoId: this.dataset.alunoId,
            alunoNome: this.dataset.alunoNome,
          };

          btnDropdownAlunos.textContent = dados.alunoNome;
          btnDropdownAlunos.dataset.selectedId = dados.alunoId;

          console.log("Aluno(a) selecionado: ", dados);
        });
      });
      return true;
    } catch (error) {
      console.log("Falha ao carregar alunos:", error);
      return false;
    }
  }

  async function carregarDisciplinasFiltrados() {
    // 2. Coleta os valores dos filtros
    const termo = inputPesquisa.value;
    const tipo = document.querySelector(
      'input[name="pesquisarPor"]:checked'
    ).value;
    const ordem = document.querySelector(
      'input[name="ordenarPor"]:checked'
    ).value;

    // if (tipo == "inicio" || tipo == "fim") {
    //   termo = formatarDataParaAPI(inputPesquisa.value);
    // }

    // 3. Monta a URL da API com os parâmetros
    const url = new URL("/api/disciplinas/pesquisar", window.location.origin);
    url.searchParams.append("termo", termo);
    url.searchParams.append("tipo", tipo);
    url.searchParams.append("ordem", ordem);

    // 4. Chama a API
    try {
      const response = await fetch(url);
      const disciplinas = await response.json();

      // 5. Renderiza a tabela (função que você já tem)
      renderizarTabelaDisciplinas(disciplinas);
    } catch (error) {
      console.error("Erro ao buscar disciplinas:", error);
    }
  }

  async function salvarDisciplina(dados) {
    //Logica de decisao
    let url;
    let metodo;

    if (dados.id) {
      // Têm ID? Então é EDIÇÃO (PUT)
      url = `/api/disciplinas/salvar/${dados.id}`;
      metodo = "PUT";
    } else {
      // Não tem ID? Então é CADASTRO (POST)
      url = "/api/disciplinas/salvar";
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
        carregarDisciplinas();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Erro na requisição:", error);
      return false;
    }
  }

  async function salvarMatricula(dados) {
    //Logica de decisao
    let url;
    let metodo;

    if (dados.id_matricula) {
      // Têm ID? Então é EDIÇÃO (PUT)
      url = `/api/matriculas/salvar/${dados.id_matricula}`;
      metodo = "PUT";
    } else {
      // Não tem ID? Então é CADASTRO (POST)
      url = "/api/matriculas/salvar";
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
        carregarTabelasAlunos(disciplinaSelecionada.codigo);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Erro na requisição:", error);
      return false;
    }
  }

  async function carregarTabelasGrade(codigo) {
    try {
      // 2. Chama a API do seu RestController
      const response = await fetch(`/api/grade/por-disciplina/${codigo}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar grade: " + response.statusText);
      }

      // 3. Converte a resposta para JSON (uma lista de alunos)
      const grades = await response.json();

      // 4. Pega o "gancho" da tabela (o <tbody>)
      const tabelaCorpo = document.getElementById("tabelaGradeBody");

      // Limpa a tabela (caso já tenha algo)
      tabelaCorpo.innerHTML = "";

      // 5. Itera sobre cada aluno na lista
      grades.forEach((grade) => {
        // 6. Cria uma nova linha <tr>
        const linha = document.createElement("tr");

        linha.dataset.gradeId = grade.id_grade;
        linha.dataset.turmaId = grade.turmas.id_turma;
        linha.dataset.professorId = grade.funcionarios.id_funcionario;

        const resultado = separarDiaEHorario(grade.horario);

        // 7. Adiciona os dados do JSON em células <td>
        linha.innerHTML = `
                <td>${grade.funcionarios.nome}</td>
                <td>${grade.turmas.codigo}</td>
                <td>${resultado.horario}</td>
                <td>${resultado.dia}</td>
            `;

        // 8. Adiciona a linha preenchida ao corpo da tabela
        tabelaCorpo.appendChild(linha);
      });
    } catch (error) {
      console.error("Falha ao carregar disciplina:", error);
      // Você pode querer mostrar uma mensagem de erro amigável na tela
    }
  }

  async function carregarTodasTurmasDropdown() {
    try {
      const response = await fetch(`/api/turmas/todos`);

      if (!response.ok) {
        console.log("Falha ao carregar turmas:", response.statusText);
        return false;
      }
      const turmas = await response.json();

      let htmlDropdown = "";

      turmas.forEach((turma) => {
        const turmaId = turma.id_turma;
        const codigoTurma = turma.codigo;

        htmlDropdown += `
                  <li>
                    <a class="dropdown-item" href="#" data-turma-id="${turmaId}" data-codigo-turma="${codigoTurma}">
                      ${codigoTurma}
                    </a>
                  </li>
              `;
      });

      dropdownMenuGradeTurmas.innerHTML = htmlDropdown;

      // Eventos de clique
      dropdownMenuGradeTurmas
        .querySelectorAll(".dropdown-item")
        .forEach((item) => {
          item.addEventListener("click", function (e) {
            e.preventDefault();
            const dados = {
              turmaId: this.dataset.turmaId,
              codigoTurma: this.dataset.codigoTurma,
            };

            btnDropdownGradeTurmas.textContent = dados.codigoTurma;
            btnDropdownGradeTurmas.dataset.selectedId = dados.turmaId;

            console.log("Turma selecionada: ", dados);
          });
        });
      return true;
    } catch (error) {
      console.log("Falha ao carregar turmas:", error);
      return false;
    }
  }

  async function carregarTodosProfessoresDropdown() {
    try {
      const response = await fetch(
        `/api/funcionarios/por-cargo/${"professor"}`
      );

      if (!response.ok) {
        console.log("Falha ao carregar professores:", response.statusText);
        return false;
      }
      const professores = await response.json();

      let htmlDropdown = "";

      professores.forEach((professor) => {
        const professorId = professor.id_funcionario;
        const professorNome = professor.nome;

        htmlDropdown += `
                  <li>
                    <a class="dropdown-item" href="#" data-professor-id="${professorId}" data-professor-nome="${professorNome}">
                      ${professorNome}
                    </a>
                  </li>
              `;
      });

      dropdownMenuProfessor.innerHTML = htmlDropdown;

      // Eventos de clique
      dropdownMenuProfessor
        .querySelectorAll(".dropdown-item")
        .forEach((item) => {
          item.addEventListener("click", function (e) {
            e.preventDefault();
            const dados = {
              professorId: this.dataset.professorId,
              professorNome: this.dataset.professorNome,
            };

            btnDropdownProfessor.textContent = dados.professorNome;
            btnDropdownProfessor.dataset.selectedId = dados.professorId;

            console.log("Professor selecionado: ", dados);
          });
        });
      return true;
    } catch (error) {
      console.log("Falha ao carregar professores:", error);
      return false;
    }
  }

  async function salvarGrade(dados) {
    //Logica de decisao
    let url;
    let metodo;

    if (dados.id) {
      // Têm ID? Então é EDIÇÃO (PUT)
      url = `/api/grade/salvar/${dados.id}`;
      metodo = "PUT";
    } else {
      // Não tem ID? Então é CADASTRO (POST)
      url = "/api/grade/salvar";
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
        carregarTabelasGrade(disciplinaSelecionada.codigo);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Erro na requisição:", error);
      return false;
    }
  }

  // --- FUNÇÕES AUXILIARES ---

  // Função de Reset: Tabela Principal
  function resetarSelecaoDisciplina() {
    btnEditarDisciplina.disabled = true;
    disciplinaSelecionada = null;
    tabelaDisciplinasBody
      .querySelectorAll("tr")
      .forEach((row) => row.classList.remove("table-active"));
    // Limpa tabelas secundárias
    resetarSelecaoAluno(true);
    resetarSelecaoGrade(true);
  }

  // Função de Reset: Tabela Alunos
  function resetarSelecaoAluno(limparTabela = false) {
    btnEditarAluno.disabled = true;
    alunoSelecionado = null;
    if (limparTabela) {
      tabelaAlunosBody.innerHTML =
        '<tr><td colspan="2">Selecione uma disciplina.</td></tr>';
    } else {
      tabelaAlunosBody
        .querySelectorAll("tr")
        .forEach((row) => row.classList.remove("table-active"));
    }
  }

  // Função de Reset: Tabela Grade
  function resetarSelecaoGrade(limparTabela = false) {
    btnEditarGrade.disabled = true;
    gradeSelecionada = null;
    if (limparTabela) {
      tabelaGradeBody.innerHTML =
        '<tr><td colspan="3">Selecione uma disciplina.</td></tr>';
    } else {
      tabelaGradeBody
        .querySelectorAll("tr")
        .forEach((row) => row.classList.remove("table-active"));
    }
  }

  // Mostrar Alerta modal

  function mostrarAlerta(mensagem, tipo, modal) {
    modal.textContent = mensagem;
    modal.className = `alert alert-${tipo}`;
  }

  function renderizarTabelaDisciplinas(disciplinas) {
    tabelaDisciplinasBody.innerHTML = "";

    // 5. Itera sobre cada aluno na lista
    disciplinas.forEach((disciplina) => {
      // 6. Cria uma nova linha <tr>
      const linha = document.createElement("tr");

      linha.dataset.disciplinaId = disciplina.id_disciplina;
      linha.dataset.codigo = disciplina.codigo;
      // 7. Adiciona os dados do JSON em células <td>
      linha.innerHTML = `
                <td>${disciplina.codigo}</td>
                <td>${disciplina.nome}</td>
                <td>${disciplina.carga_horaria}</td>
                <td>${disciplina.valor}</td>
            `;

      // 8. Adiciona a linha preenchida ao corpo da tabela
      tabelaDisciplinasBody.appendChild(linha);
    });
  }

  function separarDiaEHorario(texto) {
    // 1. Validação de segurança: se vier vazio ou nulo, retorna null
    if (!texto) return null;

    // 2. O método split(" ") quebra a string em um array
    // Ex: "Segunda 08:00-10:00" vira ["Segunda", "08:00-10:00"]
    const partes = texto.trim().split(" ");

    // Valida se o formato estava correto (tem que ter pelo menos 2 partes)
    if (partes.length < 2) {
      console.error("Formato inválido. Esperado 'Dia Horario'");
      return null;
    }

    // 3. Retorna um objeto com os dados separados
    return {
      dia: partes[0], // "Segunda"
      horario: partes[1], // "08:00-10:00"
    };
  }

  function validarHorarioAula(horarioStr) {
    // 1. Validação de Formato (Regex)
    // Garante que tenha números, dois pontos e o traço
    const regex = /^\d{2}:\d{2}-\d{2}:\d{2}$/;

    if (!horarioStr || !regex.test(horarioStr)) {
      mostrarAlerta(
        "Formato inválido. Esperado: HH:MM-HH:MM",
        tipoAlert.DANGER,
        alertaModalGrade
      );
      return false;
    }

    // 2. Separar Início e Fim
    const [inicioStr, fimStr] = horarioStr.split("-");

    // 3. Função auxiliar para converter "HH:MM" em minutos totais do dia
    // Isso facilita muito a comparação matemática
    function getMinutos(horaString) {
      const [horas, minutos] = horaString.split(":").map(Number);

      // Validação de horas reais
      if (horas < 0 || horas > 23 || minutos < 0 || minutos > 59) {
        return -1; // Horário inválido
      }
      return horas * 60 + minutos;
    }

    const minutosInicio = getMinutos(inicioStr);
    const minutosFim = getMinutos(fimStr);

    // 4. Valida se os números são horas reais
    if (minutosInicio === -1 || minutosFim === -1) {
      mostrarAlerta(
        "Horas ou minutos inválidos (ex: 25:99)",
        tipoAlert.DANGER,
        alertaModalGrade
      );
      return false;
    }

    // 5. A Lógica Principal: Fim deve ser maior que o Início
    if (minutosFim <= minutosInicio) {
      mostrarAlerta(
        "O horário de término deve ser maior que o de início.",
        tipoAlert.DANGER,
        alertaModalGrade
      );
      return false;
    }

    // Se passou por tudo, é válido!
    return true;
  }

  function juntarDiaHorario(dia, horario) {
    return `${dia} ${horario}`;
  }
});
