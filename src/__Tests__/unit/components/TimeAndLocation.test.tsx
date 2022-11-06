import { render, screen } from "@testing-library/react";
import { TimeAndLocation } from "../../../components/Location";

describe("<TimeAndLocation/>", () => {
  let name: string;
  let dt: number;
  let timezone: string;
  let country: string;

  beforeEach(() => {
    name = "London";
    dt = 1646318698;
    timezone = "Europe/London";
    country = "GB";
  });

  test("renders user's city initially", () => {
    render(
      <TimeAndLocation
        name={name}
        dt={dt}
        timezone={timezone}
        country={country}
      />
    );

    const localTime = screen.getByText(/local time/i);
    const countryName = screen.getByText(/london/i);

    expect(localTime).toBeInTheDocument();
    expect(countryName).toBeInTheDocument();
  });
});
