import Sequelize from "rn-sequelize";
import sequelize from '../config/database.js';

const Op = Sequelize.Op;
const Model = Sequelize.Model;

export default class User extends Model { }
User.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.TEXT,
            allowNull: false,
            unique: true
        }
    },
    {
        sequelize,
        modelName: "user"
    }
);