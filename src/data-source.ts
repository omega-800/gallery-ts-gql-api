import "reflect-metadata"
import { DataSource, FindOptionsOrderValue } from "typeorm"
import "dotenv/config"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: [
        "src/entity/**/*.ts"
    ],
    migrations: [],
    subscribers: [],
})

export const defOrder = { order: { date_updated: "ASC" as FindOptionsOrderValue, date_added: "ASC" as FindOptionsOrderValue } }