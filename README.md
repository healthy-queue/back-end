<h1 align="center">Welcome to healthy-queue-backend 👋</h1>

<p>
  <a href="https://github.com/healthy-queue/Documentation" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
</p>

> backend server for the healthy-queue application

### 🏠 [Homepage](https://github.com/healthy-queue)

### ✨ [Heroku Server](https://healthy-queue-test.herokuapp.com/)

## Routes

Test Route

|   Action    |  HTTP Method  |      Resource     |    Response     |
|-------------|:-------------:|:------------------|:---------------:|
|   READ      |      GET      | /welcome          | message         |

Patient Routes
|   Action    |  HTTP Method  |      Resource     |    Response      |
|:------------|:--------------|:------------------|:----------------:|
|  READ ALL   |      GET      | /patients         | all records      |
|  READ ONE   |      GET      | /patients/:uuid   | one record       |
|  CREATE ONE |      POST     | /patients         | create one record|
|  UPDATE ONE |      PUT      | /patients/:uuid   | update one record|
|  DELETE ONE |      DELETE   | /patients/:uuid   | delete one record|

## Tables

Patient

| id (uuid) | priority (int) | isQueued (bool) |  time_entered (bigint) | createdAt (date) | updatedAt (date) |
|:---------:|:--------------:|:---------------:|:----------------------:|:----------------:|:----------------:|

Patient_Info
| id (uuid) | name (int) | DOB (bool) |  patient_id  | createdAt (date) | updatedAt (date) |
|:---------:|:----------:|:----------:|:------------:|:----------------:|:----------------:|

### Install

```sh
npm install
```

#### Usage

Starting up our dev environment
`npm run dev` run a local development environment on your machine

Setup your env variables
`touch .env`

```.env
CORS_ORIGIN=http://localhost:3001
DEV_DB_USERNAME=
DEV_DB_PASSWORD=
DATABASE_URL=postgres://localhost:5432/healthyq
PORT=3001
IO_PORT=8000
```

Preparing our Database with a Patients Table
`npm run db:create` create a database called `healthyq`

Querying our Database

... WIP

#### Run Unit Testing

```sh
npm run test
```

## Author

* Github: [@antoni909](https://github.com/antoni909)
* Github: [@jeremywbrazell](https://github.com/jeremywbrazell)
* Github: [@ag961](https://github.com/ag961)
* Github: [@MuckT](https://github.com/MuckT)

### 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/healthy-queue/back-end/issues)

### Resources

[sequelize-cli](https://sequelize.org/master/)

### Sources

[Regex for Email Address](https://handyopinion.com/utility-method-to-get-all-email-addresses-from-a-string-in-java/)

[How to Mock process.env in Jest](https://www.webtips.dev/how-to-mock-processenv-in-jest)

[Queue – Linked List Implementation](https://www.geeksforgeeks.org/queue-linked-list-implementation/)

[Integrate Socket.IO with Node.Js + Express](https://medium.com/@raj_36650/integrate-socket-io-with-node-js-express-2292ca13d891)

[How to pass socket.io to express routes in files?](https://aaryanadil.com/pass-socket-io-to-express-routes-in-files)

[500 Error Handler](https://expressjs.com/en/guide/error-handling.html)
