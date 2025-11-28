document.addEventListener("DOMContentLoaded", async function () {
  let alunoCarregado = null;

  //tipo de alert
  const tipoAlert = Object.freeze({
    DANGER: "danger",
    SUCESS: "primary",
    INFO: "info",
  });

  //Campo de informacao do aluno
  const matriculaCampo = document.getElementById("matriculaCampo");
  const nomeCompletoCampo = document.getElementById("nomeCompletoCampo");

  // Pega os elementos do modal
  const btnConfirmar = document.getElementById("btnConfirmarSenha");
  const inputNovaSenha = document.getElementById("inputNovaSenha");
  const inputConfirmarSenha = document.getElementById("inputConfirmarSenha");
  const alertaSenha = document.getElementById("alertaSenha");

  // Pega a instância do Modal do Bootstrap
  const modalElement = document.getElementById("modalAlterarSenha");
  const modal = bootstrap.Modal.getInstance(modalElement);

  // Adiciona o evento de clique ao botão "Confirmar"
  // btnConfirmar.addEventListener("click", function(){
  //     console.log("Click");

  // });

  btnConfirmar.addEventListener("click", async function () {
    const novaSenha = inputNovaSenha.value;
    const confirmarSenha = inputConfirmarSenha.value;

    // 1. Validação no Front-end
    if (novaSenha.length < 6) {
      mostrarAlerta("A senha deve ter pelo menos 6 caracteres.", "danger");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      mostrarAlerta("As senhas não conferem!", "danger");
      return;
    }

    const dados = {
      id: alunoCarregado.id,
      codigo: alunoCarregado.matricula,
      ativo: true,
      senha: novaSenha,
    };

    let sucesso = await atualizarSenha(dados);
    if (sucesso === false) {
      mostrarAlerta("Erro ao atualizar senha", tipoAlert.DANGER);
      return;
    }
    mostrarAlerta("Operação concluída", tipoAlert.SUCESS);
    setTimeout(() => {
      bootstrap.Modal.getInstance(modalElement).hide();
    }, 500);
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
    return null;
  }

  async function buscaAluno(usuario) {
    try {
      const response = await fetch(
        `/api/alunos/por-matricula/${usuario.codigo}`
      );

      if (response.ok) {
        const aluno = await response.json();

        await carregaCampos(aluno);
        return true;
      }
    } catch (error) {
      console.error("Erro ao buscar usuário logado", error);
      return null;
    }
  }

  async function carregaCampos(aluno) {
    nomeCompletoCampo.textContent = aluno.nome;
    matriculaCampo.textContent = aluno.matricula;
    alunoCarregado = aluno;
    console.log("Aluno", aluno);

    return true;
  }
  async function atualizarSenha(dados) {
    //Logica de decisao
    let url;
    let metodo;

    if (dados.id) {
      url = `/api/contas/salvar/${dados.id}`;
      metodo = "PUT";
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
        return true;
      } else {
        console.log("Erro na requisição:");
        return false;
      }
    } catch (error) {
      console.log("Erro na requisição:", error);
      return false;
    }
  }
  // Funções auxiliares
  function mostrarAlerta(mensagem, tipo) {
    // tipo = 'success' ou 'danger'
    alertaSenha.textContent = mensagem;
    alertaSenha.className = `alert alert-${tipo}`; // Remove d-none e aplica a cor
  }

  function limparCampos() {
    inputNovaSenha.value = "";
    inputConfirmarSenha.value = "";
    alertaSenha.className = "alert d-none"; // Oculta o alerta
  }

  await carregarDadosUsuarioLogado();
});
