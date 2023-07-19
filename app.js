const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const router = require("./routers/index");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("combined"));
app.use(router);
app.listen(8000, () =>
{
    console.log("Server running at http://localhost:8000");
});