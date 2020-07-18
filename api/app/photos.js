const express = require("express");
const ValidationError = require("mongoose").Error.ValidationError;

const auth = require("../middleware/auth");
const upload = require("../multer").uploads;

const Photo = require("../models/Photo");

const router = express.Router();

router.get("/", async (req, res) => {
  let photos;
  try {
    if (req.query.placeId) {
      photos = await Photo.find({ place: req.query.placeId }).populate("user", "username");
    } else {
      photos = await Photo.find().populate("user", "username");
    }
    return res.send(photos);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).send({
        message: "Not found",
      });
    }
    return res.send(photo);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.post("/", [auth, upload.single("image")], async (req, res) => {
  console.log(req.body.image)
  try {
    const data = {
      user: req.user._id,
      place: req.body.place
    };
    if (req.file) {
      data.image = req.file.filename;
    };
    console.log(data)
    const photo = new Photo(data);
    await photo.save();
    return res.send({
      id: photo._id,
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
    const response = await Photo.findByIdAndRemove(req.params.id);
    console.log(response)
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
