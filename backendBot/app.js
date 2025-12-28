import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

//Root route
app.get("/", (req, res) => {
    res.send("Career explorer backend is running.")
});

app.use("/api/chat", chatRoutes);

export default app;