import express from "express";
import cors from "cors";
import connectToMongoDB from "./db/db.js";
import authRouter from "./routes/auth.js";
import noteRouter from "./routes/note.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

app.listen(5000, () => {
  connectToMongoDB();
  console.log("Server started on port 5000");
});
