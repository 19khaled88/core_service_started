import prisma from '../../../shared/prisma';
import { Student } from '@prisma/client';
import { generateStudentId } from './utils';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';

const createStudent = async (studentData: Student): Promise<Student> => {
    const student_id = await generateStudentId();
    studentData.studentId = !studentData.studentId
        ? student_id
        : studentData.studentId;

    const result = await prisma.student.create({
        data: studentData
    });
    return result;
};

const getAllStudent = async (
    options: IPaginationOptions
): Promise<IGenericResponse<Student[]>> => {
    const { limit, page, skip } = paginationHelpers.calculatePagination(options)

    const result = await prisma.student.findMany({
        skip,
        take:limit,
        orderBy:options.sortBy && options.sortOrder ? {
            [options.sortBy]:options.sortOrder
        } : {createAt:'asc'}
    });
    const total = await prisma.student.count()
    return {
        meta: {
            limit,
            page,
            total
        },
        data: result
    }
};

const getSingleStudent = async (id: string): Promise<Student | null> => {
    const result = await prisma.student.findUnique({
        where: {
            id: id
        }
    });
    return result;
};

const updateStudent = async (
    payload: Partial<Student>,
    id: string
): Promise<Student> => {
    const result = await prisma.student.update({
        where: {
            id: id
        },
        data: payload
    });
    return result;
};

const deleteStudent = async (id: string): Promise<Student> => {
    const result = await prisma.student.delete({
        where: {
            id: id
        }
    });
    return result;
};

export const StudentService = {
    createStudent,
    getAllStudent,
    getSingleStudent,
    updateStudent,
    deleteStudent
};
