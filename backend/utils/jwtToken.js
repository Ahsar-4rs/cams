import jwt from 'jsonwebtoken'
export const generateToken = (user, message, statusCode, res) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });

    res.status(statusCode).json({
        success: true,
        message,
        token,
        user,
    });
};
