document.addEventListener("DOMContentLoaded", function () {
  carregarEventos();
  carregarTiposDeEventos();
  carregarLocais();

  //tipo de alert
  const tipoAlert = Object.freeze({
    DANGER: "danger",
    SUCESS: "primary",
  });

  // --- Variáveis Globais de Estado ---
  let eventoSelecionado = null;
  let localSelecionado = null;
  let tipoSelecionado = null;

  // Referência dos elementos de filtro
  const inputPesquisa = document.getElementById("inputPesquisa");
  const botaoPesquisa = document.getElementById("botaoPesquisa");

  // --- Seletores (Tabela Eventos) ---
  const tabelaEventosBody = document.getElementById("tabelaEventosBody");
  const btnEditarEvento = document.getElementById("btnEditarEvento");

  // --- Seletores (Tabela Locais) ---
  const tabelaLocaisBody = document.getElementById("tabelaLocaisBody");
  const btnEditarLocal = document.getElementById("btnEditarLocal");

  // --- Seletores (Tabela Tipos) ---
  const tabelaTiposBody = document.getElementById("tabelaTiposBody");
  const btnEditarTipo = document.getElementById("btnEditarTipo");

  // --- Seletores (Modal Locais) ---
  const modalGerenciarLocal = document.getElementById("modalGerenciarLocal");
  const modalLocalTitulo = document.getElementById("modalLocalTitulo");
  const editLocalNome = document.getElementById("editLocalNome");
  const btnSalvarLocal = document.getElementById("btnSalvarLocal");
  const alertaModalLocal = document.getElementById("alertaModalLocal");

  // --- NOVO: Seletores (Modal Tipos de Evento) ---
  const modalGerenciarTipo = document.getElementById("modalGerenciarTipo");
  const modalTipoTitulo = document.getElementById("modalTipoTitulo");
  const editTipoNome = document.getElementById("editTipoNome");
  const btnDropdownLocal = document.getElementById("btnDropdownLocal");
  const dropdownMenuLocal = document.getElementById("dropdownMenuLocal");
  const btnSalvarTipo = document.getElementById("btnSalvarTipo");
  const alertaModalTipoEvento = document.getElementById(
    "alertaModalTipoEvento"
  );

  // --- NOVO: Seletores (Modal Eventos) ---
  const modalGerenciarEvento = document.getElementById("modalGerenciarEvento");
  const modalEventoTitulo = document.getElementById("modalEventoTitulo");
  const editEventoNome = document.getElementById("editEventoNome");
  const btnDropdownTipoEvento = document.getElementById(
    "btnDropdownTipoEvento"
  );
  const dropdownMenuTipoEvento = document.getElementById(
    "dropdownMenuTipoEvento"
  );
  const editEventoLocal = document.getElementById("editEventoLocal");
  const editEventoInicio = document.getElementById("editEventoInicio");
  const editEventoFim = document.getElementById("editEventoFim");
  const editEventoParticipantes = document.getElementById(
    "editEventoParticipantes"
  );
  const editEventoCaminho = document.getElementById("editEventoCaminho");
  const btnSalvarEvento = document.getElementById("btnSalvarEvento");
  const alertaModalGerenciarEvento = document.getElementById(
    "alertaModalGerenciarEvento"
  );

  // --- LÓGICA DE PESQUISAR EVENTOS ---

  botaoPesquisa.addEventListener("click", carregarEventosFiltrados);

  document
    .querySelectorAll('input[name="pesquisarPor"], input[name="ordenarPor"]')
    .forEach((radio) => {
      radio.addEventListener("change", carregarEventos);
    });

  // --- LÓGICA 1: SELEÇÃO DE EVENTO ---
  if (tabelaEventosBody) {
    tabelaEventosBody.addEventListener("click", function (event) {
      const linhaClicada = event.target.closest("tr");
      if (!linhaClicada) return;

      // Pega dados da linha
      const celulas = linhaClicada.cells;
      eventoSelecionado = {
        id: linhaClicada.dataset.eventoId,
        nome: celulas[0].textContent.trim(),
        inicio: celulas[1].textContent.trim(),
        fim: celulas[2].textContent.trim(),
        participantes: celulas[3].textContent.trim(),
        tipo: celulas[4].textContent.trim(),
        local: celulas[5].textContent.trim(),
        caminho: celulas[6].textContent.trim(),
        tipoEventoId: linhaClicada.dataset.tipoEventoId,
      };

      // Habilita botão de editar
      btnEditarEvento.disabled = false;

      // Highlight
      tabelaEventosBody
        .querySelectorAll("tr")
        .forEach((row) => row.classList.remove("table-active"));
      linhaClicada.classList.add("table-active");

      console.clear();
      console.log("--- ✅ Evento Selecionado ---", eventoSelecionado);
    });
  }

  // --- LÓGICA 2: SELEÇÃO DE LOCAL ---
  if (tabelaLocaisBody) {
    tabelaLocaisBody.addEventListener("click", function (event) {
      const linhaClicada = event.target.closest("tr");
      if (!linhaClicada) return;

      const celulas = linhaClicada.cells;
      localSelecionado = {
        id: linhaClicada.dataset.localId,
        nome: celulas[0].textContent.trim(),
      };

      btnEditarLocal.disabled = false;

      // Highlight
      tabelaLocaisBody
        .querySelectorAll("tr")
        .forEach((row) => row.classList.remove("table-active"));
      linhaClicada.classList.add("table-active");

      console.log("--- ✅ Local Selecionado ---", localSelecionado);
    });
  }

  // --- LÓGICA 3: SELEÇÃO DE TIPO DE EVENTO ---
  if (tabelaTiposBody) {
    tabelaTiposBody.addEventListener("click", function (event) {
      const linhaClicada = event.target.closest("tr");
      if (!linhaClicada) return;

      const celulas = linhaClicada.cells;
      tipoSelecionado = {
        id: linhaClicada.dataset.tipoEventoId,
        nome: celulas[0].textContent.trim(),
        local: celulas[1].textContent.trim(),
        localId: linhaClicada.dataset.localId,
      };

      btnEditarTipo.disabled = false;

      // Highlight
      tabelaTiposBody
        .querySelectorAll("tr")
        .forEach((row) => row.classList.remove("table-active"));
      linhaClicada.classList.add("table-active");

      console.log("--- ✅ Tipo de Evento Selecionado ---", tipoSelecionado);
    });
  }

  // --- LÓGICA 4: MODAL GERENCIAR LOCAL (MOVIDA PARA DENTRO) ---
  if (modalGerenciarLocal) {
    // Adiciona verificação de segurança
    modalGerenciarLocal.addEventListener("show.bs.modal", function (event) {
      const triggerButton = event.relatedTarget; // Botão que abriu o modal

      if (triggerButton && triggerButton.id === "btnEditarLocal") {
        // --- MODO EDIÇÃO ---
        modalLocalTitulo.textContent = "Editar Local";
        if (!localSelecionado) return; // Segurança

        // Preenche o campo com o nome do local selecionado
        editLocalNome.value = localSelecionado.nome;
      } else {
        // --- MODO CADASTRO ---
        modalLocalTitulo.textContent = "Inserir Local";
        editLocalNome.value = ""; // Limpa o campo

        // Reseta o 'localSelecionado' para garantir que estamos em modo de inserção
        // (Chamando a função que agora está no mesmo escopo)
        resetarSelecaoLocal();
      }

      alertaModalLocal.classList.add("d-none");
    });

    // Confirmar Edicao/Insercao de LOCAL
    btnSalvarLocal.addEventListener("click", async function () {
      const nomeLocal = editLocalNome.value;

      if (editLocalNome.value == "") {
        mostrarAlerta("Nome em branco", tipoAlert.DANGER, alertaModalLocal);
        return;
      }

      const dados = {
        id: null,
        nome: editLocalNome.value,
      };

      if (localSelecionado) {
        // MODO EDIÇÃO
        console.log("--- ✅ SALVANDO LOCAL (EDIÇÃO) ---", dados);

        dados.id = localSelecionado.id;

        let sucesso = await salvarLocal(dados);

        if (sucesso === false) {
          mostrarAlerta(
            "Erro ao atualizar local",
            tipoAlert.DANGER,
            alertaModalLocal
          );
          return;
        }

        // Atualiza a linha na tabela (simulação)
        const linhaAtiva = tabelaLocaisBody.querySelector(".table-active");
        if (linhaAtiva) {
          linhaAtiva.cells[0].textContent = nomeLocal;
        }
      } else {
        // MODO CADASTRO

        let sucesso = await verificarLocal(editLocalNome.value.toLowerCase());

        if (sucesso) {
          mostrarAlerta("Local cadastrado", tipoAlert.DANGER, alertaModalLocal);
          return;
        }

        sucesso = await salvarLocal(dados);

        if (sucesso === false) {
          mostrarAlerta(
            "Erro ao cadastrar local",
            tipoAlert.DANGER,
            alertaModalLocal
          );
          return;
        }

        console.log("--- ✅ SALVANDO LOCAL (CADASTRO) ---", dados);
      }

      //Fecha modal
      mostrarAlerta("Operação concluída", tipoAlert.SUCESS, alertaModalLocal);

      setTimeout(() => {
        bootstrap.Modal.getInstance(modalGerenciarLocal).hide();
      }, 500);
      resetarSelecaoLocal();
    });
  }

  // --- NOVO: LÓGICA 5: MODAL GERENCIAR TIPO DE EVENTO ---
  if (modalGerenciarTipo) {
    modalGerenciarTipo.addEventListener("show.bs.modal", function (event) {
      // 1. Carrega o dropdown de locais
      carregarLocaisDropdown();

      const triggerButton = event.relatedTarget;

      if (triggerButton && triggerButton.id === "btnEditarTipo") {
        // --- MODO EDIÇÃO ---
        modalTipoTitulo.textContent = "Editar Tipo de Evento";
        if (!tipoSelecionado) return;

        editTipoNome.value = tipoSelecionado.nome;
        // Se 'tipoSelecionado' tivesse localNome e localId:
        btnDropdownLocal.textContent = tipoSelecionado.local;
        btnDropdownLocal.dataset.selectedId = tipoSelecionado.localId;
      } else {
        // --- MODO CADASTRO ---
        modalTipoTitulo.textContent = "Inserir Tipo de Evento";
        editTipoNome.value = "";
        btnDropdownLocal.textContent = "Selecione um Local";
        delete btnDropdownLocal.dataset.selectedId;

        resetarSelecaoTipo();
      }

      alertaModalTipoEvento.classList.add("d-none");
    });

    btnSalvarTipo.addEventListener("click", async function () {
      const nomeTipo = editTipoNome.value;
      const localNomeSelecionado = dropdownMenuLocal.textContent;
      if (editTipoNome.value == "") {
        mostrarAlerta(
          "Nome em branco",
          tipoAlert.DANGER,
          alertaModalTipoEvento
        );
        return;
      } else if (localNomeSelecionado == "Selecione um Local") {
        mostrarAlerta(
          "Selecione um local",
          tipoAlert.DANGER,
          alertaModalTipoEvento
        );
        return;
      }

      const dados = {
        id: null,
        nome: editTipoNome.value,
        id_local: btnDropdownLocal.dataset.selectedId,
      };

      if (tipoSelecionado) {
        // MODO EDIÇÃO
        dados.id = tipoSelecionado.id;

        let sucesso = await salvarTipoEvento(dados);

        if (sucesso === false) {
          mostrarAlerta(
            "Erro ao atualizar tipo de evento",
            tipoAlert.DANGER,
            alertaModalTipoEvento
          );
          return;
        }

        console.log("--- SALVANDO TIPO (EDIÇÃO) ---", dados);

        const linhaAtiva = tabelaTiposBody.querySelector(".table-active");
        if (linhaAtiva) {
          linhaAtiva.cells[0].textContent = nomeTipo;
        }
      } else {
        // MODO CADASTRO
        let sucesso = await verificarTipoEvento(editTipoNome.value.toLowerCase());

        if (sucesso === false) {
          mostrarAlerta(
            "Tipo de evento cadastrado",
            tipoAlert.DANGER,
            alertaModalTipoEvento
          );
          return;
        }

        sucesso = await salvarTipoEvento(dados);

        if (sucesso === false) {
          mostrarAlerta(
            "Erro ao cadastrar tipo de evento",
            tipoAlert.DANGER,
            alertaModalTipoEvento
          );
          return;
        }

        console.log("--- SALVANDO TIPO (CADASTRO) ---", dados);
      }

      //Fecha modal
      mostrarAlerta(
        "Operação concluída",
        tipoAlert.SUCESS,
        alertaModalTipoEvento
      );

      setTimeout(() => {
        bootstrap.Modal.getInstance(modalGerenciarTipo).hide();
      }, 500);
      resetarSelecaoTipo();
    });
  }

  // --- NOVO: LÓGICA 6: MODAL GERENCIAR EVENTO ---
  if (modalGerenciarEvento) {
    modalGerenciarEvento.addEventListener("show.bs.modal", function (event) {
      // 1. Carrega o dropdown de Tipos
      carregarTiposDropdown();

      const triggerButton = event.relatedTarget;

      if (triggerButton && triggerButton.id === "btnEditarEvento") {
        // --- MODO EDIÇÃO ---
        modalEventoTitulo.textContent = "Editar Evento";
        if (!eventoSelecionado) return;

        // Preenche os campos simples
        editEventoNome.value = eventoSelecionado.nome;
        editEventoInicio.value = eventoSelecionado.inicio;
        editEventoFim.value = eventoSelecionado.fim;
        editEventoParticipantes.value = eventoSelecionado.participantes;

        // Pré-seleciona o Tipo e o Local (puxado pelo tipo)
        btnDropdownTipoEvento.textContent = eventoSelecionado.tipo;
        btnDropdownTipoEvento.dataset.selectedId =
          eventoSelecionado.tipoEventoId;
        editEventoLocal.value = eventoSelecionado.local;
        editEventoCaminho.value = eventoSelecionado.caminho;
      } else {
        // --- MODO CADASTRO ---
        modalEventoTitulo.textContent = "Inserir Evento";
        editEventoNome.value = "";
        editEventoInicio.value = "";
        editEventoFim.value = "";
        editEventoParticipantes.value = "";
        btnDropdownTipoEvento.textContent = "Selecione o Tipo";
        editEventoLocal.value = ""; // Limpa o local
        delete btnDropdownTipoEvento.dataset.selectedId;

        resetarSelecaoEvento();
      }
      alertaModalGerenciarEvento.classList.add("d-none");
    });

    btnSalvarEvento.addEventListener("click", async function () {
      if (editEventoNome.value == "") {
        mostrarAlerta(
          "Nome em branco",
          tipoAlert.DANGER,
          alertaModalGerenciarEvento
        );
        return;
      } else if (editEventoInicio.value == "") {
        mostrarAlerta(
          "Data de inicio em branco",
          tipoAlert.DANGER,
          alertaModalGerenciarEvento
        );
        return;
      } else if (!validarDataBR(editEventoInicio.value)) {
        mostrarAlerta(
          "Formato de data de inicio inválida",
          tipoAlert.DANGER,
          alertaModalGerenciarEvento
        );
        return;
      } else if (editEventoFim.value == "") {
        mostrarAlerta(
          "Data de fim em branco",
          tipoAlert.DANGER,
          alertaModalGerenciarEvento
        );
        return;
      } else if (!validarDataBR(editEventoFim.value)) {
        mostrarAlerta(
          "Formato de data de fim inválida",
          tipoAlert.DANGER,
          alertaModalGerenciarEvento
        );
        return;
      } else if (editEventoParticipantes.value == "") {
        mostrarAlerta(
          "Participantes em branco",
          tipoAlert.DANGER,
          alertaModalGerenciarEvento
        );
        return;
      } else if (btnDropdownTipoEvento.textContent == "Selecione o Tipo") {
        mostrarAlerta(
          "Selecione o tipo de evento",
          tipoAlert.DANGER,
          alertaModalGerenciarEvento
        );
        return;
      } else if (editEventoCaminho.value == "") {
        mostrarAlerta(
          "Arquivo em branco",
          tipoAlert.DANGER,
          alertaModalGerenciarEvento
        );
        return;
      } else if (
        !validarDataBMaiorIgualA(editEventoInicio.value, editEventoFim.value)
      ) {
        mostrarAlerta(
          "Data de fim não pode ser menor que inicio",
          tipoAlert.DANGER,
          alertaModalGerenciarEvento
        );
        return;
      }

      const dados = {
        id: null,
        nome: editEventoNome.value,
        dataInicio: formatarDataParaAPI(editEventoInicio.value),
        dataFim: formatarDataParaAPI(editEventoFim.value),
        participantes: editEventoParticipantes.value,
        id_tipo: btnDropdownTipoEvento.dataset.selectedId,
        caminho: editEventoCaminho.value,
      };

      if (eventoSelecionado) {
        // MODO EDIÇÃO
        dados.id = eventoSelecionado.id;

        console.log("--- SALVANDO EVENTO (EDIÇÃO) ---", dados);

        let sucesso = await salvarEvento(dados);
        if (sucesso === false) {
          mostrarAlerta(
            "Erro ao atualizar evento",
            tipoAlert.DANGER,
            alertaModalGerenciarEvento
          );
        }
      } else {
        // MODO CADASTRO
        console.log("--- SALVANDO EVENTO (CADASTRO) ---", dados);

        let sucesso = await salvarEvento(dados);
        if (sucesso === false) {
          mostrarAlerta(
            "Erro ao cadastrar evento",
            tipoAlert.DANGER,
            alertaModalGerenciarEvento
          );
        }
      }

      //Fecha modal
      mostrarAlerta(
        "Operação concluída",
        tipoAlert.SUCESS,
        alertaModalGerenciarEvento
      );

      setTimeout(() => {
        bootstrap.Modal.getInstance(modalGerenciarEvento).hide();
      }, 500);
      resetarSelecaoLocal();
      resetarSelecaoTipo();
      resetarSelecaoEvento();
    });
  }

  // --- FUNÇÕES AUXILIARES (MOVIDAS PARA DENTRO) ---

  /**
   * NOVO: Carrega os locais da Tabela de Locais para o Dropdown
   */
  function carregarLocaisDropdown() {
    let htmlDropdown = "";
    const linhasLocais = tabelaLocaisBody.querySelectorAll("tr");

    if (linhasLocais.length === 0) {
      htmlDropdown =
        '<li><a class="dropdown-item disabled" href="#">Nenhum local cadastrado</a></li>';
    } else {
      linhasLocais.forEach((linha) => {
        const localId = linha.dataset.localId;
        const localNome = linha.cells[0].textContent.trim();
        htmlDropdown += `
                      <li><a class="dropdown-item" href="#" data-local-id="${localId}">${localNome}</a></li>
                  `;
      });
    }

    dropdownMenuLocal.innerHTML = htmlDropdown;

    // Adiciona os eventos de clique aos novos itens do dropdown
    dropdownMenuLocal.querySelectorAll(".dropdown-item").forEach((item) => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        const dados = {
          id: this.dataset.localId,
          nome: this.textContent,
        };

        // Atualiza o botão para mostrar a seleção
        btnDropdownLocal.textContent = dados.nome;
        // Armazena o ID selecionado no próprio botão
        btnDropdownLocal.dataset.selectedId = dados.id;

        console.log("Local selecionado: ", dados);
      });
    });
  }

  /**
   * NOVO: Carrega os TIPOS da Tabela de Tipos para o Dropdown (do modal EVENTO)
   */
  function carregarTiposDropdown() {
    let htmlDropdown = "";
    const linhasTipos = tabelaTiposBody.querySelectorAll("tr");

    linhasTipos.forEach((linha) => {
      const tipoEventoId = linha.dataset.tipoEventoId;
      const tipoNome = linha.cells[0].textContent.trim();
      // Pega o local associado que adicionamos no <tr>
      const localNome = linha.cells[1].textContent.trim();

      htmlDropdown += `
                  <li>
                    <a class="dropdown-item" href="#" data-tipo-id="${tipoEventoId}" data-local-nome="${localNome}">
                      ${tipoNome}
                    </a>
                  </li>
              `;
    });

    dropdownMenuTipoEvento.innerHTML = htmlDropdown;

    // Adiciona os eventos de clique aos novos itens do dropdown
    dropdownMenuTipoEvento
      .querySelectorAll(".dropdown-item")
      .forEach((item) => {
        item.addEventListener("click", function (e) {
          e.preventDefault();
          const dados = {
            id: this.dataset.tipoId,
            nome: this.textContent.trim(),
            local: this.dataset.localNome,
          };

          // Atualiza o botão "Tipo"
          btnDropdownTipoEvento.textContent = dados.nome;
          btnDropdownTipoEvento.dataset.selectedId = dados.id;

          // ATUALIZA O CAMPO "Local" (Lógica Dependente)
          editEventoLocal.value = dados.local;

          console.log("Tipo selecionado: ", dados);
        });
      });
  }

  function resetarSelecaoEvento() {
    btnEditarEvento.disabled = true;
    eventoSelecionado = null;
    if (tabelaEventosBody) {
      tabelaEventosBody
        .querySelectorAll("tr")
        .forEach((row) => row.classList.remove("table-active"));
    }
  }

  function resetarSelecaoLocal() {
    btnEditarLocal.disabled = true;
    localSelecionado = null;
    if (tabelaLocaisBody) {
      // Adiciona verificação
      tabelaLocaisBody
        .querySelectorAll("tr")
        .forEach((row) => row.classList.remove("table-active"));
    }
  }

  function resetarSelecaoTipo() {
    btnEditarTipo.disabled = true;
    tipoSelecionado = null;
    if (tabelaTiposBody) {
      tabelaTiposBody
        .querySelectorAll("tr")
        .forEach((row) => row.classList.remove("table-active"));
    }
  }

  function mostrarAlerta(mensagem, tipo, modal) {
    modal.textContent = mensagem;
    modal.className = `alert alert-${tipo}`;
  }

  // ---  FUNCÕES DE APIS ---

  async function carregarEventos() {
    try {
      // 2. Chama a API do seu RestController
      const response = await fetch(`/api/eventos/todos`);

      if (!response.ok) {
        throw new Error("Erro ao buscar eventos: " + response.statusText);
      }

      // 3. Converte a resposta para JSON (uma lista de alunos)
      const eventos = await response.json();

      // 4. Pega o "gancho" da tabela (o <tbody>)
      const tabelaCorpo = document.getElementById("tabelaEventosBody");

      // Limpa a tabela (caso já tenha algo)
      tabelaCorpo.innerHTML = "";

      // 5. Itera sobre cada aluno na lista
      eventos.forEach((evento) => {
        // 6. Cria uma nova linha <tr>
        const linha = document.createElement("tr");

        linha.dataset.eventoId = evento.id_evento;
        linha.dataset.tipoEventoId = evento.tipoEvento.id_tipo;
        // 7. Adiciona os dados do JSON em células <td>
        linha.innerHTML = `
                <td>${evento.nome}</td>
                <td>${formatarData(evento.dataInicio)}</td>
                <td>${formatarData(evento.dataFim)}</td>
                <td>${evento.participantes}</td>
                <td>${evento.tipoEvento.nome}</td>
                <td>${evento.tipoEvento.locais.nome}</td>
                <td>${evento.caminho}</td>
            `;

        // 8. Adiciona a linha preenchida ao corpo da tabela
        tabelaCorpo.appendChild(linha);
      });
    } catch (error) {
      console.log("Falha ao carregar eventos:", error);
      // Você pode querer mostrar uma mensagem de erro amigável na tela
    }
  }

  async function carregarTiposDeEventos() {
    try {
      // 2. Chama a API do seu RestController
      const response = await fetch(`/api/tipo-evento/todos`);

      if (!response.ok) {
        throw new Error(
          "Erro ao buscar tipos de eventos: " + response.statusText
        );
      }

      // 3. Converte a resposta para JSON (uma lista de alunos)
      const tiposEventos = await response.json();

      // 4. Pega o "gancho" da tabela (o <tbody>)
      const tabelaCorpo = document.getElementById("tabelaTiposBody");

      // Limpa a tabela (caso já tenha algo)
      tabelaCorpo.innerHTML = "";

      // 5. Itera sobre cada aluno na lista
      tiposEventos.forEach((tipoEvento) => {
        // 6. Cria uma nova linha <tr>
        const linha = document.createElement("tr");

        linha.dataset.tipoEventoId = tipoEvento.id_tipo;
        linha.dataset.localId = tipoEvento.locais.id_local;
        // 7. Adiciona os dados do JSON em células <td>
        linha.innerHTML = `
                <td>${tipoEvento.nome}</td>
                <td>${tipoEvento.locais.nome}</td>
            `;

        // 8. Adiciona a linha preenchida ao corpo da tabela
        tabelaCorpo.appendChild(linha);
      });
    } catch (error) {
      console.error("Falha ao carregar tipos de eventos:", error);
      // Você pode querer mostrar uma mensagem de erro amigável na tela
    }
  }

  async function carregarLocais() {
    try {
      // 2. Chama a API do seu RestController
      const response = await fetch(`/api/locais/todos`);

      if (!response.ok) {
        throw new Error("Erro ao buscar locais: " + response.statusText);
      }

      // 3. Converte a resposta para JSON (uma lista de alunos)
      const locais = await response.json();

      // 4. Pega o "gancho" da tabela (o <tbody>)
      const tabelaCorpo = document.getElementById("tabelaLocaisBody");

      // Limpa a tabela (caso já tenha algo)
      tabelaCorpo.innerHTML = "";

      // 5. Itera sobre cada aluno na lista
      locais.forEach((local) => {
        // 6. Cria uma nova linha <tr>
        const linha = document.createElement("tr");

        linha.dataset.localId = local.id_local;

        // 7. Adiciona os dados do JSON em células <td>
        linha.innerHTML = `
                <td>${local.nome}</td>
            `;

        // 8. Adiciona a linha preenchida ao corpo da tabela
        tabelaCorpo.appendChild(linha);
      });
    } catch (error) {
      console.error("Falha ao carregar locais:", error);
      // Você pode querer mostrar uma mensagem de erro amigável na tela
    }
  }

  async function carregarEventosFiltrados() {
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
    const url = new URL("/api/eventos/pesquisar", window.location.origin);
    url.searchParams.append("termo", termo);
    url.searchParams.append("tipo", tipo);
    url.searchParams.append("ordem", ordem);

    // 4. Chama a API
    try {
      const response = await fetch(url);
      const eventos = await response.json();

      // 5. Renderiza a tabela (função que você já tem)
      renderizarTabelaEventos(eventos);
    } catch (error) {
      console.error("Erro ao buscar evento:", error);
    }
  }

  async function salvarEvento(dados) {
    //Logica de decisao
    let url;
    let metodo;

    if (dados.id) {
      // Têm ID? Então é EDIÇÃO (PUT)
      url = `/api/eventos/salvar/${dados.id}`;
      metodo = "PUT";
    } else {
      // Não tem ID? Então é CADASTRO (POST)
      url = "/api/eventos/salvar";
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
        carregarEventos();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Erro na requisição:", error);
      return false;
    }
  }

  async function verificarLocal(nome) {
    try {
      const response = await fetch(`/api/locais/procurar/${nome}`);

      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Erro na requisição:", error);
      return false;
    }
  }

  async function salvarLocal(dados) {
    //Logica de decisao
    let url;
    let metodo;

    if (dados.id) {
      // Têm ID? Então é EDIÇÃO (PUT)
      url = `/api/locais/salvar/${dados.id}`;
      metodo = "PUT";
    } else {
      // Não tem ID? Então é CADASTRO (POST)
      url = "/api/locais/salvar";
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
        carregarLocais();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Erro na requisição:", error);
      return false;
    }
  }

  async function verificarTipoEvento(nome) {
    try {
      const response = await fetch(`/api/tipo-evento/procurar/${nome}`);

      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Erro na requisição:", error);
      return false;
    }
  }

  async function salvarTipoEvento(dados) {
    //Logica de decisao
    let url;
    let metodo;

    if (dados.id) {
      // Têm ID? Então é EDIÇÃO (PUT)
      url = `/api/tipo-evento/salvar/${dados.id}`;
      metodo = "PUT";
    } else {
      // Não tem ID? Então é CADASTRO (POST)
      url = "/api/tipo-evento/salvar";
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
        carregarTiposDeEventos();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Erro na requisição:", error);
      return false;
    }
  }

  // ---FUNÇÕES AUXILIARES---
  function formatarData(dataISO) {
    // Converte "2005-03-10" para "10/03/2005"
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
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
  function renderizarTabelaEventos(eventos) {
    tabelaEventosBody.innerHTML = "";

    // 5. Itera sobre cada aluno na lista
    eventos.forEach((evento) => {
      // 6. Cria uma nova linha <tr>
      const linha = document.createElement("tr");

      linha.dataset.eventoId = evento.id_evento;

      // 7. Adiciona os dados do JSON em células <td>
      linha.innerHTML = `
                <td>${evento.nome}</td>
                <td>${formatarData(evento.dataInicio)}</td>
                <td>${formatarData(evento.dataFim)}</td>
                <td>${evento.participantes}</td>
                <td>${evento.tipoEvento.nome}</td>
                <td>${evento.tipoEvento.locais.nome}</td>
                <td>${evento.caminho}</td>
            `;

      // 8. Adiciona a linha preenchida ao corpo da tabela
      tabelaEventosBody.appendChild(linha);
    });
  }

  function validarDataBMaiorIgualA(dataAStr, dataBStr) {
    // 1. Função auxiliar para converter 'dd/MM/yyyy' para objeto Date
    function converterParaData(dataString) {
      if (!dataString) return null;
      const partes = dataString.split("/");
      // Cria a data: new Date(ano, mes (0-11), dia)
      // Zera as horas para garantir que comparamos apenas as datas
      const data = new Date(partes[2], partes[1] - 1, partes[0]);
      data.setHours(0, 0, 0, 0);
      return data;
    }

    const dataA = converterParaData(dataAStr);
    const dataB = converterParaData(dataBStr);

    // Validação de segurança (caso as datas venham vazias ou inválidas)
    if (!dataA || !dataB || isNaN(dataA.getTime()) || isNaN(dataB.getTime())) {
      console.error("Datas inválidas fornecidas para comparação.");
      return false;
    }

    // 2. A Comparação:
    // Retorna TRUE se Data B for Maior (futuro) ou Igual à Data A
    return dataB.getTime() >= dataA.getTime();
  }
});
