import {
  SemesterRegistration,
  SemesterRegistrationStatus
} from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';

const registerSemester = async (
  payload: SemesterRegistration
): Promise<SemesterRegistration> => {
  const isSemesterRegistrationExist =
    await prisma.semesterRegistration.findFirst({
      where: {
        OR: [
          {
            status: SemesterRegistrationStatus.UPCOMMING
          },
          {
            status: SemesterRegistrationStatus.ONGOING
          }
        ]
      }
    });
  if (isSemesterRegistrationExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `This Semester alreay in ${isSemesterRegistrationExist.status} state`
    );
  }
  const result = prisma.semesterRegistration.create({
    data: payload
  });
  return result;
};

const getRegisteredSemesters = async (
  options: IPaginationOptions
): Promise<IGenericResponse<SemesterRegistration[] | null>> => {
  const { skip, limit, page } = paginationHelpers.calculatePagination(options);
  const result = await prisma.semesterRegistration.findMany({
    skip,
    take: limit
  });
  const total = await prisma.semesterRegistration.count();
  return {
    meta: {
      total,
      page,
      limit
    },
    data: result
  };
};

const getRegisteredSemester = async (
  id: string
): Promise<SemesterRegistration | null> => {
  const result = await prisma.semesterRegistration.findUnique({
    where: {
      id: id
    }
  });
  return result;
};

const deleteRegisteredSemester = async (id: string) => {
  const result = await prisma.semesterRegistration.delete({
    where: {
      id: id
    }
  });
  return result;
};

const updateRegisteredSemester = async (
  payload: Partial<SemesterRegistration>,
  id: string
): Promise<SemesterRegistration | null> => {
  const result = await prisma.semesterRegistration.update({
    where: {
      id: id
    },
    data: payload
  });
  return result;
};

export const SemsterRegistrationService = {
  registerSemester,
  getRegisteredSemester,
  getRegisteredSemesters,
  deleteRegisteredSemester,
  updateRegisteredSemester
};
