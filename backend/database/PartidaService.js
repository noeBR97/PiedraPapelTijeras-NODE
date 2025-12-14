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

    async jugarRonda(idPartida, idUsuario, eleccion) {
        const partida = await Partida.findByPk(idPartida);
        if (!partida) {
            throw new Error('Partida no encontrada');
        }

        if (partida.estado !== 'en_progreso') {
            throw new Error('La partida no está en progreso');
        }

        const esCreador = partida.idCreador === idUsuario;
        const esRival = partida.idRival === idUsuario;

        if (!esCreador && !esRival) {
            throw new Error('No estás participando en esta partida');
        }

        if (esCreador) {
            partida.eleccionCreador = eleccion;
        } 

        if (esRival) {
            partida.eleccionRival = eleccion;
        }

        if (partida.eleccionCreador && partida.eleccionRival) {
            const ganador = resolverRonda(partida.eleccionCreador, partida.eleccionRival);

            if (ganador === 'creador') {
                partida.victoriasCreador += 1;
            } 

            if (ganador === 'rival') {
                partida.victoriasRival += 1;
            }

            partida.eleccionCreador = null;
            partida.eleccionRival = null;

            if (partida.victoriasCreador === 3) {
                partida.estado = 'finalizada';
                partida.idGanador = partida.idCreador;
            }
        }
        await partida.save();
        return partida;
    }
}

function resolverRonda(eleccionCreador, eleccionRival) {
    if (eleccionCreador === eleccionRival) {
        return 'empate';
    }
    if (
        (eleccionCreador === 'piedra' && eleccionRival === 'tijeras') ||
        (eleccionCreador === 'papel' && eleccionRival === 'piedra') ||
        (eleccionCreador === 'tijeras' && eleccionRival === 'papel')
    ) {
        return 'creador';
    }
    return 'rival';
}

export default new PartidaService();