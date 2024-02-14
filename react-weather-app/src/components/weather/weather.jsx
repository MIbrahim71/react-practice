import { useEffect, useState } from "react";
import Search from "../search/search";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState("");

  async function fetchWeatherData(input) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=10d1e3574387d2bf7d483a5c4a78b1d6`
      );
      const data = await response.json();
      console.log(data);

      if (data) setLoading(false), setWeatherData(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.message);
    }
  }

  function handleSearch() {
    fetchWeatherData(search);
  }

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
    });
  }

  if (error) {
    return <div>Error occurred in retrieving data. </div>;
  }

  useEffect(() => {
    fetchWeatherData("London");
  }, []);

  return (
    <div className="container">
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <div className="weather-info">
        {loading && <p>Loading data...</p>}
        <p>{`${getCurrentDate()}th`}</p>
        <h1 className="">{weatherData?.name}</h1>

        <h2>Description</h2>
      </div>
      {/* Icon */}
      <div>
        <h1>Temperature</h1>
      </div>
    </div>
    //
    // Weather for the next 4 days
  );
}
