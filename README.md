# Projeto de Cadastro e Listagem de Estoque

Este é um projeto simples, porém funcional, desenvolvido com **Next.js** para front-end e back-end, **Prisma** para gerenciamento do banco de dados e **MySQL** como banco de dados. O armazenamento das imagens é feito utilizando o **Cloudinary**. O projeto também utiliza **TypeScript** para maior segurança no código e **Tailwind CSS** para estilização.

## Funcionalidades

- **Cadastro de Produtos:**
  - Permite cadastrar itens no estoque com os seguintes campos:
    - Nome
    - Imagem
    - Valor
    - Código
- **Listagem de Produtos:**
  - Exibe a lista de produtos cadastrados.
  - Possibilidade de pesquisar produtos por nome.

## Tecnologias Utilizadas

### Front-end e Back-end
- [Next.js](https://nextjs.org/): Framework React para desenvolvimento web full-stack.
- [TypeScript](https://www.typescriptlang.org/): Superset do JavaScript que adiciona tipagem estática.

### Banco de Dados
- [Prisma](https://www.prisma.io/): ORM para gerenciar e acessar o banco de dados.
- [MySQL](https://www.mysql.com/): Banco de dados relacional.

### Estilização
- [Tailwind CSS](https://tailwindcss.com/): Framework utilitário para estilização rápida e moderna.

### Salvar imagens
- [Cloudinary](https://cloudinary.com/): Site gŕatis para armazenamento de imagens.


## Estrutura do Projeto

O projeto foi estruturado de forma a dividir responsabilidades entre front-end e back-end:

- **Front-end:**
  - Componentes React para renderizar a interface do usuário.
  - Rotas do Next.js para navegação.

- **Back-end:**
  - API routes do Next.js para lidar com requisições de cadastro e listagem.
  - Prisma para interagir com o banco de dados.

## Como Rodar o Projeto

### Pré-requisitos

- Node.js (v14 ou superior)
- MySQL configurado e rodando
- Conta no Firebase para configurar o Storage

### Passo a Passo

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o Prisma:
   - Edite o arquivo `.env` com as credenciais do seu banco MySQL:
     ```env
     DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
     ```
4. Configure o next config:   
   ```
   images: {
      domains: ['res.cloudinary.com']
  }
   ```: 
5. Configure o cloudinary:
   - Adicione as credenciais do Cloudinary no arquivo `.env`:
     ```env
      NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=seu-preset
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=seu-cloud-name
      CLOUDINARY_API_KEY=sua-api-key
      CLOUDINARY_API_SECRET=sua-api-secret
     ```

6. Realize as migrações do banco:
   ```bash
   npx prisma migrate dev
   ```

7. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

8. Acesse o projeto no navegador:
   - Abra [http://localhost:3000](http://localhost:3000)

## Melhorias Futuras

- ✅ Adicionar paginação na listagem de produtos.
- ✅ adicionar uma função que filtra os produtos por nome.
- Adicionar uma página onde o user pode editar um produto (podendo filtrar os produtos para uma melhor experiência de usuário) .
- Adicionar autenticação para controlar acesso ao sistema (cliente e admin).

---

Feito com ❤️ por [Pedro].
