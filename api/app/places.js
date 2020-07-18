const express = require("express");
const mongoose = require('mongoose');
const ValidationError = require("mongoose").Error.ValidationError;

const auth = require("../middleware/auth");
const upload = require("../multer").uploads;

const Place = require("../models/Place");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const places = await Place.aggregate([
      {$lookup: {from: "reviews", localField: "_id", foreignField: "place", as: "reviews"}},
      {$lookup: {from: "photos", localField: "_id", foreignField: "place", as: "photos"}},
      {$addFields: { totalScores : {
        qualityOfFood: {$sum: "$reviews.qualityOfFood"},
        serviceQuality: {$sum: "$reviews.serviceQuality"},
        interior: {$sum: "$reviews.interior"},
    }}},
    ])
    return res.send(places);
  } catch (e) {
    console.log(e)
    return res.status(500).send(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let place = await Place.aggregate([
      {$match: {_id: mongoose.Types.ObjectId(req.params.id)}},
      {$lookup: {from: "reviews", localField: "_id", foreignField: "place", as: "reviews"}},
      {$lookup: {from: "users", localField: "reviews.user", foreignField: "_id", as: "users"}},
      {$project: {"users.password": 0, "users.token": 0}},
      {$addFields: { totalScores : {
          qualityOfFood: {$sum: "$reviews.qualityOfFood"},
          serviceQuality: {$sum: "$reviews.serviceQuality"},
          interior: {$sum: "$reviews.interior"},
      }}},
    ]);
    if (!place[0]) {
      return res.status(404).send({
        error: "Not found",
      });
    }
    for (let el of place[0].reviews) {
      for (let i of place[0].users) {
        if (i._id.toString()===el.user.toString()) {
          el.user = i
        }
      }
    }
    return res.send(place[0]);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    if (req.body.agree === 'no') {
      return res.status(400).send({error: 'You have to enable the checkbox'});
    }
    const data = {
      user: req.user._id,
      title: req.body.title,
      description: req.body.description
    };
    if (req.file) {
      data.image = req.file.filename;
    };
   
    const place = new Place(data);
    await place.save();
    return res.send({
      id: place._id,
    });
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
    const response = await Place.findByIdAndRemove(req.params.id);
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
