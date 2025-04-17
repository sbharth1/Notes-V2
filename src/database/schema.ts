export const createTables = async (db:any) => {
  await db.excuteSql(`CREATE TABLE IF NOT EXIST notes (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           name TEXT,
           title TEXT,
           note TEXT,
           createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
           updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
        );`);
};
