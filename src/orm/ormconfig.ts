import { DataSourceOptions } from "typeorm";
import { DeviceData } from "./entities/device.entity";

export const config: DataSourceOptions = {
  type: "postgres",
  name: "default",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "postgres",
  synchronize: false,
  logging: false,
  entities: [DeviceData], //["dist/orm/entities/**/*{.js,.ts}"],
  migrations: ["dist/orm/migrations/**/*{.js,.ts}"],
};
