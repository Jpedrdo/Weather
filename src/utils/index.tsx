import React from "react";

export type CurrentData = {
  details: string;
  icon: string;
  country: string;
  sunrise: number;
  sunset: number;
  name: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  speed: number;
  lat: number;
  lon: number;
  error: boolean;
};

export type ForecastData = {
  dt_txt: string;
  icon: string;
  main: string;
  description: string;
  feels_like: number;
  temp: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  error: boolean;
};

export type MoreInfo = {
  value: number;
  name: string;
  icon: any;
  specialCharacter: string;
};

export type MoreInfoData = {
  speed: number | MoreInfo;
  feels_like: number | MoreInfo;
  humidity: number | MoreInfo;
};

export const defaultTextSearch: string = "Minas Gerais";

export const defaultGradient = ["#fff", "#ddd"];

export const nameMoreInfos: Array<string> = ["speed", "feels_like", "humidity"];

export const specialCharacterInfo: Array<string> = [" °C", "%", " km/h"];

export const moreInfosImgs = [
  require("../imgs/feels_like.png"),
  require("../imgs/humidity.png"),
  require("../imgs/wind.png"),
];

export const firstLetterUpperCase = (name: string): string =>
  name.charAt(0).toUpperCase() + name.slice(1);
