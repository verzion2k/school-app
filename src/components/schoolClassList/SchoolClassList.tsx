import React from "react";
import { IconButton, TextField } from "@mui/material";
import { StudentClass } from "../../mockData";
import EditIcon from "@mui/icons-material/Edit";

export interface Props {
  classList: StudentClass[];
  handleEdit: (
    schoolClass: StudentClass,
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleEditOnEnter: (
    id: string,
    event: React.KeyboardEvent<HTMLDivElement>
  ) => void;
  toggleEditing: (id: string) => void;
  renderDeleteIcon: (schoolClass: StudentClass) => void;
}

const SchoolClassList: React.FunctionComponent<Props> = ({
  classList,
  handleEdit,
  handleEditOnEnter,
  toggleEditing,
  renderDeleteIcon,
}) => {
  return (
    <>
      {classList.map((element) => (
        <div style={{ display: "flex" }} key={element.id}>
          {element.isEditing ? (
            <TextField
              id="student-name"
              label="Student Class"
              variant="outlined"
              sx={{ m: 1 }}
              onChange={(event) => handleEdit(element, event)}
              onKeyDown={(event) => handleEditOnEnter(element.id, event)}
              onBlur={() => toggleEditing(element.id)}
              value={element.name}
            />
          ) : (
            <p style={{ padding: "20px" }}>{element.name}</p>
          )}
          <IconButton
            onClick={() => toggleEditing(element.id)}
            aria-label={element.name}
          >
            <EditIcon />
          </IconButton>
          <>{renderDeleteIcon(element)}</>
        </div>
      ))}
    </>
  );
};

export default SchoolClassList;
