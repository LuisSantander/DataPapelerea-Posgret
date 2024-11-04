const promise = require("bluebird");
const options = {
  promiseLib: promise,
  query: (e) => {},
};

const pgp = require("pg-promise")(options);
const types = pgp.pg.types;
types.setTypeParser(1114, function (stringValue) {
  return stringValue;
});
//LOCAL
/*
const databaseConfig = {
  host: "127.0.0.1",
  port: 5432,
  database: "bddatabase",
  user: "postgres",
  password: "lsmSantander76",
};*/

//PRODUCCION
const databaseConfig = {
  host: "dpg-csjvfa0gph6c73a5t15g-a",
  port: 5432,
  database: "bdpapeler",
  user: "bdpapelera_user",
  password: "FiHatUBMC2MVtQtfG7eb4VMzH2ZSSe6H",
};

const db = pgp(databaseConfig);
module.exports = db;
