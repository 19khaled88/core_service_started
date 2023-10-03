import { NextFunction, Request, Response } from "express";
import { AcademicSemesterService } from "./service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import {AcademicSemester} from '@prisma/client'


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

export const AcademicSemesterController = {
    createAcademicSemester
}