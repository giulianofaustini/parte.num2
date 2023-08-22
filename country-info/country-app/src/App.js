import React, { useEffect, useState } from "react";
import axios from "axios";
import images from "./components/images";

const App = () => {
  const [newSearch, setNewSearch] = useState("");
  const [country, setCountry] = useState([]);
  const [info, setInfo] = useState(null);
  const [newWeather, setNewWeather] = useState({});

  const api_key = process.env.REACT_APP_API_KEY;

  const { weather, main } = newWeather;

  useEffect(() => {
    if (info) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${info.capital[0]}&appid=${api_key}&units=metric`
        )
        .then((response) => {
          const weather = response.data;
          console.log(weather);
          if (info.capital[0] && weather) {
            setNewWeather(weather);
          }
        })
        .catch((error) => {
          console.log("error fetching weather", error);
        });
    }
  }, [info]);

  useEffect(() => {
    if (newSearch) {
      console.log("this is newSearch now", newSearch);
      axios
        .get(`https://restcountries.com/v3.1/name/${newSearch}`)
        .then((response) => {
          const results = response.data;
          console.log("this is the result now", results);
          if (results.length <= 10) {
            setCountry(results);
          } else {
            setCountry([]);
          }
        })
        .catch((error) => {
          console.log("error on fetching the country", error);
        });
    }
  }, [newSearch]);

  const handleChange = (event) => {
    setNewSearch(event.target.value);
  };
  const handleClick = (dataOnHold) => {
    setInfo(dataOnHold);
    setNewSearch("");
  };

  return (
    <div className="container">
      <form>
        <strong>Search for a country:</strong>{" "}
        <input type="text" value={newSearch} onChange={handleChange}></input>
      </form>

      {country.length === 0 ? (
        <p>
          There are too many countries withing the scope of your search. Be more
          specific.
        </p>
      ) : (
      <ul>
          {country.map((singlecountry, index) => (
            <li key={index}>
              <button onClick={() => handleClick(singlecountry)}>
                click to see the country's info
              </button>
              {singlecountry.name.common}
            </li>
          ))}
            </ul>
      )}
      {info && (
        <div>
          <h2>Read the search results:</h2>
          <p>
            <strong>Country:</strong> {info.altSpellings[1]
}{" "}
          </p>
          <p>
            <strong>Capital:</strong> {info.capital[0]}{" "}
          </p>
          <p>
            <strong>Total Area::</strong> {info.area} m2{" "}
          </p>
          <p>
            <strong>Flag:</strong>{" "}
            {
              <img
                alt="flag"
                src={info.flags.svg}
                style={{ maxWidth: "150px" }}
                />
              }{" "}
          </p>
          <p>
            <strong>Languages:</strong>
            {Object.values(info.languages).join(",")}
          </p>
          <p>
            <strong>Currencies:</strong>
            {Object.values(info.currencies)
              .map((currency) => `${currency.name} (${currency.symbol})`)
              .join(",")}
          </p>

          {weather && (
            <div>
              <h2>Weather in {info.capital[0]} </h2>
              <p>
                {" "}
                <img
                  src={images[weather[0].icon]}
                  alt="Weather Icon"
                  style={{ maxWidth: "1000px" }}
                ></img>{" "}
              </p>
              <p>
                <strong>{weather[0].main} </strong>{" "}
              </p>
              <h4>More on the current weather</h4>
              <p>
                <strong>Temperature:</strong>
                {main.temp}{" "}
              </p>
              <p>
                <strong>Feels like:</strong> {main.feels_like}{" "}
              </p>
              <p>
                <strong>Description:</strong> {weather[0].description}{" "}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
