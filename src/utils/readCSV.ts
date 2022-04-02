import fs from 'fs';
import csv from 'csv-parser';

type UserInfo = {
  id: string;
  username: string;
  email: string;
  salt: string;
  hash: string;
};

export const readFileStream = (filePath: string) => {
  let users: Array<UserInfo> = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        const user: UserInfo = {
          id: row.id,
          username: row.username,
          email: row.email,
          salt: row.salt,
          hash: row.hash,
        };
        users.push(user);
      })
      .on('end', () => {
        resolve(users);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};
