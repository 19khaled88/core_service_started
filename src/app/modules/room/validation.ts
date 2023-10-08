import { z } from 'zod';

const create = z.object({
  body: z.object({
    roomNumber: z.string({
      required_error: 'Room number is required or field not match'
    }),
    floor: z.string({
      required_error: 'Floor is required or field not match'
    }),
    buildingId: z.string({
      required_error: 'Building Id is required or field not match'
    })
  })
});


export const RoomValidation = {
  create
};
