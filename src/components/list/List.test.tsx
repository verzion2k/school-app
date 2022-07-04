import { render, fireEvent } from "@testing-library/react";
import { Student, StudentClass } from "../../mockData";
import List from "./List";

const MOCK_STUDENTS: Student[] = [
  {
    id: "1",
    name: "test name",
    class: {
      id: "1.2",
      name: "test class",
      isEditing: false,
    },
  },
  {
    id: "2",
    name: "test name2",
    class: {
      id: "2.2",
      name: "test class2",
      isEditing: false,
    },
  },
  {
    id: "3",
    name: "test name3",
    class: {
      id: "3.2",
      name: "test class3",
      isEditing: true,
    },
  },
];

const MOCK_STUDENT_CLASSES: StudentClass[] = [
  ...Array.from(
    new Map(
      MOCK_STUDENTS.map((item) => [item.class["name"], item.class])
    ).values()
  ),
];

it("should render list", () => {
  const { getByText } = render(
    <List
      students={MOCK_STUDENTS}
      schoolClasses={MOCK_STUDENT_CLASSES}
      deleteStudent={jest.fn()}
      toggleStudentEdit={jest.fn()}
      handleEditStudent={jest.fn()}
      handleEditStudentOnEnter={jest.fn()}
      handleEditStudentClass={jest.fn()}
    />
  );
  const student = getByText(/test name2/);

  expect(student).toBeInTheDocument();
});

it("should call delete student fn", () => {
  const mockDeleteStudent = jest.fn();
  const { getByRole } = render(
    <List
      students={MOCK_STUDENTS}
      schoolClasses={MOCK_STUDENT_CLASSES}
      deleteStudent={mockDeleteStudent}
      toggleStudentEdit={jest.fn()}
      handleEditStudent={jest.fn()}
      handleEditStudentOnEnter={jest.fn()}
      handleEditStudentClass={jest.fn()}
    />
  );

  const button = getByRole(/button/, { name: "test name2" });

  fireEvent.click(button);

  expect(mockDeleteStudent).toHaveBeenCalled();
});
