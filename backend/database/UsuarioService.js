import Usuario from "../models/Usuario.js";

class UsuarioService {
    async crearUsuario(data) {
        return await Usuario.create(data);
    }

    async obtenerUsuarioPorEmail(email) {
        return await Usuario.findOne({ where: { email } });
    }

    async obtenerUsuarioPorNick(nick) {
        return await Usuario.findOne({ where: { nick } });
    }
}

export default new UsuarioService();