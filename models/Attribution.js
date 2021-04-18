import Sequelize from "rn-sequelize";
import sequelize from '../config/database.js';

const Op = Sequelize.Op;
const Model = Sequelize.Model;

export default class Attribution extends Model { }

Attribution.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        clientId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        desktopId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        hours: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "attribution",
        timestamps: true
    }
);