import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.number({
      required_error: 'Title is required or field not match'
    }),
    code: z.string({
      required_error: 'Code is required or field not match'
    }),
    credits: z.string({
      required_error: 'Credits is required or field not match'
    }),
    courseBefore: z.string({
      required_error: 'CourseBefore is required or field not match'
    }),
    preRequisiteBefore: z.string({
      required_error: 'PreRequisiteBefore is required or field not match'
    })
  })
});
const preRequisite = z.object({
  body: z.object({
    courseId: z.string({
      required_error: 'Course Id is required or field not match'
    }),
    preRequisiteId: z.string({
      required_error: 'Pre-requisite Id is required or field not match'
    })
  })
});

export const CourseValidation = {
  create,preRequisite
};
