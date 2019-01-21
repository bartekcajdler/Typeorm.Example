import "reflect-metadata";
import * as dotenv from "dotenv";
import { ConnectionOptions, createConnection, getCustomRepository } from "typeorm";
import { UserRepository } from "./repositories/user.repositry";
import { OfficeRepository } from "./repositories/office.repositry";

dotenv.config();

const config: ConnectionOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: Boolean(Number(process.env.DB_SYNCHRONIZE)),
    logging: Boolean(Number(process.env.DB_LOGGING)),
    migrationsRun: Boolean(Number(process.env.DB_MIGRATIONS_RUN)),
    migrationsTableName: process.env.DB_MIGRATIONS_TABLE_NAME,
    entities: [
        __dirname + "/entity/**/*.js"
    ],
    migrations: [
        __dirname + "/migration/**/*.js"
    ],
    subscribers: [
        __dirname + "/subscriber/**/*.js"
    ],
    cli: {
        entitiesDir: __dirname + "/entity",
        migrationsDir: __dirname + "/migration",
        subscribersDir: __dirname + "/subscriber"
    }
};

(async () => {
    try {
        await createConnection(config);
        const userRepository = getCustomRepository(UserRepository);
        const officeRepository = getCustomRepository(OfficeRepository);

        await userRepository.createAndSave("Tataa", "Tataa");
        const user = await userRepository.findUserByName("Tataa", "Tataa");

        await officeRepository.createAndSave('Targowa 6', user);

        console.log(user);

        console.log(process.env.TEST);
    } catch (error) {
        console.log(error)
    }
})();
