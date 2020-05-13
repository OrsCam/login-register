const { create, getAllUsers, getUserById, getUserByEmail, updateUser, } = require("./user.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;

        getUserByEmail(body.email, (err, results) => {
            if (err) {
                return;
            }
            if (results) {
                return res.json({
                    success: 0,
                    message: "Cette adresse est déjà utilisée par un autre utilisateur.",
                });
            } else {
                if (body.prenom && body.nom && body.password && body.email) {
                    const salt = genSaltSync(10);
                    body.password = hashSync(body.password, salt);
                    create(body, (err, results) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({
                                success: 0,
                                message: "Echec de l'inscription",
                            });
                        }
                        return res.status(200).json({
                            success: 1,
                            data: results,
                        });
                    });
                }
            }
        });
    },
    findUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if (err) {
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "User introuvable."
                })
            }
        })
    },
    findAllUsers: (req, res) => {
        getAllUsers((err, results) => {
            if (err) {
                return;
            }
            return res.json({
                success: 1,
                data: results,
            })
        })
    },
    updated: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Echec lors de la modification",
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Modifications effectuées avec succès",
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
            if (err) {
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Merci de vérifier vos informations de connexion",
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, process.env.SECRET_KEY, {
                    expiresIn: "1h",
                });
                return res.json({
                    success: 1,
                    message: "Authentification réussie",
                    token: jsontoken,
                });
            } else {
                return res.json({
                    success: 0,
                    message: "Echec de l'authentification",
                });
            }
        });
    }
};


