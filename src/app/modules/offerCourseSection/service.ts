import { OfferedCourseSection } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createOfferedCourseSection = async (
  payload: OfferedCourseSection
): Promise<OfferedCourseSection> => {
  const offeredCourseSectionCreate = await prisma.$transaction(
    async transactionClient => {

      const isExistOfferedCourse = await transactionClient.offeredCourse.findFirst({
        where:{
            id:payload.offeredCourseId
        }
      })
    

      if(!isExistOfferedCourse){
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            'This offered course does not exist'
          );
      }
      
      const isExistOfferedSection = await transactionClient.offeredCourseSection.findFirst({
        where: {
          AND: [
            {
              semesterRegistrationId: payload.semesterRegistrationId
            },
            {
              offeredCourseId: payload.offeredCourseId
            }
          ]
        }
      });

      if (isExistOfferedSection) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'This offered course section is already exist'
        );
      }

      //   payload.currentlyEntrolledStudent !== undefined
      //     ? payload.currentlyEntrolledStudent + 1
      //     : (payload.currentlyEntrolledStudent = 0);

      const result = await transactionClient.offeredCourseSection.create({
        data: payload
      });
      return result;
    }
  );
  return offeredCourseSectionCreate;
};

const getOfferedCourseSections = async (
  options: IPaginationOptions
): Promise<IGenericResponse<OfferedCourseSection[] | undefined>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const result = await prisma.offeredCourseSection.findMany({
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder
          }
        : { createdAt: 'asc' }
  });
  const total = await prisma.offeredCourseSection.count();

  return {
    meta: {
      limit,
      page,
      total
    },
    data: result
  };
};

const getOfferedCourseSection = async (
  id: string
): Promise<OfferedCourseSection | null> => {
  const result = await prisma.offeredCourseSection.findUnique({
    where: {
      id: id
    }
  });
  return result;
};

const deleteOfferedCourseSection = async (
  id: string
): Promise<OfferedCourseSection | null> => {
  const result = await prisma.offeredCourseSection.delete({
    where: {
      id: id
    }
  });
  return result;
};

const updateOfferedCourseSection = async (
  payload: Partial<OfferedCourseSection>,
  id: string
): Promise<OfferedCourseSection | null> => {
  const result = await prisma.offeredCourseSection.update({
    where: {
      id: id
    },
    data: payload
  });
  return result;
};

export const OfferedCourseSectionService = {
  createOfferedCourseSection,
  getOfferedCourseSections,
  getOfferedCourseSection,
  updateOfferedCourseSection,
  deleteOfferedCourseSection
};
