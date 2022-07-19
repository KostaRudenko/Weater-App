import ItemDay from "../ItemDay/ItemDay"
import { DAYS, MONTHS } from "../../App";
import './WeatherMain.css';

export default function WeaterMain({ city, forecast }) {
    const dateBuilder = d => {
        const day = DAYS[d.getDay()];
        const date = d.getDate();
        const month = MONTHS[d.getMonth()];
        const year = d.getFullYear();
    
        return `${day}, ${date} ${month} ${year}`
      }

    return (
        <div className="content-container">

            <p className="content-container__current-position">
                {city.name}, {city.sys.country}
            </p>

            <p className="content-container__current-date">
                {dateBuilder(new Date())}
            </p>

            <p className="content-container__current-temp">
                {Math.round(city.main.temp)}°c
            </p>

            <div className="location-box">
                {forecast.daily.map((day) => (
                    <ItemDay key={day.dt} day={day} dateBuilder={dateBuilder} />
                ))}
            </div>

        </div>
    )
}