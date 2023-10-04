import { Faculty } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { generateFacultyId } from "./utils";


const createFaculty = async (faculty: Faculty): Promise<Faculty> => {
    const faculty_id =await generateFacultyId()
    faculty.facultyId = !faculty.facultyId ? faculty_id : faculty.facultyId 
    const result = await prisma.faculty.create({
        data: faculty
    })
    return result
}

const getFaculties = async (
    options: IPaginationOptions
): Promise<IGenericResponse<Faculty[]>> => {
    const { limit, page, skip } = paginationHelpers.calculatePagination(options)

    const result = await prisma.faculty.findMany({
        skip,
        take: limit,
        orderBy: options.sortOrder && options.sortBy ? {
            [options.sortBy]: options.sortOrder
        } : { createAt: 'asc' }
    })
    const total = await prisma.faculty.count()
    return {
        meta: {
            limit,
            page,
            total
        },
        data: result
    }
}

const getFaculty = async (facultyId: string): Promise<Faculty | null> => {
    const result = await prisma.faculty.findUnique({
        where: {
            id: facultyId
        }
    })
    return result
}

const updateFaculty = async (payload: Partial<Faculty>, id: string): Promise<Faculty> => {

    const result = await prisma.faculty.update({
        where: {
            id: id
        },
        data: payload
    })
    return result
}

const deleteFaculty = async (id: string): Promise<Faculty> => {
    const result = await prisma.faculty.delete({
        where: {
            id: id
        }
    })
    return result
}
export const FacultyService = {
    createFaculty,
    getFaculties,
    getFaculty,
    deleteFaculty,
    updateFaculty
}