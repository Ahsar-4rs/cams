import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { diseaseGroup } from "../models/diseaseGroupSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";


export const addDiseaseGroup = catchAsyncErrors(async (req, res, next) => {
    try {
        console.log("Request Body:", req.body);

        const { disease, symptoms, prescriptions } = req.body;


        if (!disease || !symptoms) {
            return next(new ErrorHandler("Please provide all required fields: disease and symptoms", 400));
        }


        const newGroup = await diseaseGroup.create({
            disease,
            symptoms,
            prescriptions: prescriptions || "Not specified", // Default value
            totalMembers: 0 // Initial members count
        });

        console.log("Disease Group Created:", newGroup);

        res.status(200).json({
            success: true,
            message: "Disease Group added successfully!",
            group: newGroup
        });

    } catch (error) {
        console.error("Error in postDiseaseGroup:", error);
        return next(new ErrorHandler(error.message || "Server Error", 500));
    }
});


export const getDiseaseGroups = catchAsyncErrors(async (req, res) => {
    try {
        const groups = await diseaseGroup.find(); // Fetch all groups from DB
        res.status(200).json(groups);
    } catch (error) {
        console.error("Error fetching disease groups:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export const getDiseaseName = catchAsyncErrors(async (req, res, next) => {
    try {
        const group = await diseaseGroup.findOne({groupID:req.params.groupID}); 
        if (!group) return res.status(404).json({ error: "Group not found" });

        res.json({ disease: group.disease }); 
    } catch (error) {
        console.error("Error fetching disease name:", error);
        return next(new ErrorHandler(error.message || "Server Error", 500));
    }
});