document.addEventListener("DOMContentLoaded", function () {
  carregarFuncionarios();
  // --- Variável Global do Script ---
  let funcionarioSelecionado = null;

  //tipo de alert
  const tipoAlert = Object.freeze({
    DANGER: "danger",
    SUCESS: "primary",
    INFO: "info",
  });

  // --- Seletores Informacoes direita ---
  const btnInformacoes = document.getElementById("btnInformacoes");
  const enderecoDiv = document.getElementById("enderecoDiv");
  const informacoesDiv = document.getElementById("informacoesDiv");
  // Beneficios
  const btnEditarBeneficios = document.getElementById("btnEditarBeneficios");
  const tabelaBeneficiosBody = document.getElementById("tabelaBeneficiosBody");
  const modalEditarBeneficios = document.getElementById(
    "modalEditarBeneficios"
  );
  const inputEditarBeneficios = document.getElementById(
    "inputEditarBeneficios"
  );
  // Registro
  const inputAdmissao = document.getElementById("inputAdmissao");
  const inputDemissao = document.getElementById("inputDemissao");
  const camposRegistro = document.querySelectorAll(".registro-field");
  const btnEditarRegistro = document.getElementById("btnEditarRegistro");
  const btnSalvarRegistro = document.getElementById("btnSalvarRegistro");

  // --- Seleção de Elementos (COMPLETA) ---
  const btnCadastrarTabela = document.getElementById("btnCadastrarTabela");
  const btnEditarTabela = document.getElementById("btnEditarTabela");
  const btnDesativarTabela = document.getElementById("btnDesativarTabela");

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

  const tabelaFuncionariosBody = document.getElementById(
    "tabelaFuncionariosBody"
  );
  // Modal Desativação
  const modalDesativar = document.getElementById("modalDesativar");
  const desativarMensagem = document.getElementById("desativarMensagem");
  const desativarInstrucao = document.getElementById("desativarInstrucao");
  const inputConfirmarCodigo = document.getElementById("inputConfirmarCodigo");
  const btnConfirmarDesativacao = document.getElementById(
    "btnConfirmarDesativacao"
  );
  const alertaDesativar = document.getElementById("alertaDesativar");
  const alertaEditar = document.getElementById("alertaEditar");
  const alertaCadastar = document.getElementById("alertaCadastrar");

  // Modal Edição
  const modalEditarFuncionario = document.getElementById(
    "modalEditarFuncionario"
  );
  const editNome = document.getElementById("editNome");
  const editCodigo = document.getElementById("editCodigo");
  const editCPF = document.getElementById("editCPF");
  const editEmail = document.getElementById("editEmail");
  const editCelular = document.getElementById("editCelular");
  const editCargo = document.getElementById("editCargo");
  const btnSalvarEdicao = document.getElementById("btnSalvarEdicao");

  // Modal Cadastro
  const modalCadastrarFuncionario = document.getElementById(
    "modalCadastrarFuncionario"
  );

  const cadNome = document.getElementById("cadNome");
  const cadCodigo = document.getElementById("cadCodigo");
  const cadCPF = document.getElementById("cadCPF");
  const cadEmail = document.getElementById("cadEmail");
  const cadCelular = document.getElementById("cadCelular");
  const cadCargo = document.getElementById("cadCargo");
  const btnSalvarCadastro = document.getElementById("btnSalvarCadastro");
  // (Campos 'cadNome', 'cadCodigo', etc. são selecionados quando necessário)

  // Referência dos elementos de filtro
  const inputPesquisa = document.getElementById("inputPesquisa");
  const botaoPesquisa = document.getElementById("botaoPesquisa");

  // --- LÓGICA DE PESQUISAR EVENTOS ---
  botaoPesquisa.addEventListener("click", carregarFuncionariosFiltrados);

  document
    .querySelectorAll('input[name="pesquisarPor"], input[name="ordenarPor"]')
    .forEach((radio) => {
      radio.addEventListener("change", carregarFuncionarios);
    });

  //Logica trocar botoes
  btnInformacoes.addEventListener("click", function (event) {
    alternarBotaoInformacoes();
  });

  // --- Lógica 1: Clique na Tabela ---
  if (tabelaFuncionariosBody) {
    tabelaFuncionariosBody.addEventListener("click", async function (event) {
      const linhaClicada = event.target.closest("tr");
      if (!linhaClicada) return;

      const celulas = linhaClicada.cells;
      funcionarioSelecionado = {
        funcionarioId: linhaClicada.dataset.funcionarioId,
        enderecoId: linhaClicada.dataset.enderecoId,
        beneficios: linhaClicada.dataset.beneficios,
        nome: celulas[0].textContent.trim(),
        codigo: celulas[1].textContent.trim(),
        cpf: celulas[2].textContent.trim(),
        email: celulas[3].textContent.trim(),
        celular: celulas[4].textContent.trim(),
        cargo: celulas[5].textContent.trim(),
      };

      await buscarEndereco(funcionarioSelecionado.enderecoId);
      await buscarRegistro(funcionarioSelecionado.funcionarioId);

      // Habilita os botões
      btnEditarBeneficios.disabled = false;
      btnEditarTabela.disabled = false;
      btnDesativarTabela.disabled = false;

      // Lógica de highlight

      tabelaFuncionariosBody
        .querySelectorAll("tr")
        .forEach((row) => row.classList.remove("table-active"));
      linhaClicada.classList.add("table-active");

      console.clear();
      console.log("--- Funcionário Selecionado ---", funcionarioSelecionado);
    });
  }

  // --- Lógica 2: Modal de Desativação (Atualizado) ---
  modalDesativar.addEventListener("show.bs.modal", function () {
    if (funcionarioSelecionado) {
      // ATUALIZADO para "funcionário"
      desativarMensagem.textContent = `O funcionário ${funcionarioSelecionado.nome} será desativado (Demitido)`;
      desativarInstrucao.innerHTML = `Digite "<strong>${funcionarioSelecionado.codigo}</strong>" para confirmar`;
      btnConfirmarDesativacao.dataset.codigoCorreto =
        funcionarioSelecionado.codigo;
    }
    inputConfirmarCodigo.value = "";
    alertaDesativar.classList.add("d-none");
  });

  btnConfirmarDesativacao.addEventListener("click", function () {
    const codigoDigitado = inputConfirmarCodigo.value;
    const codigoCorreto = this.dataset.codigoCorreto;

    if (codigoDigitado != codigoCorreto) {
      mostrarAlerta("Código inválido !", tipoAlert.DANGER, alertaDesativar);
      return;
    }

    console.log(`DESATIVANDO FUNCIONÁRIO ID:`, funcionarioSelecionado.nome);
    mostrarAlerta("Operação concluída", tipoAlert.SUCESS, alertaDesativar);

    resetarSelecao();
    resetarRegistro();
    resetarEndereco();
    resetarBeneficios();
    setTimeout(() => {
      bootstrap.Modal.getInstance(modalDesativar).hide();
    }, 500);
  });

  // --- LOGICA REGISTRO ---

  // Lógica dos botões "Editar/Salvar" do formulário de registro
  btnEditarRegistro.addEventListener("click", function () {
    camposRegistro.forEach((campo) => {
      campo.readOnly = false;
      campo.style.backgroundColor = "#FFFFFF";
    });
    btnSalvarRegistro.classList.remove("d-none");
  });

  btnSalvarRegistro.addEventListener("click", function () {
    console.log("Dados do registro salvos!");
    camposRegistro.forEach((campo) => {
      campo.readOnly = true;
      campo.style.backgroundColor = "#EEEEEE";
    });
    btnSalvarRegistro.classList.add("d-none");
  });

  // --- Lógica 3: Formulário de Endereço (Painel da Direita) ---

  // Lógica dos botões "Editar/Salvar" do formulário de endereço
  btnEditarEndereco.addEventListener("click", function () {
    camposEndereco.forEach((campo) => {
      campo.readOnly = false;
      campo.style.backgroundColor = "#FFFFFF";
    });
    btnSalvarEndereco.classList.remove("d-none");
  });

  btnSalvarEndereco.addEventListener("click", async function () {
    if (!funcionarioSelecionado) return;

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
      id: funcionarioSelecionado.enderecoId,
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
    let sucesso = await salvarEndereco(dados);

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

  // --- Lógica 4: Modal de Edição (Separado) ---
  modalEditarFuncionario.addEventListener("show.bs.modal", function () {
    if (funcionarioSelecionado) {
      // Preenche o modal de EDIÇÃO
      editNome.value = funcionarioSelecionado.nome;
      editCodigo.value = funcionarioSelecionado.codigo;
      editCPF.value = funcionarioSelecionado.cpf;
      editEmail.value = funcionarioSelecionado.email;
      editCelular.value = funcionarioSelecionado.celular;
      editCargo.value = funcionarioSelecionado.cargo;
    }
  });

  btnSalvarEdicao.addEventListener("click", function () {
    if (editNome.value == "") {
      mostrarAlerta("Nome em branco", tipoAlert.DANGER, alertaEditar);
      return;
    } else if (editCPF.value == "") {
      mostrarAlerta("CPF em branco", tipoAlert.DANGER, alertaEditar);
      return;
    } else if (editEmail.value == "") {
      mostrarAlerta("Email em branco", tipoAlert.DANGER, alertaEditar);
      return;
    } else if (editCelular.value == "") {
      mostrarAlerta("Celular em branco", tipoAlert.DANGER, alertaEditar);
      return;
    } else if (editCargo.value == "") {
      mostrarAlerta("Cargo em branco", tipoAlert.DANGER, alertaEditar);
      return;
    }

    const dadosEditados = {
      id: funcionarioSelecionado.id,
      nome: editNome.value,
      cpf: editCPF.value,
      email: editEmail.value,
      celular: editCelular.value,
      cargo: editCargo.value,
    };

    console.clear();
    console.log("--- ✅ Enviando (Modo EDIÇÃO) ---", dadosEditados);
    bootstrap.Modal.getInstance(modalEditarFuncionario).hide();

    // Atualiza a linha na tabela
    const linhaAtiva = tabelaFuncionariosBody.querySelector(".table-active");
    if (linhaAtiva) {
      linhaAtiva.cells[0].textContent = dadosEditados.nome;
      linhaAtiva.cells[2].textContent = dadosEditados.cpf;
      linhaAtiva.cells[3].textContent = dadosEditados.email;
      linhaAtiva.cells[5].textContent = dadosEditados.celular;
      linhaAtiva.cells[6].textContent = dadosEditados.cargo;
    }
  });

  // --- Lógica 5: Modal de Cadastro (Separado) ---
  modalCadastrarFuncionario.addEventListener("show.bs.modal", function () {
    // Limpa todos os campos
    cadNome.value = "";
    cadCodigo.value = "";
    cadCPF.value = "";
    cadEmail.value = "";
    cadCelular.value = "";
    cadCargo.value = "";
  });

  btnSalvarCadastro.addEventListener("click", function () {
    if (cadNome.value == "") {
      mostrarAlerta("Nome em branco", tipoAlert.DANGER, alertaCadastar);
      return;
    } else if (cadCodigo.value == "") {
      mostrarAlerta("Código em branco", tipoAlert.DANGER, alertaCadastar);
      return;
    } else if (cadCPF.value == "") {
      mostrarAlerta("CPF em branco", tipoAlert.DANGER, alertaCadastar);
      return;
    } else if (cadEmail.value == "") {
      mostrarAlerta("Email em branco", tipoAlert.DANGER, alertaCadastar);
      return;
    } else if (cadCelular.value == "") {
      mostrarAlerta("Celular em branco", tipoAlert.DANGER, alertaCadastar);
      return;
    } else if (cadCargo.value == "") {
      mostrarAlerta("Cargo em branco", tipoAlert.DANGER, alertaCadastar);
      return;
    }

    const dadosCadastro = {
      nome: cadNome.value,
      codigo: cadCodigo.value,
      cpf: cadCPF.value,
      email: cadEmail.value,
      celular: cadCelular.value,
      cargo: cadCargo.value,
    };

    console.clear();
    console.log("--- ✅ Enviando (Modo CADASTRO) ---", dadosCadastro);
    bootstrap.Modal.getInstance(modalCadastrarFuncionario).hide();
    // (Aqui você faria o 'fetch' POST para o Spring Boot e,
    // na resposta, pegaria o novo funcionário e adicionaria na tabela)
  });

  // --- Funcoes APIS ---

  async function carregarFuncionarios(params) {
    try {
      const response = await fetch(`/api/funcionarios/todos`);

      if (!response.ok) {
        throw new Error("Erro ao buscar funcionarios:" + response.statusText);
      }

      const funcionarios = await response.json();

      const tabelaCorpo = document.getElementById("tabelaFuncionariosBody");

      tabelaCorpo.innerHTML = "";

      for (const funcionario of funcionarios) {
        const cargo = await buscarCargo(funcionario.cargo.id);

        const nomeCargo = cargo ? cargo.nome : "Não encontrado";

        const linha = document.createElement("tr");

        linha.dataset.funcionarioId = funcionario.id;
        linha.dataset.enderecoId = funcionario.endereco.id;
        linha.dataset.cargoId = funcionario.cargo.id;
        linha.dataset.beneficios = funcionario.cargo.beneficios;

        linha.innerHTML = `
          <td>${funcionario.nome}</td>
          <td>${funcionario.codigo}</td>
          <td>${funcionario.cpf}</td>
          <td>${funcionario.email}</td>
          <td>${formatarData(funcionario.data_nascimento)}</td>
          <td>${funcionario.celular}</td>
          <td>${nomeCargo}</td>
        `;

        tabelaCorpo.appendChild(linha);
      }
    } catch (error) {
      console.log("Erro ao carregar contas:", error);
    }
  }

  async function buscarCargo(id) {
    try {
      const response = await fetch(`api/cargos/por-id/${id}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar cargo:" + response.statusText);
      }

      const cargo = await response.json();

      return cargo;
    } catch (error) {
      console.log("Erro ao buscar cargo:", error);
      return null;
    }
  }

  async function buscarRegistro(id) {
    try {
      const response = await fetch(`api/registro/por-funcionario/${id}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar registro:" + response.statusText);
      }

      const registro = await response.json();

      await carregaRegistro(registro);

      return true;
    } catch (error) {
      console.log("Erro ao buscar registro:", error);
      return null;
    }
  }

  async function carregaRegistro(registro) {
    inputAdmissao.value = formatarData(registro.data_admissao);
    if (registro.data_demissao === "9999-12-31") {
      inputDemissao.value = "Não definido";
    } else {
      inputDemissao.value = formatarData(registro.data_demissao);
    }

    const beneficios = funcionarioSelecionado.beneficios.split(",");

    const tabelaCorpo = document.getElementById("tabelaBeneficiosBody");

    tabelaCorpo.innerHTML = "";

    for (const beneficio of beneficios) {
      const linha = document.createElement("tr");

      linha.innerHTML = `
          <td>${beneficio}</td>
        `;

      tabelaCorpo.appendChild(linha);
    }
  }

  async function buscarEndereco(id) {
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

  async function salvarEndereco(dados) {
    try {
      const response = await fetch(`/api/endereco/salvar/${dados.id}`, {
        method: "PUT", // O método HTTP para atualizar
        headers: {
          "Content-Type": "application/json", // Diz ao Spring que você está enviando JSON
        },
        body: JSON.stringify(dados), // Converte o objeto JS para uma string JSON
      });

      if (response.ok) {
        buscarEndereco(funcionarioSelecionado.enderecoId);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Erro na requisição:", error);
      return false;
    }
  }

  async function carregarFuncionariosFiltrados() {
    // 2. Coleta os valores dos filtros
    const termo = inputPesquisa.value;
    const tipo = document.querySelector(
      'input[name="pesquisarPor"]:checked'
    ).value;
    const ordem = document.querySelector(
      'input[name="ordenarPor"]:checked'
    ).value;

    // 3. Monta a URL da API com os parâmetros
    const url = new URL("/api/funcionarios/pesquisar", window.location.origin);
    url.searchParams.append("termo", termo);
    url.searchParams.append("tipo", tipo);
    url.searchParams.append("ordem", ordem);

    // 4. Chama a API
    try {
      const response = await fetch(url);
      const funcionarios = await response.json();

      // 5. Renderiza a tabela (função que você já tem)
      renderizarTabelaFuncionarios(funcionarios);
    } catch (error) {
      console.error("Erro ao buscar funcionario:", error);
    }
  }

  async function renderizarTabelaFuncionarios(funcionarios) {
    tabelaFuncionariosBody.innerHTML = "";

    for (const funcionario of funcionarios) {
      const cargo = await buscarCargo(funcionario.cargo.id);

      const nomeCargo = cargo ? cargo.nome : "Não encontrado";

      const linha = document.createElement("tr");

      linha.dataset.funcionarioId = funcionario.id;
      linha.dataset.enderecoId = funcionario.endereco.id;
      linha.dataset.cargoId = funcionario.cargo.id;
      linha.dataset.beneficios = funcionario.cargo.beneficios;

      linha.innerHTML = `
          <td>${funcionario.nome}</td>
          <td>${funcionario.codigo}</td>
          <td>${funcionario.cpf}</td>
          <td>${funcionario.email}</td>
          <td>${formatarData(funcionario.data_nascimento)}</td>
          <td>${funcionario.celular}</td>
          <td>${nomeCargo}</td>
        `;

      tabelaFuncionariosBody.appendChild(linha);
    }
  }

  // --- Funções Auxiliares (COMPLETAS) ---
  function mostrarAlerta(mensagem, tipo, modal) {
    modal.textContent = mensagem;
    modal.className = `alert alert-${tipo}`;
  }

  function resetarSelecao() {
    btnEditarTabela.disabled = true;
    btnDesativarTabela.disabled = true;
    const linhaAtiva = tabelaFuncionariosBody.querySelector(".table-active");
    if (linhaAtiva) {
      linhaAtiva.classList.remove("table-active");
    }
    funcionarioSelecionado = null;
  }

  function resetarRegistro() {
    inputAdmissao = "";
    inputDemissao = "";
  }

  function resetarEndereco() {
    editRua.value = "";
    editBairro.value = "";
    editCidade.value = "";
    editNumero.value = "";
    editCEP.value = "";
    editComplemento.value = "";

    camposRegistro.forEach((campo) => {
      campo.readOnly = true;
      campo.style.backgroundColor = "#EEEEEE";
    });
    btnSalvarRegistro.classList.add("d-none");
  }

  function resetarBeneficios() {
    tabelaBeneficiosBody.innerHTML = "";
  }

  function alternarBotaoInformacoes() {
    if (btnInformacoes.textContent === "Histórico") {
      enderecoDiv.style.display = "none";
      informacoesDiv.style.display = "block";
      btnInformacoes.textContent = "Endereço";
    } else {
      informacoesDiv.style.display = "none";
      enderecoDiv.style.display = "block";
      btnInformacoes.textContent = "Histórico";
    }
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

  function formatarData(dataISO) {
    // Converte "2005-03-10" para "10/03/2005"
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
  }
});
