import Sequelize from "rn-sequelize";
import sequelize from '../config/database.js';

const Op = Sequelize.Op;
const Model = Sequelize.Model;

export default class Ordinateur extends Model { }