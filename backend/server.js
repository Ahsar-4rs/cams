import app from "./app.js"
import cloudinary from "cloudinary"
//install packages-npm install express mongoose jsonwebtoken cors express-fileupload bcrypt cloudinary cookie-parser validator dotenv

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT,()=>{
    console.log(`Server listening on port ${process.env.PORT}`);
});

