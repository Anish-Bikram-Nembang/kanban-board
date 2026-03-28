import express from "express";
import helmet from "helmet";
import cors from "cors";
import registerRoutes from "./routes/index.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
registerRoutes(app);

export default app;
