import { Request, Response } from 'express';

import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { RoomOptionsQuery } from './constants';
import { RoomService } from './service';

const createRoom = async (req: Request, res: Response) => {
  const result = await RoomService.createRoom(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New room created',
    data: result
  });
};

const getRooms = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, RoomOptionsQuery);
  const result = await RoomService.getRooms(options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetched all rooms',
    data: result
  });
});

const getRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomService.getRoom(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetch room for given Id',
    data: result
  });
});

const deleteRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomService.deleteRoom(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room deleted for given ID',
    data: result
  });
});
const updateRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomService.updateRoom(req.body, req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room updated for given ID',
    data: result
  });
});

export const RoomController = {
  createRoom,
  getRoom,
  getRooms,
  deleteRoom,
  updateRoom
};
