import { z } from 'zod';

const create = z.object({
  body: z.object({
    year: z.number({
      required_error: 'Year is required or field not match'
    }),
    title: z.string({
      required_error: 'title is required or field not match'
    }),
    code: z.string({
      required_error: 'code is required or field not match'
    }),
    startMonth: z.string({
      required_error: 'Start month is required or field not match'
    }),
    endMonth: z.string({
      required_error: 'End month is required or field not match'
    })
  })
});

export const AcademicValidation = {
  create
};
