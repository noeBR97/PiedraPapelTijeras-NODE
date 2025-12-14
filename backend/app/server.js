import express from 'express';
import cors from 'cors';
import userRoutes from '../routes/auth.routes.js';
import partidaRoutes from '../routes/partida.routes.js';
import kleur from 'kleur';


class Server {

    constructor() {
        this.app = express();
        this.authPath = '/api/auth';
        this.partidasPath = '/api/partidas';

        //Middlewares
        this.middlewares();

        this.routes();
        
    }

    middlewares() {
        //En esta sección cargamos una serie de herramientas necesarias para todas las rutas.
        //Para los middlewares como estamos acostumbrados a usarlos en Laravel ver userRoutes y userMiddlewares.
        //Para cors
        this.app.use(cors());
        //Para poder recibir la información que venga del body y parsearla de JSON, necesitamos importar lo siguiente.
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.authPath, userRoutes);
        this.app.use(this.partidasPath, partidaRoutes);
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(kleur.green().bold(`🟢 Servidor escuchando en: ${process.env.PORT}`));
        })
    }
}

export {Server};