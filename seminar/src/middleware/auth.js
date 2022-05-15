const AccountModel = require("../models/account");

const authMiddleware = async(req, res, next) => {
    const res1 = await AccountModel.findOne({Name: req.body.name, Pwd: req.body.pwd});
    if (res1!==null) {
        console.log("[AUTH-MIDDLEWARE] Authorized User");
        next();
    }
    else {
        console.log("[AUTH-MIDDLEWARE] Not Authorized User");
        res.status(401).json({ error: "Not Authorized" });
    }
}

module.exports = authMiddleware;