import bcrypt from "bcrypt";
import { z,ZodError } from "zod";
import { Usuario } from "../models/index.js";

// Validaciones Zod 
const registerSchema = z.object({
    username: z.string().min(3).max(30),
    firstname: z.string().min(2),
    lastname: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export function renderRegister(req, res) {
    res.render("auth/register", { title: "Registro", usuario: null });
}

export async function register(req, res) {
    try {
        const data = registerSchema.parse(req.body);

        const existeUsuario = await Usuario.findOne({
            where: { email: data.email }
        });

        if (existeUsuario) {
            return res.send("El email ya está registrado");
        }

        const passwordHash = await bcrypt.hash(data.password, 10);

        const usuario = await Usuario.create({
            username: data.username,
            email: data.email,
            password_hash: passwordHash,
            firstname: data.firstname, 
            lastname: data.lastname,   
            id_rol: 1,
            estado_cuenta: "ACTIVA"
        });

        req.session.usuario = {
            id_usuario: usuario.id_usuario,
            username: usuario.username
        };

        // FORZAR GUARDADO DE SESIÓN
        req.session.save((err) => {
            if (err) {
                console.error("Error al guardar sesión en registro:", err);
                return res.status(500).render("pages/500");
            }
            res.redirect("/");
        });

    } catch (error) {
        console.error("ERROR REGISTER:", error);
        res.status(500).render("pages/500");
    }
}

export function renderLogin(req, res) {
    res.render("auth/login", { title: "Login", usuario: null });
}

export async function login(req, res) {
    try {
      
        const data = loginSchema.parse(req.body);

        const usuario = await Usuario.findOne({
            where: { email: data.email }
        });

        if (!usuario) {
            return res.render("auth/login", {
                title: "Login",
                error: "Email o contraseña incorrectos",
                usuario: null
            });
        }

        const passwordOk = await bcrypt.compare(
            data.password,
            usuario.password_hash
        );

        if (!passwordOk) {
            return res.render("auth/login", {
                title: "Login",
                error: "Email o contraseña incorrectos",
                usuario: null
            });
        }

        req.session.usuario = {
            id_usuario: usuario.id_usuario,
            username: usuario.username
        };

        req.session.save((err) => {
            if (err) {
                console.error("Error al guardar sesión:", err);
                return res.status(500).render("pages/500");
            }

            res.redirect("/");
        });

    } catch (error) {

    if (error instanceof ZodError) {
        return res.render("auth/login", {
            title: "Login",
            usuario: null,
            error: "Ingrese un correo electrónico válido"
        });
    }

    console.error("ERROR LOGIN:", error);
    res.status(500).render("pages/500");
}
}

export function logout(req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error al destruir sesión:", err);
        }
        res.redirect("/auth/login");
    });
}