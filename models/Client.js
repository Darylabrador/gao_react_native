import Sequelize from "rn-sequelize";
import sequelize from '../config/database.js';

const Op = Sequelize.Op;
const Model = Sequelize.Model;

export default class Client extends Model { }

Client.init(
    {
        name: Sequelize.STRING,
        surname: Sequelize.STRING
    },
    {
        sequelize,
        modelName: "client"
    }
);