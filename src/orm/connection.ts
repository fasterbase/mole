import "reflect-metadata";
import { DataSource, Repository } from "typeorm";
import { DeviceData } from "./entities/device.entity";
import { config } from "./ormconfig";

const PostgresDataSource = new DataSource(config);

export let deviceRepository: Repository<DeviceData> | null = null;

export const connect = async () => {
  await PostgresDataSource.initialize();
  try {
    deviceRepository = PostgresDataSource.getRepository(DeviceData);
    console.log("Data Source has been initialized!");
  } catch (err: any) {
    console.error("Error during Data Source initialization", err);
  }
};
