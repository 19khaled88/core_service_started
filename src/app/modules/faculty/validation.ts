import { z } from 'zod';

const validation = z.object({
    body: z.object({
        firstName: z.string({
            required_error: 'Title is required or field not match'
        }),
        lastName: z.string({
            required_error: 'Academic Faculty Id is required or field not match'
        }),
        middleName: z.string({
            required_error: 'Academic Faculty Id is required or field not match'
        }),
        profileImage: z.string({
            required_error: 'Field data not match'
        }).optional(),
        email: z.string({
            required_error: 'Academic Faculty Id is required or field not match'
        }),
        contactNo: z.string({
            required_error: 'Academic Faculty Id is required or field not match'
        }),
        gender: z.string({
            required_error: 'Academic Faculty Id is required or field not match'
        }),
        bloodGroup: z.string({
            required_error: 'Academic Faculty Id is required or field not match'
        }),
        designation: z.string({
            required_error: 'Academic Faculty Id is required or field not match'
        }),
        academicDepartmentId: z.string({
            required_error: 'Academic Faculty Id is required or field not match'
        }),
        academicFacultyId: z.string({
            required_error: 'Academic Faculty Id is required or field not match'
        })

    })
});

export const FacultyValidation = {
    validation
}