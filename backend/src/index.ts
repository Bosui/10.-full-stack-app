import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectToDb, PORT } from "./db";
import authRoutes from "./routes/authRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import businessRoutes from "./routes/businessRoutes";
import categoryRoutes from "./routes/categoryRoutes";

dotenv.config(); 

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/businesses", businessRoutes);
app.use("/bookings", bookingRoutes);

connectToDb()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });
