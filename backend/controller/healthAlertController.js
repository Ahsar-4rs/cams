import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { healthAlert } from "../models/healthAlertSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const reporthealthAlert = catchAsyncErrors(async (req, res, next) => {
    console.log("API reached!"); 
    try {
        console.log("Request Body:", req.body);

        const {
            name, // Changed from Name to name
            age, // Changed from Age to age
            gender, // Changed from Gender to gender
            phone, // Changed from Phno to phone
            department, // Changed from Department to department
            semester, // Changed from Semester to semester
            class: className, // Changed from Class to class and renamed to className to avoid conflict with reserved keyword
            accommodation, // Changed from Accomodation to accomodation
            hostel, // Changed from Hostel to hostel
            roomNumber, // Changed from roomNo to roomNumber
            diagnosis, // Changed from Diagnosis to diagnosis
            onset, // Remains the same
            medicineIntake, // Changed from medIntake to medicineIntake
            socialGatherings, // Remains the same
            foodIntake, // Remains the same
            allergies, // Remains the same
            level // Remains the same
        } = req.body;

        // Validate required fields
        if (!name || !age || !gender || !phone || !semester || !className || !accommodation || !diagnosis) {
            return next(new ErrorHandler("Please fill in all required fields!", 400));
        }

        // Validate Gender
        if (!["male", "female"].includes(gender)) { // Ensure this matches the schema
            return next(new ErrorHandler("Invalid Gender value!", 400));
        }

        // Validate Age
        if (age < 17) {
            return next(new ErrorHandler("Age must be at least 17!", 400));
        }

        // Validate Semester
        if (parseInt(semester) > 10) { // Ensure semester is treated as a number
            return next(new ErrorHandler("Semester can have a value up to 10 only!", 400));
        }

        // Create Health Alert Entry
        const alertEntry = await healthAlert.create({
            name,
            age,
            gender,
            phone,
            department,
            semester,
            class: className, // Use className here
            accommodation,
            hostel,
            roomNumber,
            diagnosis,
            onset,
            medicineIntake,
            socialGatherings,
            foodIntake,
            allergies,
            level
        });

        console.log("Health Alert Created:", alertEntry);

        res.status(200).json({
            success: true,
            message: "Health Alert Entry created Successfully...",
        });

    } catch (error) {
        console.error("Error in reporthealthAlert:", error);
        return next(new ErrorHandler(error.message || "Server Error", 500));
    }
});

export const getSomeReport = catchAsyncErrors(async (req, res, next) => {
    try {
        const reports = await healthAlert.find({ status: 0 }).sort({ level: -1 });

        res.status(200).json({
            success: true,
            message: "Filtered Health Alerts fetched successfully",
            reports
        });
    } catch (error) {
        console.error("Error in getSomeReport:", error);
        return next(new ErrorHandler("Failed to fetch reports", 500));
    }
});


export const getAllReports = catchAsyncErrors(async (req, res, next) => {
    try {
        const reports = await healthAlert.find().sort({ status: 1, level: -1 });

        res.status(200).json({
            success: true,
            message: "All Health Alerts fetched successfully",
            reports
        });
    } catch (error) {
        console.error("Error in getAllReports:", error);
        return next(new ErrorHandler("Failed to fetch all reports", 500));
    }
});


