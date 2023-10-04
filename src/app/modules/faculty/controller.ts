import { Request, Response } from "express"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import { FacultyService } from "./service"
import catchAsync from "../../../shared/catchAsync"
import pick from "../../../shared/pick"
import { FacultyOptionsQuery } from "./constants"


const createFaculty =async(req:Request,res:Response)=>{
    try {
        const result = await FacultyService.createFaculty(req.body)
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message:'Academic Department created successfully',
            data:result
        })
    } catch (error) {
        sendResponse(res,{
            statusCode:httpStatus.NOT_FOUND,
            success:false,
            message:'Not created successfully',
            data:error
        })
    }
}

const getFaculties =catchAsync(async(req:Request,res:Response)=>{
    const options = pick(req.query, FacultyOptionsQuery);
    const result = await FacultyService.getFaculties(options)
    
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Fetched all academic departments',
        data:result
    })
})

const getFaculty = catchAsync(async(req:Request,res:Response)=>{
    const result = await FacultyService.getFaculty(req.params.id)
    
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Fetched all academic departments',
        data:result
    })
})

const updateFaculty = catchAsync(async(req:Request,res:Response)=>{
    const result = await FacultyService.updateFaculty(req.body,req.params.id)
   
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'updated academic department for given ID',
        data:result
    })
})

const deleteFaculty = catchAsync(async(req:Request,res:Response)=>{
    const result = await FacultyService.deleteFaculty(req.params.id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'deleted academic department for given ID',
        data:result
    })
})

export const FacultyController ={
    createFaculty,
    getFaculties,
    getFaculty,
    updateFaculty,
    deleteFaculty
}