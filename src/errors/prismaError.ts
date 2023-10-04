import { Prisma } from "@prisma/client";
import { IGenericErrorMessage } from "../interfaces/error";
// const prismaError = (error) => {
//     // const errors: IGenericErrorMessage[] = [
//     //   {
//     //     path: error.path,
//     //     message: 'Invalid Id',
//     //   },
//     // ];

  
//     const statusCode = 400;
//     return {
//       statusCode,
//       message: 'Cast Error',
//       errorMessages: errors,
//     };
//   };
  
//   export default prismaError;

const prismaError=(error:Prisma.PrismaClientKnownRequestError)=>{
const errors: IGenericErrorMessage[] = [
      {
        path: "",
        message: error.meta,
      },
    ];
    const statusCode = 400;
        return {
          statusCode,
          message: 'Prisma Client known request error',
          errorMessages: errors,
        };
}
export default prismaError;