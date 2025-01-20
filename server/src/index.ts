import express from "express";
import { AppDataSource } from "./utils/data-source";
import { config } from "dotenv";
import cors from "cors";
import { router } from "./routers/router";
import { handleError } from "./middlewares/ErrorHandler";

config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.SERVER_PORT || 3000;
app.use(router);
app.use(handleError);

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
