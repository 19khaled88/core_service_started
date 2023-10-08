import express from 'express';
import { BuildingController } from './controller';
import validateRequest from '../../middlewares/validateRequest';
import { BuildingValidation } from './validation';

const router = express.Router();

router.get('/single/:id', BuildingController.getSingleBuilding);
router.put('/update/:id', BuildingController.updateBuilding);
router.delete('/delete/:id', BuildingController.deleteBuilding);
router.post(
  '/create',
  validateRequest(BuildingValidation.create),
  BuildingController.createBuilding
);
router.get('/all', BuildingController.getAllBuildings);

export const BuildingRouter = router;
