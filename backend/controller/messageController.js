import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { message } from "../models/messageSchema.js";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
    try {
        const { groupID, sender, message: msgContent, recoveryRate } = req.body;

        if (!groupID || !sender || !msgContent) {
            return next(new ErrorHandler("Please provide all required fields", 400));
        }

        const newMessage = await message.create({
            groupID,
            sender,
            message: msgContent,
            recoveryRate: recoveryRate !== undefined ? recoveryRate : null
        });

        res.status(200).json({
            success: true,
            message: "Message sent successfully!",
            data: newMessage
        });

    } catch (error) {
        console.error("Error in sendMessage:", error);
        return next(new ErrorHandler(error.message || "Server Error", 500));
    }
});

export const getMessagesByGroup = catchAsyncErrors(async (req, res, next) => {
    const { groupID } = req.params;

    if (!groupID) {
        return next(new ErrorHandler("Group ID is required", 400));
    }

    try {
        const messages = await message.find({ groupID }).sort({ timestamp: 1 }); 
        res.status(200).json({ success: true, messages });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
