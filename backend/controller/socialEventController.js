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

export const getSocialEvent = catchAsyncErrors(async (req, res, next) => {
    try {
        const eventId = req.params.id;
        if (!eventId) {
            return next(new ErrorHandler("Event ID is required", 400));
        }

        const event = await SocialEvent.findById(eventId);
        if (!event) {
            return next(new ErrorHandler("Event not found", 404));
        }

        res.status(200).json(event);
    } catch (error) {
        console.error("Error fetching event:", error);
        return next(new ErrorHandler("Error fetching event details", 500));
    }
});

export const updateSocialEvent = catchAsyncErrors(async (req, res, next) => {
    try {
        const eventId = req.params.id;
        if (!eventId) {
            return next(new ErrorHandler("Event ID is required", 400));
        }

        // Check if event exists
        let event = await SocialEvent.findById(eventId);
        if (!event) {
            return next(new ErrorHandler("Event not found", 404));
        }

        // Get the old image URL for potential cleanup later
        const oldImageUrl = event.eventImage;
        
        // Extract the event data from the request body
        const { eventName, eventDate, eventTime, eventVenue, Organizer, eventInfo, Category } = req.body;

        // Prepare update data
        const updateData = {
            eventName: eventName || event.eventName,
            eventDate: eventDate || event.eventDate,
            eventTime: eventTime || event.eventTime,
            eventVenue: eventVenue || event.eventVenue,
            Organizer: Organizer || event.Organizer,
            eventInfo: eventInfo || event.eventInfo,
            Category: Category || event.Category,
            eventImage: event.eventImage, // Default to old image if not updated
        };

        // Handle image update if a file is uploaded
        if (req.files && req.files.eventImage) {
            console.log("New image file detected");
            const file = req.files.eventImage;
            
            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "social_events",
                resource_type: "image",
            });

            // Remove temp file after upload
            fs.unlinkSync(file.tempFilePath);
            
            // Add new image URL to update data
            updateData.eventImage = result.secure_url;
            
            // Try to delete the old image from Cloudinary if it exists
            if (oldImageUrl) {
                try {
                    // Extract public_id from the Cloudinary URL
                    const publicId = getPublicIdFromUrl(oldImageUrl);
                    if (publicId) {
                        await cloudinary.uploader.destroy(publicId);
                        console.log(`Old image deleted: ${publicId}`);
                    }
                } catch (deleteError) {
                    console.error("Error deleting old image from Cloudinary:", deleteError);
                    // Continue with the update even if image deletion fails
                }
            }
        }

        // Update the event
        event = await SocialEvent.findByIdAndUpdate(
            eventId, 
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "Event updated successfully",
            data: event
        });
    } catch (error) {
        console.error("Error updating event:", error);
        return next(new ErrorHandler("Error updating event", 500));
    }
});

// Helper function to extract public_id from Cloudinary URL
function getPublicIdFromUrl(url) {
    try {
        if (!url || typeof url !== 'string') return null;
        
        // Cloudinary URLs typically look like:
        // https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/folder_name/file_name.jpg
        
        // Extract the path after /upload/
        const uploadIndex = url.indexOf('/upload/');
        if (uploadIndex === -1) return null;
        
        let path = url.substring(uploadIndex + 8); // +8 to skip '/upload/'
        
        // Remove version if present (v1234567890/)
        if (path.startsWith('v')) {
            const versionEndIndex = path.indexOf('/');
            if (versionEndIndex !== -1) {
                path = path.substring(versionEndIndex + 1);
            }
        }
        
        // Remove file extension
        const extensionIndex = path.lastIndexOf('.');
        if (extensionIndex !== -1) {
            path = path.substring(0, extensionIndex);
        }
        
        return path; // This should be the public_id including folder
    } catch (error) {
        console.error("Error extracting public_id:", error);
        return null;
    }
}

export const deleteSocialEvent = catchAsyncErrors(async (req, res, next) => {
    try {
        const eventId = req.params.id;
        if (!eventId) {
            return next(new ErrorHandler("Event ID is required", 400));
        }

        // Check if event exists
        const event = await SocialEvent.findById(eventId);
        if (!event) {
            return next(new ErrorHandler("Event not found", 404));
        }

        // Delete the event
        await SocialEvent.findByIdAndDelete(eventId);

        res.status(200).json({
            success: true,
            message: "Event deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting event:", error);
        return next(new ErrorHandler("Error deleting event", 500));
    }
});