import { AcademicFaculty } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";

const createAcademicFaculty =async(academicFaculty:AcademicFaculty):Promise<AcademicFaculty>=>{
    const result = await prisma.academicFaculty.create({
        data:academicFaculty
    })
    return result
}

const getAcademicFaculties =async(
    options:IPaginationOptions
):Promise<IGenericResponse<AcademicFaculty[]>>=>{
    const {limit,page,skip} = paginationHelpers.calculatePagination(options)
    
    const result = await prisma.academicFaculty.findMany({
        skip,
        take:limit,
        orderBy: options.sortOrder && options.sortBy ? {
            [options.sortBy]:options.sortOrder
        }: {createAt:'asc'}
    })
    const total = await prisma.academicFaculty.count()
    return {
        meta:{
            limit,
            page,
            total
        },
        data:result
    }
}

const getAcademicFaculty =async(academicFacultyId:string):Promise<AcademicFaculty | null>=>{
    const result = await prisma.academicFaculty.findUnique({
        where:{
            id:academicFacultyId
        }
    })
    return result
}

const updateAcademicFaculty =async (payload:Partial<AcademicFaculty>, id:string):Promise<AcademicFaculty> => {
    const result = await prisma.academicFaculty.update({
        where:{
            id:id
        },
        data:payload
    })
    return result
}

const deleteAcademicFaculty = async(id:string):Promise<AcademicFaculty>=>{
    const result = await prisma.academicFaculty.delete({
        where:{
            id:id
        }
    })
    return result
}
export const AcademicFacultyService ={
    createAcademicFaculty,
    getAcademicFaculties,
    getAcademicFaculty,
    updateAcademicFaculty,
    deleteAcademicFaculty
}