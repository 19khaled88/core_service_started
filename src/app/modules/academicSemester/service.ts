import { PrismaClient,AcademicSemester } from "@prisma/client";

const prisma = new PrismaClient();

const createAcademicSemester = async(insertData:AcademicSemester):Promise<AcademicSemester>=>{
    const result = await prisma.academicSemester.create({
        data:insertData
    })
    return result
}

export const AcademicSemesterService = {
    createAcademicSemester
}