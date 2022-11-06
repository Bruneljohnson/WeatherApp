import { render, screen, fireEvent } from "@testing-library/react";
import { Temperature } from "../../../components/Temperature";

describe("<Temperature/>", () => {
  let details: string;
  let realFell: number;
  let icon: string;
  let humidity: number;
  let windSpeed: number;
  let sunrise: number;
  let sunset: number;
  let temp: number;
  let maxTemp: number;
  let minTemp: number;
  let timezone: string;

  beforeEach(() => {
    details = "Clear";
    realFell = 33.17;
    icon = "01n";
    humidity = 68;
    windSpeed = 5.86;
    sunrise = 1667458631;
    sunset = 1667493051;
    temp = 29.3;
    maxTemp = 29.6;
    minTemp = 27.1;
    timezone = "Europe/London";
  });

  test("renders weather values of city initally in metric values", () => {
    render(
      <Temperature
        units="metric"
        details={details}
        realFell={realFell}
        icon={icon}
        humidity={humidity}
        windSpeed={windSpeed}
        sunrise={sunrise}
        sunset={sunset}
        temp={temp}
        maxTemp={maxTemp}
        minTemp={minTemp}
        timezone={timezone}
      />
    );

    const realFellMock = screen.getByText(/real fell/i);
    const humidityMock = screen.getByText(/humidity/i);
    const windSpeedMock = screen.getByText(/wind/i);
    const sunriseMock = screen.getByText(/rise/i);
    const sunsetMock = screen.getByText(/set/i);
    const lowTempMock = screen.getByText(/low/i);
    const highTempMock = screen.getByText(/high/i);
    const iconMock = screen.getByRole("img");

    expect(realFellMock.lastElementChild).toHaveTextContent("33°");
    expect(realFellMock.firstElementChild).toBeVisible();
    expect(humidityMock.lastElementChild).toHaveTextContent("68%");
    expect(humidityMock.firstElementChild).toBeVisible();
    expect(windSpeedMock.lastElementChild).toHaveTextContent("6 mp/h");
    expect(windSpeedMock.firstElementChild).toBeVisible();
    expect(sunriseMock.lastElementChild).toHaveTextContent(/am/i);
    expect(sunsetMock.lastElementChild).toHaveTextContent(/pm/i);
    expect(lowTempMock.lastElementChild).toHaveTextContent("27°");
    expect(highTempMock.lastElementChild).toHaveTextContent("30°");
    expect(iconMock).toHaveProperty(
      "src",
      "http://openweathermap.org/img/wn/01n@2x.png"
    );
    expect(iconMock).toHaveProperty("alt", "Clear");
  });

  test("renders weather values of city in imperial values", () => {
    realFell = 90.66;
    windSpeed = 8.05;
    temp = 84.88;
    maxTemp = 85.89;
    minTemp = 77.31;
    render(
      <Temperature
        units="imperial"
        details={details}
        realFell={realFell}
        icon={icon}
        humidity={humidity}
        windSpeed={windSpeed}
        sunrise={sunrise}
        sunset={sunset}
        temp={temp}
        maxTemp={maxTemp}
        minTemp={minTemp}
        timezone={timezone}
      />
    );

    const realFellMock = screen.getByText(/real fell/i);
    const lowTempMock = screen.getByText(/low/i);
    const highTempMock = screen.getByText(/high/i);
    const humidityMock = screen.getByText(/humidity/i);
    const windSpeedMock = screen.getByText(/wind/i);

    expect(realFellMock.lastElementChild).toHaveTextContent("91°");
    expect(lowTempMock.lastElementChild).toHaveTextContent("77°");
    expect(highTempMock.lastElementChild).toHaveTextContent("86°");
    expect(windSpeedMock.lastElementChild).toHaveTextContent("8 km/h");
    expect(realFellMock.firstElementChild).toBeVisible();
    expect(humidityMock.firstElementChild).toBeVisible();
    expect(windSpeedMock.firstElementChild).toBeVisible();
  });
});
