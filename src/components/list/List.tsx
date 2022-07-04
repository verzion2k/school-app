import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { Student, StudentClass } from "../../mockData";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

export interface Props {
  students: Student[];
  schoolClasses: StudentClass[];
  deleteStudent: (id: string) => void;
  toggleStudentEdit: (id: string) => void;
  handleEditStudent: (
    student: Student,
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleEditStudentOnEnter: (
    id: string,
    event: React.KeyboardEvent<HTMLDivElement>
  ) => void;
  handleEditStudentClass: (id: string, value: string) => void;
}

const List: React.FunctionComponent<Props> = ({
  students,
  schoolClasses,
  deleteStudent,
  toggleStudentEdit,
  handleEditStudent,
  handleEditStudentOnEnter,
  handleEditStudentClass,
}) => {
  const handleDeleteStudent = React.useCallback(
    (id: string) => {
      deleteStudent(id);
    },
    [deleteStudent]
  );

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Student Name</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Class</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>
                {student.isEditing ? (
                  <TextField
                    id="student-name-edit"
                    label="Student Name"
                    variant="outlined"
                    sx={{ m: 1 }}
                    onChange={(event) => handleEditStudent(student, event)}
                    onKeyDown={(event) =>
                      handleEditStudentOnEnter(student.id, event)
                    }
                    value={student.name}
                  />
                ) : (
                  student.name
                )}
              </TableCell>
              <TableCell>
                {student.isEditing ? (
                  <Select
                    id="list-edit-class"
                    label="Class"
                    sx={{ m: 1 }}
                    onChange={({ target: { value } }) =>
                      handleEditStudentClass(student.id, value)
                    }
                    value={student.class.name}
                  >
                    {schoolClasses.map((schoolClass) => (
                      <MenuItem key={schoolClass.id} value={schoolClass.name}>
                        {schoolClass.name}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  student.class.name
                )}
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleDeleteStudent(student.id)}
                  aria-label={student.name}
                >
                  <DeleteForeverIcon />
                </IconButton>
                <IconButton
                  onClick={() => toggleStudentEdit(student.id)}
                  aria-label={student.class.name}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
