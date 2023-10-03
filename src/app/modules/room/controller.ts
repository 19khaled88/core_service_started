import { Request, Response } from 'express';
import { RoomService } from './service';

const createRoom = async (req: Request, res: Response) => {
  const result = await RoomService.createRoom(req.body);
  res.status(200).json(result);
};

export const RoomController = {
  createRoom
};
