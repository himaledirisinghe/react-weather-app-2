import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import cities from "../data/cities.json";
import APIUrl from "../helpers/apiUrl";
import Main from "./main";
import CityView from "./cityView";
import Dashboard from "./dashboard";

const API_KEY = process.env.REACT_APP_API_KEY;

export default function App() {
  const [weatherData, setWeatherData] = useState([]);
  const selectedCity = null;
  useEffect(() => {
    const cityCodes = cities.List.map((city) => city.CityCode).join(",");
    const url = APIUrl(cityCodes, API_KEY);
    // Check if there is weather data stored in localStorage
    const cachedWeatherData = JSON.parse(localStorage.getItem("weatherData"));
    if (cachedWeatherData) {
      // Use cached weather data if it exists
      setWeatherData(cachedWeatherData);
    } else {
      // Make initial API request to retrieve weather data for all cities
      axios.get(url).then((response) => {
        setWeatherData(response.data.list);
        localStorage.setItem("weatherData", JSON.stringify(response.data.list));
      });
    }

    // Set up interval to update weather data for Colombo every 5 minutes
    const colomboInterval = setInterval(() => {
      const colomboUrl = APIUrl("1248991", API_KEY);
      axios.get(colomboUrl).then((response) => {
        // Retrieve weather data for all cities from local storage
        let weatherData = JSON.parse(localStorage.getItem("weatherData"));
        // Update weather data for Colombo with new data
        weatherData = weatherData.map((city) => {
          if (city.id === 1248991) {
            return response.data.list[0];
          } else {
            return city;
          }
        });
        // Store updated weather data in local storage
        localStorage.setItem("weatherData", JSON.stringify(weatherData));
        // Update weatherData state with new data
        setWeatherData(weatherData);
      });
    }, 5 * 60 * 1000);

    // Set up interval to update weather data for other cities every 15 minutes
    const otherCitiesInterval = setInterval(() => {
      const otherCityCodes = cities.List.filter(
        (city) => city.CityCode !== "1248991"
      )
        .map((city) => city.CityCode)
        .join(",");
      const otherCitiesUrl = APIUrl(otherCityCodes, API_KEY);
      axios.get(otherCitiesUrl).then((response) => {
        // Retrieve weather data for all cities from local storage
        let weatherData = JSON.parse(localStorage.getItem("weatherData"));
        // Update weather data for other cities with new data
        weatherData = weatherData.map((city) => {
          const updatedCity = response.data.list.find(
            (updatedCity) => updatedCity.id === city.id
          );
          if (updatedCity) {
            return updatedCity;
          } else {
            return city;
          }
        });
        // Store updated weather data in local storage
        localStorage.setItem("weatherData", JSON.stringify(weatherData));
        // Update weatherData state with new data
        setWeatherData(weatherData);
      });
    }, 15 * 60 * 1000);
    // Clear intervals when component unmounts
    return () => {
      clearInterval(colomboInterval);
      clearInterval(otherCitiesInterval);
    };
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Main>
              <Dashboard weatherData={weatherData} />
            </Main>
          }
        />
        <Route
          path="/view"
          element={<CityView selectedCity={selectedCity} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
