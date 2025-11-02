import useStore from "../store/useStore";

export const useTemperature = () => {
  const { unit } = useStore();

  const kelvinToCelsius = (k) =>
    typeof k === "number" ? Math.round(k - 273.15) : null;

  const kelvinToFahrenheit = (k) =>
    typeof k === "number" ? Math.round(((k - 273.15) * 9) / 5 + 32) : null;

  const celsiusToFahrenheit = (c) =>
    typeof c === "number" ? Math.round((c * 9) / 5 + 32) : null;

  const formatTemp = (kelvin) => {
    if (unit === "F") {
      const temp = kelvinToFahrenheit(kelvin);
      return temp !== null ? `${temp}°F` : "N/A";
    } else {
      const temp = kelvinToCelsius(kelvin);
      return temp !== null ? `${temp}°C` : "N/A";
    }
  };

  const convertTemp = (celsius) => {
    if (unit === "F") {
      return parseFloat(((celsius * 9) / 5 + 32).toFixed(1));
    }
    return parseFloat(celsius.toFixed(1));
  };

  const getTempSymbol = () => (unit === "F" ? "°F" : "°C");

  return {
    unit,
    formatTemp,
    convertTemp,
    getTempSymbol,
    kelvinToCelsius,
    kelvinToFahrenheit,
    celsiusToFahrenheit,
  };
};
