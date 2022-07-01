import React from "react";
import { Student, StudentClass, STUDENTS, STUDENT_CLASSES } from "./mockData";
import List from "./components/list/List";
import Form from "./components/form/Form";
import { IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function App() {
  const [students, setStudents] = React.useState<Student[]>(STUDENTS);
  const [schoolClasses, setSchoolClasses] = React.useState<StudentClass[]>([
    ...Array.from(
      new Map(students.map((item) => [item.class["name"], item.class])).values()
    ),
  ]);

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
    [students, sortByStudentName]
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
/*       const newList = schoolClasses.map((item) => {
        if (item.id === id) {
          const updatedItem = {
            ...item,
            isEditing: !item.isEditing,
          };

          return updatedItem;
        }
        return item;
      });

      setSchoolClasses(newList); */
    },
    []
  );

  const handleEditClassChange = React.useCallback((id: string, event: any) => {
    const newList = schoolClasses.map((item) => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          name: event.target.value,
          isEditing: true,
        };

        return updatedItem;
      }
      return item;
    });

    setSchoolClasses(newList);
  }, []);

  const handleEditClassOnEnter = React.useCallback(
    (id: string, event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter") {
        toggleClassEditing(id);
      }
    },
    [toggleClassEditing]
  );

  const editName = React.useCallback(() => {}, []);

  const removeStudentClass = React.useCallback(
    (id: string) => {
      const newList = schoolClasses.filter((item) => item.id !== id);
      setSchoolClasses(newList);
    },
    [schoolClasses]
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>School APP</h1>
      <Form createNewStudent={createNewStudent} />
      <h2>Classes</h2>
      {schoolClasses.map((schoolClass) => (
        <div style={{ display: "flex" }} key={schoolClass.id}>
          {schoolClass.isEditing ? (
            <TextField
              id="student-name"
              label="Student name"
              variant="outlined"
              sx={{ m: 1 }}
              onChange={(event) => handleEditClassChange(schoolClass.id, event)}
              /*               onKeyDown={(event) =>
                handleEditClassOnEnter(schoolClass.id, event)
              }
              onBlur={() => toggleClassEditing(schoolClass.id)} */
              value={schoolClass.name}
            />
          ) : (
            <p style={{ padding: "20px" }}>{schoolClass.name}</p>
          )}
          <IconButton onClick={() => toggleClassEditing(schoolClass.id)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => removeStudentClass(schoolClass.id)}>
            <DeleteForeverIcon />
          </IconButton>
        </div>
      ))}

      <List students={students} deleteStudent={deleteStudent} />
    </div>
  );
}

export default App;
