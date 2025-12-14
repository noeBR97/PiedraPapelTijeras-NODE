import { DataTypes, Model } from "sequelize";
import db from "../database/connection.js";
import Usuario from "./Usuario.js";

class Partida extends Model {}

Partida.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        tipo: {
            type: DataTypes.ENUM('humano', 'maquina'),
            allowNull: false,
        },
        estado: {
            type: DataTypes.ENUM('espera', 'en_progreso', 'finalizada'),
            allowNull: false,
        },
        idCreador: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Usuario,
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        },
        idRival: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Usuario,
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        idGanador: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Usuario,
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        eleccionCreador: {
            type: DataTypes.ENUM('piedra', 'papel', 'tijeras'),
            allowNull: true,
        },
        eleccionRival: {
            type: DataTypes.ENUM('piedra', 'papel', 'tijeras'),
            allowNull: true,
        },
        victoriasCreador: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        victoriasRival: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize: db,
        modelName: "Partida",
        tableName: "partida",
        timestamps: true,
    }
)

export default Partida;