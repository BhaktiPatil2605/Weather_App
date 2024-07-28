import React, { useEffect, useState } from 'react';
import './App.css';
import WeatherComponent from './components/WeatherComponent';
import CityComponent from './components/CityComponent';
import Navbar from './components/Navbar';
import HourlyComponent from './components/HourlyComponent';
import WeeklyComponent from './components/WeeklyComponent';

// import Axios from "axios";

export const WeatherIcons = {
  "01d": "/icons/sunny.svg",
  "01n": "/icons/night.svg",
  "02d": "/icons/day.svg",
  "02n": "/icons/cloudy-night.svg",
  "03d": "/icons/cloudy.svg",
  "03n": "/icons/cloudy.svg",
  "04d": "/icons/perfect-day.svg",
  "04n": "/icons/cloudy-night.svg",
  "09d": "/icons/rain.svg",
  "09n": "/icons/rain-night.svg",
  "10d": "/icons/rain.svg",
  "10n": "/icons/rain-night.svg",
  "11d": "/icons/storm.svg",
  "11n": "/icons/storm.svg",
  "50d": "/icons/haze.svg",
  "50n": "/icons/night-haze.svg"
}

function App() {
  const [city, updateCity] = useState();
  const [weather, updateWeather] = useState();
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [weeklyWeather, setWeeklyWeather] = useState([]);

  const [isDayTime, setDayTime] = useState(true);

  useEffect(() => {
    const currentHour = new Date().getHours();
    setDayTime(currentHour >= 5 && currentHour <= 18);

    // Update body background based on time of day
    document.body.style.backgroundImage = isDayTime
      ? 'url("/icons/sunny.jpg")'
      : 'url("/icons/night.jpg")';
    document.body.style.backgroundSize = '100% 100%';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backdropFilter = 'blur(5px)';
    // document.body.style.height='612px';




    // Clean up the background style when the component unmounts
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
    };
  }, [isDayTime]);

  const fetchWeather = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2dbca6dee0faac5e88e75a47b3da64ef`,
    );
    const data = await response.json();
    console.log(data);
    if (data.cod === '404') {
      alert(data.message);
    } else {
      updateWeather(data);
    }

    // const{lat, lon}=data.coord;
    const hourresponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=2dbca6dee0faac5e88e75a47b3da64ef`,
    );
    const hourlydata = await hourresponse.json();
    // console.log(hourlydata);
    if (hourlydata.cod === '404') {
      alert("Hourly Forecast fo this city not found");
    } else {
        const today = new Date().toISOString().split('T')[0];
        // console.log(today);
        const todayForecast =
          hourlydata.list.filter(
            forecast =>
              forecast.dt_txt.includes(today)
          );
        setHourlyWeather(todayForecast);


        // for Weekly forcast
        // Process the 5-day/3-hour forecast to derive a simple weekly forecast
        const dailyForecast = {};
        hourlydata.list.forEach(forecast => {
          const date = forecast.dt_txt.split(' ')[0];
          // console.log(date);
          if (!dailyForecast[date]) {
            dailyForecast[date] = [];
          }
          dailyForecast[date].push(forecast);
        });

        const weeklyData = Object.keys(dailyForecast).map(date => {
          const dayData = dailyForecast[date];
          const avgTemp = dayData.reduce((sum, entry) => sum + entry.main.temp, 0) / dayData.length;
          const weather = dayData[0].weather[0];
          return {
            date,
            temp: avgTemp,
            weather
          };
        });
        // console.log(weeklyData);
        setWeeklyWeather(weeklyData);
    }

  }




  return (
    <>
      <Navbar />
      {city && weather ?
        (
          <>
            <WeatherComponent city={city} weather={weather} />
            <HourlyComponent hourlyWeather={hourlyWeather} />
            <WeeklyComponent weeklyWeather={weeklyWeather} />

          </>
        ) : (
          <CityComponent updateCity={updateCity} fetchWeather={fetchWeather} />
        )
      }
      {/* <Footer/> */}
    </>
  );
}

export default App;
