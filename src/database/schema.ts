export const createTables = async (db:any) => {
  await db.executeSql(`CREATE TABLE IF NOT EXISTS notes (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           name TEXT,
           title TEXT,
           note TEXT,
           createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
           updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
        );`);
};
