import * as SQLite from 'expo-sqlite';
import Sequelize from "rn-sequelize";

const  sequelize = new Sequelize({
    dialectModule: SQLite,
    database: "mydb",
    dialectOptions: {
        version: "1.0",
        description: "Test DB"
        //size: 2 * 1024 * 1024
    },
    logging: false
});

export default sequelize;