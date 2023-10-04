import prisma from '../../../shared/prisma';

const findLastFaculty = async () => {
  const isExist = await prisma.faculty.findFirst({
    orderBy: {
      createAt: 'desc'
    },
    select: { facultyId: true }
  });
  
  return isExist?.facultyId ? isExist.facultyId.substring(4) : undefined;
};

export const generateFacultyId = async () => {
  const currentId =
    (await findLastFaculty()) || (0).toString().padStart(5, '0');
   
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  return incrementedId
};
