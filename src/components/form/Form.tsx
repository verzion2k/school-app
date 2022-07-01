import React from "react";
import { FormControl, Button, TextField } from "@mui/material";
import { faker } from "@faker-js/faker";
import { Student, StudentClass } from "../../mockData";

export interface Props {
  createNewStudent: (student: Student) => void;
}

const Form: React.FunctionComponent<Props> = ({
  createNewStudent,
}) => {
  const [name, setName] = React.useState<string>("");
  const [schoolClass, setSchoolClass] = React.useState<string>("");

  const handleStudentNameChange = React.useCallback((event: any) => {
    setName(event.target.value);
  }, []);
  const handleStudentClassChange = React.useCallback((event: any) => {
    setSchoolClass(event.target.value);
  }, []);

  const handleClick = React.useCallback(() => {
    createNewStudent({
      id: faker.datatype.uuid(),
      name,
      class: {
        id: faker.datatype.uuid(),
        name: schoolClass,
        isEditing: false,
      },
    });
  }, [name, schoolClass, createNewStudent]);

  return (
    <FormControl>
      <TextField
        id="student-name"
        label="Student name"
        variant="outlined"
        sx={{ m: 1 }}
        onChange={handleStudentNameChange}
        value={name}
      />
      <TextField
        id="student-class"
        label="Class name"
        variant="outlined"
        sx={{ m: 1 }}
        onChange={handleStudentClassChange}
        value={schoolClass}
      />
      <Button variant="outlined" sx={{ m: 1 }} onClick={handleClick}>
        Create New Student
      </Button>
    </FormControl>
  );
};

export default Form;
