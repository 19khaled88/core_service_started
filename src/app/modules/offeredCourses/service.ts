import { OfferedCourse } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IOfferedCourse } from './interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';

const createOfferedCourse = async (
  payload: IOfferedCourse
): Promise<OfferedCourse[] | undefined> => {
  const { courseIds, academicDepartmentId, semesterRegistrationId } = payload;

  const allOfferCourses = await prisma.$transaction(async transactionClient => {
    const array = [];

    // const isExist = transactionClient.offeredCourse.findFirst({
    //     where:{

    //     }
    // })

    for (let index = 0; index < courseIds.length; index++) {
      const isExist = await transactionClient.offeredCourse.findFirst({
        where: {
          academicDepartmentId,
          semesterRegistrationId,
          courseId: courseIds[index]
        }
      });
      if (!isExist) {
        const inserted = await transactionClient.offeredCourse.create({
          data: {
            academicDepartmentId,
            semesterRegistrationId,
            courseId: courseIds[index]
          }
        });
        array.push(inserted.id);
      }

    }
    return array;
  });

  if (allOfferCourses) {
    const result = await prisma.offeredCourse.findMany({
      where: {
        //   AND: allOfferCourses.map(item => ({ id: item }))
        id: {
          in: allOfferCourses
        }
      }
    });

    return result;
  }
  throw new ApiError(httpStatus.BAD_REQUEST, 'Offered course not created');
};

const getOfferedCourses = async (
  options: IPaginationOptions
): Promise<IGenericResponse<OfferedCourse[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const result = await prisma.offeredCourse.findMany({
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder
          }
        : { createdAt: 'asc' }
  });
  const total = await prisma.offeredCourse.count();
  return {
    meta: {
      total,
      page,
      limit
    },
    data: result
  };
};

const getOfferedCourse = async (id: string) => {
  const result = await prisma.offeredCourse.findUnique({
    where: {
      id: id
    }
  });
  return result;
};

const deleteOfferedCourse = async (id: string) => {
  const result = await prisma.offeredCourse.delete({
    where: {
      id: id
    }
  });
  return result;
};

const updateOfferedCourse = async (
  payload: Partial<OfferedCourse>,
  id: string
) => {
  const result = await prisma.offeredCourse.update({
    where: {
      id: id
    },
    data: payload
  });
  return result;
};

export const OfferedCourseSerivce = {
  createOfferedCourse,
  getOfferedCourses,
  getOfferedCourse,
  deleteOfferedCourse,
  updateOfferedCourse
};
