import {Router} from 'express';
import {crearPartida, listarPartidasDisponibles, unirseAPartida, cancelarPartida} from '../controllers/partida.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware, crearPartida);
router.get('/', authMiddleware, listarPartidasDisponibles);
router.post('/:idPartida/unirse', authMiddleware, unirseAPartida);
router.post('/:idPartida/cancelar', authMiddleware, cancelarPartida);

export default router;