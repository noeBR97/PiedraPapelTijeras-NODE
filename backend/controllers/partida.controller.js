import PartidaService from "../database/PartidaService.js";
import {response,request} from 'express';

export const crearPartida =  async (req=request, res=response) => {
    try {
        const { tipo } = req.body;
        const idCreador = req.user.id;

        if (!['humano', 'maquina'].includes(tipo)) {
            return res.status(400).json({ msg: 'Tipo de partida inválido' });
        }

        const partidaAbierta = await PartidaService.usuariosEnPartida(idCreador);
        if(partidaAbierta){
            return res.status(400).json({msg: 'Ya tienes una partida en curso o en espera'});
        }

        const partida =  await PartidaService.crearPartida(tipo, idCreador);
        res.status(201).json({
            msg: 'Partida creada exitosamente',
            partida
        });
    } catch (error) {
        res.status(500).json({msg: 'Error al crear la partida', error: error.message});
    }
}

export const listarPartidasDisponibles = async (req=request, res=response) => {
    try {
        const idUsuario = req.user.id;
        const partidas = await PartidaService.partidasDisponibles(idUsuario);
        res.status(200).json(partidas);
    } catch (error) {
        res.status(500).json({msg: 'Error al listar las partidas disponibles', error: error.message});
    }
}

export const unirseAPartida = async (req=request, res=response) => {
    try {
        const { idPartida } = req.params;
        const idUsuario = req.user.id;

        const partida = await PartidaService.unirseAPartida(idPartida, idUsuario);

        res.status(200).json({
            msg: 'Te has unido a la partida exitosamente',
            partida
        });
    } catch (error) {
        res.status(500).json({msg: 'Error al unirse a la partida', error: error.message});
    }
}

export const cancelarPartida = async (req=request, res=response) => {
    try {
        const {idPartida} = req.params;
        const idUsuario = req.user.id;
        const partida = await PartidaService.cancelarPartida(idPartida, idUsuario);

        res.status(200).json({
            msg: 'Partida cancelada exitosamente',
            partida
        });
    } catch (error) {
        res.status(400).json({msg: 'Error al cancelar la partida', error: error.message});
    }
}

export const obtenerPartida = async (req=request, res=response) => {
    try {
        const { idPartida } = req.params;
        const partida = await PartidaService.obtenerPartida(idPartida);
        if (!partida) {
            return res.status(404).json({ msg: 'Partida no encontrada' });
        }
        res.status(200).json(partida);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener la partida', error: error.message });
    }
}