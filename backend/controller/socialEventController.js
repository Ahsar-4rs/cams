import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { SocialEvent } from "../models/socialEventSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import cloudinary from "../utils/cloudinary.js"; // Import Cloudinary config
import fs from "fs"; // For deleting temp files

export const postSocialEvent = catchAsyncErrors(async (req, res, next) => {
    try {
        console.log("Request Body:", req.body);
        console.log("Request Files:", req.files);

        const { eventName, eventDate, eventTime, eventVenue, organizer, eventInfo, Category } = req.body;

        if (!eventName || !eventDate || !eventTime || !eventVenue || !organizer || !eventInfo || !Category) {
            return next(new ErrorHandler("Please fill full Form!", 400));
        }

        if (!req.files || !req.files.eventImage) {
            return next(new ErrorHandler("Image is required!", 400));
        }

        const file = req.files.eventImage;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "social_events",
            resource_type: "image",
        });

        // Remove temp file after upload
        fs.unlinkSync(file.tempFilePath);

        const event = await SocialEvent.create({
            eventName,
            eventImage: result.secure_url, // Cloudinary image URL
            eventDate,
            eventTime,
            eventVenue,
            organizer,
            eventInfo,
            Category
        });

        console.log("Event created:", event);

        res.status(200).json({
            success: true,
            message: "Social Event Entry created Successfully",
            data: event
        });

    } catch (error) {
        console.error("Error in postSocialEvent:", error);
        return next(new ErrorHandler(error.message || "Server Error", 500));
    }
});


export const getSocialEvents = async (req, res) => {
    try {
        const events = await SocialEvent.find(); // Fetch all events from DB
        res.status(200).json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};