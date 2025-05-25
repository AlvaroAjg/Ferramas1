import path from "path";
import sqlite3 from "sqlite3";

const dbPath = path.join(process.cwd(), "db.db");
export const db = new sqlite3.Database(
  dbPath,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to database!.");
  }
);

export function getQuery(query: string, params: Array<unknown> = []) {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, rows) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export function runQuery(query: string, params: Array<unknown> = []) {
  return new Promise<sqlite3.RunResult>((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}