import { fireEvent, render } from "@testing-library/react";
import Form from "./Form";

it("renders component", () => {
  const { getByText } = render(<Form createNewStudent={jest.fn} />);
  expect(getByText(/Create New Student/)).toBeInTheDocument();
});

it("should clear inputs after button click", () => {
  const mockFn = jest.fn();
  const { getByText, getByLabelText } = render(
    <Form createNewStudent={mockFn} />
  );
  const button = getByText(/Create New Student/) as HTMLButtonElement;
  const studentInput = getByLabelText(/Student name/) as HTMLInputElement;
  const classInput = getByLabelText(/Class name/) as HTMLInputElement;

  fireEvent.change(studentInput, { target: { value: "Charles" } });
  fireEvent.change(classInput, { target: { value: "George" } });

  expect(studentInput.value).toBe("Charles");
  expect(classInput.value).toBe("George");

  fireEvent.click(button);

  expect(mockFn).toHaveBeenCalled();
  expect(studentInput.value).toBe("");
  expect(classInput.value).toBe("");
});

it("should not call createNewStudent fn after button click if inputs are empty", () => {
  const mockFn = jest.fn();
  const { getByText, getByLabelText } = render(
    <Form createNewStudent={mockFn} />
  );
  const button = getByText(/Create New Student/) as HTMLButtonElement;
  const studentInput = getByLabelText(/Student name/) as HTMLInputElement;
  const classInput = getByLabelText(/Class name/) as HTMLInputElement;

  expect(studentInput.value).toBe("");
  expect(classInput.value).toBe("");

  fireEvent.click(button);
  expect(mockFn).not.toHaveBeenCalled();
});
