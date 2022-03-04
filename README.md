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

| id (uuid) | priority (int) | time_entered (bigint) | createdAt (date) | updatedAt (date) |
|:---------:|:--------------:|:-------------------:|:----------------:|:----------------:|

### Resources

[sequelize-cli](https://sequelize.org/master/)

### Attributions

Express [500 Error Handler](https://expressjs.com/en/guide/error-handling.html)

### Install

```sh
npm install
```

#### Usage

Starting up our dev environment
`npm run dev` run a local development environment on your machine

Setup your env variables
`touch .env`

CORS_ORIGIN=
DATABASE_URL=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
DB_HOST=
DB_DIALECT=
DB_TEST_USERNAME=
DB_TEST_PASSWORD=
DB_TEST_DATABASE=
DB_TEST_HOST=
DB_TEST_DIALECT=
PORT=

Preparing our Database with a Patients Table
`npm run db:create` create a database called healthyq
`npm run mig:all`  run all available migrations and create patient table in the db
`npm run seed:dummy` add dummy patient into db patient table

...if you have to undo a migration or seed file or check the state of a migration
`npm run mig:stat` check current available migrations, up/down state
`npm run mig:undo` undo last migration
`npm run seed:undo` undo the current seed

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

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
