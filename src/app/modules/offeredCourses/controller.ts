import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { OfferedCourseSerivce } from './service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { OfferedCourseOptionsQuery } from './constants';

const createofferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseSerivce.createOfferedCourse(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New offered course created',
    data: result
  });
});

const getOfferedCourses = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, OfferedCourseOptionsQuery);
  const result = await OfferedCourseSerivce.getOfferedCourses(options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetched offered courses',
    data: result
  });
});

const getOfferedCourse = catchAsync(async (req: Request, res: Response)=>{
    const result = await OfferedCourseSerivce.getOfferedCourse(req.params.id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Fetched offered course for given ID',
        data:result
    })
})
const deleteOfferedCourse = catchAsync(async (req: Request, res: Response)=>{
    const result = await OfferedCourseSerivce.deleteOfferedCourse(req.params.id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Deleted offered course for given ID',
        data:result
    })
})

const updateOfferedCourse = catchAsync(async (req: Request, res: Response)=>{
    const result = await OfferedCourseSerivce.updateOfferedCourse(req.body,req.params.id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Updated offered course for given ID',
        data:result
    })
})


export const OfferedCourseController = {
  createofferedCourse,
  getOfferedCourses,
  getOfferedCourse,
  deleteOfferedCourse,
  updateOfferedCourse
};
