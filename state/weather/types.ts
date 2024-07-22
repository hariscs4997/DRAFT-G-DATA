export type WeatherType = {
  lowestTemperature: number;
  highestTemperature: number;
};

export type WeatherSliceType = {
  weather: WeatherType | undefined;
};
