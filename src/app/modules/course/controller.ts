import { Request, Response } from 'express';
import { CourseService } from './service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { CourseOptionsQuery } from './constants';

const createCouse = async (req: Request, res: Response) => {
  const result = await CourseService.createCourse(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'new couse created',
    data: result
  });
};

const getAllCourse = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, CourseOptionsQuery);
  const result = await CourseService.getAllCourse(options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetched all courses',
    data: result
  });
});

const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.getSingleCourse(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetch course for given Id',
    data: result
  });
});

const updateCouse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.updateCouse(req.body, req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated for given ID',
    data: result
  });
});

const assignFaculties = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.assignFaculties(
    req.body.faculties,
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetched Assigned faculties',
    data: result
  });
});

const deleteFaculties = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.deleteFaculties(
    req.body.faculties,
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted faculties',
    data: result
  });
});

export const CourseController = {
  createCouse,
  getAllCourse,
  getSingleCourse,
  updateCouse,
  assignFaculties,
  deleteFaculties
};
