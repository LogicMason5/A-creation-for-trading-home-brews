import app from './app';
import logger from "./utils/logger";

const port = process.env.PORT || 3001;

app
  .listen(port, () => {
    logger.info(`server running on port : ${port}`);
    console.log(`server running on port : ${port}`);
  })
  .on('error', (e) => logger.error(e));