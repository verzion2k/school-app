import { fireEvent, render } from "@testing-library/react";
import { StudentClass } from "../../mockData";
import SchoolClassList from "./SchoolClassList";

const MOCK_CLASS_LIST: StudentClass[] = [
  {
    id: "1",
    isEditing: false,
    name: "a",
  },
  {
    id: "2",
    isEditing: false,
    name: "b",
  },
  {
    id: "3",
    isEditing: false,
    name: "c",
  },
  {
    id: "4",
    isEditing: true,
    name: "d",
  },
];

const MOCK_FUNCTION_LIST = {
  handleEdit: jest.fn(),
  handleEditOnEnter: jest.fn(),
  toggleEditing: jest.fn(),
  renderDeleteIcon: jest.fn(),
};

it("renders class list", () => {
  const { getByText } = render(
    <SchoolClassList
      classList={MOCK_CLASS_LIST}
      handleEdit={MOCK_FUNCTION_LIST.handleEdit}
      handleEditOnEnter={MOCK_FUNCTION_LIST.handleEditOnEnter}
      toggleEditing={MOCK_FUNCTION_LIST.toggleEditing}
      renderDeleteIcon={MOCK_FUNCTION_LIST.renderDeleteIcon}
    />
  );

  const classItem = getByText(/c/);
  expect(classItem).toBeInTheDocument();
});

it("should return textfield edit mode", () => {
  const { getByLabelText } = render(
    <SchoolClassList
      classList={MOCK_CLASS_LIST}
      handleEdit={MOCK_FUNCTION_LIST.handleEdit}
      handleEditOnEnter={MOCK_FUNCTION_LIST.handleEditOnEnter}
      toggleEditing={MOCK_FUNCTION_LIST.toggleEditing}
      renderDeleteIcon={MOCK_FUNCTION_LIST.renderDeleteIcon}
    />
  );
  const textField = getByLabelText("Student Class");
  expect(textField).toBeInTheDocument();
});
