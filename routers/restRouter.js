const express = require("express");
const { body, check, validationResult } = require("express-validator");
const router = express.Router();

const { Restaurant } = require("../models/index"); //import the Restaurant model

//TODO: Create your GET Request Route Below:
// Route definition - The app.get() method specifies a callback function that will be invoked whenever there is an HTTP GET request with a path ('/') relative to the site root.
// The callback function takes a request and a response object as arguments, and calls send() on the response to return the object restaurant in a json envelope
router.get("/", async (req, res) => {
  const restaurant = await Restaurant.findAll();
  res.json(restaurant);
});

router.use(express.json());
router.post(
  "/",
  [
    check("name").trim().not().isEmpty(),
    check("location").trim().not().isEmpty(),
    check("cuisine").trim().not().isEmpty(),
    check("name").isLength({ min: 10, max: 75 }), // My name has more than 30 characters.
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    // If the validationResults returns any errors, then trigger a response
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      // If data is valid, push it into the users array
      const { name, location, cuisine } = req.body;
      if ((name, location, cuisine)) {
        await Restaurant.create({
          name: name,
          location: location,
          cuisine: cuisine,
        });
      }
      res.json(201);
    }
  }
);

router.use(express.json());
router.put("/:id", async (req, res, next) => {
  //next() can be used to pass control to the next handler
  const restaurant = await Restaurant.findByPk(req.params.id);
  restaurant.update({
    name: req.body.name,
    location: req.body.location,
    cuisine: req.body.cuisine,
  });
  res.json("Put Successful!");
});

router.use(express.json());
router.delete("/:id", async (req, res, next) => {
  //next() can be used to pass control to the next handler
  const restaurant = await Restaurant.findByPk(req.params.id);
  restaurant.destroy();
  res.json("Delete Successful!");
});

module.exports = router;