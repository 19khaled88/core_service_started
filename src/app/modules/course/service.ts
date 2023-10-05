import { Course } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { ICourse } from './interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';

const createCourse = async (
  course: ICourse
): Promise<Course | undefined | null> => {
  const { preRequisiteCourses, ...courseData } = course;

  const newCourse = await prisma.$transaction(async transacionClient => {
    const result = await transacionClient.course.create({
      data: courseData
    });
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create course');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      for (let index = 0; index < preRequisiteCourses.length; index++) {
        const createPrerequisite =
          await transacionClient.courseToPrerequisit.create({
            data: {
              courseId: result.id,
              preRequisiteId: preRequisiteCourses[index].courseId
            }
          });
      }
    }
    return result;
  });
  if (newCourse) {
    const responseData = await prisma.course.findUnique({
      where: {
        id: newCourse.id
      },
      include: {
        courseBefore: {
          include: {
            preRequisite: true,
            course: true
          }
        },
        preRequisiteBefore: {
          include: {
            course: true,
            preRequisite: true
          }
        }
      }
    });

    return responseData;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create new course');
};

const getAllCourse = async (
  options: IPaginationOptions
): Promise<IGenericResponse<Course[] | null>> => {
  const { limit, skip, page } = paginationHelpers.calculatePagination(options);
  const result = await prisma.course.findMany({
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder
          }
        : {
            createdAt: 'asc'
          }
  });
  const total = await prisma.course.count();
  return {
    meta: {
      limit,
      total,
      page
    },
    data: result
  };
};

const getSingleCourse = async (courseId: string): Promise<Course | null> => {
  const result = await prisma.course.findUnique({
    where: {
      id: courseId
    }
  });
  return result;
};

// const updateCouse = async (payload: Partial<ICourse>, id: string):Promise<Course> => {
//   const { preRequisiteCourses, ...courseData } = payload;

//   const result = prisma.course.update({
//     where: {
//       id: id
//     },
//     data: courseData
//   });
//   return result;
// };

const updateCouse = async (
  payload: Partial<ICourse>,
  id: string
): Promise<Course | null> => {
  const { preRequisiteCourses, ...courseData } = payload;

  const updatedCourse = await prisma.$transaction(async transactionClient => {
    const result = transactionClient.course.update({
      where: {
        id: id
      },
      data: courseData
    });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to update course');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deleteData = preRequisiteCourses.filter(
        courseInfo => courseInfo.courseId && courseInfo.isDeleted
      );
      const insertData = preRequisiteCourses.filter(
        courseInfo => courseInfo.courseId && !courseInfo.isDeleted
      );

      for (let index = 0; index < deleteData.length; index++) {
        await transactionClient.courseToPrerequisit.deleteMany({
          where: {
            AND: [
              {
                courseId: id
              },
              {
                preRequisiteId: deleteData[index].courseId
              }
            ]
          }
        });
      }

      for (let index = 0; index < insertData.length; index++) {
        await transactionClient.courseToPrerequisit.createMany({
          data: {
            courseId: id,
            preRequisiteId: insertData[index].courseId
          }
        });
      }
    }

    return result;
  });
  return updatedCourse;
};

export const CourseService = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCouse
};
