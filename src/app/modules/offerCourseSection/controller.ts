import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { OfferedCourseSectionService } from './service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { OfferedCourseSectionOptionsQuery } from './constrants';

const createOfferedCourseSection = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OfferedCourseSectionService.createOfferedCourseSection(
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'created offered course section',
      data: result
    });
  }
);

const getOfferedCourseSections = catchAsync(
  async (req: Request, res: Response) => {
    const options = pick(req.query,OfferedCourseSectionOptionsQuery)
    const result = await OfferedCourseSectionService.getOfferedCourseSections(options);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Fetched offered course sections',
      data: result
    });
  }
);

const getOfferedCourseSection =catchAsync(async(req: Request, res: Response)=>{
    const result = await OfferedCourseSectionService.getOfferedCourseSection(req.params.id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Fetched offered course section for given ID',
        data: result
      });
})

const deleteOfferedCourseSection =catchAsync(async(req: Request, res: Response)=>{
    const result = await OfferedCourseSectionService.deleteOfferedCourseSection(req.params.id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Fetched offered course section for given ID',
        data: result
      });
})

const updateOfferedCourseSection =catchAsync(async(req: Request, res: Response)=>{
    const result = await OfferedCourseSectionService.updateOfferedCourseSection(req.body,req.params.id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Fetched offered course section for given ID',
        data: result
      });
})

export const OfferedCourseSectionController = {
  createOfferedCourseSection,
  getOfferedCourseSections,
  getOfferedCourseSection,
  deleteOfferedCourseSection,
  updateOfferedCourseSection
};
