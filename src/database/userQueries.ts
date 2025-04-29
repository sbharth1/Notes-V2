import {SQLiteDatabase} from 'react-native-sqlite-storage';

export interface Note {
  id: number;
  name? : string;
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
  const results = await db.executeSql('SELECT * FROM notes;');
  const rows = results[0].rows.raw();
  return rows;
};

export const editNote = async (
  db: SQLiteDatabase,
  title: string,
  note: string,
  id: number,
): Promise<void> => {
  await db.executeSql(
    `UPDATE notes SET title = ?, note = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?;`,
    [title, note, id],
  );
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
): Promise<Note[] | null> => {
  const res = await db.executeSql(`SLECT * FROM notes WHERE id = ?;`, [id]);
  if (res[0].rows.length > 0) {
    return res[0].rows.item(0);
  }
  return null;
};
