import { Request, Response } from 'express';
import { BuildingService } from './service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { BuildingOptionsQuery } from './constants';

const createBuilding = async (req: Request, res: Response) => {
  const result = await BuildingService.createBuilding(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New Building Created',
    data: result
  });
};

const getAllBuildings = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, BuildingOptionsQuery);
  const result = await BuildingService.getAllBuilding(options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetched all Buildings',
    data: result
  });
});

const getSingleBuilding = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.getSingleBuilding(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetched building for given Id',
    data: result
  });
});

const updateBuilding = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.updateBuilding(req.body, req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building updated for given ID',
    data: result
  });
});



const deleteBuilding = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.deleteSingleBuilding(req.params.id);
 
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted building',
    data: result
  });
});

export const BuildingController = {
  createBuilding,
  getAllBuildings,
  getSingleBuilding,
  deleteBuilding,
  updateBuilding
};
