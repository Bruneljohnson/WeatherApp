import { render, screen, fireEvent } from "@testing-library/react";
import { Forecast } from "../../../components/Forecast";
import { IForecastObj } from "../../../types";
import {
  dailyFerenheit,
  dailyMetric,
  hourlyFerenheit,
  hourlyMetric,
} from "../../../assets";

/**
 * @TODO sort out click tests first and last items of .
 */

describe("<Forecast/> with hourly forcasts", () => {
  let title: string, forecasts: IForecastObj[], reset: boolean;
  beforeEach(() => {
    title = "Hourly Forecasts";
    forecasts = hourlyMetric;
    reset = false;
  });

  test("renders hourly forecasts in metric units", async () => {
    render(<Forecast title={title} forecasts={forecasts} reset={reset} />);

    const forecastHeaderTitle = await screen.findByText(/hourly forecast/i);
    const forecastItemHeader = await screen.findByText(/6:00 AM/i);
    const forecastItemTemp = await screen.findByText(/15°/i);

    expect(forecastHeaderTitle).toBeInTheDocument();
    expect(forecastItemHeader).toBeInTheDocument();
    expect(forecastItemTemp).toBeInTheDocument();
  });
  test("renders hourly forecasts in imperial units", async () => {
    forecasts = hourlyFerenheit;
    render(<Forecast title={title} forecasts={forecasts} reset={reset} />);

    const forecastHeaderTitle = await screen.findByText(/hourly forecast/i);
    const forecastItemHeader = await screen.findByText(/6:00 AM/i);
    const forecastItemTemp = await screen.findByText(/59°/i);

    expect(forecastHeaderTitle).toBeInTheDocument();
    expect(forecastItemHeader).toBeInTheDocument();
    expect(forecastItemTemp).toBeInTheDocument();
  });
  test("first item of forecast array to have opacity of 1", async () => {
    render(<Forecast title={title} forecasts={forecasts} reset={reset} />);

    const forecastItems = await screen.findAllByTestId("forecast-item");

    expect(forecastItems.length).toBe(2);
    expect(forecastItems[0]).toHaveClass("opacity-100");
  });
  test("items that are not the first item of forecast array to have opacity of 0.25", async () => {
    render(<Forecast title={title} forecasts={forecasts} reset={reset} />);

    const forecastItems = await screen.findAllByTestId("forecast-item");

    expect(forecastItems.length).toBe(2);
    expect(forecastItems[1]).toHaveClass("opacity-25");
  });
});

describe("<Forecast/> with daily forcasts", () => {
  let title: string, forecasts: IForecastObj[], reset: boolean;
  beforeEach(() => {
    title = "daily Forecasts";
    forecasts = dailyMetric;
    reset = false;
  });

  test("renders daily forecasts in metric units", async () => {
    render(<Forecast title={title} forecasts={forecasts} reset={reset} />);

    const forecastHeaderTitle = await screen.findByText(/daily forecast/i);
    const forecastItemHeader = await screen.findByText(/Mon/i);
    const forecastItemTemp = await screen.findByText(/15°/i);

    expect(forecastHeaderTitle).toBeInTheDocument();
    expect(forecastItemHeader).toBeInTheDocument();
    expect(forecastItemTemp).toBeInTheDocument();
  });
  test("renders daily forecasts in imperial units", async () => {
    forecasts = dailyFerenheit;
    render(<Forecast title={title} forecasts={forecasts} reset={reset} />);

    const forecastHeaderTitle = await screen.findByText(/daily forecast/i);
    const forecastItemHeader = await screen.findByText(/Mon/i);
    const forecastItemTemp = await screen.findByText(/59°/i);

    expect(forecastHeaderTitle).toBeInTheDocument();
    expect(forecastItemHeader).toBeInTheDocument();
    expect(forecastItemTemp).toBeInTheDocument();
  });
  test("first item of forecast array to have opacity of 1", async () => {
    render(<Forecast title={title} forecasts={forecasts} reset={reset} />);

    const forecastItems = await screen.findAllByTestId("forecast-item");

    expect(forecastItems.length).toBe(2);
    expect(forecastItems[0]).toHaveClass("opacity-100");
  });
  test("items that are not the first item of forecast array to have opacity of 0.25", async () => {
    render(<Forecast title={title} forecasts={forecasts} reset={reset} />);

    const forecastItems = await screen.findAllByTestId("forecast-item");

    expect(forecastItems.length).toBe(2);
    expect(forecastItems[1]).toHaveClass("opacity-25");
  });
});
