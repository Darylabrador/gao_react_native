import Sequelize from "rn-sequelize";
import sequelize from '../config/database.js';

const Op = Sequelize.Op;
const Model = Sequelize.Model;

export default class Client extends Model { }
Client.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    sequelize,
    modelName: "client"
})