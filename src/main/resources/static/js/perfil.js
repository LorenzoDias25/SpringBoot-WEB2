document.addEventListener("DOMContentLoaded", async function () {
  //Campo de informacao do aluno
  const matriculaCampo = document.getElementById("matriculaCampo");
  const nomeCompletoCampo = document.getElementById("nomeCompletoCampo");

  // Pega os elementos do modal
  const btnConfirmar = document.getElementById("btnConfirmarSenha");
  const inputNovaSenha = document.getElementById("inputNovaSenha");
  const inputConfirmarSenha = document.getElementById("inputConfirmarSenha");
  const divAlerta = document.getElementById("alertaSenha");

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

    // 2. Preparar os dados para o Spring Boot
    const dados = {
      novaSenha: novaSenha,
      // Você pode enviar a matrícula do usuário aqui também
    };

    // 3. ENVIAR PARA O SPRING BOOT (A "JUNÇÃO")
    try {
      const response = await fetch("/api/usuario/alterar-senha", {
        method: "POST", // ou 'PUT'
        headers: {
          "Content-Type": "application/json",
          // Adicione headers de segurança (como o token CSRF) se o Spring Security estiver ativo
        },
        body: JSON.stringify(dados), // Converte o objeto JS em uma string JSON
      });

      const resultado = await response.json(); // Lê a resposta do Spring Boot

      if (response.ok) {
        // 4. Sucesso!
        mostrarAlerta("Senha alterada com sucesso!", "success");

        // Fecha o modal após 2 segundos
        setTimeout(() => {
          modal.hide();
          limparCampos();
        }, 2000);
      } else {
        // 5. Erro (ex: "Senha fraca", etc.)
        mostrarAlerta(
          resultado.message || "Erro ao alterar a senha.",
          "danger"
        );
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      mostrarAlerta("Erro de conexão. Tente novamente.", "danger");
    }
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
    return null;
  }

  async function carregaCampos(aluno) {
    nomeCompletoCampo.textContent = aluno.nome;
    matriculaCampo.textContent = aluno.matricula;
    console.log("Aluno", aluno);

    return true;
  }
  // Funções auxiliares
  function mostrarAlerta(mensagem, tipo) {
    // tipo = 'success' ou 'danger'
    divAlerta.textContent = mensagem;
    divAlerta.className = `alert alert-${tipo}`; // Remove d-none e aplica a cor
  }

  function limparCampos() {
    inputNovaSenha.value = "";
    inputConfirmarSenha.value = "";
    divAlerta.className = "alert d-none"; // Oculta o alerta
  }

  await carregarDadosUsuarioLogado();
});
