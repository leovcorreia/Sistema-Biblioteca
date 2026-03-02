# Sistema-Biblioteca

# Sobre o projeto

Desenvolvimento de uma **aplicação web full-stack** de gestão de biblioteca que permita o cadastro de livros, usuários, empréstimos, devoluções, forneça recomendações de livros e funcionalidade de busca de livros pela API do Google Books. 

<!-- ## Layout web -->

# Modelagem do banco de dados 
![Modelo Conceitual](https://github.com/leovcorreia/assets/blob/main/modelagem-biblioteca.jpeg)

A modelagem do campo "categoria" foi implementada como atributo simples na entidade Livro para manter o escopo do projeto focado nas regras principais de empréstimo e relacionamento entre as entidades. Seria recomendável modelar Categoria como entidade própria, permitindo maior flexibilidade.

# Tecnologias utilizadas
## Back end
- Java
- Spring Boot
- JPA / Hibernate
- Maven
## Front end
- HTML / CSS / JavaScript / TypeScript
- React
## Banco de dados
- PostgreSQL
## Tools
- Docker
- Testes Unitários (JUnit, Mockito)
- Lombok

# Como executar o projeto

## 1) Clone o repositório
```bash
# clonar repositório
git clone [git@github.com:leovcorreia/Sistema-Biblioteca.git](https://github.com/leovcorreia/Sistema-Biblioteca.git)
cd Sistema-Biblioteca
```

## 2) Configurar banco de dados
Suba os containers Docker
```bash
cd backend
docker-compose up -d
```
Acesse o PgAdmin em: http://localhost:5050. As credenciais de acesso estão no arquivo docker-compose.yml.

Crie um banco chamado **mydatabase**.

## 3) Rodar backend
Pré-requisitos: Java 17

```bash
cd backend
./mvnw spring-boot:run
```

## 4) Rodar frontend

Pré-requisitos: npm / yarn

```bash
cd frontend

# instalar dependências
yarn install

# executar o projeto
yarn dev
```

Frontend fica disponível para acessar em: http://localhost:5173

# Autor

Leonardo Venâncio Correia

Linkedin: https://www.linkedin.com/in/leovcorreia/

Email: leonardovenanciocorreia@gmail.com

