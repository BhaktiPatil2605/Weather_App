import React from 'react'
import { WeatherIcons } from '../App';

export const WeatherInfoIcons = {
  sunset: "/icons/sunset.svg",
  sunrise: "/icons/sunrise.svg",
  humidity: "/icons/humidity.svg",
  wind: "/icons/wind.svg",
  pressure: "/icons/pressure.svg",
};

const WeatherInfoComponent = (props) => {
  const { name, value } = props;
  // console.log(name);
  return (
    <div id="card-info">
      <div className='Infocontainer'>
        <img className="infolabel" src={WeatherInfoIcons[name]} alt="syg_image"></img>
        <span className='Infobody'>
          {value}
          <span>{name}</span>
        </span>
      </div>
    </div>
  );
};
// eslint-disable-next-line

const WeatherComponent = (props) => {
  const { weather } = props;
  const isDay = weather.weather[0].icon.includes('d');
  const getTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return `${date.getHours()} : ${date.getMinutes()}`;
  }

  return (
    <>
      <span id="location">{`${weather.name}, ${weather.sys.country}`}</span><br></br>

      <div className='row col-lg-12'>
        <div id="weatherContainer" className='col-lg-5'>
          <span id="condition">
            <img id="weatherIcon" src={WeatherIcons[weather.weather[0].icon]} alt="weather_icon"></img>&nbsp;&nbsp;
            <span>{`${Math.floor(weather.main.temp - 273)}°C`}</span>
            {` | ${weather.weather[0].description}`}
          </span>
        </div>

        <div className="weatherInfo col-lg-7" >
          <h3 className='weatherInfoLabel'>Weather Report</h3>
          <div className='weatherInfoContainer'>
            <WeatherInfoComponent name={isDay ? "sunrise" : "sunset"} value={`${getTime(weather.sys[isDay ? "sunrise" : "sunset"])}`} />
            <WeatherInfoComponent name={"humidity"} value={weather.main.humidity} />
            <WeatherInfoComponent name={"wind"} value={weather.wind.speed} />
            <WeatherInfoComponent name={"pressure"} value={weather.main.pressure} />
          </div>
        </div>
      </div>
      <br></br>

    </>
  )
}

export default WeatherComponent
