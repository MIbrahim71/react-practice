import { useState } from "react";
import Search from "../search/search";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  async function handleSearch() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={10d1e3574387d2bf7d483a5c4a78b1d6}`
      );
      const data = await response.json();
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      Weather
    </div>
  );
}
