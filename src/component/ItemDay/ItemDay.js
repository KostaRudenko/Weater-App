import PropTypes from "prop-types";

import { dateFormat } from "../Weather/Weather";

export default function ItemDay({ day }) {
  const weatherDay = dateFormat(new Date(day.dt * 1000));

  return(
    <div
      className="location-box__item"
    >
      <div className="location-box__inner-container">
        <p>
          {weatherDay}
        </p>
        <img
          src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
          alt={day.weather[0].description}
        />
        <p className="location-box__description">
          {day.weather[0].description}
        </p>
        <p>
          {Math.round(day.temp.max)} / {Math.round(day.temp.min)} °c</p>
      </div>
    </div>
  );
};

ItemDay.propTypes = {
  day: PropTypes.object.isRequired
};
