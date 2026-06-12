import 'dotenv/config';
import express from 'express';
import path from "path";
import session from "express-session";
import { connectDatabase } from './models/index.js';
import authRoutes from "./routes/auth.routes.js";
import homeRoutes from "./routes/home.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import followRoutes from "./routes/follow.routes.js";
import searchRoutes from "./routes/search.routes.js";
import ratingRoutes from "./routes/rating.routes.js";
import { seedUsers } from "./seeders/users.seed.js";




// CONSTANTES
const PORT = process.env.PORT;

const app = express();

//pug
// motor pug
app.set('view engine', 'pug');
// carpeta views
app.set('views', './views');

// MIDDLEWARES
// carpeta public
app.use(express.static('public'));
// leer json
app.use(express.json());
// leer formularios
app.use(express.urlencoded({ extended: true }));

// sesiones 

app.use(
  session({

    // clave secreta
    secret: process.env.SESSION_SECRET,

    // evita crear sesiones vacías
    saveUninitialized:false,

    // evita guardar si no cambió
    resave:false,

    cookie: {
      secure:false,

      // duración de cookie
      maxAge:
        1000 * 60 * 60 * 24,
    },
  })
)


// RUTAS
app.use("/auth", authRoutes);
app.use("/", homeRoutes);
app.use("/perfil", profileRoutes);
app.use("/publicaciones", postRoutes);
app.use("/comentarios", commentRoutes);
app.use("/seguir", followRoutes);
app.use("/buscar", searchRoutes);
app.use("/valoraciones", ratingRoutes);
app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario;
  next();
});

await seedUsers();

// CONEXION A BD
connectDatabase()
  .then(() => {
    app.listen(PORT, (err) => {
      if (err) {
        console.error('Error al iniciar el servidor:', err);
        return;
      }
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error sincronizando con bd:', err)
  })
