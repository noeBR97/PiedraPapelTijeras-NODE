import {Op} from 'sequelize';
import Partida from '../models/Partida.js';

class PartidaService {
    async crearPartida(tipo, idCreador) {
        return await Partida.create({
            tipo,
            estado: tipo === 'maquina' ? 'en_progreso' : 'espera',
            idCreador
        });
    }

    async usuariosEnPartida(idUsuario) {
        return await Partida.findOne({
            where: {
                estado: { [Op.in]: ['espera', 'en_progreso'] },
                [Op.or]: [
                    { idCreador: idUsuario },
                    { idRival: idUsuario }
                ]
            }
        })
    }

    async partidasDisponibles(idUsuario) {
        return await Partida.findAll({
            where: {
                tipo: 'humano',
                estado: 'espera',
                idCreador: {[Op.ne]: idUsuario}
            }
        });
    }

    async unirseAPartida(idPartida, idUsuario) {
        const partida = await Partida.findByPk(idPartida);

        if(!partida){
            throw new Error('Partida no encontrada');
        }

        if(partida.estado !== 'espera'){
            throw new Error('La partida no está disponible para unirse');
        }

        if (partida.tipo !== 'humano') {
            throw new Error('No se puede unir a una partida contra la máquina');
        }

        if (partida.idCreador === idUsuario) {
            throw new Error('No puedes unirte a tu propia partida');
        }

        partida.idRival = idUsuario;
        partida.estado = 'en_progreso';
        await partida.save();
        return partida;
    }

    async cancelarPartida(idPartida, idUsuario) {
        const partida = await Partida.findByPk(idPartida);
        if (!partida) {
            throw new Error('Partida no encontrada');
        }

        if (partida.idCreador !== idUsuario) {
            throw new Error('No tienes permiso para cancelar esta partida');
        }
        
        if (partida.estado !== 'espera') {
            throw new Error('Solo se pueden cancelar partidas en espera');
        }
        partida.estado = 'finalizada';
        await partida.save();
        return partida;
    }

    async obtenerPartida(idPartida) {
        return await Partida.findByPk(idPartida);
    }
}

export default new PartidaService();