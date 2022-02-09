import { useState } from "react";
import './App.css';

const api = {
  key: "9c6cdcf1ca50d4bc007df08c42efa786", // You can get your own API key on https://openweathermap.org/
  base: "https://api.openweathermap.org/data/2.5/",
  forecast: "https://api.openweathermap.org/data/2.5/onecall?"
}

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [forcst, setForcsst] = useState({});

  const dateBuilder = d => {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`
  }

  const search = event => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setCity('');
    
          fetch(`${api.forecast}lat=${result.coord.lat}&lon=${result.coord.lon}&exclude=hourly,minutely&units=metric&appid=${api.key}`)
          .then(res => res.json())
          .then(resp => {
            setForcsst(resp);
          }).catch(err => console.error(err));
        }).catch(err => console.error(err));
    }
  }

  const inputValue = e => {
    setCity(e.target.value);
  }

  return (
    <div className="App">
      <div className="search-box">
        <span>Type city name here  </span>
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={inputValue}
          value={city}
          onKeyPress={search}
        />
      
      </div>
      
      <div>
        { weather.cod === '404' ? (
          <p className="not-found">Sorry your {weather.message}</p>
        )
        
        :

        typeof forcst.daily !== 'undefined' ? ( 
          <div className="content-container">

            <p className="content-container__current-position">
              {weather.name}, {weather.sys.country}
            </p>

            <p className="content-container__current-date">
              {dateBuilder(new Date())}
            </p>

            <p className="content-container__current-temp">
              {Math.round(weather.main.temp)}°c
            </p>

            <div className="location-box">
              {forcst.daily.map(day => (
                    <div key={Math.random()} className="location-box__item">
                      <div className="location-box__inner-container">
                        <p>{dateBuilder(new Date(day.dt * 1000))}</p>
                        <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="weather-icon" />
                        <p className="location-box__description">{day.weather[0].description}</p>
                        <p>{Math.round(day.temp.max)} / {Math.round(day.temp.min)} °c</p>
                      </div>
                    </div>
                )) }
            </div>
          
          </div>

        ) : ''}
      </div>
  
    </div>
  );
}

export default App;
