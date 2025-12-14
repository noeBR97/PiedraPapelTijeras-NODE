import {Router} from 'express';
import {crearPartida, listarPartidasDisponibles, unirseAPartida, cancelarPartida, obtenerPartida, jugarRonda} from '../controllers/partida.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware, crearPartida);
router.get('/', authMiddleware, listarPartidasDisponibles);
router.post('/:idPartida/unirse', authMiddleware, unirseAPartida);
router.post('/:idPartida/cancelar', authMiddleware, cancelarPartida);
router.get('/:idPartida', authMiddleware, obtenerPartida);
router.post('/:idPartida/jugada', authMiddleware, jugarRonda);

export default router;