const express = require("express");
const app = express();
const { Restaurant } = require("./models/index");
const { sequelize } = require("./db");
const port = 3000;

app.use(express.json())



//TODO: Create your GET Request Route Below:
app.get("/restaurants/:id", async (req, res, next) => { 
const restaurant = await Restaurant.findByPk(req.params.id);  
res.json(restaurant);});



app.post("/restaurants", async (req, res) => {
    const { name, location, cuisine } = req.body;
    if ((name, location, cuisine)) {
      await Restaurant.create({
        name: name,
        location: location,
        cuisine: cuisine,
      });
    }
    res.send(201);});

app.put("/restaurants/:id", async (req, res) => {
    const { name, location, cuisine } = req.body;
    if ((name, location, cuisine)) {
      await Restaurant.update(
        {
          name: name,
          location: location,
          cuisine: cuisine,
        },
        { where: { id: req.params.id } }
      );
    }
    res.send(200);
  }
);

app.delete("/restaurants/:id", async (req, res) => {
    await Restaurant.destroy({ where: { id: req.params.id } });
    res.send(200);
  }
);

app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
    }
);
