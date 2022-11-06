import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "../../../components/Input";

describe("<Input/>", () => {
  let setUnits = jest.fn();
  let setQuery = jest.fn();
  let setError = jest.fn();
  let unitFormat: string;

  beforeEach(() => {
    unitFormat = "metric";
  });

  test("renders blank field on initial load", () => {
    render(
      <Input
        setError={setError}
        setQuery={setQuery}
        setUnits={setUnits}
        units={unitFormat}
      />
    );

    const cityInput = screen.getByTestId("city-input");
    expect(cityInput).toHaveValue("");
    expect(cityInput).toHaveProperty("placeholder", "Search for city...");
  });

  test("renders blank field onSubmit", () => {
    render(
      <Input
        setError={setError}
        setQuery={setQuery}
        setUnits={setUnits}
        units={unitFormat}
      />
    );

    const cityInput = screen.getByTestId("city-input");
    const cityForm = screen.getByTestId("city-form");
    fireEvent.change(cityInput, { target: { value: "London" } });

    expect(cityInput).toHaveValue("London");

    fireEvent.submit(cityForm);

    expect(cityInput).toHaveValue("");
    expect(cityInput).toHaveProperty("placeholder", "Search for city...");
  });
});
