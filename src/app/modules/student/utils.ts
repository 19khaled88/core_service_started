import prisma from '../../../shared/prisma';

const findLastStudent = async () => {
  const isExist = await prisma.student.findFirst({
    orderBy: {
      createAt: 'desc'
    },
    select: { id: true }
  });
  
  return isExist?.id ? isExist.id.substring(4) : undefined;
};

export const generateStudentId = async () => {
  const currentId =
    (await findLastStudent()) || (0).toString().padStart(5, '0');
   
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  return incrementedId
};
