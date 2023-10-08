import { Building, Course, CourseFaculty, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';

import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { error } from 'winston';
import handlePrismaClientError from '../../../errors/handlePrismaClientError';

const createBuilding = async (paylod: Building) => {
  const result = await prisma.building.create({
    data: paylod,
    include: {
      rooms: true
    }
  });
  return result;
};

const getAllBuilding = async (
  options: IPaginationOptions
): Promise<IGenericResponse<Building[] | null>> => {
  const { limit, skip, page } = paginationHelpers.calculatePagination(options);
  const result = await prisma.building.findMany({
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
  const total = await prisma.building.count();
  return {
    meta: {
      limit,
      total,
      page
    },
    data: result
  };
};

const getSingleBuilding = async (
  buildingId: string
): Promise<Building | null> => {
  const result = await prisma.building.findFirstOrThrow({
    where: {
      id: buildingId
    }
  });
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    handlePrismaClientError(error);
  }
  return result;
};
const deleteSingleBuilding = async (
  buildingId: string
): Promise<Building | undefined> => {
  const isExist = await prisma.building.findFirstOrThrow({
    where: {
      id: buildingId
    }
  });
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    handlePrismaClientError(error);
  }
  const result = await prisma.building.delete({
    where: {
      id: buildingId
    }
  });
  return result;
};

const updateBuilding = async (
  payload: Partial<Building>,
  id: string
): Promise<Building | null> => {
  const isExist = await prisma.building.findFirstOrThrow({
    where:{
      id:id
    }
  })
  if(error instanceof Prisma.PrismaClientKnownRequestError){
    handlePrismaClientError(error);
  }
  const result = await prisma.building.update({
    where: {
      id: id
    },
    data: payload
  });
  return result;
};

export const BuildingService = {
  createBuilding,
  getAllBuilding,
  getSingleBuilding,
  deleteSingleBuilding,
  updateBuilding
};
