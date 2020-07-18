const express = require("express");
const ValidationError = require("mongoose").Error.ValidationError;
const auth = require("../middleware/auth");

const Review = require("../models/Review");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  console.log(req.body)
  try {
    const data = req.body;
    data.user = req.user._id;
    const review = new Review(data);
    await review.save();
    return res.send({review});
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).send(e);
    } else {
      console.log(e);
      return res.sendStatus(500);
    }
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const response = await Review.findByIdAndRemove(req.params.id);
    if (!response) {
      return res.sendStatus(404);
    }
    return res.send({
      message: `${req.params.id} removed`,
    });
  } catch (e) {
    return res.status(422).send(e);
  }
});

module.exports = router;
