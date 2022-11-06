import { render, screen } from "@testing-library/react";
import { WeatherPage } from "../../pages";

describe("Initial app load state", () => {
  test("renders top buttons", async () => {
    render(<WeatherPage />);
    const topButton0 = await screen.findByTestId("topButton0");
    const topButton1 = await screen.findByTestId("topButton1");
    const topButton2 = await screen.findByTestId("topButton2");
    const topButton3 = await screen.findByTestId("topButton3");
    const topButton4 = await screen.findByTestId("topButton4");

    expect(topButton0).toHaveTextContent(/london/i);
    expect(topButton1).toHaveTextContent(/new york/i);
    expect(topButton2).toHaveTextContent(/paris/i);
    expect(topButton3).toHaveTextContent(/tokyo/i);
    expect(topButton4).toHaveTextContent(/doha/i);
  });

  test("renders blank input with degrees options visible.", () => {
    render(<WeatherPage />);
    const cityInput = screen.getByPlaceholderText(/search for city/i);
    const celsius = screen.getByText(/°C/i);
    const fahrenheit = screen.getByText(/°F/i);

    expect(cityInput).toBeInTheDocument();
    expect(celsius).toBeInTheDocument();
    expect(fahrenheit).toBeInTheDocument();
  });

  test("renders local time and date of city", async () => {
    render(<WeatherPage />);
    const cityLocalTime = await screen.findByText(/local time:/i);

    expect(cityLocalTime).toBeInTheDocument();
  });
  test("renders city, temperature and other details", async () => {
    render(<WeatherPage />);
    const dayCountry = await screen.findByTestId("day-country");
    const details = await screen.findByTestId("details");
    const smallDetails = await screen.findByTestId("small-details");

    expect(dayCountry).toBeInTheDocument();
    expect(details).toBeInTheDocument();
    expect(details).toHaveClass(`text-cyan-300`);
    expect(smallDetails).toBeInTheDocument();
    expect(smallDetails).toBeVisible();
  });

  test("renders forcasts", async () => {
    render(<WeatherPage />);
    const hourlyForecasts = await screen.findByText(/hourly forecast/i);
    const dailyForecasts = await screen.findByText(/daily forecast/i);
    const forecastItems = await screen.findAllByTestId("forecast-item");

    expect(hourlyForecasts).toBeInTheDocument();
    expect(dailyForecasts).toBeInTheDocument();
    expect(forecastItems).toHaveLength(10);
    expect(forecastItems[0]).toHaveClass("opacity-100");
    expect(forecastItems[5]).toHaveClass("opacity-100");
  });
});
