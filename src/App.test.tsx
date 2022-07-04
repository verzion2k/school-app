import { render } from "@testing-library/react";
import App from "./App";

it("renders app title", () => {
  const { container } = render(<App />);
  expect(container.querySelector("h1")).toHaveTextContent(/School APP/);
});