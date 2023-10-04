import { z } from 'zod';

const studentValidation = z.object({
  body: z.object({
    studentId: z
      .string({
        required_error: 'studentId is required or field not match'
      })
      .optional(),
    firstName: z.string({
      required_error: 'firstName is required or field not match'
    }),
    lastName: z.string({
      required_error: 'lastName is required or field not match'
    }),
    middleName: z.string({
      required_error: 'middleName month is required or field not match'
    }),
    profileImage: z
      .string({
        required_error: 'profileImage is required or field not match'
      })
      .optional(),
    email: z.string({
      required_error: 'email is required or field not match'
    }),
    contactNo: z.string({
      required_error: 'contactNo is required or field not match'
    }),
    gender: z.string({
      required_error: 'gender is required or field not match'
    }),
    bloodGroup: z.string({
      required_error: 'bloodGroup is required or field not match'
    })
  })
});
export const StudentValidation = {
  studentValidation
};
