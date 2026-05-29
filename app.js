import 'dotenv/config';
import express from 'express';
import authRouter from './routes/auth.js';
import pagesRouter from './routes/pages.js';
import { connectDatabase } from './models/index.js';

// CONSTANTES
const PORT = process.env.PORT;

const app = express();

//pug
app.set('view engine', 'pug');
app.set('views', './views');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// RUTAS
app.use('/auth', authRouter);
app.use('/pages', pagesRouter);


// CONEXION A BD
connectDatabase()
  .then(() => {
    app.listen(PORT, (err) => {
      if(err) {
        console.error('Error al iniciar el servidor:', err);
        return;
      }
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error sincronizando con bd:', err)
  })
