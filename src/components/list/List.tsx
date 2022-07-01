import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Student } from "../../mockData";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export interface Props {
  students: Student[];
  deleteStudent: (id: string) => void;
}

const List: React.FunctionComponent<Props> = ({ students, deleteStudent }) => {
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
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.class.name}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleDeleteStudent(student.id)}>
                  <DeleteForeverIcon />
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
