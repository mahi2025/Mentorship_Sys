import morgan from "morgan";
import logger from "../config/logger";

const stream = {
  write: (message: string) => logger.http(message.trim()),
};

const requestlogger = morgan(
  ":method :url :status :res[content-length]b - :response-time ms",
  { stream },
);

export default requestlogger;