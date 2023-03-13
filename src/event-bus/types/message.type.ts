export enum Keys {
  Workspace = "workspace",
  Flow = "flow",
}

export enum WorkspaceAction {
  Create = "create",
  AddColumn = "add-column",
  DropColumn = "drop-column",
}

export type WorkSpaceCreateTable = {
  tableName: string;
  columns: string[];
};

export type Message = {
  key: Keys;
  action: WorkspaceAction;

  data: WorkSpaceCreateTable;
};
