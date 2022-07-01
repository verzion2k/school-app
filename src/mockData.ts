import { faker } from "@faker-js/faker";

export interface Student {
  id: string;
  name: string;
  class: StudentClass;
}

export interface StudentClass {
  id: string;
  name: string;
  isEditing: boolean;
}

export const CLASSES: string[] = ["a", "b", "c", "d"];
export const STUDENT_CLASSES: StudentClass[] = [];
export const STUDENTS: Student[] = [];

export function createRandomStudentClass(): StudentClass {
  return {
    id: faker.datatype.uuid(),
    name: faker.helpers.arrayElement(CLASSES),
    isEditing: false,
  };
}

export function createRandomStudent(): Student {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    class: createRandomStudentClass(),
  };
}

Array.from({ length: 10 }).forEach(() => {
  STUDENTS.push(createRandomStudent());
});

Array.from({ length: 10 }).forEach(() => {
  STUDENT_CLASSES.push(createRandomStudentClass());
});
