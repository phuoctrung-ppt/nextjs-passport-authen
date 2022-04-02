import passportLocal from 'passport-local';
import { UserInfo } from '../../../shared/@types/UserInfo';
import { readFileStream } from '../../../utils/readCSV';
import { passwordValidator } from '../validator/passwordValidator';
const LocalStrategy = passportLocal.Strategy;

const filePath = 'file.csv';

export const localStrategy = new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
  try {
    const listUser: any = await readFileStream(filePath);
    const gettedUser = await listUser.filter((user: UserInfo) => user.username === username)[0];
    if (gettedUser && passwordValidator(gettedUser, password)) {
      return done(null, gettedUser);
    }
    return done(new Error('Username or password is not match!'));
  } catch (err) {
    return done(err);
  }
});
