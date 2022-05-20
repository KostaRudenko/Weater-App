import { useEffect, useState } from "react";
import './App.css';
import Weather from "./component/Weather/Weather";
import FormCity from "./component/FormCity/FormCity";

const API = {
  key: "9c6cdcf1ca50d4bc007df08c42efa786", // You can get your own API key on https://openweathermap.org/
  base: "https://api.openweathermap.org/data/2.5/",
  forecast: "https://api.openweathermap.org/data/2.5/onecall?"
}

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function App() {
  const [weather, setWeather] = useState();
  const [forecast, setForecast] = useState();

  useEffect(async () => {
    if (!weather || weather.cod === '404') {
      return;
    }
    await fetch(`${API.forecast}lat=${weather.coord.lat}&lon=${weather.coord.lon}&exclude=hourly,minutely&units=metric&appid=${API.key}`)
      .then(result => result.json())
      .then(result => {
        setForecast(result);
      }).catch(err => console.error(err));
  }, [weather]);

  const onSubmit = async (e) => {
    const city = e.target.city.value;
    const https = `${API.base}weather?q=${city}&units=metric&appid=${API.key}`;
    await fetch(https)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
      }).catch(err => {
        console.error(err)
        setWeather();
      });
  }
  const blockError = (
    <p className="not-found">Sorry your {weather && weather.message}</p>
  );

  return (
    <div className="App">
      <FormCity onSubmit={onSubmit}/>

      {weather && weather.cod === '404' ? blockError
        : forecast && (
        <Weather weather={weather} forecast={forecast}/>
      )}

    </div>
  );
}

export default App;
