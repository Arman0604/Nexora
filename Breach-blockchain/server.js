import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import blockchainRoutes from "./routes/blockchainRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/blockchain", blockchainRoutes);

app.get("/", (req, res) => {
  res.send("Blockchain service running");
});

app.listen(process.env.PORT, () => {
  console.log(`Blockchain service running on port ${process.env.PORT}`);
});