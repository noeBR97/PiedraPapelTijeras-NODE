import { DataTypes, Model } from "sequelize";
import db from "../database/connection.js";

class Usuario extends Model {}

Usuario.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {args: [2, 50], msg: "El nombre debe tener entre 2 y 50 caracteres"}
            }
        },
        apellido1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {msg: "El email debe ser válido"}
            }
        },
        nick: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        pass: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize: db,
        modelName: "Usuario",
        tableName: "usuario",
        timestamps: false,
    }
)
export default Usuario;