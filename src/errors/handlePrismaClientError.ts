import { Prisma } from "@prisma/client";
import { IGenericErrorResponse } from "../interfaces/common";
import { IGenericErrorMessage } from "../interfaces/error";


const handlePrismaClientError =(
    error:Prisma.PrismaClientKnownRequestError
)=>{
    let errors:IGenericErrorMessage[] = []
    let message =""
    let statusCode = 400;
    
    if(error.code = 'P2025'){
        message = (error.meta?.cause as string) 
        errors = [
            {
                path:"",
                message:error.message
            }
        ]
    }else if(error.code = 'P2002'){
        message=(error.meta?.cause as string) 
        errors = [
            {
                path:"",
                message:error.message
            }
        ]
    } else {
        message = 'Record not found!'
        errors = [
            {
                path:"",
                message:'Record not found'
            }
        ]
    }


    return {
        statusCode,
        message,
        errorMessages:errors
    }
}

export default handlePrismaClientError