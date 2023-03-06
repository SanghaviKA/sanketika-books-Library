const express = require("express");
const cors = require("cors");

const booksRouters = require("./src/students/routes");

const app = express();
const port = 4000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());

//allows us to post and get json from our endpoints
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/v1/library", booksRouters);

app.listen(port, () => console.log(`app listen on port ${port}`));
