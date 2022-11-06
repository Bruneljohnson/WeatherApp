import { render, screen } from "@testing-library/react";
import { Alerts } from "../../../components/Ui";

describe("<Alert/>", () => {
  test("renders Blue background on inital fetch", () => {
    render(<Alerts type="info" message="fetching city weather data." />);

    const alert = screen.getByTestId("alerts");

    expect(alert).toHaveClass(`bg-blue-500`);
    expect(alert).toHaveTextContent(`fetching city weather data.`);
  });

  test("renders Green background on successful fetch request", () => {
    render(
      <Alerts
        type="success"
        message="Successfully fetched city weather data."
      />
    );

    const alert = screen.getByTestId("alerts");

    expect(alert).toHaveClass(`bg-green-500`);
    expect(alert).toHaveTextContent(`Successfully fetched city weather data.`);
  });

  test("renders Red background on failed fetch request", () => {
    render(
      <Alerts type="error" message="failed to fetch city weather data." />
    );

    const alert = screen.getByTestId("alerts");

    expect(alert).toHaveClass(`bg-red-500`);
    expect(alert).toHaveTextContent(`failed to fetch city weather data.`);
  });
});
