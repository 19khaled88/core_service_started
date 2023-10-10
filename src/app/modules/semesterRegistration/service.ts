import {
  Course,
  OfferedCourse,
  SemesterRegistration,
  SemesterRegistrationStatus,
  StudentSemesterRegistration,
  StudentSemesterRegistrationCourse
} from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';

const registerSemester = async (
  payload: SemesterRegistration
): Promise<SemesterRegistration> => {
  const isSemesterRegistrationExist =
    await prisma.semesterRegistration.findFirst({
      where: {
        AND: [
          {
            academicSemesterId: payload.academicSemesterId
          },
          {
            OR: [
              {
                status: SemesterRegistrationStatus.UPCOMMING
              },
              {
                status: SemesterRegistrationStatus.ONGOING
              }
            ]
          }
        ]
      }
    });
  if (isSemesterRegistrationExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `This Semester alreay in ${isSemesterRegistrationExist.status} state`
    );
  }
  const result = prisma.semesterRegistration.create({
    data: payload
  });
  return result;
};

const getRegisteredSemesters = async (
  options: IPaginationOptions
): Promise<IGenericResponse<SemesterRegistration[] | null>> => {
  const { skip, limit, page } = paginationHelpers.calculatePagination(options);
  const result = await prisma.semesterRegistration.findMany({
    skip,
    take: limit
  });
  const total = await prisma.semesterRegistration.count();
  return {
    meta: {
      total,
      page,
      limit
    },
    data: result
  };
};

const getRegisteredSemester = async (
  id: string
): Promise<SemesterRegistration | null> => {
  const result = await prisma.semesterRegistration.findUnique({
    where: {
      id: id
    }
  });
  return result;
};

const deleteRegisteredSemester = async (id: string) => {
  const result = await prisma.semesterRegistration.delete({
    where: {
      id: id
    }
  });
  return result;
};

const updateRegisteredSemester = async (
  payload: Partial<SemesterRegistration>,
  id: string
): Promise<SemesterRegistration | null> => {
  const result = await prisma.semesterRegistration.update({
    where: {
      id: id
    },
    data: payload
  });
  return result;
};

const insertStudentRegistrationIntoDB = async (
  id: string
): Promise<{
  semesterRegistration: SemesterRegistration | null;
  studentSemesterRegistration: StudentSemesterRegistration | null;
}> => {
  const studentInfo = await prisma.student.findFirst({
    where: {
      studentId: id
    }
  });
  if (!studentInfo) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Student info not found');
  }

  const semesterRegistrationInfo = await prisma.semesterRegistration.findFirst({
    where: {
      status: {
        in: [
          SemesterRegistrationStatus.ONGOING,
          SemesterRegistrationStatus.UPCOMMING
        ]
      }
    }
  });

  const isAlreadyRegistered =
    await prisma.studentSemesterRegistration.findFirst({
      where: {
        student: {
          id: studentInfo?.id
        },
        semesterRegistration: {
          id: semesterRegistrationInfo?.id
        }
      }
    });

  if (isAlreadyRegistered && isAlreadyRegistered !== null) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You are already registered');
  }

  if (
    semesterRegistrationInfo?.status === SemesterRegistrationStatus.UPCOMMING
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Registration is not started yet'
    );
  }

  const studentRegistration = await prisma.studentSemesterRegistration.create({
    data: {
      student: {
        connect: {
          id: studentInfo?.id
        }
      },
      semesterRegistration: {
        connect: {
          id: semesterRegistrationInfo?.id
        }
      }
    }
  });
  return {
    semesterRegistration: semesterRegistrationInfo,
    studentSemesterRegistration: studentRegistration
  };
};

const updateTotalCredit = async (
  payload: Partial<StudentSemesterRegistration>,
  id: string
) => {
  console.log(payload, id);
  // const result = await prisma.studentSemesterRegistration.update({
  //   where:{
  //     id:id
  //   },
  //   data:payload
  // })
  // return result
};

