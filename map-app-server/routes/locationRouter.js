import express from "express";
import { Location } from "../models/locationModel.js";
import { asyncMiddleware } from "../middleware/asyncMiddleware.js";

const locationRouter = express.Router();

locationRouter.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const locations = await Location.find().sort("title");

    return res.status(200).json(locations);
  })
);

locationRouter.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const { title, info, location, lat, lng, rating, img } = req.body;

    const isValidData = title && info && location && lat && lng && rating && img

    if (!isValidData) {
      return res.status(400).send({
        message: "Всі поля є обовʼязковими",
      });
    }

    const newLocation = { title, info, location, lat, lng, rating, img };

    const addedLocation = await Location.create(newLocation);

    return res.status(201).send(addedLocation);
  })
);

export default locationRouter
