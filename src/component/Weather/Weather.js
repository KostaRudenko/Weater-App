import PropTypes from "prop-types";

import { DAYS, MONTHS } from "../../App";

import ItemDay from "../ItemDay/ItemDay";

export default function Weather({weather, forecast}) {
  return (
    <div className="content-container">

      <p className="content-container__current-position">
        {weather.name},
        {' '}
        {weather.sys.country}
      </p>

      <p className="content-container__current-date">
        {dateFormat(new Date())}
      </p>

      <p className="content-container__current-temp">
        {Math.round(weather.main.temp)}
        °c
      </p>

      <div className="location-box">
        {forecast.daily.map((day, index) => (
          <ItemDay
            key={index}
            day={day}
          />
        ))}
      </div>

    </div>
  );
}

Weather.propTypes = {
  weather: PropTypes.object.isRequired,
  forecast: PropTypes.object.isRequired,
}

export const dateFormat = d => {
  const day = DAYS[d.getDay()];
  const date = d.getDate();
  const month = MONTHS[d.getMonth()];
  const year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`
}
