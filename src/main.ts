import express from "express";
import { resize } from "./routes";
const app = express();

app.use("/resize", resize);

//Main Route
app.get("/", (req, res) => {
  res.send("hello world");
});

//Initial server setup
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}!`)
);
