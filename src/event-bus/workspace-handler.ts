import { Message, WorkspaceAction } from "./types/message.type";
import { connect } from "../orm/connection";
import { Table } from "typeorm";

export const workspaceHandler = async (message: Message) => {
  switch (message.action) {
    case WorkspaceAction.Create:
      await createTable(message.data.tableName, message.data.columns);
      break;
    case WorkspaceAction.AddColumn:
      await addNewColumn(message.data.tableName, message.data.columns);
      break;
    case WorkspaceAction.DropColumn:
      await dropColumn(message.data.tableName, message.data.columns);
      break;
  }
};

const createTable = async (tableName: string, columns: string[]) => {
  const connection = await connect();
  if (connection) {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    let enrichedColumns: any = columns.map((columnName: string) => {
      return {
        name: columnName,
        type: "varchar",
        length: "30",
        isNullable: true,
      };
    });

    enrichedColumns.push({
      name: "id",
      type: "integer",
      isPrimary: true,
      isGenerated: true, // Auto-increment
      generationStrategy: "increment",
    });
    const table = new Table({
      name: tableName,
      columns: enrichedColumns,
    });
    await queryRunner.createTable(table, true);
    await queryRunner.release();
  }
};

const addNewColumn = async (tableName: string, columns: string[]) => {
  const connection = await connect();
  if (connection) {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    let enrichedColumns: any = columns.map((columnName: string) => {
      return {
        name: columnName,
        type: "varchar",
        length: "30",
        isNullable: true,
      };
    });

    await queryRunner.addColumns(tableName, enrichedColumns);
  }
};

const dropColumn = async (tableName: string, columns: string[]) => {
  const connection = await connect();
  if (connection) {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.dropColumns(tableName, columns);
  }
};
