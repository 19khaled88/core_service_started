import { NextFunction, Request, Response } from "express";
import { AcademicSemesterService } from "./service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import {AcademicSemester} from '@prisma/client'
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";


const createAcademicSemester = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const result = await AcademicSemesterService.createAcademicSemester(req.body)
        sendResponse<AcademicSemester>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic Semester created successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getAcademicSemester =catchAsync(async(req:Request,res:Response)=>{
    const filters =pick(req.query, ['searchTerm','code','startMonth','endMonth'])
    const options=pick(req.query,['limit','page','sortBy','sortOrder'])
    
    const result = await AcademicSemesterService.getAllAcademicSemester(filters,options)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Academic Semester data fetched',
        meta:result.meta,
        data:result.data
    })
})

export const AcademicSemesterController = {
    createAcademicSemester,
    getAcademicSemester
}