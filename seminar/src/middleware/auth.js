const authMiddleware = (req, res, next) => {
    if (req.body.name === process.env.API_NAME&&req.body.pwd===process.env.API_PWD) {
        console.log("[AUTH-MIDDLEWARE] Authorized User");
        next();
    }
    else {
        console.log("[AUTH-MIDDLEWARE] Not Authorized User");
        res.status(401).json({ error: "Not Authorized" });
    }
}

module.exports = authMiddleware;