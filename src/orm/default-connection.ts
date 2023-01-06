import "reflect-metadata";
import { DataSource } from "typeorm";
import { DeviceData } from "./entities/device.entity";
import { config } from "./ormconfig";

export default new DataSource(config);
