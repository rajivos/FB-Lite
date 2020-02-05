const express = require("express");
// const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.useDb("Facebook-Lite");

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const membersRouter = require("./routes/members/membersGenericCRUD");
const postsreouter = require("./routes/posts/postsCRUD");
app.use("/posts", postsreouter);
app.use("/members", membersRouter);


app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
