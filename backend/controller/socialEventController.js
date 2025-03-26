import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { SocialEvent } from "../models/socialEventSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

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
        const uploadPath = `./public/uploads/${file.name}`;

        // Move file to server storage
        await file.mv(uploadPath);
        console.log("File uploaded to:", uploadPath);

        // Save event to database
        const event = await SocialEvent.create({
            eventName,
            eventImage: `/uploads/${file.name}`,
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
            message: "Social Event Entry created Successfully.....",
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