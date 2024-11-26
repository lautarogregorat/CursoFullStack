import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import CountryList from "./components/CountryList";

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://studies.cs.helsinki.fi/restcountries/api/all");
        setCountries(response.data);
        console.log("Countries fetched:", response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const results = countries.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCountries(results);
  }, [search, countries]);

  return (
    <div>
      <h1>Country Search</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <CountryList countries={filteredCountries} />
    </div>
  );
};

export default App;
