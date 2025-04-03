import {catchAsyncErrors} from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/errorMiddleware.js';
import { Area } from "../models/AreaSchema.js";

export const createArea = catchAsyncErrors(async (req, res) => {
  try {
    const { place, lat, long, type } = req.body;

    // Create a new area document
    const newArea = new Area({
      place,
      lat,
      long,
      type
    });

    // Save the area to the database
    await newArea.save();

    res.status(201).json({
      message: 'Marker created successfully!',
      area: newArea
    });
  } catch (error) {
    console.error("Error in createArea:", error);
    return next(new ErrorHandler(error.message || "Server Error", 500));
  }
});

export const getAreas = async (req, res) => {
  try {
    const areas = await Area.find();
    res.status(200).json(areas);
  } catch (error) {
    console.error("Error in getAreas:", error);
    return next(new ErrorHandler(error.message || "Server Error", 500));
  }
};

export const deleteArea = async (req, res) => {
  try {
    const areaId = req.params.id;
    const deletedArea = await Area.findByIdAndDelete(areaId);

    if (!deletedArea) {
      return res.status(404).json({ message: 'Marker not found' });
    }

    res.status(200).json({
      message: 'Marker deleted successfully!',
      deletedArea
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete marker.',
      error: error.message
    });
  }
};
