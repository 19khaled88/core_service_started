import { z } from 'zod';

const create = z.object({
  body: z.object({
    courseIds: z.string({
      required_error: 'Course ID is required or field not match'
    }).array(),
    academicDepartmentId: z.string({
      required_error: 'Academic Department is required or field not match'
    }),
    semesterRegistrationId: z.string({
      required_error: 'Semester Registration is required or field not match'
    })
  })
});

export const OfferCourseValidation = {
  create
};
