import React from "react";
import { Student, StudentClass, STUDENTS } from "./mockData";
import List from "./components/list/List";
import Form from "./components/form/Form";
import SchoolClassList from "./components/schoolClassList/SchoolClassList";
import { IconButton, TextField } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export interface FilterInput {
  studentName: string;
  className: string;
}

function App() {
  const [students, setStudents] = React.useState<Student[]>(STUDENTS);
  const [schoolClasses, setSchoolClasses] = React.useState<StudentClass[]>([
    ...Array.from(
      new Map(students.map((item) => [item.class["name"], item.class])).values()
    ),
  ]);

  const [filterInput, setFilterInput] = React.useReducer(
    (state: FilterInput, newState: Partial<FilterInput>) => ({
      ...state,
      ...newState,
    }),
    {
      studentName: "",
      className: "",
    }
  );

  React.useEffect(() => {
    setStudents((state) =>
      [...state].sort((a, b) => a.name.localeCompare(b.name))
    );
    setSchoolClasses((state) =>
      [...state].sort((a, b) => a.name.localeCompare(b.name))
    );
  }, []);

  const sortByStudentName = React.useCallback((arr: Student[]) => {
    const sorted = [...arr].sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, []);

  const sortByStudentSchoolName = React.useCallback((arr: StudentClass[]) => {
    const sorted = [...arr].sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, []);

  const createNewClass = React.useCallback(
    (newClass: StudentClass): void => {
      const filteredClass = [
        ...schoolClasses.filter(
          (schoolClass) => schoolClass.name !== newClass.name
        ),
        newClass,
      ];

      const sortedClassNames = sortByStudentSchoolName(filteredClass);

      setSchoolClasses(sortedClassNames);
    },
    [schoolClasses, sortByStudentSchoolName]
  );

  const createNewStudent = React.useCallback(
    (newStudent: Student): void => {
      const newStudentList = [...students, newStudent];
      const sortedList = sortByStudentName(newStudentList);

      createNewClass(newStudent.class);
      setStudents(sortedList);
    },
    [students, sortByStudentName, createNewClass]
  );

  const deleteStudent = React.useCallback(
    (id: string) => {
      const newStudents = students.filter((item) => item.id !== id);
      setStudents(newStudents);
    },
    [students]
  );

  const toggleClassEditing = React.useCallback(
    (id: string) => {
      const newList = schoolClasses.map((item) => {
        if (item.id === id) {
          const updatedItem = {
            ...item,
            isEditing: !item.isEditing,
          };

          return updatedItem;
        }
        return item;
      });

      const newSortedList = sortByStudentSchoolName(newList);

      setSchoolClasses(newSortedList);
    },
    [schoolClasses, sortByStudentSchoolName]
  );

  const handleEditClassChange = React.useCallback(
    (
      studentClass: StudentClass,
      event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      const newClassList = schoolClasses.map((item) => {
        if (item.id === studentClass.id) {
          const updatedItem = {
            ...item,
            name: event.target.value,
            isEditing: true,
          };

          return updatedItem;
        }
        return item;
      });

      const newStudentList = students.map((item) => {
        if (item.class.name === studentClass.name) {
          const updatedItem = {
            ...item,
            class: {
              ...item.class,
              name: event.target.value,
              isEditing: true,
            },
          };

          return updatedItem;
        }
        return item;
      });

      setSchoolClasses(newClassList);
      setStudents(newStudentList);
    },
    [schoolClasses, students]
  );

  const handleEditClassOnEnter = React.useCallback(
    (id: string, event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter") {
        toggleClassEditing(id);
      }
    },
    [toggleClassEditing]
  );

  const removeStudentClass = React.useCallback(
    (id: string) => {
      const newList = schoolClasses.filter((item) => item.id !== id);
      setSchoolClasses(newList);
    },
    [schoolClasses]
  );

  const renderDeleteIcon = React.useCallback(
    (schoolClass: StudentClass) => {
      const isClassEmpty = students.some(
        (e) => e.class.name === schoolClass.name
      );

      return (
        !isClassEmpty && (
          <IconButton onClick={() => removeStudentClass(schoolClass.id)}>
            <DeleteForeverIcon />
          </IconButton>
        )
      );
    },
    [students, removeStudentClass]
  );

  const handleFilterStudents = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const { name, value } = event.target;
      setFilterInput({ [name]: value });
    },
    []
  );

  const filterStudents = React.useCallback(
    (list: Student[]) => {
      return list.filter(
        (item) =>
          item.name
            .toLowerCase()
            .includes(filterInput.studentName.toLowerCase()) &&
          item.class.name
            .toLowerCase()
            .includes(filterInput.className.toLowerCase())
      );
    },
    [filterInput.className, filterInput.studentName]
  );

  const toggleStudentEdit = React.useCallback(
    (id: string) => {
      const editedStudents = students.map((student) => {
        if (student.id === id) {
          return {
            ...student,
            isEditing: !student.isEditing,
          };
        }
        return student;
      });

      const sortedEditedStudents = sortByStudentName(editedStudents);

      setStudents(sortedEditedStudents);
    },
    [students, sortByStudentName]
  );

  const handleStudentEdit = React.useCallback(
    (
      student: Student,
      event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      const newStudentList = students.map((item) => {
        if (item.id === student.id) {
          const updatedItem = {
            ...item,
            name: event.target.value,
            isEditing: true,
          };

          return updatedItem;
        }
        return item;
      });

      setStudents(newStudentList);
    },
    [students]
  );

  const handleEditStudentOnEnter = React.useCallback(
    (id: string, event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter") {
        toggleStudentEdit(id);
      }
    },
    [toggleStudentEdit]
  );

  const handleEditStudentClass = React.useCallback(
    (id: string, value: string) => {
      const newStudentList = students.map((student) => {
        if (student.id === id) {
          return {
            ...student,
            class: {
              ...student.class,
              name: value,
            },
          };
        }
        return student;
      });

      setStudents(newStudentList);
    },
    [students]
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>School APP</h1>
      <Form createNewStudent={createNewStudent} />
      <h2>Classes</h2>
      <SchoolClassList
        classList={schoolClasses}
        handleEdit={handleEditClassChange}
        handleEditOnEnter={handleEditClassOnEnter}
        toggleEditing={toggleClassEditing}
        renderDeleteIcon={renderDeleteIcon}
      />
      <div>
        <TextField
          id="studentName"
          name="studentName"
          label="Search for Student"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleFilterStudents}
          value={filterInput.studentName}
        />
        <TextField
          id="className"
          name="className"
          label="Search for Class"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleFilterStudents}
          value={filterInput.className}
        />
        <List
          students={filterStudents(students)}
          schoolClasses={schoolClasses}
          deleteStudent={deleteStudent}
          toggleStudentEdit={toggleStudentEdit}
          handleEditStudent={handleStudentEdit}
          handleEditStudentOnEnter={handleEditStudentOnEnter}
          handleEditStudentClass={handleEditStudentClass}
        />
      </div>
    </div>
  );
}

export default App;
