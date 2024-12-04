import React from "react";
import { useState, useEffect } from "react";
function PopularCities() {
  const [weatherData, setWeatherData] = useState({});
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "7d88b436f0d35d241ab5217c2093a0e0";
  const cities = ["Uttar Pradesh", "Delhi", "Mumbai", "Kolkata"];

  useEffect(() => {
    const fetchData = async () => {
      const newWeatherData = {};

      for (const city of cities) {
        try {
          const response = await fetch(
            `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
          );
          const data = await response.json();
          newWeatherData[city] = data;
          // console.log(data);
        } catch (error) {
          console.error(`Error fetching data for ${city}:`, error);
          newWeatherData[city] = { error: "Failed to load data" };
        }
      }

      setWeatherData(newWeatherData);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white w-11/12 rounded-lg shadow-lg hover:shadow-xl transition-all p-6">
      <h2 className="text-2xl font-bold mb-4">Other Popular Cities</h2>
      <div className="w-full flex justify-around items-center gap-4 flex-wrap">
        {cities.map((city) => (
          <div key={city} className="p-4 min-w-64 border rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{city}</h2>
            {weatherData[city] ? (
              <div>
                {weatherData[city].error ? (
                  <p className="text-red-500">{weatherData[city].error}</p>
                ) : (
                  <div className="w-full flex items-center justify-between">
                    <div className="text-xl">
                      <p className="mb-1">Temperature:</p>
                      <p className="mb-1">Humidity:</p>
                      <p className="mb-1">Weather:</p>
                      <p className="mb-1">Wind Speed:</p>
                    </div>
                    <div >
                      <p className="mb-1">{weatherData[city].main?.temp}°C</p>
                      <p className="mb-1">
                        {weatherData[city].main?.humidity}%
                      </p>
                      <p className="mb-1">
                        {weatherData[city].weather?.[0]?.description}
                      </p>
                      <p>{weatherData[city].wind?.speed} m/s</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularCities;