const entrollCourse = async (
  id: string,
  payload: { offeredCourseId: string; offeredCourseSectionId: string }
): Promise<{ message: string }> => {
  const student = await prisma.student.findFirst({
    where: {
      studentId: id
    }
  });

  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This student not found');
  }

  const semesterRegistration = await prisma.semesterRegistration.findFirst({
    where: {
      status: SemesterRegistrationStatus.ONGOING
    }
  });

  if (!semesterRegistration) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This semster not opened yet');
  }

  const offeredCourse = await prisma.offeredCourse.findFirst({
    where: {
      id: payload.offeredCourseId
    },
    include: {
      course: true
    }
  });

  if (!offeredCourse) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This offered course not found');
  }

  const offeredCourseSection = await prisma.offeredCourseSection.findFirst({
    where: {
      id: payload.offeredCourseSectionId
    }
  });

  if (!offeredCourseSection) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'This offered course section not found'
    );
  }

  if (
    offeredCourseSection.maxCapacity &&
    offeredCourseSection.currentlyEntrolledStudent &&
    offeredCourseSection.currentlyEntrolledStudent >=
      offeredCourseSection.maxCapacity
  ) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'This enrollment is not eligible to procede with'
    );
  }

  const response = await prisma.$transaction(async transiactionClient => {
    const enroll =
      await transiactionClient.studentSemesterRegistrationCourse.create({
        data: {
          studentId: student?.id,
          semesterRegistrationId: semesterRegistration?.id,
          offeredCourseId: payload.offeredCourseId,
          offeredCourseSectionId: payload.offeredCourseSectionId
        }
      });

    await transiactionClient.offeredCourseSection.update({
      where: {
        id: payload.offeredCourseSectionId
      },
      data: {
        currentlyEntrolledStudent: {
          increment: 1
        }
      }
    });

    await transiactionClient.studentSemesterRegistration.updateMany({
      where: {
        student: {
          id: student.id
        },
        semesterRegistration: {
          id: semesterRegistration.id
        }
      },
      data: {
        totalCreditsTaken: {
          increment: parseInt(offeredCourse.course.credits)
        }
      }
    });

    return enroll;
  });

  return { message: 'Course enrolled successfully' };
};

const withdrawCourse = async (
  id: string,
  payload: { offeredCourseId: string; offeredCourseSectionId: string }
): Promise<{ message: string }> => {
  const student = await prisma.student.findFirst({
    where: {
      studentId: id
    }
  });

  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This student not found');
  }

  const semesterRegistration = await prisma.semesterRegistration.findFirst({
    where: {
      status: SemesterRegistrationStatus.ONGOING
    }
  });

  if (!semesterRegistration) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This semster not opened yet');
  }

  const offeredCourse = await prisma.offeredCourse.findFirst({
    where: {
      id: payload.offeredCourseId
    },
    include: {
      course: true
    }
  });

  if (!offeredCourse) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This offered course not found');
  }

  const response = await prisma.$transaction(async transiactionClient => {
    const enroll =
      await transiactionClient.studentSemesterRegistrationCourse.delete({
        where: {
          semesterRegistrationId_studentId_offeredCourseSectionId: {
            semesterRegistrationId: semesterRegistration?.id,
            studentId: student?.id,
            offeredCourseSectionId: payload.offeredCourseSectionId
          }
        }
      });

    await transiactionClient.offeredCourseSection.update({
      where: {
        id: payload.offeredCourseSectionId
      },
      data: {
        currentlyEntrolledStudent: {
          decrement: 1
        }
      }
    });

    await transiactionClient.studentSemesterRegistration.updateMany({
      where: {
        student: {
          id: student.id
        },
        semesterRegistration: {
          id: semesterRegistration.id
        }
      },
      data: {
        totalCreditsTaken: {
          decrement: parseInt(offeredCourse.course.credits)
        }
      }
    });

    return enroll;
  });

  return {
    message: 'successfully withdraw the course'
  };
};

const confirmRegistration = async (
  id: string
): Promise<{ message: string }> => {
  const semesterRegistration = await prisma.semesterRegistration.findFirst({
    where: {
      status: SemesterRegistrationStatus.ONGOING
    }
  });

  if (!semesterRegistration) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No any ongoing semester found');
  }

  const studentSememsterRegistration =
    await prisma.studentSemesterRegistration.findFirst({
      where: {
        semesterRegistration: {
          id: semesterRegistration?.id
        },
        student: {
          studentId: id
        }
      }
    });

  if (!studentSememsterRegistration) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'This user is not eligible to confirm registration'
    );
  }

  if (studentSememsterRegistration.totalCreditsTaken === 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'This user does not have enough credits to proceed on '
    );
  }

  if (
    studentSememsterRegistration.totalCreditsTaken &&
    semesterRegistration.maxCredit &&
    semesterRegistration.minCredit &&
    (studentSememsterRegistration.totalCreditsTaken <
      semesterRegistration.minCredit ||
      studentSememsterRegistration.totalCreditsTaken >
        semesterRegistration.maxCredit)
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `you can enroll only for ${semesterRegistration.minCredit} to ${semesterRegistration.maxCredit} `
    );
  }

  await prisma.studentSemesterRegistration.update({
    where: {
      id: studentSememsterRegistration.id
    },
    data: {
      isConfirmed: true
    }
  });

  return {
    message: 'Registration completed successfully!!'
  };
};

