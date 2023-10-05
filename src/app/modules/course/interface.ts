export type ICourse = {
  title: string;
  code: string;
  credits: string;
  preRequisiteCourses: { courseId: string; isDeleted?: null }[];
};
