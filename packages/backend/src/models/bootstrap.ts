import { Sequelize } from "sequelize";
import { PG_CONFIG } from "../const";

const connection_url = `postgresql://${PG_CONFIG.username}:${PG_CONFIG.password}@${PG_CONFIG.host}:${PG_CONFIG.port}/${PG_CONFIG.dbName}?sslmode=require`

export default new Sequelize(connection_url);

