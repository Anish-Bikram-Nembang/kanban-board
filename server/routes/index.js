import taskRoutes from "./taskRoutes.js";
import columnRoutes from "./columnRoutes.js";
import boardRoutes from "./boardRoutes.js";
import userRoutes from "./userRoutes.js";
import authRoutes from "./authRoutes.js";

export default function registerRoutes(app) {
  app.use("/api/tasks", taskRoutes);
  app.use("/api/boards", boardRoutes);
  app.use("/api/columns", columnRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/auth", authRoutes);
  app.use((req, res) => {
    res.status(404).json({
      error: "Route not found",
    });
  });
}
