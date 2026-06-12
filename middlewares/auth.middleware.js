export function isAuthenticated(req, res, next) {
    console.log("SESSION CHECK:", req.session.usuario);

    if (!req.session.usuario) {
        return res.render("/auth/login", {
            title: "Login",
            usuario: null,
            error: "Tu sesión ha expirado. Inicia sesión nuevamente."
        });
    }

    next();
}