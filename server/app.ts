import express from "express";
import path from "path";

const app = express();

app.use("/cries", express.static(path.join(__dirname, "..", "cries")));
app.use(express.json());

export default app;
