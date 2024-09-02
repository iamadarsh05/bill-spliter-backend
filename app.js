const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const usersRouter = require("./routes/users.js");
const expensesRouter = require("./routes/expenses.js");
const debtsRouter = require("./routes/debts.js");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://bill-spliter-20.netlify.app",
  }),
);
app.use(usersRouter);
app.use(expensesRouter);
app.use(debtsRouter);

// !IMPORTANT: Create .env file with password
// adeditingtutorial
// U5g82o4Fy4miFVmx

const password ="U5g82o4Fy4miFVmx";
let devUrl = `mongodb+srv://adeditingtutorial:${password}@cluster0.5tf7k.mongodb.net/`;
var mongoDB = process.env.MONGODB_URI || devUrl;
// Set up the Mongoose connection.
mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));
let db = mongoose.connection;

// Bind the connection to an error event to get notification of connection
// errors.
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// Displays a success message when the connection is successfully made.
db.once("open", function () {
  console.log("Connected successfully.");
});

// Set up the port to listen on.
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running at port ${port}.`);
});

module.exports = app;
