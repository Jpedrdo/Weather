import axios from "axios";
import { CurrentData, ForecastData } from "../utils";

type Coord = {
  lat: number;
  lon: number;
};

type Main = {
  tipo: number;
  feels_like: number;
  temp: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
};

type Sys = {
  country: string;
  sunrise: number;
  sunset: number;
};

type Wind = {
  speed: number;
};

type Weather = {
  main: string;
  icon: string;
  description: string;
};

type List = {
  main: Main;
  weather: Weather[];
  dt_txt: string;
  icon: string;
};

type GoeData = {
  lat: number;
  lon: number;
};

interface CuurentWeather {
  coord: Coord;
  main: Main;
  name: string;
  sys: Sys;
  wind: Wind;
  weather: Weather[];
}

interface ForecastWeather {
  list: List[];
}

interface FormattedWearther {
  textSearch?: string;
}

interface WeartherData {
  formatedCurent: CurrentData;
  formatedForecast: ForecastData[];
}

const apiKey: string = ""; //YOU APIKEY GOES HERE

const api = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

const iconUrl = (iconDescription: string) =>
  `http://openweathermap.org/img/wn/${iconDescription}@2x.png`;

const getWeatherData = async (
  typeOfGet: string,
  endpointData: string
): Promise<CuurentWeather & ForecastWeather> => {
  const { data } = await api.get(
    `/${typeOfGet}?${endpointData}&units=metric&appid=${apiKey}`
  );

  return data;
};

const currentFormated = (data: CuurentWeather) => {
  const { coord, main, name, sys, weather, wind } = data;
  const { main: details, icon } = weather[0];
  const { speed } = wind;

  return {
    ...coord,
    ...main,
    name,
    ...sys,
    details,
    speed,
    icon: iconUrl(icon),
  };
};

const forecastFormated = (data: ForecastWeather) => {
  const weekList = data.list.map(({ main, weather, dt_txt }: List) => {
    const { icon } = weather[0];

    return {
      ...main,
      ...weather[0],
      dt_txt,
      icon: iconUrl(icon),
    };
  });

  return weekList;
};

const geoEndpoint = ({ lat, lon }: GoeData) => `lat=${lat}&lon=${lon}`;

export const formattedWeartherData = async (
  data: FormattedWearther
): Promise<WeartherData> => {
  const { textSearch } = data;

  const current = await getWeatherData("weather", `q=${textSearch}`)
    .then(currentFormated)
    .catch((e) => {
      return { ...e, error: true };
    });

  const forecast = await getWeatherData(
    "forecast",
    `${geoEndpoint(current)}&cnt=7`
  )
    .then(forecastFormated)
    .catch((e) => {
      return { ...e, error: true };
    });

  return { formatedCurent: current, formatedForecast: forecast };
};
