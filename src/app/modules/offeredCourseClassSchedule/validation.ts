import { z } from 'zod';

enum WeekDays {
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY'
}

const create = z.object({
  body: z.object({
    startTime: z.string({
      required_error: 'Max capacity is required or field not match'
    }),
    endTime: z.string({
      required_error: 'Title is required or field not match'
    }),
    dayOfWeek: z.nativeEnum(WeekDays),
    // dayOfWeek:z.enum(([
    //   WeekDays.SATURDAY,
    //   WeekDays.SUNDAY,
    //   WeekDays.MONDAY,
    //   WeekDays.TUESDAY,
    //   WeekDays.WEDNESDAY,
    //   WeekDays.THURSDAY,
    //   WeekDays.FRIDAY
    // ])),
    offeredCourseSectionId: z.string({
      required_error: 'Semester registration ID is required or field not match'
    }),
    semesterRegistrationId: z.string({
      required_error: 'Semester registration ID is required or field not match'
    }),
    roomId: z.string({
      required_error: 'Semester registration ID is required or field not match'
    }),
    facultyId: z.string({
      required_error: 'Semester registration ID is required or field not match'
    })
  })
});

export const OfferCourseClassScheduleValidation = {
  create
};
