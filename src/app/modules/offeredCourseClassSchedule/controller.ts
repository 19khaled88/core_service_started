import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';

import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { OfferedClassSchedulesOptionsQuery } from './constrants';
import { OfferedCourseClassScheduleService } from './service';

const createOfferedCourseClassSchedule = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await OfferedCourseClassScheduleService.createOfferedClassSchedule(
        req.body
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Created offered course class schedule',
      data: result
    });
  }
);

const getOfferedClassSchedules = catchAsync(
  async (req: Request, res: Response) => {
    const options = pick(req.query,OfferedClassSchedulesOptionsQuery)
    const result = await OfferedCourseClassScheduleService.getOfferedClassSchedules(options);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Fetched offered Class schedules',
      data: result
    });
  }
);

const getOfferedClassSchedule =catchAsync(async(req: Request, res: Response)=>{
    const result = await OfferedCourseClassScheduleService.getOfferedClassSchedule(req.params.id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Fetched offered Class schedule for given ID',
        data: result
      });
})

const deleteOfferedClassSchedule =catchAsync(async(req: Request, res: Response)=>{
    const result = await OfferedCourseClassScheduleService.deleteOfferedClassSchedule(req.params.id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Deleted offered class schedule for given ID',
        data: result
      });
})

const updateOfferedClassSchedule =catchAsync(async(req: Request, res: Response)=>{
    const result = await OfferedCourseClassScheduleService.updateOfferedClassSchedule(req.body,req.params.id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Updated offered class schedule for given ID',
        data: result
      });
})

export const OfferedCourseClassScheduleController = {
  createOfferedCourseClassSchedule,
  getOfferedClassSchedules,
  getOfferedClassSchedule,
  deleteOfferedClassSchedule,
  updateOfferedClassSchedule
};
