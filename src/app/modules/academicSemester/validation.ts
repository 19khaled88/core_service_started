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
const modify = z.object({
    body: z.object({
        year: z
            .number({
                required_error: 'Data not match'
            }).min(4,"Please enter a valid value").optional(),
        title: z
            .string({
                required_error: 'Data not match'
            })
            .optional(),
        code: z
            .string({
                required_error: 'Data not match'
            })
            .optional(),
        startMonth: z
            .string({
                required_error: 'Data not match'
            })
            .optional(),
        endMonth: z
            .string({
                required_error: 'Data not match'
            })
            .optional()
    })
});

export const AcademicValidation = {
    create, modify
};
