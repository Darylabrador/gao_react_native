import Sequelize from "rn-sequelize";
import sequelize from '../config/database.js';

const Op = Sequelize.Op;
const Model = Sequelize.Model;

export default class Attribution extends Model { }

Attribution.init(
    {
        clientId: Sequelize.INTEGER,
        desktopId: Sequelize.INTEGER,
        date:  Sequelize.DATEONLY,
        hours: Sequelize.STRING,
    },
    {
        sequelize,
        modelName: "attribution"
    }
);