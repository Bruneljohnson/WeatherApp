import { IForecastObj } from "@/types";

export interface ICity {
  id: number;
  name: string;
}

type ICities = ICity[];

export const cities: ICities = [
  {
    id: 1,
    name: "London",
  },
  {
    id: 2,
    name: "New York",
  },
  {
    id: 3,
    name: "Paris",
  },
  {
    id: 4,
    name: "Tokyo",
  },
  {
    id: 5,
    name: "Doha",
  },
];

/** These are used in Unit testing */
export const hourlyMetric: IForecastObj[] = [
  {
    temp: 15,
    title: "6:00 AM",
    icon: "03d",
  },
  {
    temp: 17,
    title: "7:00 AM",
    icon: "03d",
  },
];

export const hourlyFerenheit: IForecastObj[] = [
  {
    temp: 59,
    title: "6:00 AM",
    icon: "03d",
  },
  {
    temp: 63,
    title: "7:00 AM",
    icon: "03d",
  },
];

export const dailyMetric: IForecastObj[] = [
  {
    temp: 15,
    title: "Mon",
    icon: "03d",
  },
  {
    temp: 17,
    title: "Tues",
    icon: "03d",
  },
];

export const dailyFerenheit: IForecastObj[] = [
  {
    temp: 59,
    title: "Mon",
    icon: "03d",
  },
  {
    temp: 63,
    title: "Tues",
    icon: "03d",
  },
];

export const dataLDN = {
  coord: {
    lon: -0.1257,
    lat: 51.5085,
  },
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    },
  ],
  base: "stations",
  main: {
    temp: 282.91,
    feels_like: 281.64,
    temp_min: 281.1,
    temp_max: 284.31,
    pressure: 1010,
    humidity: 85,
  },
  visibility: 10000,
  wind: {
    speed: 2.57,
    deg: 310,
  },
  clouds: {
    all: 1,
  },
  dt: 1667558569,
  sys: {
    type: 2,
    id: 2075535,
    country: "GB",
    sunrise: 1667545138,
    sunset: 1667579347,
  },
  timezone: 0,
  id: 2643743,
  name: "London",
  cod: 200,
};

export const ForecastsLDN = {
  timezone: "Europe/London",
  timezone_offset: 0,
  lat: 51.5085,
  lon: -0.1257,
  daily: [
    {
      dt: 1661870592,
      weather: [
        {
          id: 501,
          main: "Rain",
          description: "moderate rain",
          icon: "10d",
        },
      ],
      temp: {
        day: 25,
      },
    },
    {
      dt: 1661875000,
      weather: [
        {
          id: 501,
          main: "Rain",
          description: "moderate rain",
          icon: "10d",
        },
      ],
      temp: {
        day: 25,
      },
    },
  ],
  hourly: [
    {
      dt: 1661870592,
      weather: [
        {
          id: 501,
          main: "Rain",
          description: "moderate rain",
          icon: "10d",
        },
      ],
      temp: 25,
    },
    {
      dt: 1661875000,
      weather: [
        {
          id: 501,
          main: "Rain",
          description: "moderate rain",
          icon: "10d",
        },
      ],
      temp: {
        day: 25,
      },
    },
  ],
};
