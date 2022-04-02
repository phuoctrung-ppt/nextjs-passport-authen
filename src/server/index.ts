import express from 'express';
import next from 'next';
import passport from 'passport';
import router from './routes/appRouter';
import authRouter from './routes/authRouter';
import session from 'express-session';
import { localStrategy } from './middlewares/passport/passportConfig';
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev: dev });

const handler = app.getRequestHandler();
app
  .prepare()
  .then(() => {
    const server = express();
    server.use(express.json());
    server.use(session({ secret: process.env.SECRET_KEY || '' }));
    passport.use(localStrategy);
    server.use(passport.initialize());
    server.use(passport.session());
    server.use('/auth', authRouter);
    server.use('/api', router);
    server.all('*', (req, res) => {
      return handler(req, res);
    });
    server.listen(PORT, () => {
      console.log(`> Server ready on http://localhost:${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.log(err.message);
  });
