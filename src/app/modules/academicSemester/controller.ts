import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AcademicSemester } from '@prisma/client';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import {
    AcademicSemesterFilterQuery,
    AcademicSemesterOptionsQuery
} from './constants';

const createAcademicSemester = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await AcademicSemesterService.createAcademicSemester(
            req.body
        );
        sendResponse<AcademicSemester>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic Semester created successfully',
            data: result
        });
    } catch (error) {
        next(error);
    }
};

const getAcademicSemester = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, AcademicSemesterFilterQuery);
    const options = pick(req.query, AcademicSemesterOptionsQuery);

    const result = await AcademicSemesterService.getAllAcademicSemester(
        filters,
        options
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester data fetched',
        meta: result.meta,
        data: result.data
    });
});

const getSingleAcademiSemester = catchAsync(
    async (req: Request, res: Response) => {
        const result = await AcademicSemesterService.getSingleAcademicSemester(
            req.params.id
        );
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic semester data for given ID fetched',
            data: result
        });
    }
);

const updateAcademicSemester = catchAsync(async (req: Request, res: Response) => {
    const result = await AcademicSemesterService.updateAcademicSemester(req.body, req.params.id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic semester updated successfully for given ID',
        data: result
    })
})

const deleteAcademicSemester = catchAsync(async (req: Request, res: Response) => {
    const result = await AcademicSemesterService.deleteAcademicSemester(req.params.id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic semester deleted successfully for given ID',
        data: result
    })
})

export const AcademicSemesterController = {
    createAcademicSemester,
    getAcademicSemester,
    getSingleAcademiSemester,
    updateAcademicSemester,
    deleteAcademicSemester
};
