import "reflect-metadata";
import { DataSource, Repository } from "typeorm";
import { DeviceData } from "./entities/device.entity";
import { config } from "./ormconfig";
import { TableData } from "./entities/table.entity";

const PostgresDataSource = new DataSource(config);

export let deviceRepository: Repository<DeviceData> | null = null;
export let tableRepository: Repository<TableData> | null = null;

export const connect = async () => {
  await PostgresDataSource.initialize();
  try {
    deviceRepository = PostgresDataSource.getRepository(DeviceData);
    tableRepository = PostgresDataSource.getRepository(TableData);
    console.log("Data Source has been initialized!");
  } catch (err: any) {
    console.error("Error during Data Source initialization", err);
  }
};
