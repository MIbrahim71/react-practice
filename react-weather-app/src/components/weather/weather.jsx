import { useEffect, useState } from "react";
import Search from "../search/search";
import { getCurrentDate, formatter } from "../../utils";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [weatherData, setWeatherData] = useState("");

  async function fetchWeatherData(input) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=10d1e3574387d2bf7d483a5c4a78b1d6`
      );
      const data = await response.json();
      console.log(data);

      setLoading(false), setWeatherData(data);

      if (!data || data.cod === "404") {
        setError("Location not found. Please enter a valid location");
        return;
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    fetchWeatherData("London");
  }, []);

  function handleSearch() {
    if (!search.trim()) {
      setError("Please enter a valid location");
      return;
    }
    fetchWeatherData(search);
  }

  // if (error) {
  //   return <div className="error">{error}</div>;
  // }

  return (
    <div className="container">
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {error && <div className="error">{error}</div>}

      {weatherData ? (
        <div className="info-container">
          <div className="weather-info">
            {loading && <p>Loading data...</p>}
            <p className="date">{formatter(getCurrentDate())}</p>
            <h1 className="location">
              {weatherData?.name}, {weatherData?.sys?.country}
            </h1>

            <h2 className="description">
              {weatherData?.weather[0]?.description
                .split(" ")
                .map((word) => word[0].toUpperCase() + word.slice(1))
                .join(" ")}
            </h2>
          </div>

          <div className="temp-container">
            <img
              src={`../../../public/icons/${weatherData?.weather[0].icon}@2x.png`}
              alt=""
            />
            <div className="temp-only">
              <h1 className="temp">
                {Math.round(weatherData?.main?.temp - 273.15)}
                <span>ºc</span>
              </h1>
              <p>
                Feels like {Math.round(weatherData?.main?.feels_like - 273.15)}
                ºc
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="error">{error}</div>
      )}
    </div>
  );
}
