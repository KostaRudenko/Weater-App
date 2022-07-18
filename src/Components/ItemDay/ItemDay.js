export default function ItemDay({ day, dateBuilder }) {
    return (
        <div className="location-box__item">
            <div className="location-box__inner-container">
                <p>{dateBuilder(new Date(day.dt * 1000))}</p>
                <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="weather-icon" />
                <p className="location-box__description">{day.weather[0].description}</p>
                <p>{Math.round(day.temp.max)} / {Math.round(day.temp.min)} °c</p>
            </div>
        </div>
    )
}