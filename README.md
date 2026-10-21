# Bot Ranking Discord

Bot para Discord desenvolvido com **TypeScript**, **Discord.js** e **PostgreSQL**, com sistema de XP, desafios de adição e ranking de usuários.

> **Status:** Em desenvolvimento.

## Funcionalidades

- **Sistema de XP:** experiência recebida por vitórias e derrotas.
- **Desafios:** perguntas simples de adição com respostas por botões.
- **Ranking:** classificação dos usuários por experiência.
- **Perfil:** consulta das informações dos usuários.
- **Configuração de XP:** administradores podem definir a quantidade de XP recebida por vitória e derrota.

## Tecnologias

- TypeScript
- Discord.js
- Node.js
- PostgreSQL

## Requisitos

- Node.js e npm instalados.
- Uma aplicação criada no [Discord Developer Portal](https://discord.com/developers/applications).
- Uma instância do PostgreSQL.
- Git.

## Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/Apolo0013/Bot-Ranking-Discord.git
```

### 2. Entre na pasta do projeto

```bash
cd Bot-Ranking-Discord
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto, no mesmo nível do `package.json`.

Adicione as seguintes variáveis:

```env
DISCORD_TOKEN=seu_token_do_bot
CLIENT_ID=id_da_aplicacao_do_bot
GUILD_ID=id_do_servidor
DB_PASSWORD=sua_senha_postgresql
```

**Como preencher:**

- `DISCORD_TOKEN`: token do seu bot, disponível no Discord Developer Portal.
- `CLIENT_ID`: ID da aplicação do bot que você criou.
- `GUILD_ID`: ID do servidor Discord em que deseja utilizar o bot. Ative o modo desenvolvedor do Discord, clique com o botão direito no servidor e selecione **Copiar ID do servidor**.
- `DB_PASSWORD`: senha do usuário utilizado para conectar ao PostgreSQL.

Para utilizar outro bot ou servidor, basta configurar os respectivos IDs no arquivo `.env`.

**Importante:** não compartilhe seu token nem sua senha do banco de dados. O arquivo `.env` deve permanecer privado e não deve ser enviado ao GitHub.

### 5. Execute o projeto

Para iniciar o bot em modo de desenvolvimento, execute:

```bash
npm run dev
```

## Estrutura do projeto

```text
src/
├── commands/    # Comandos do bot
├── components/  # Componentes de interface
├── config/      # Configurações
├── data-base/   # Conexão com o banco de dados
├── events/      # Eventos do Discord
├── handlers/    # Tratamento das interações
├── repository/  # Acesso e persistência dos dados
├── services/    # Regras de negócio
└── index.ts     # Ponto de entrada
```

## Banco de dados

O projeto utiliza PostgreSQL para armazenar os dados relacionados ao sistema de XP e ao ranking.

## Objetivos de aprendizado

Este projeto também serve como prática de:

- Organização de código com TypeScript.
- Desenvolvimento de bots com Discord.js.
- Separação de responsabilidades entre handlers, serviços e repositórios.
- Integração com PostgreSQL.
- Programação assíncrona com `async/await`.

## Autor

**Apolo**

GitHub: [@Apolo0013](https://github.com/Apolo0013)
