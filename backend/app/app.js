import { Server } from './server.js';
import 'dotenv/config';

//Lanzamos el servidor.
const server = new Server();
server.listen();