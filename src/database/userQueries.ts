import {SQLiteDatabase} from 'react-native-sqlite-storage';

export interface Note {
  id: number;
  name: string;
  title: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export const addNote = async (
  db: SQLiteDatabase,
  name: string,
  title: string,
  note: string,
): Promise<void> => {
  await db.executeSql(
    `INSERT INTO notes (name, title, note) VALUES (?, ?, ?);`,
    [name, title, note],
  );
};

export const getAllNote = async (db: SQLiteDatabase): Promise<Note[]> => {
  const results = await db.executeSql('SELECT * FROM notes;');
  const rows = results[0].rows.raw();
  console.log('Fetched Notes:', rows);
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
