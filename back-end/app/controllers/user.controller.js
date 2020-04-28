const User = require("../models/user.model.js");

// Create and Save a new User
exports.create = (req, res) => {

};

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a User
    const user = new User({
        prenom: req.body.nom,
        nom: req.body.nom,
        sexe: req.body.sexe,
        email: req.body.email,
        password: req.body.password,
        tel: req.body.tel
    });

    // Save User in the database
    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Customer."
            });
        else res.send(data);
    });
};