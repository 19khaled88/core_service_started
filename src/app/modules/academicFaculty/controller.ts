import { Request, Response } from "express"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import { AcademicFacultyService } from "./service"
import catchAsync from "../../../shared/catchAsync"
import pick from "../../../shared/pick"
import { AcademicFacultyOptionsQuery } from "./constants"


const createAcademicFaculty =async(req:Request,res:Response)=>{
    try {
        const result = await AcademicFacultyService.createAcademicFaculty(req.body)
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message:'Academic Faculty created successfully',
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

const getAcademicFaculties =catchAsync(async(req:Request,res:Response)=>{
    const options = pick(req.query, AcademicFacultyOptionsQuery);
    const result = await AcademicFacultyService.getAcademicFaculties(options)
    
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Fetched all academic faculties',
        data:result
    })
})

const getAcademicFaculty = catchAsync(async(req:Request,res:Response)=>{
    const result = await AcademicFacultyService.getAcademicFaculty(req.params.id)
    
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Fetched all academic faculties',
        data:result
    })
})

const updateAcademicFaculty = catchAsync(async(req:Request,res:Response)=>{
    const result = await AcademicFacultyService.updateAcademicFaculty(req.body,req.params.id)
   
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'updated academic faculty for given ID',
        data:result
    })
})

const deleteAcademicFaculty = catchAsync(async(req:Request,res:Response)=>{
    const result = await AcademicFacultyService.deleteAcademicFaculty(req.params.id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'deleted academic faculty for given ID',
        data:result
    })
})

export const AcademicFacucltyController ={
    createAcademicFaculty,
    getAcademicFaculties,
    getAcademicFaculty,
    updateAcademicFaculty,
    deleteAcademicFaculty
}