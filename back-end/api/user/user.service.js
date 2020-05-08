const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(`INSERT INTO users (prenom, nom, sexe, email, password, tel) VALUES (?, ?, ?, ?, ?, ?)`,
            [
                data.prenom,
                data.nom,
                data.sexe,
                data.email,
                data.password,
                data.tel
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
};