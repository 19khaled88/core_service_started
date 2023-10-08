import express from 'express';
import { RoomController } from './controller';
import validateRequest from '../../middlewares/validateRequest';
import { RoomValidation } from './validation';

const router = express.Router();

router.get('/single/:id', RoomController.getRoom);
router.put('/update/:id', RoomController.updateRoom);
router.delete('/delete/:id', RoomController.deleteRoom);
router.post('/create',validateRequest(RoomValidation.create), RoomController.createRoom);
router.get('/all', RoomController.getRooms);

export const RoomRouter = router;
