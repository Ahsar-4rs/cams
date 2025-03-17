export const generateToken =(user, message, statusCode, res)=>{
    const token= user.generateJsonWebToken();
    const cookieName =user.role
}