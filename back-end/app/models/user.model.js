const sql = require("./db.js");

// constructor
const User = function (user) {
    this.prenom = user.prenom;
    this.nom = user.nom;
    this.sexe = user.sexe;
    this.email = user.email;
    this.password = user.password;
    this.tel = user.tel;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

module.exports = User;