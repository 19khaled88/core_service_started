import {
  OfferedCourseClassSchedule,
  OfferedCourseSection
} from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';

// const createOfferedClassSchedule = async (
//   payload: OfferedCourseClassSchedule
// ) => {
//   const result = await prisma.offeredCourseClassSchedule.findMany({
//     where: {
//       AND: [
//         {
//           startTime: { lte: payload?.endTime },
//           endTime: { gte: payload?.startTime }
//         },
//         {
//           startTime: { gte: payload?.startTime },
//           endTime: { lte: payload?.endTime }
//         },
//         { dayOfWeek: payload.dayOfWeek }
//       ]
//     }
//   });
//   console.log(result);
// };

const createOfferedClassSchedule = async (
  payload: OfferedCourseClassSchedule
): Promise<OfferedCourseClassSchedule> => {
  //
  const response = await prisma.$transaction(async transactionClient => {
    const isExist = await transactionClient.offeredCourseClassSchedule.findMany(
      {
        where: {
          AND: [
            {
              startTime: { lte: payload?.endTime },
              endTime: { gte: payload?.startTime }
            },
            {
              startTime: { gte: payload?.startTime },
              endTime: { lte: payload?.endTime }
            },
            { dayOfWeek: payload.dayOfWeek },
            { roomId: payload.roomId }
            // {facultyId:payload.facultyId}
          ]
        }
      }
    );

    if (
      (Object.keys(isExist).length > 0 &&
        isExist[0].dayOfWeek === payload.dayOfWeek) ||
      (Object.keys(isExist).length > 0 && isExist[0].roomId === payload.roomId)
    ) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'This class schedule already exist'
      );
    }
    const result = await transactionClient.offeredCourseClassSchedule.create({
      data: payload,
      include: {
        faculty: true,
        offeredCourseSection: true,
        room: true,
        semesterRegistration: true
      }
    });
    return result;
  });

  return response;
};

const getOfferedClassSchedules = async (
  options: IPaginationOptions
): Promise<IGenericResponse<OfferedCourseClassSchedule[] | undefined>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const result = await prisma.offeredCourseClassSchedule.findMany({
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder
          }
        : { createdAt: 'asc' }
  });
  const total = await prisma.offeredCourseClassSchedule.count();

  return {
    meta: {
      limit,
      page,
      total
    },
    data: result
  };
};

const getOfferedClassSchedule = async (
  id: string
): Promise<OfferedCourseClassSchedule | null> => {
  const result = await prisma.offeredCourseClassSchedule.findUnique({
    where: {
      id: id
    }
  });
  return result;
};

const deleteOfferedClassSchedule = async (
  id: string
): Promise<OfferedCourseClassSchedule | null> => {
  const result = await prisma.offeredCourseClassSchedule.delete({
    where: {
      id: id
    }
  });
  return result;
};

const updateOfferedClassSchedule = async (
  payload: Partial<OfferedCourseClassSchedule>,
  id: string
): Promise<OfferedCourseClassSchedule | null> => {
  const result = await prisma.offeredCourseClassSchedule.update({
    where: {
      id: id
    },
    data: payload
  });
  return result;
};

export const OfferedCourseClassScheduleService = {
  createOfferedClassSchedule,
  getOfferedClassSchedules,
  getOfferedClassSchedule,
  updateOfferedClassSchedule,
  deleteOfferedClassSchedule
};
