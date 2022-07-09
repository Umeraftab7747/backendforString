const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const UsersRouter = require("./routes/users");

app.use(cors());
app.use(cors({ origin: true, credentials: true }));
app.options("*", cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(morgan("tiny"));

// routes
app.use("/users", UsersRouter);

//db
mongoose
  .connect(
    "mongodb+srv://umer:umer@cluster0.p73sf.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DATABASE IS CONNECTED");
  })
  .catch((err) => console.log(err));

// listen

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
