import { Response, Request } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { SemsterRegistrationService } from './service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { SemesterRegistrationOptionsQuery } from './constants';
import prisma from '../../../shared/prisma';

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

const updateTotalCredit = catchAsync(async (req: Request, res: Response) => {
  const result = await SemsterRegistrationService.updateTotalCredit(
    req.body,
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Total credit updated successfully',
    data: result
  });
});

const insertStudentRegistrationIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as any).user;
    const result =
      await SemsterRegistrationService.insertStudentRegistrationIntoDB(
        user.userId
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student semester registration completed',
      data: result
    });
  }
);

const enrollIntoCourse = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await SemsterRegistrationService.entrollCourse(
    user.userId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enroll to course successfull',
    data: result
  });
});

const withdrawCourse = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await SemsterRegistrationService.withdrawCourse(
    user.userId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course withdraw is successfull',
    data: result
  });
});

const confirmRegistration = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await SemsterRegistrationService.confirmRegistration(
    user.userId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Registration completed successfully',
    data: result
  });
});

const getMyRegistration = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await SemsterRegistrationService.getMyRegistration(
    user.userId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My registration retrieved',
    data: result
  });
});

const startNewSemester =catchAsync(async(req:Request, res:Response)=>{
  const {id} = req.params
  const result = await SemsterRegistrationService.startNewSemester(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Start new semester',
    data: result
  });
})

export const SemesterRegistrationController = {
  registerSemester,
  getRegisteredSemesters,
  getRegisteredSemester,
  updateRegisteredSemested,
  deleteRegisteredSemester,
  insertStudentRegistrationIntoDB,
  enrollIntoCourse,
  withdrawCourse,
  confirmRegistration,
  updateTotalCredit,
  getMyRegistration,
  startNewSemester
};
