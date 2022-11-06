import { render, screen } from "@testing-library/react";
import { TopButton } from "../../../components/TopButtons";

describe("<TopButton/>", () => {
  let setError = jest.fn();
  let setQuery = jest.fn();

  test("renders five cities initially", () => {
    render(<TopButton setError={setError} setQuery={setQuery} />);

    const cities = screen.getAllByRole("button");

    expect(cities).toHaveLength(5);
    expect(cities[0]).toHaveTextContent(/london/i);
    expect(cities[1]).toHaveTextContent(/New York/i);
    expect(cities[2]).toHaveTextContent(/Paris/i);
    expect(cities[3]).toHaveTextContent(/Tokyo/i);
    expect(cities[4]).toHaveTextContent(/Doha/i);
  });
});
