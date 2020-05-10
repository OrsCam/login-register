const { verify } = require("jsonwebtoken");
module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("Authorization");
        if (token) {
            token = token.slice(7);
            verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    res.json({
                        success: 0,
                        message: "Token non valide",
                    });
                } else {
                    next();
                }
            });
        } else {
            res.json({
                sucess: 0,
                message: "Accès non autorisé",
            });
        }
    },
};
