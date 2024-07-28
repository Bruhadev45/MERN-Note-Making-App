const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { auth } = require("./middlewares/auth.middlewars");
const userRouter = require("./routers/user-router");
const authRouter = require("./routers/auth-router");
const notesRouter = require("./routers/notes-router");
const app = express();

app.use(express.json());
app.use(cors());


require("dotenv").config();
require("./db");

app.get("/", (req, res) => {
 res.send("All are good!"); 
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/notes", auth, notesRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
