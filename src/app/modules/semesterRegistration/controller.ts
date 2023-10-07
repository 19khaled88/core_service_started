import { Response, Request } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { SemsterRegistrationService } from './service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { SemesterRegistrationOptionsQuery } from './constants';

const registerSemester = catchAsync(async (req: Request, res: Response) => {
  const result = await SemsterRegistrationService.registerSemester(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester registered successfully!',
    data: result
  });
});

const getRegisteredSemesters = catchAsync(
  async (req: Request, res: Response) => {
    const options = pick(req.query, SemesterRegistrationOptionsQuery);
    const result = await SemsterRegistrationService.getRegisteredSemesters(
      options
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'semester registered successfully!',
      data: result
    });
  }
);

const getRegisteredSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SemsterRegistrationService.getRegisteredSemester(
      req.params.id
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester registered successfully!',
      data: result
    });
  }
);

const deleteRegisteredSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SemsterRegistrationService.deleteRegisteredSemester(
      req.params.id
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: '',
      data: result
    });
  }
);

const updateRegisteredSemested = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SemsterRegistrationService.updateRegisteredSemester(
      req.body,
      req.params.id
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Registered semester updated successfully!!',
      data: result
    });
  }
);

export const SemesterRegistrationController = {
  registerSemester,
  getRegisteredSemesters,
  getRegisteredSemester,
  updateRegisteredSemested,
  deleteRegisteredSemester
};
