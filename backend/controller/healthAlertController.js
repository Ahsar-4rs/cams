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
            status, // Remains the same
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
            status,
            level,
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

export const getOutbreakStatus = catchAsyncErrors(async (req, res, next) => {
    try {
        // Get all vouched reports
        const reports = await healthAlert.find({ status: 1 });
        
        // Calculate total population (using 150 as random value for demonstration)
        const totalPopulation = 150;
        
        // Count occurrences of each disease
        const diseaseCounts = {};
        reports.forEach(report => {
            const diagnosis = report.diagnosis.toLowerCase();
            diseaseCounts[diagnosis] = (diseaseCounts[diagnosis] || 0) + 1;
        });
        
        // Categorize diseases by level
        const level1Diseases = ['common cold', 'diarrhea', 'throat infection', 'tonsillitis'];
        const level2Diseases = ['food poisoning', 'gastroenteritis', 'otitis media', 'otitis externa', 'mumps', 'bronchitis', 'covid 19'];
        const level3Diseases = ['hepatitis', 'gbs', 'influenza', 'pneumonia', 'tuberculosis'];
        
        // Check for outbreaks
        const outbreaks = [];
        
        Object.keys(diseaseCounts).forEach(disease => {
            const count = diseaseCounts[disease];
            const ratio = count / totalPopulation;
            
            if (level1Diseases.includes(disease) && ratio > 0.05) {
                outbreaks.push({ disease, level: 1, count });
            } else if (level2Diseases.includes(disease) && ratio > 0.03) {
                outbreaks.push({ disease, level: 2, count });
            } else if (level3Diseases.includes(disease) && ratio > 0.02) {
                outbreaks.push({ disease, level: 3, count });
            }
        });
        
        res.status(200).json({
            success: true,
            hasOutbreak: outbreaks.length > 0,
            outbreaks,
            diseaseCounts
        });
    } catch (error) {
        console.error("Error checking outbreak status:", error);
        return next(new ErrorHandler("Failed to check outbreak status", 500));
    }
});

export const vouchReport = catchAsyncErrors(async (req, res, next) => {
    try {
        const { alertId, userName } = req.body;

        if (!alertId || !userName) {
            return next(new ErrorHandler("Alert ID and user name are required", 400));
        }

        const report = await healthAlert.findById(alertId);
        
        if (!report) {
            return next(new ErrorHandler("Report not found", 404));
        }

        // Update status to 1 (vouched) and add the user who vouched
        report.status = 1;
        report.vouchedBy = userName;
        await report.save();

        res.status(200).json({
            success: true,
            message: "Report vouched successfully",
            report
        });
    } catch (error) {
        console.error("Error in vouchReport:", error);
        return next(new ErrorHandler("Failed to vouch report", 500));
    }
});

export const rejectReport = catchAsyncErrors(async (req, res, next) => {
    try {
        const { alertId, userName } = req.body;

        if (!alertId || !userName) {
            return next(new ErrorHandler("Alert ID and user name are required", 400));
        }

        const report = await healthAlert.findById(alertId);
        
        if (!report) {
            return next(new ErrorHandler("Report not found", 404));
        }

        // Update status to 2 (rejected) and add the user who rejected
        report.status = 2;
        report.vouchedBy = userName;
        await report.save();

        res.status(200).json({
            success: true,
            message: "Report rejected successfully",
            report
        });
    } catch (error) {
        console.error("Error in rejectReport:", error);
        return next(new ErrorHandler("Failed to reject report", 500));
    }
});

export const deleteReport = catchAsyncErrors(async (req, res, next) => {
    try {
        const { alertId } = req.body;

        if (!alertId) {
            return next(new ErrorHandler("Alert ID is required", 400));
        }

        const report = await healthAlert.findById(alertId);
        
        if (!report) {
            return next(new ErrorHandler("Report not found", 404));
        }

        await healthAlert.findByIdAndDelete(alertId);

        res.status(200).json({
            success: true,
            message: "Report deleted successfully"
        });
    } catch (error) {
        console.error("Error in deleteReport:", error);
        return next(new ErrorHandler("Failed to delete report", 500));
    }
});

export const deleteAllProcessedReports = catchAsyncErrors(async (req, res, next) => {
    try {
        const { status } = req.body;
        
        if (status !== 1 && status !== 2) {
            return next(new ErrorHandler("Invalid status. Only vouched (1) or rejected (2) reports can be deleted", 400));
        }

        const statusText = status === 1 ? "vouched" : "rejected";
        
        const result = await healthAlert.deleteMany({ status });
        
        res.status(200).json({
            success: true,
            message: `Successfully deleted ${result.deletedCount} ${statusText} reports`,
            count: result.deletedCount
        });
    } catch (error) {
        console.error("Error in deleteAllProcessedReports:", error);
        return next(new ErrorHandler("Failed to delete reports", 500));
    }
});
