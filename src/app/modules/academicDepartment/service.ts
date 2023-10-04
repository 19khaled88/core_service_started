import { AcademicDepartment } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";

const createAcademicDepartment =async(academicDepartment:AcademicDepartment):Promise<AcademicDepartment>=>{
    const result = await prisma.academicDepartment.create({
        data:academicDepartment
    })
    return result
}

const getAcademicDepartments =async(
    options:IPaginationOptions
):Promise<IGenericResponse<AcademicDepartment[]>>=>{
    const {limit,page,skip} = paginationHelpers.calculatePagination(options)
    
    const result = await prisma.academicDepartment.findMany({
        skip,
        take:limit,
        orderBy: options.sortOrder && options.sortBy ? {
            [options.sortBy]:options.sortOrder
        }: {createAt:'asc'}
    })
    const total = await prisma.academicDepartment.count()
    return {
        meta:{
            limit,
            page,
            total
        },
        data:result
    }
}

const getAcademicDepartment =async(academicDepartmentId:string):Promise<AcademicDepartment | null>=>{
    const result = await prisma.academicDepartment.findUnique({
        where:{
            id:academicDepartmentId
        }
    })
    return result
}

const updateAcademicDepartment =async (payload:Partial<AcademicDepartment>, id:string):Promise<AcademicDepartment> => {
   
    const result = await prisma.academicDepartment.update({
        where:{
            id:id
        },
        data:payload
    })
    return result
}

const deleteAcademicDepartment = async(id:string):Promise<AcademicDepartment>=>{
    const result = await prisma.academicDepartment.delete({
        where:{
            id:id
        }
    })
    return result
}
export const AcademicDepartmentService ={
    createAcademicDepartment,
    getAcademicDepartments,
    getAcademicDepartment,
    updateAcademicDepartment,
    deleteAcademicDepartment
}