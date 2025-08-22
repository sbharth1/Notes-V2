import {SQLiteDatabase} from 'react-native-sqlite-storage';

export interface Note {
  id: number;
  name?: string;
  title: string;
  note: string;
  createdAt?: string;
  updatedAt?: string;
}

export const addNote = (
  db: SQLiteDatabase,
  name: string,
  title: string,
  note: string,
): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO notes (name,title, note) VALUES (?,?, ?)`,
        [name, title, note],
        (_, result) => {
          resolve(result.insertId);
          return true;
        },
        (_, error) => {
          reject(error);
          return false;
        },
      );
    });
  });
};

export const getAllNote = async (db: SQLiteDatabase): Promise<Note[]> => {
  const results = await db.executeSql('SELECT * FROM notes ORDER BY createdAt DESC;');
  const rows = results[0].rows.raw();
  return rows;
};

export const editNote = async (
  db: SQLiteDatabase,
  title: string,
  note: string,
  id: number,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE notes 
         SET title = ?, note = ?, updatedAt = datetime('now') 
         WHERE id = ?;`,
        [title, note, id],
        () => resolve(),
        (_, error) => {
          reject(error);
          return false;
        },
      );
    });
  });
};

export const deleteNote = async (
  db: SQLiteDatabase,
  id: number,
): Promise<void> => {
  await db.executeSql(`DELETE FROM notes WHERE id = ?;`, [id]);
};

export const specificNote = async (
  db: SQLiteDatabase,
  id: number,
): Promise<Note[]> => {
  const res = await db.executeSql(`SELECT * FROM notes WHERE id = ?;`, [id]);
  const rows = res[0].rows.raw();
  return rows;
};
