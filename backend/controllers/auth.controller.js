import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UsuarioService from "../database/UsuarioService.js";
import {response,request} from 'express';

export const registro = async (req=request, res=response) => {
    try {
        const { nombre, apellido1, apellido2, email, nick, pass } = req.body;

        if (!nombre || !apellido1 || !email || !nick || !pass) {
            return res.status(400).json({msg: "Faltan datos obligatorios"});
        }

        const hashPass = await bcrypt.hash(pass, 10);

        const emailExiste = await UsuarioService.obtenerUsuarioPorEmail(email);
        if (emailExiste) {
            return res.status(400).json({msg: "El email ya está en uso"});
        }

        const nickExiste = await UsuarioService.obtenerUsuarioPorNick(nick);
        if (nickExiste) {
            return res.status(400).json({msg: "El nick ya está en uso"});
        }

        const nuevoUsuario = await UsuarioService.crearUsuario({
            nombre,
            apellido1,
            apellido2,
            email,
            nick,
            pass: hashPass
        });

        return res.status(201).json({msg: "Usuario registrado exitosamente", usuario: nuevoUsuario});
    } catch (error) {
        return res.status(500).json({msg: "Error en el servidor", error: error.message});
    }
}

export const login = async (req=request, res=response) => {
    try {
        const { email, pass } = req.body;

        if (!email || !pass) {
            return res.status(400).json({msg: "Faltan datos obligatorios"});
        }

        const usuario = await UsuarioService.obtenerUsuarioPorEmail(email);
        if (!usuario) {
            return res.status(401).json({msg: "Credenciales inválidas"});
        }

        const passValida = await bcrypt.compare(pass, usuario.pass);
        if (!passValida) {
            return res.status(401).json({msg: "Credenciales inválidas"});
        }

        const token = jwt.sign(
            { 
                id: usuario.id, 
                email: usuario.email 
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            msg: "Login exitososo", 
            token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                nick: usuario.nick,
                email: usuario.email
            }
        });
    } catch (error) {
        return res.status(500).json({msg: "Error en el servidor", error: error.message});
    }
}