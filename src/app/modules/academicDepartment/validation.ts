import { z } from 'zod';

const validation = z.object({
    body: z.object({
        title: z.string({
            required_error: 'Title is required or field not match'
        }),
        academicFacultyId:z.string({
            required_error: 'Academic Faculty Id is required or field not match'
        })
       
    })
});

export const AcademicDepartmentValidation ={
    validation
}