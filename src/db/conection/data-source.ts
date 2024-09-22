import "reflect-metadata"
import { DataSource } from "typeorm"
import { CreateCarTable1726961456835 } from "../migrations/1726961456835-CreateCarTable"
import { CreateDriveTable1727006706718 } from "../migrations/1727006706718-CreateDriveTable"
import { CreateCarUseTable1727008373716 } from "../migrations/1727008373716-CreateCarUseTable"
import Car from '../entity/car'
import Drive from '../entity/drive'
import CarUse from '../entity/carUse'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "admin",
    password: "123456",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [Car,Drive,CarUse],
    migrations: [CreateCarTable1726961456835, CreateDriveTable1727006706718,CreateCarUseTable1727008373716],
    subscribers: [],
})
