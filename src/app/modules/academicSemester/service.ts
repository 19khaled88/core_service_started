import {  AcademicSemester, Prisma } from '@prisma/client';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IAcademicSemesterFilter } from './interface';
import { AcademicSemesterConstants } from './constants';
import prisma from '../../../shared/prisma';



const createAcademicSemester = async (
    insertData: AcademicSemester
): Promise<AcademicSemester> => {
    const result = await prisma.academicSemester.create({
        data: insertData
    });
    return result;
};

const getAllAcademicSemester = async (
    filters: IAcademicSemesterFilter,
    options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
    const { searchTerm, ...filterData } = filters
    const { page, limit, skip } = paginationHelpers.calculatePagination(options)

    const andCondition = []

    if (searchTerm) {
        andCondition.push({
            OR: AcademicSemesterConstants.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }

    if (Object.keys(filterData).length > 0) {
        andCondition.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    }


    const whereCondition: Prisma.AcademicSemesterWhereInput = andCondition.length > 0 ? { AND: andCondition } : {}

    const result = await prisma.academicSemester.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : { createAt: 'asc' }
    });

    const total = await prisma.academicSemester.count();

    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    };
};

const getSingleAcademicSemester=async(id:string):Promise<AcademicSemester | null>=>{
    const result =await prisma.academicSemester.findUnique({
        where:{
            id:id
        }
    })
    return result
}

const updateAcademicSemester=async(payload:Partial<AcademicSemester>,id:string):Promise<AcademicSemester>=>{
    const result =await prisma.academicSemester.update({
        where:{
            id:id
        },
        data:payload
        
    })
    return result
}

const deleteAcademicSemester=async(id:string):Promise<AcademicSemester>=>{
    const result =await prisma.academicSemester.delete({
        where:{
            id:id
        }
    })
    return result
}

export const AcademicSemesterService = {
    createAcademicSemester,
    getAllAcademicSemester,
    getSingleAcademicSemester,
    updateAcademicSemester,
    deleteAcademicSemester
};
