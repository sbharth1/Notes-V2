import SQLite from "react-native-sqlite-storage";
import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { createTables } from "./schema";
SQLite.enablePromise(true);

let db:SQLiteDatabase;

export const initDB = async () => {
  if (db) return db;
  db = await SQLite.openDatabase({ name: 'mydb.db', location: 'default' });
  await createTables(db);
  return db;
};
