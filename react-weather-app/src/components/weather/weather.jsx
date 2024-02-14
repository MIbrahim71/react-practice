import { useEffect, useState } from "react";
import Search from "../search/search";

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

      if (data) {
        setLoading(false), setWeatherData(data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchWeatherData("London");
  }, []);

  // const description = weatherData?.weather[0]?.description;
  // const formattedDescription = description
  //   .split(" ")
  //   .map((word) => word.charAt(0).toUpperCase() + word.slice(1).join(" "));

  function handleSearch() {
    fetchWeatherData(search);
  }

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
    });
  }

  function formatter(number) {
    return (
      // Special case: numbers between 11 and 13 always use 'th'
      number +
      (number >= 11 && number <= 13
        ? "th"
        : // For other numbers, use a conditional expression based on the last digit
        number % 10 === 1
        ? "st"
        : number % 10 === 2
        ? "nd"
        : number % 10 === 3
        ? "rd"
        : "th")
    );
  }

  if (error) {
    return <div>Error occurred in retrieving data.</div>;
  }

  return (
    <div className="container">
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {weatherData && (
        <div className="info-container">
          <div className="weather-info">
            {loading && <p>Loading data...</p>}
            <p className="date">{formatter(getCurrentDate())}</p>
            <h1 className="location">
              {weatherData?.name}, {weatherData?.sys?.country}
            </h1>

            <h2 className="description">
              {weatherData?.weather[0]?.description.toUpperCase()}
            </h2>
          </div>
          {/* Icon */}
          <div className="temp-container">
            <h1 className="temp">
              {Math.round(weatherData?.main?.temp - 273.15)}
              <span>ºc</span>
            </h1>
            <p>Feels like {weatherData?.main?.feels_like - 273.15}ºc</p>
            <img src={weatherData?.weather[0].icon} />
          </div>
        </div>
      )}
    </div>
    //
    // Weather for the next 4 days
  );
}
