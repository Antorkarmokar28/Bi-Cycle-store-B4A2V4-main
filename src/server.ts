import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { IncomingMessage, Server, ServerResponse } from 'http';
let server: Server<typeof IncomingMessage, typeof ServerResponse> | undefined;
async function mainServer() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
mainServer();
// using unhandledRejection for asynchonouse code
process.on('unhandledRejection', () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
// using uncaughtException for synchonouse code
process.on('uncaughtException', () => {
  process.exit(1);
});
