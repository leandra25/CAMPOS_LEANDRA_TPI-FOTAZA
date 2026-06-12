export function isAuthenticated(req, res, next) {
    

    if (!req.session.usuario) {
        return res.render("auth/login", {
            title: "Login",
            usuario: null,
            error: "Tu sesión ha expirado. Inicia sesión nuevamente."
        });
    }

    next();
}