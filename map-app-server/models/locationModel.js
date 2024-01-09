import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  info: {
    type: String,
    required: true,
    maxlength: 500,
  },
  location: {
    type: String,
    required: true,
    maxlength: 100,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    max: 10,
  },
});

export const Location = mongoose.model("Locations", locationSchema);
