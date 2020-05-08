const { createPool } = require("mysql");
const pool = createPool({
    port: 3306,
    host: "localhost",
    user: "camille",
    password: "password",
    database: "api",
    connectionLimit: 10,
});

module.exports = pool;