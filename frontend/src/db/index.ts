import Dexie, { type Table } from "dexie";

export interface WorkRecord {
  id?: number;
  title: string;
  status: "进行中" | "已完成" | "已取消";
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

class WorkDatabase extends Dexie {
  workRecords!: Table<WorkRecord>;

  constructor() {
    super("workDatabase");
    this.version(1).stores({
      workRecords: "++id, title, status, createdAt, updatedAt",
    });
  }
}

export const db = new WorkDatabase();
