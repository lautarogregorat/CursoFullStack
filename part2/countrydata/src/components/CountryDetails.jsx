import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null); // Estado para los datos del clima
  const [error, setError] = useState(null); // Estado para manejar errores
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY; // Clave API desde las variables de entorno
  
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              q: country.capital[0],
              units: "metric", // Usar sistema métrico
              appid: apiKey, // Clave API
            },
          }
        );
        setWeather(response.data);
      } catch (error) {
        setError("Unable to fetch weather data.");
        console.error(error.message);
      }
    };

    fetchWeather();
  }, [country.capital, apiKey]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common} flag`} width="150" />

      {/* Mostrar datos del clima */}
      {weather ? (
        <div>
          <h3>Weather in {country.capital}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Conditions: {weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Loading weather information...</p>
      )}
    </div>
  );
};

export default CountryDetails;
