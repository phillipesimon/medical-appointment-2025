# API com Express e TypeScript

Este é um projeto de construção de uma API RESTful utilizando **Node.js**, **Express** e **TypeScript**.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de execução JavaScript no lado do servidor.
- **Express**: Framework web para construção de APIs.
- **TypeScript**: Superset do JavaScript com tipagem estática.
- **Nodemon**: Ferramenta para reiniciar automaticamente o servidor durante o desenvolvimento.
- **ts-node**: Executa arquivos TypeScript diretamente.

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm (gerenciador de pacotes do Node.js)

## Instalação

Siga os passos abaixo para configurar o projeto localmente:

1. **Instale as dependências**:
   Execute o seguinte comando para instalar todas as dependências necessárias:

   ```bash
   npm init -y && npm i express && npm i --save-dev @types/express typescript ts-node nodemon && npx tsc --init
   ```

2. **Estrutura do projeto**:
   Crie a seguinte estrutura de diretórios:

   ```
   ├── node_modules/
   ├── src/
   │   └── server.ts
   ├── package.json
   ├── tsconfig.json
   ├── nodemon.json
   ├── README.md
   ```

3. **Configure o `tsconfig.json`**:
   Certifique-se de que o arquivo `tsconfig.json` contém as configurações básicas:
   ```json
   {
     "compilerOptions": {
       "target": "es6",
       "module": "commonjs",
       "strict": true,
       "esModuleInterop": true,
       "skipLibCheck": true,
       "forceConsistentCasingInFileNames": true,
       "outDir": "./dist",
       "rootDir": "./src"
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules"]
   }
   ```
4. **Configure o `nodemon.json`**:
   Crie um arquivo `nodemon.json` na raiz do projeto para configurar o `nodemon`:

   ```json
   {
     "watch": ["src"],
     "ext": "ts",
     "exec": "ts-node ./src/server.ts"
   }
   ```

5. **Adicione o script de inicialização**:
   No arquivo `package.json`, adicione o seguinte script:
   ```json
   "scripts": {
     "dev": "nodemon src/server.ts"
   }
   ```

## Como Executar

1. **Inicie o servidor**:

   ```bash
   npm start
   ```

   O servidor será iniciado na porta 3000 (ou outra porta configurada). Acesse `http://localhost:3000` para testar.

2. **Exemplo de endpoint**:
   O projeto inclui um endpoint inicial em `src/index.ts`:

   ```typescript
   import express from "express";

   const app = express();

   app.get("/", (request, response) => {
     return response.send("Hello, World!");
   });

   app.listen(3000, () => {
     console.log("Server is running on port 3000");
   });
   ```

## Estrutura do Projeto

- **`src/`**: Contém os arquivos TypeScript, incluindo o ponto de entrada `server.ts`.
- **`tsconfig.json`**: Configurações do TypeScript.
- **`nodemon.json`**: Configurações do Nodemon para reinicialização automática.
- **`package.json`**: Contém as dependências e scripts do projeto.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
