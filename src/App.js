import { useState, useEffect, useRef } from "react";
import './App.css';
import FormCity from "./Components/FormCity/FormCity";
import WeaterMain from "./Components/WeatherMain/WeatherMain";

const API = {
  key: "9c6cdcf1ca50d4bc007df08c42efa786", // You can get your own API key on https://openweathermap.org/
  base: "https://api.openweathermap.org/data/2.5/",
  forecast: "https://api.openweathermap.org/data/2.5/onecall?"
}

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function App() {
  const [city, setCity] = useState({});
  const [forecast, setForecast] = useState({});
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      fetchForForecast().catch(console.error);
    } else {
      isMounted.current = true;
    }
  }, [city]);

  const onSubmit = (event) => {
    event.preventDefault();
  
    fetchForCity(event.target.city.value).catch(console.error);

    event.target.city.value = '';
  }

  const fetchForCity = async (city) => {
    const response = await fetch(`${API.base}weather?q=${city}&units=metric&appid=${API.key}`);
    const data = await response.json();
    
    setCity(data);
  }

  const fetchForForecast = async () => {
    const response = await fetch(`${API.forecast}lat=${city.coord.lat}&lon=${city.coord.lon}&exclude=hourly,minutely&units=metric&appid=${API.key}`);
    const data = await response.json();

    setForecast(data);
  }

  const blockError = (
    <p className="not-found">Sorry your {city.message}</p>
  );

  return (
    <div className="main">
      <div className="main__container">
        <h1 className="main__title">Weather Map</h1>

        <FormCity onSubmit={onSubmit} />

        { city.cod === '404' ? blockError

          :

          forecast.daily ? <WeaterMain city={city} forecast={forecast} />

            : ''
        }
      </div>
    </div>
  );
}

export default App;
