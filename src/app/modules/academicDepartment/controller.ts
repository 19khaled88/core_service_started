import { Request, Response } from "express"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import { AcademicDepartmentService } from "./service"
import catchAsync from "../../../shared/catchAsync"
import pick from "../../../shared/pick"
import { AcademicDepartmentOptionsQuery } from "./constants"


const createAcademicDepartment =async(req:Request,res:Response)=>{
    try {
        const result = await AcademicDepartmentService.createAcademicDepartment(req.body)
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

const getAcademicDepartments =catchAsync(async(req:Request,res:Response)=>{
    const options = pick(req.query, AcademicDepartmentOptionsQuery);
    const result = await AcademicDepartmentService.getAcademicDepartments(options)
    
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Fetched all academic departments',
        data:result
    })
})

const getAcademicDepartment = catchAsync(async(req:Request,res:Response)=>{
    const result = await AcademicDepartmentService.getAcademicDepartment(req.params.id)
    
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Fetched all academic departments',
        data:result
    })
})

const updateAcademicDepartment = catchAsync(async(req:Request,res:Response)=>{
    const result = await AcademicDepartmentService.updateAcademicDepartment(req.body,req.params.id)
   
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'updated academic department for given ID',
        data:result
    })
})

const deleteAcademicDepartment = catchAsync(async(req:Request,res:Response)=>{
    const result = await AcademicDepartmentService.deleteAcademicDepartment(req.params.id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'deleted academic department for given ID',
        data:result
    })
})

export const AcademicDepartmentController ={
    createAcademicDepartment,
    getAcademicDepartments,
    getAcademicDepartment,
    updateAcademicDepartment,
    deleteAcademicDepartment
}