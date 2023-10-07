import { z } from 'zod';

const create = z.object({
  body: z.object({
    maxCapacity: z.number({
      required_error: 'Max capacity is required or field not match'
    }),
    title: z.string({
      required_error: 'Title is required or field not match'
    }),
    offeredCourseId: z.string({
      required_error: 'Offered course ID is required or field not match'
    }),
    semesterRegistrationId: z.string({
      required_error: 'Semester registration ID is required or field not match'
    })
  })
});

export const OfferCourseSectionValidation = {
  create
};
