import View from "./view";
import { useState, useEffect } from "react";
import APIUrl from "../helpers/apiUrl";
import Main from "./main";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

export default function CityView() {
  const selectedCityData = JSON.parse(sessionStorage.getItem("selectedCity"));
  const selectedCity = selectedCityData.cityId;
  const index = selectedCityData.index;
  const [city, setCity] = useState(null);

  // Function to fetch latest weather data for selected city
  function refreshData() {
    const url = APIUrl(selectedCity, API_KEY);
    axios.get(url).then((response) => {
      // Update city state with new data
      setCity(response.data.list[0]);
      // Retrieve weather data for all cities from local storage
      let weatherData = JSON.parse(localStorage.getItem("weatherData"));
      // Update weather data for selected city with new data
      weatherData = weatherData.map((city) => {
        if (city.id === selectedCity) {
          return response.data.list[0];
        } else {
          return city;
        }
      });
      // Store updated weather data in local storage
      localStorage.setItem("weatherData", JSON.stringify(weatherData));
    });
  }

  useEffect(() => {
    // Use cached weather data from local storage on initial render
    const weatherData = JSON.parse(localStorage.getItem("weatherData"));
    const cityData = weatherData.find((city) => city.id === selectedCity);
    setCity(cityData);
  }, [selectedCity]);

  if (!city) {
    return (
      <Main>
        <div className="loading">Loading...</div>
      </Main>
    );
  }

  return (
    <>
      <Main>
        <View index={index} city={city} refreshData={refreshData} />
      </Main>
    </>
  );
}
