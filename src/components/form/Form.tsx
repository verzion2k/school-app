import React from "react";
import { FormControl, Button, TextField } from "@mui/material";
import { faker } from "@faker-js/faker";
import { Student } from "../../mockData";

export interface Props {
  createNewStudent: (student: Student) => void;
}

const Form: React.FunctionComponent<Props> = ({ createNewStudent }) => {
  const [name, setName] = React.useState("");
  const [schoolClass, setSchoolClass] = React.useState("");

  const handleStudentNameChange = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setName(event.target.value);
    },
    []
  );
  const handleStudentClassChange = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setSchoolClass(event.target.value);
    },
    []
  );

  const handleClick = React.useCallback(() => {
    if (name !== "" || schoolClass !== "") {
      createNewStudent({
        id: faker.datatype.uuid(),
        name,
        class: {
          id: faker.datatype.uuid(),
          name: schoolClass,
          isEditing: false,
        },
      });
      setName("");
      setSchoolClass("");
    }
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
      <Button
        variant="outlined"
        sx={{ m: 1 }}
        onClick={handleClick}
        disabled={name === "" || schoolClass === ""}
      >
        Create New Student
      </Button>
    </FormControl>
  );
};

export default Form;
