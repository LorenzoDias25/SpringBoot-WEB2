---

# Projeto: Sistema de Gestão Escolar (Escola_WEB2)

Este projeto é uma aplicação web completa desenvolvida com **Spring Boot** para o gerenciamento de uma instituição de ensino (identificada nos recursos visuais como "Escola Técnica Mesquita"). O sistema abrange áreas administrativas, acadêmicas e financeiras, além de um portal público de eventos.

## 🛠️ Stack Tecnológica

O projeto utiliza uma arquitetura moderna baseada em Java, separando o backend (API REST) do frontend (renderizado via Thymeleaf com interações dinâmicas via JavaScript).

* **Backend:** Java 21, Spring Boot 3.5.7.
* **Segurança:** Spring Security (Autenticação e Autorização baseada em Roles).
* **Banco de Dados:** MySQL (acesso via Spring Data JPA).
* **Frontend:** HTML5, CSS3, JavaScript (Vanilla), Bootstrap 5.
* **Template Engine:** Thymeleaf (para renderização de páginas).
* **Build Tool:** Maven.

---

## 🏛️ Arquitetura do Sistema

O projeto segue o padrão de arquitetura em camadas (Layered Architecture):

1.  **Models (Entidades):** Mapeamento ORM (JPA) das tabelas do banco de dados (ex: `Alunos`, `Funcionarios`, `Turmas`).
2.  **DTOs (Data Transfer Objects):** Objetos utilizados para transferência de dados entre o frontend e o backend, protegendo a integridade das entidades (ex: `AlunosUpdate`, `BoletoUpdate`).
3.  **Repository:** Interfaces que estendem `JpaRepository` para comunicação com o banco de dados.
4.  **Service:** Camada contendo a regra de negócio, transações (`@Transactional`) e validações.
5.  **Controllers:**
    * **RestControllers:** Endpoints da API (`/api/...`) que retornam JSON para serem consumidos pelo JavaScript do frontend.
    * **Controllers (MVC):** Controladores que retornam as *Views* (páginas HTML Thymeleaf).

---

## 🚀 Funcionalidades Principais

### 1. Módulo de Segurança e Autenticação
* Sistema de login personalizado (`SecurityConfigurations.java`).
* Criptografia de senhas com `BCryptPasswordEncoder`.
* **Controle de Acesso (RBAC):** Diferenciação de permissões entre os perfis:
    * `ADM` (Administrador)
    * `SECRETARIO`
    * `ALUNO`
    * `PROFESSOR`
    * `TI`

### 2. Gestão Administrativa (ADM/RH)
* **Funcionários:** CRUD completo de funcionários, incluindo dados pessoais e endereços.
* **Cargos e Salários:** Gestão de cargos, carga horária, salário base e benefícios.
* **Registro de Funcionários:** Controle de datas de admissão e demissão.
* **Gestão de Contas:** Administração de usuários do sistema, com capacidade de ativar/desativar contas e redefinir senhas.

### 3. Secretaria e Gestão Acadêmica
* **Alunos:** Cadastro completo, incluindo geração automática de matrícula.
* **Turmas:** Criação de turmas, definição de turno e semestre.
* **Disciplinas:** Cadastro de matérias, carga horária e valores.
* **Grade Curricular:** Associação complexa que liga **Turma + Disciplina + Professor + Horário**.
* **Matrículas:** Inscrição de alunos em disciplinas específicas dentro de uma grade, com gestão de **Notas** e **Status** (Aprovado, Reprovado, Cursando).

### 4. Módulo Financeiro
* **Boletos:** Geração e controle de mensalidades para os alunos.
* **Status Financeiro:** Controle de boletos "No Prazo", "Vencido", "Pago" ou "Cancelado".

### 5. Portal de Eventos (Página Inicial)
* Página pública (`index.html`) que exibe eventos da escola.
* Sistema de filtragem de eventos (por data, local, tipo).
* Modais informativos com detalhes dos eventos (participantes, imagens, horários).

### 6. Portal do Aluno
* **Perfil:** Visualização de dados cadastrais e alteração de senha.
* **Histórico:** Consulta de notas e status de aprovação por disciplina e semestre.
* **Mensalidades:** Visualização da situação financeira do aluno.

---

## 💻 Detalhes da Interface (Frontend)

O frontend é construído para ser responsivo e interativo:

* **Design:** Utiliza um tema personalizado com cores definidas em variáveis CSS (`--cor-bloco-principal`, `--cor-fundo-pagina`), fontes Google Fonts ("Patrick Hand") e ícones Bootstrap.
* **Interatividade:**
    * Uso extensivo de **Modais** para cadastros e edições, evitando recarregamento de páginas.
    * **Fetch API:** O JavaScript (`/static/js/`) consome os dados dos `RestControllers` para preencher tabelas e dropdowns dinamicamente.
    * **Filtros Dinâmicos:** As tabelas possuem buscas avançadas (por nome, código, email, data) com ordenação (A-Z, Z-A).

## 🔄 Fluxo de Dados Exemplo (Cadastro de Aluno)

1.  O usuário acessa a página de alunos e clica em "Cadastrar".
2.  O modal `modalGerenciarAluno` é aberto via Bootstrap.
3.  Ao preencher e salvar, o `alunos.js` coleta os dados.
4.  Uma requisição `POST` é enviada para `/api/alunos/salvar`.
5.  O `AlunosRestController` recebe o DTO.
6.  O `AlunosService` gera uma matrícula automática, salva o endereço e o aluno no banco via `Repository`.
7.  O frontend recebe o *status 201 (Created)* e atualiza a tabela na tela sem recarregar a página.
