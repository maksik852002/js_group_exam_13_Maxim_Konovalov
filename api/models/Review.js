const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    comment: {
      type: String,
      required: true,
    },
    qualityOfFood: {
      type: Number,
      required: true,
      default: 0
    },
    serviceQuality: {
      type: Number,
      required: true,
      default: 0
    },
    interior: {
      type: Number,
      required: true,
      default: 0
    },
  },
  {
    versionKey: false,
  }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
