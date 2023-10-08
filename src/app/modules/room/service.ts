import { Prisma, Room } from '@prisma/client';
import prisma from '../../../shared/prisma';

import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import handlePrismaClientError from '../../../errors/handlePrismaClientError';
import { error } from 'winston';

const createRoom = async (payload: Room): Promise<Room | undefined> => {
  const result = await prisma.room.create({
    data: payload
  });
  return result;
};

const getRooms = async (
  options: IPaginationOptions
): Promise<IGenericResponse<Room[] | null>> => {
  const { limit, skip, page } = paginationHelpers.calculatePagination(options);
  const result = await prisma.room.findMany({
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder
          }
        : {
            createdAt: 'asc'
          },
    include:{
      building:true,
      offeredCourseClassSchedules:true
    }
  });
  const total = await prisma.room.count();
  return {
    meta: {
      limit,
      total,
      page
    },
    data: result
  };
};

const getRoom = async (roomId: string): Promise<Room | null> => {
  const result = await prisma.room.findFirstOrThrow({
    where: {
      id: roomId
    }
  });
  if (!result && error instanceof Prisma.PrismaClientKnownRequestError) {
    handlePrismaClientError(error);
  }
  return result;
};

const deleteRoom = async (roomId: string): Promise<Room> => {
  const response = await prisma.$transaction(async transactionClient => {
    const isExist = await transactionClient.room.findFirstOrThrow({
      where: {
        id: roomId
      }
    });
    if (!isExist && error instanceof Prisma.PrismaClientKnownRequestError) {
      handlePrismaClientError(error);
    }

    const result = await transactionClient.room.delete({
      where: {
        id: roomId
      }
    });
    return result;
  });
  return response;
};

const updateRoom = async (
  payload: Partial<Room>,
  roomId: string
): Promise<Room> => {
  const response = await prisma.$transaction(async transactionClient => {
    const isExist = await transactionClient.room.findFirstOrThrow({
      where: {
        id: roomId
      }
    });
    if (!isExist && error instanceof Prisma.PrismaClientKnownRequestError) {
      handlePrismaClientError(error);
    }

    const result = await transactionClient.room.update({
      where: {
        id: roomId
      },
      data: payload
    });
    return result;
  });
  return response;
};

export const RoomService = {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom
};
