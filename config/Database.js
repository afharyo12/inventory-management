import { Sequelize } from "sequelize";

// Nyambungin db ke BE
const db = new Sequelize("db_invenotry", "root", "", {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

export default db;
