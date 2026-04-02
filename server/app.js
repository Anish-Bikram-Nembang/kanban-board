import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import registerRoutes from "./routes/index.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
registerRoutes(app);

export default app;
