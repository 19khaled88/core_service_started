import prisma from "../../../shared/prisma"
import { Student } from '@prisma/client'
import { generateStudentId } from "./utils"

const createStudent = async (studentData: Student):Promise<Student> => {

    const student_id=await generateStudentId()
    studentData.studentId = !studentData.studentId ? student_id : studentData.studentId
    
    const result = await prisma.student.create({
        data: studentData
    })
    return result
}

const getAllStudent = async (): Promise<Student[]> => {
    const result = await prisma.student.findMany()
    return result
}

const getSingleStudent = async (id: string): Promise<Student | null> => {
    const result = await prisma.student.findUnique({
        where: {
            id: id
        }
    })
    return result
}

const updateStudent = async (payload: Partial<Student>,id:string):Promise<Student> => {
    const result = await prisma.student.update({
        where: {
            id: id
        },
        data: payload
    })
    return result
}

const deleteStudent =async(id:string):Promise<Student>=>{
    const result = await prisma.student.delete({
        where:{
            id:id
        }
    })
    return result
}

export const StudentService = {
    createStudent,
    getAllStudent,
    getSingleStudent,
    updateStudent,
    deleteStudent
}