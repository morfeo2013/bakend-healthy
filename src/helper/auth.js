const Auth = {};
const jwt = require("jsonwebtoken");

Auth.verificartoken = (req, res, next) => {
/* try {
    
} catch (error) {
    
} */

if (!req.headers.autorizacion) {
    console.log("No estas autorizado token erroneo o en blanco")
    /* console.log(req.headers.autorizacion) */
    return res.json({
    mensage: "No estas autorizado token erroneo o en blanco",

    });
   
}
const token = req.headers.autorizacion.split(" ")[1];

console.log(token)
jwt.verify(token, "lol", (error, payload) => {
    if (error) {
        console.log("No estas autorizado token caduco")
    return res.json({
        mensage: "Error de identificacion por token errado",
    });
    }
    console.log("token valido")
    req.userid = payload._id;
    next();
});
};

module.exports = Auth;
