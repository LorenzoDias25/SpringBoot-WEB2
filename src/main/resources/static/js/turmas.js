document.addEventListener("DOMContentLoaded", function () {
  carregarTurmas();
  //tipo de alert
  const tipoAlert = Object.freeze({
    DANGER: "danger",
    SUCESS: "primary",
  });

  // --- Variáveis Globais de Estado ---
  let turmaSelecionada = null;
  let alunoSelecionado = null;
  let disciplinaSelecionada = null;

  // --- Seletores da Tabela Principal ---
  const tabelaTurmasBody = document.getElementById("tabelaTurmasBody");
  const btnInserirTurma = document.getElementById("btnInserirTurma");
  const btnEditarTurma = document.getElementById("btnEditarTurma");

  // --- Seletores Tabela Disciplinas (Direita) ---
  const tabelaDisciplinasBody = document.getElementById(
    "tabelaDisciplinasBody"
  );

  // --- Seletores Tabela Alunos (Direita) ---
  const tabelaAlunosBody = document.getElementById("tabelaAlunosBody");

  // --- Seletores Modal Gerenciar Turma ---
  const modalGerenciarTurma = document.getElementById("modalGerenciarTurma");
  const modalTurmaTitulo = document.getElementById("modalTurmaTitulo");
  const editCodigoTurma = document.getElementById("editCodigoTurma");
  const editNomeTurma = document.getElementById("editNomeTurma");
  const editSemestreTurma = document.getElementById("editSemestreTurma");
  const editTurnoTurma = document.getElementById("editTurnoTurma");
  const btnSalvarTurma = document.getElementById("btnSalvarTurma");
  const alertaModalEditarTurma = document.getElementById(
    "alertaModalEditarTurma"
  );

  // --- Seletores Modal Gerenciar Disciplinas da Turma (Checkboxes) ---
  const modalGerenciarDisciplinasDaTurma = document.getElementById(
    "modalGerenciarDisciplinasDaTurma"
  );
  const btnSalvarDisciplinasDaTurma = document.getElementById(
    "btnSalvarDisciplinasDaTurma"
  );

  // Referência dos elementos de filtro
  const inputPesquisa = document.getElementById("inputPesquisa");
  const botaoPesquisa = document.getElementById("botaoPesquisa");

  // --- LÓGICA DE PESQUISAR EVENTOS ---

  botaoPesquisa.addEventListener("click", carregarTurmasFiltrados);

  document
    .querySelectorAll('input[name="pesquisarPor"], input[name="ordenarPor"]')
    .forEach((radio) => {
      radio.addEventListener("change", carregarTurmas);
    });

  // --- LÓGICA 1: SELEÇÃO DE TURMA (TABELA PRINCIPAL) ---
  if (tabelaTurmasBody) {
    tabelaTurmasBody.addEventListener("click", function (event) {
      const linhaClicada = event.target.closest("tr");
      if (!linhaClicada) return;

      // Pega dados da linha
      const celulas = linhaClicada.cells;
      turmaSelecionada = {
        turmaId: linhaClicada.dataset.turmaId,
        codigo: celulas[0].textContent.trim(),
        nome: celulas[1].textContent.trim(),
        semestre: celulas[2].textContent.trim(),
        turno: celulas[3].textContent.trim(),
      };

      // Habilita botões
      btnEditarTurma.disabled = false;

      // Highlight
      tabelaTurmasBody
        .querySelectorAll("tr")
        .forEach((row) => row.classList.remove("table-active"));
      linhaClicada.classList.add("table-active");

      // Carrega dados nas tabelas secundárias
      carregarDisciplinasDaTurma(turmaSelecionada.codigo);
      carregarAlunosDaTurma(turmaSelecionada.codigo);

      console.clear();
      console.log("--- Turma Selecionada ---", turmaSelecionada);
    });
  }

  // --- LÓGICA 2: SELEÇÃO TABELA DISCIPLINAS (Direita) ---
  // tabelaDisciplinasBody.addEventListener("click", function (event) {
  //   const linhaClicada = event.target.closest("tr");
  //   if (!linhaClicada || linhaClicada.cells.length === 1) return;

  //   const celulas = linhaClicada.cells;
  //   disciplinaSelecionada = {
  //     id: linhaClicada.dataset.disciplinaId,
  //     codigoDisciplinas: celulas[0].textContent.trim(),
  //     nomeProfessor: celulas[1].textContent.trim(),
  //   };
  //   tabelaDisciplinasBody
  //     .querySelectorAll("tr")
  //     .forEach((row) => row.classList.remove("table-active"));
  //   linhaClicada.classList.add("table-active");
  //   console.log("--- Disciplina Selecionada ---", disciplinaSelecionada);
  // });

  // // --- LÓGICA 3: SELEÇÃO TABELA ALUNOS (Direita) ---
  // tabelaAlunosBody.addEventListener("click", function (event) {
  //   const linhaClicada = event.target.closest("tr");
  //   if (!linhaClicada || linhaClicada.cells.length === 1) return;

  //   const celulas = linhaClicada.cells;
  //   alunoSelecionado = {
  //     id: linhaClicada.dataset.alunoId,
  //     nomeAluno: celulas[0].textContent.trim(),
  //   };

  //   tabelaAlunosBody
  //     .querySelectorAll("tr")
  //     .forEach((row) => row.classList.remove("table-active"));
  //   linhaClicada.classList.add("table-active");
  //   console.log("--- Aluno Selecionado ---", alunoSelecionado);
  // });

  // --- LÓGICA 4: MODAL GERENCIAR TURMA (Inserir/Editar) ---
  modalGerenciarTurma.addEventListener("show.bs.modal", function (event) {
    const triggerButton = event.relatedTarget;

    if (triggerButton && triggerButton.id === "btnEditarTurma") {
      // --- MODO EDIÇÃO ---
      modalTurmaTitulo.textContent = "Editar Turma";
      if (!turmaSelecionada) return;

      editCodigoTurma.value = turmaSelecionada.codigo;
      editNomeTurma.value = turmaSelecionada.nome;
      editSemestreTurma.value = turmaSelecionada.semestre;
      editTurnoTurma.value = turmaSelecionada.turno;
      editCodigoTurma.disabled = true;
    } else {
      // --- MODO CADASTRO ---
      modalTurmaTitulo.textContent = "Inserir Turma";
      editCodigoTurma.value = "";
      editNomeTurma.value = "";
      editSemestreTurma.value = "";
      editTurnoTurma.value = "";
      editCodigoTurma.disabled = false;
    }

    alertaModalEditarTurma.classList.add("d-none");
  });

  // Lógica do botão Salvar do modal
  btnSalvarTurma.addEventListener("click", async function () {
    if (editCodigoTurma.value == "") {
      mostrarAlerta(
        "Código em branco",
        tipoAlert.DANGER,
        alertaModalEditarTurma
      );
      return;
    } else if (editNomeTurma.value == "") {
      mostrarAlerta("Nome em branco", tipoAlert.DANGER, alertaModalEditarTurma);
      return;
    } else if (editSemestreTurma.value == "") {
      mostrarAlerta(
        "Semestre em branco",
        tipoAlert.DANGER,
        alertaModalEditarTurma
      );
      return;
    } else if (editTurnoTurma.value == "") {
      mostrarAlerta(
        "Turno em branco",
        tipoAlert.DANGER,
        alertaModalEditarTurma
      );
      return;
    }

    switch (editTurnoTurma.value.toLowerCase()) {
      case "manhã":
      case "tarde":
      case "noite":
        break;
      default:
        mostrarAlerta(
          "Turno inválido (Ex: Manhã, Tarde, Noite)",
          tipoAlert.DANGER,
          alertaModalEditarTurma
        );
        return;
    }

    if (!validarSemestre(editSemestreTurma.value)) {
      return;
    }

    const dados = {
      id: null,
      codigo: editCodigoTurma.value,
      nome: editNomeTurma.value,
      semestre: editSemestreTurma.value,
      turno: editTurnoTurma.value,
    };

    if (editCodigoTurma.disabled) {
      // MODO EDIÇÃO
      console.log("--- SALVANDO (EDIÇÃO) ---", dados);

      dados.id = turmaSelecionada.turmaId;

      let sucesso = await salvarTurma(dados);

      if (sucesso === false) {
        mostrarAlerta(
          "Erro ao editar turma",
          tipoAlert.DANGER,
          alertaModalEditarTurma
        );
        return;
      }

      const linhaAtiva = tabelaTurmasBody.querySelector(".table-active");
      if (linhaAtiva) {
        linhaAtiva.cells[1].textContent = dados.nome;
        linhaAtiva.cells[2].textContent = dados.semestre;
        linhaAtiva.cells[3].textContent = dados.turno;
      }
    } else {
      // MODO CADASTRO
      console.log("--- SALVANDO (CADASTRO) ---", dados);

      let sucesso = await salvarTurma(dados);

      if (sucesso === false) {
        mostrarAlerta(
          "Erro ao cadastrar turma",
          tipoAlert.DANGER,
          alertaModalEditarTurma
        );
        return;
      }
      // (Aqui você adicionaria a nova linha na tabela principal)
    }

    //Fecha modal
    mostrarAlerta(
      "Operação concluída",
      tipoAlert.SUCESS,
      alertaModalEditarTurma
    );

    setTimeout(() => {
      bootstrap.Modal.getInstance(modalGerenciarTurma).hide();
    }, 500);
    // Reseta a seleção na tabela principal
    resetarSelecaoAlunosTurma();
    resetarSelecaoDisciplinasTurma();
    carregarTurmas();
  });

  // --- LÓGICA 5: NOVO MODAL (Gerenciar Disciplinas da Turma - Checkboxes) ---
  // modalGerenciarDisciplinasDaTurma.addEventListener(
  //   "show.bs.modal",
  //   function (event) {
  //     if (!turmaSelecionada) {
  //       console.error("Nenhuma turma selecionada para editar disciplinas.");
  //       // (Idealmente, o botão que abre este modal estaria desabilitado)
  //       listaDisciplinasCheckboxes.innerHTML =
  //         "<p>Erro: Nenhuma turma selecionada.</p>";
  //       return;
  //     }

  //     // Simula a busca das disciplinas que esta turma JÁ POSSUI
  //     const disciplinasAtuaisDaTurma =
  //       DADOS_DISCIPLINAS_TURMA[turmaSelecionada.id] || [];

  //     // Pega apenas os IDs das disciplinas
  //     const idsDisciplinasAtuais = disciplinasAtuaisDaTurma.map((d) => d.id);

  //     // Carrega a lista de checkboxes, marcando as que a turma já tem
  //     carregarCheckboxesDisciplinas(idsDisciplinasAtuais);
  //   }
  // );

  // Botão "Confirmar" do modal de checkboxes
  // btnSalvarDisciplinasDaTurma.addEventListener("click", function () {
  //   if (!turmaSelecionada) return;

  //   const disciplinasMarcadasIds = [];
  //   document
  //     .querySelectorAll("#listaDisciplinasCheckboxes .form-check-input:checked")
  //     .forEach((input) => {
  //       disciplinasMarcadasIds.push(input.value); // 'value' é o ID da disciplina
  //     });

  //   console.log(
  //     `--- SALVANDO DISCIPLINAS para Turma ID: ${turmaSelecionada.id} ---`
  //   );
  //   console.log("IDs das Disciplinas Selecionadas:", disciplinasMarcadasIds);

  //   // (Aqui você faria o 'fetch' POST/PUT para o Spring Boot
  //   // enviando os 'disciplinasMarcadasIds' para salvar)

  //   // Fecha o modal
  //   bootstrap.Modal.getInstance(modalGerenciarDisciplinasDaTurma).hide();

  //   // Atualiza a tabela de disciplinas da direita para refletir as mudanças
  //   // (Em um app real, você talvez atualizasse DADOS_DISCIPLINAS_TURMA e chamasse a função)
  //   carregarDisciplinasDaTurma(turmaSelecionada.id);
  // });

  // --- FUNCOES APIS ---
  async function carregarTurmas() {
    try {
      // 2. Chama a API do seu RestController
      const response = await fetch(`/api/turmas/todos`);

      if (!response.ok) {
        throw new Error("Erro ao buscar turmas: " + response.statusText);
      }

      // 3. Converte a resposta para JSON (uma lista de alunos)
      const turmas = await response.json();

      // 4. Pega o "gancho" da tabela (o <tbody>)
      const tabelaCorpo = document.getElementById("tabelaTurmasBody");

      // Limpa a tabela (caso já tenha algo)
      tabelaCorpo.innerHTML = "";

      // 5. Itera sobre cada aluno na lista
      turmas.forEach((turma) => {
        // 6. Cria uma nova linha <tr>
        const linha = document.createElement("tr");

        linha.dataset.turmaId = turma.id_turma;
        // 7. Adiciona os dados do JSON em células <td>
        linha.innerHTML = `
                <td>${turma.codigo}</td>
                <td>${turma.nome}</td>
                <td>${turma.semestre}</td>
                <td>${turma.turno}</td>
            `;

        // 8. Adiciona a linha preenchida ao corpo da tabela
        tabelaCorpo.appendChild(linha);
      });
    } catch (error) {
      console.error("Falha ao carregar turmas:", error);
      // Você pode querer mostrar uma mensagem de erro amigável na tela
    }
  }

  async function carregarDisciplinasDaTurma(codigo) {
    try {
      // 2. Chama a API do seu RestController
      const response = await fetch(`/api/grade/por-turma/${codigo}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar grade: " + response.statusText);
      }

      // 3. Converte a resposta para JSON (uma lista de alunos)
      const grades = await response.json();

      // 4. Pega o "gancho" da tabela (o <tbody>)
      const tabelaCorpo = document.getElementById("tabelaDisciplinasBody");

      // Limpa a tabela (caso já tenha algo)
      tabelaCorpo.innerHTML = "";

      // 5. Itera sobre cada aluno na lista
      grades.forEach((grade) => {
        // 6. Cria uma nova linha <tr>
        const linha = document.createElement("tr");

        linha.dataset.gradeId = grade.id_grade;
        linha.dataset.disciplinaId = grade.disciplinas.id_disciplina;
        linha.dataset.professorId = grade.funcionarios.id_funcionario;
        // 7. Adiciona os dados do JSON em células <td>
        linha.innerHTML = `
                <td>${grade.disciplinas.codigo}</td>
                <td>${grade.funcionarios.nome}</td>
            `;

        // 8. Adiciona a linha preenchida ao corpo da tabela
        tabelaCorpo.appendChild(linha);
      });
    } catch (error) {
      console.error("Falha ao carregar grade:", error);
      // Você pode querer mostrar uma mensagem de erro amigável na tela
    }
  }

  async function carregarAlunosDaTurma(codigo) {
    try {
      // 2. Chama a API do seu RestController
      const response = await fetch(`/api/matriculas/por-turma/${codigo}`);

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

        linha.dataset.alunoId = aluno.alunos.id;
        // 7. Adiciona os dados do JSON em células <td>
        linha.innerHTML = `
                <td>${aluno.alunos.nome}</td>
            `;

        // 8. Adiciona a linha preenchida ao corpo da tabela
        tabelaCorpo.appendChild(linha);
      });
    } catch (error) {
      console.error("Falha ao carregar alunos:", error);
      // Você pode querer mostrar uma mensagem de erro amigável na tela
    }
  }

  async function carregarTurmasFiltrados() {
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
    const url = new URL("/api/turmas/pesquisar", window.location.origin);
    url.searchParams.append("termo", termo);
    url.searchParams.append("tipo", tipo);
    url.searchParams.append("ordem", ordem);

    // 4. Chama a API
    try {
      const response = await fetch(url);
      const turmas = await response.json();

      // 5. Renderiza a tabela (função que você já tem)
      renderizarTabelaTurmas(turmas);
    } catch (error) {
      console.error("Erro ao buscar turmas:", error);
    }
  }

  async function salvarTurma(dados) {
    //Logica de decisao
    let url;
    let metodo;

    if (dados.id) {
      // Têm ID? Então é EDIÇÃO (PUT)
      url = `/api/turmas/salvar/${dados.id}`;
      metodo = "PUT";
    } else {
      // Não tem ID? Então é CADASTRO (POST)
      url = "/api/turmas/salvar";
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
        carregarTurmas();
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

  // Função de Reset: Tabela Principal (Turmas)
  function resetarSelecaoTurma() {
    btnEditarTurma.disabled = true;
    turmaSelecionada = null;
    tabelaTurmasBody
      .querySelectorAll("tr")
      .forEach((row) => row.classList.remove("table-active"));
    // Limpa tabelas secundárias
    resetarSelecaoDisciplinasTurma(true);
    resetarSelecaoAlunosTurma(true);
  }

  // Função de Reset: Tabela Disciplinas (Direita)
  function resetarSelecaoDisciplinasTurma(limparTabela = false) {
    disciplinaSelecionada = null;
    if (limparTabela) {
      tabelaDisciplinasBody.innerHTML =
        '<tr><td colspan="2">Selecione uma turma.</td></tr>';
    } else {
      tabelaDisciplinasBody
        .querySelectorAll("tr")
        .forEach((row) => row.classList.remove("table-active"));
    }
  }

  // Função de Reset: Tabela Alunos (Direita)
  function resetarSelecaoAlunosTurma(limparTabela = false) {
    alunoSelecionado = null; // Reseta o aluno, pois a tabela de alunos agora é secundária
    if (limparTabela) {
      tabelaAlunosBody.innerHTML =
        '<tr><td colspan="3">Selecione uma turma.</td></tr>';
    } else {
      tabelaAlunosBody
        .querySelectorAll("tr")
        .forEach((row) => row.classList.remove("table-active"));
    }
  }

  function mostrarAlerta(mensagem, tipo, modal) {
    modal.textContent = mensagem;
    modal.className = `alert alert-${tipo}`;
  }

  function renderizarTabelaTurmas(turmas) {
    tabelaTurmasBody.innerHTML = "";

    // 5. Itera sobre cada aluno na lista
    turmas.forEach((turma) => {
      // 6. Cria uma nova linha <tr>
      const linha = document.createElement("tr");

      linha.dataset.turmaId = turma.id_turma;
      // 7. Adiciona os dados do JSON em células <td>
      linha.innerHTML = `
                <td>${turma.codigo}</td>
                <td>${turma.nome}</td>
                <td>${turma.semestre}</td>
                <td>${turma.turno}</td>
            `;

      // 8. Adiciona a linha preenchida ao corpo da tabela
      tabelaTurmasBody.appendChild(linha);
    });
  }

  function validarSemestre(semestreStr) {
    // 1. Validação de Formato (Regex)
    // ^      = início da string
    // \d{4}  = exatos 4 dígitos numéricos (Ano)
    // \.     = um ponto literal
    // \d{1}  = exato 1 dígito numérico (Semestre)
    // $      = fim da string
    const regexFormato = /^\d{4}\.\d{1}$/;

    if (!semestreStr || !regexFormato.test(semestreStr)) {
      mostrarAlerta(
        "Formato inválido. Esperado: YYYY.S (ex: 2024.1)",
        tipoAlert.DANGER,
        alertaModalEditarTurma
      );
      return false;
    }

    // 2. Separa o Ano e o Semestre
    const [anoStr, semStr] = semestreStr.split(".");
    const ano = parseInt(anoStr, 10);
    const semestre = parseInt(semStr, 10);

    // 3. Validação Lógica do Ano
    // Vamos definir um intervalo razoável (ex: entre 1900 e o ano atual + 10)
    // para evitar anos como "0000" ou "9999".
    const anoAtual = new Date().getFullYear();
    if (ano < 2010 || ano > anoAtual + 10) {
      mostrarAlerta(
        "Ano fora de um intervalo válido",
        tipoAlert.DANGER,
        alertaModalEditarTurma
      );
      return false;
    }

    // 4. Validação Lógica do Semestre
    // "não pode ser menor nem igual a 0" E "nao pode ser maior que 2"
    // Ou seja: só pode ser 1 ou 2.
    if (semestre <= 0 || semestre > 2) {
      mostrarAlerta(
        "O semestre deve ser 1 ou 2",
        tipoAlert.DANGER,
        alertaModalEditarTurma
      );
      return false;
    }

    // Se passou por tudo
    return true;
  }
});
