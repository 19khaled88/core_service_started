import { Request, Response } from "express";
import { StudentService } from "./service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import prisma from "../../../shared/prisma";
import pick from "../../../shared/pick";
import { StudentOptionsQuery } from "./constants";

const createStudent = async (req: Request, res: Response) => {

    const result = await StudentService.createStudent(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "New student account created",
        data: result
    })

}

const getAllStudent = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, StudentOptionsQuery)
    const result = await StudentService.getAllStudent(options)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Students fetched',
        data: result
    })
})

const singleStudent = catchAsync(async (req: Request, res: Response) => {
    const result = await StudentService.getSingleStudent(req.params.id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Fetched single studnet for given ID',
        data: result
    })
})

const updateStudent = catchAsync(async (req: Request, res: Response) => {
    const result = await StudentService.updateStudent(req.body, req.params.id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'student updated for given ID',
        data: result
    })
})

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
    const result = await StudentService.deleteStudent(req.params.id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'student deleted for given ID',
        data: result
    })
})

export const StudnetController = {
    createStudent,
    getAllStudent,
    singleStudent,
    updateStudent,
    deleteStudent
}