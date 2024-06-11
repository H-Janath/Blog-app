export const errorHandler = (statusCode , message)=>{
    console.log("hjaa")
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
}