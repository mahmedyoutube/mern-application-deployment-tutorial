const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());

const User = require("./models/users");

try {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("connected", function () {
    console.log("connection established successfully");
  });
} catch (err) {
  console.log("on connecting mongoose error", err);
}

app.get("/", async (req, res) => {
  res.send("Hello world");
});

app.post("/new-user", async (req, res) => {
  const { name } = req.body;
  const user = new User({ name });
  await user.save();
  res.send(user);
});

app.get("/all", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.send({ message: "Delete Successfully" });
});

const port = 5000 || process.env.PORT;

app.listen(port, () => {
  console.log(`Backend is listening on the port ${port}`);
});