const getMyRegistration = async (id: string) => {
  const semesterRegistration = await prisma.semesterRegistration.findFirst({
    where: {
      status: SemesterRegistrationStatus.ONGOING
    },
    include: {
      academicSemester: true
    }
  });

  const studentSemesterRegistration =
    await prisma.studentSemesterRegistration.findFirst({
      where: {
        student: {
          studentId: id
        },
        semesterRegistration: {
          id: semesterRegistration?.id
        }
      },
      include: {
        student: true
      }
    });

  return { semesterRegistration, studentSemesterRegistration };
};

const startNewSemester = async (id: string) => {
  const semesterRegistration = await prisma.semesterRegistration.findUnique({
    where: {
      id
    },
    include: {
      academicSemester: true
    }
  });
  if (!semesterRegistration) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'No semester found for given id'
    );
  }

  if (semesterRegistration.status !== SemesterRegistrationStatus.ENDED) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Current semester not ended yet'
    );
  }

  if (semesterRegistration.academicSemester.isCurrent) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Semester is aleady running');
  }

  const response = await prisma.$transaction(async transactionClient => {
    await transactionClient.academicSemester.updateMany({
      where: {
        isCurrent: true
      },
      data: {
        isCurrent: false
      }
    });

    await prisma.academicSemester.update({
      where: {
        id: semesterRegistration.academicSemester.id
      },
      data: {
        isCurrent: true
      }
    });

    await prisma.semesterRegistration.update({
      where: {
        id
      },
      data: {
        status: SemesterRegistrationStatus.ONGOING
      }
    });

    const studentSemesterRegistrations =
      await transactionClient.studentSemesterRegistration.findMany({
        where: {
          semesterRegistration: {
            id
          },
          isConfirmed: true
        }
      });

    studentSemesterRegistrations.map(async studentSemesterRegistration => {
      const studentSemesterRegistrationCourses =
        await prisma.studentSemesterRegistrationCourse.findMany({
          where: {
            semesterRegistration: {
              id: id
            },
            student: {
              id: studentSemesterRegistration.studentId
            }
          },
          include: {
            offeredCourse: {
              include: {
                course: true
              }
            }
          }
        });
      // console.log(studentSemesterRegistrationCourses)

      studentSemesterRegistrationCourses.map(
        async (
          item: StudentSemesterRegistrationCourse & {
            offeredCourse: OfferedCourse & {
              course: Course;
            };
          }
        ) => {
          const isExistEnrolledCourse =
            await prisma.studentEntrolledCourse.findFirst({
              where: {
                studentId: item.studentId,
                courseId: item.offeredCourse.courseId,
                academicSemesterId: semesterRegistration.academicSemesterId
              }
            });
            if(isExistEnrolledCourse){
              throw new ApiError(httpStatus.BAD_REQUEST,'Already course enrolled for this student')
            }
          const enrolledCourseData = {
            studentId: item.studentId,
            courseId: item.offeredCourse.courseId,
            academicSemesterId: semesterRegistration.academicSemesterId
          };

          await transactionClient.studentEntrolledCourse.create({
            data: enrolledCourseData
          });
        }
      );
    });
  });

  return {
    message: 'Status updated successfully'
  };
};

export const SemsterRegistrationService = {
  registerSemester,
  getRegisteredSemester,
  getRegisteredSemesters,
  deleteRegisteredSemester,
  updateRegisteredSemester,
  insertStudentRegistrationIntoDB,
  entrollCourse,
  withdrawCourse,
  confirmRegistration,
  updateTotalCredit,
  getMyRegistration,
  startNewSemester
};
