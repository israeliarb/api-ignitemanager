# README - Ignite Manager App
Este repositório contém a API e o aplicativo Flutter para o Ignite Manager, uma aplicação de gerenciamento desenvolvida para facilitar a gestão de projetos. Siga as instruções abaixo para configurar e executar o projeto em seu ambiente local.

## Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas em seu sistema:

Docker
Node.js
Flutter

### Passos para Execução do Projeto

1. Clonar o Repositório

2. Iniciar a API e o Banco de Dados
No diretório da API, execute o seguinte comando para iniciar os containers Docker:
```
docker-compose up -d
```

3. Acessar o Terminal do Docker da API
Após subir os containers, acesse o terminal do Docker da API com o seguinte comando:
```
docker exec -it api-ignitemanager-app-1 bash
```
5. Executar Migrações e Seed
Dentro do terminal da API, execute os seguintes comandos para realizar as migrações e o seed do banco de dados:
```
node ace migration:fresh
node ace db:seed
```
6. Configurar Endereço da API no Aplicativo Flutter
No arquivo do aplicativo Flutter, localize o arquivo lib/api/api_config.dart e ajuste o endereço da API conforme necessário.

7. Executar o Aplicativo Flutter
Certifique-se de ter um emulador configurado e em execução. No diretório do aplicativo Flutter, execute o seguinte comando:
```
flutter run
```
Isso iniciará o aplicativo Flutter no emulador configurado, conectando-se à API local.

### Configuração do Arquivo .env da API

O arquivo .env da API contém as configurações de conexão com o banco de dados. Verifique e ajuste conforme necessário:

```
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=iJhZJ4Td_oQS2Ih3GgtjvIcnPznkE7N-
DRIVE_DISK=local
DB_CONNECTION=pg
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=password
PG_DB_NAME=ignitemanager_db
```
Certifique-se de que as configurações estejam corretas para garantir uma conexão bem-sucedida com o banco de dados PostgreSQL.

Agora você deve ter o Ignite Manager App funcionando localmente em seu ambiente de desenvolvimento. Se encontrar algum problema, verifique as mensagens de erro e certifique-se de que todas as etapas foram seguidas corretamente.
