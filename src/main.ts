import express from "express";
import path from "path";
import { resize } from "./routes";

const app = express();

app.use("/resize", resize);

//Home Page
app.get("/", (req: express.Request, res: express.Response): void => {
  res.sendFile(path.resolve("static/index.html"));
});

//Initial server setup
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);

export default app;
