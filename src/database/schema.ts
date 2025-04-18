import { SQLiteDatabase } from 'react-native-sqlite-storage';

export const createTables = async (db:SQLiteDatabase) => {
 const table = await db.executeSql(`CREATE TABLE IF NOT EXISTS notes (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           name TEXT,
           title TEXT,
           note TEXT,
           createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
           updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
        );`);

};
