import { HTTP_STATUS } from './../../../utils/HttpStatus';
import crypto from 'crypto';
import csvAppend from 'csv-append';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const filePath = 'file.csv';

type User = {
  email: string;
  username: string;
  password: string;
  createAt?: Date;
};

const createUser = async (userInfo: User) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(userInfo.password, salt, 1000, 64, 'sha512').toString('hex');
  const user = {
    id: uuidv4(),
    createAt: Date.now(),
    username: userInfo.username,
    email: userInfo.email,
    salt: salt,
    hash: hash,
  };
  return user;
};

export const registerController = async (req: Request, res: Response) => {
  const { ...userInfo } = req.body;
  try {
    const newUser = await createUser(userInfo);
    const { append, end } = csvAppend(filePath, true);
    append(newUser);
    await end();
    return res.status(HTTP_STATUS.OK).json({ message: 'Account has been created' });
  } catch (err) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};
