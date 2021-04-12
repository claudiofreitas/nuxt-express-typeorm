# nuxt-express-typeorm

## Structure

| Codebase             |      Description      |
| :------------------- | :-------------------: |
| [client](client)     |     Nuxt frontend     |
| [server](server)     | REST API with TypeORM |

## Prerequisite

The server uses sqlite3 for the database. If the database is not working, please install sqlite3.
```sh
brew install sqlite
```

## Build Setup
```sh
# install dependencies
yarn install

# serve with hot reload
# client: localhost:3000
# server: localhost:5000
yarn dev
```