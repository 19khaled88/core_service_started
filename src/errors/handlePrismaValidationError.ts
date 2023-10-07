import { Prisma } from "@prisma/client";
import { IGenericErrorResponse } from "../interfaces/common";


const handlePrismaValidationError =(
    error:Prisma.PrismaClientValidationError
):IGenericErrorResponse=>{
    const errors = [{
        path:"",
        message:error.message
    }]

    const statusCode = 400;
    return {
        statusCode,
        message:'Validation Error',
        errorMessages:errors
    }
}

export default handlePrismaValidationError