
const express = require("express"); //import the express module ()
const app = express(); //create an express application
// const { Restaurant } = require("./models/index"); //import the Restaurant model
const { sequelize } = require("./db");

const port = 3000;
app.use(express.json());

const restaurantRouter = require("./routers/restRouter");

app.use("/restaurants", restaurantRouter);

const server = app.listen(3000, function () {
  // the listen() method listens for connections on the host and the port number
  console.log("Node server is running on http://localhost:3000..");
});
