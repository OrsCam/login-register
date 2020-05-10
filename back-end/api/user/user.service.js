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
    getAllUsers: (callBack) => {
        pool.query(`SELECT id, prenom, nom, sexe, email, password, tel FROM users`, [], (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    getUserById: (id, callBack) => {
        pool.query(`SELECT id, prenom, nom, sexe, email, password, tel FROM users WHERE id = ?`, [id], (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
    getUserByEmail: (email, callBack) => {
        pool.query(`SELECT id, prenom, nom, sexe, email, password, tel FROM users WHERE email = ?`, [email], (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
    updateUser: (data, callBack) => {
        pool.query(
            `UPDATE users SET prenom = ?, nom = ?, sexe = ?, email = ?, password = ?, tel = ? WHERE id = ?`,
            [
                data.prenom,
                data.nom,
                data.sexe,
                data.email,
                data.password,
                data.tel,
                data.id,
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