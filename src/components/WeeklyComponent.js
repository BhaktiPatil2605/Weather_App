import React, { useEffect, useState} from 'react';

import { WeatherIcons } from '../App';
import ApexCharts from 'react-apexcharts';

const WeeklyComponent = (props) => {
    const { weeklyWeather } = props;
    console.log(weeklyWeather);

    const [isDay, setDay] = useState(true);

    useEffect(() => {
      const currentHour = new Date().getHours();
      setDay(currentHour >= 5 && currentHour <= 18);
    }, [isDay]);

    const stroke_color=isDay?"#000":"#fff";
    const text_color=isDay?"#333":"#999";

    // Extract dates and temperatures
    const dates = weeklyWeather.map(item => item.date);
    const temperatures = weeklyWeather.map(item => `${Math.floor(item.temp - 273)}°C`);

    var options = {
        series: [
          {
            name:"Temperature",
            data: temperatures,
          },
          
        ],
        chart: {
          height: 200,
          type: "area",
        //   background: "#fff",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          categories: dates,
          title: {
            text: "Dates",
            style: {
              color: text_color,
            },
          },
         
          labels: {
            style: {
              colors: text_color,
            },
          },
        },
        yaxis: {
          title: {
            text: "Temperature",
            style: {
              color: text_color,
            },
          },
          labels: {
            style: {
              colors: text_color,
            },
          },
        },
        colors: [stroke_color],
        title: {
            text: 'Weekly Temperature Forecast',
            align: 'center',
            style: {
              color: text_color,
              fontSize:"18px",
          },
        }
        
      };

      

    // return false;
    return (
        <>
        <div className="container-fluid">
            <h3 style={{ textAlign: "center" }}>Weekly Forecast</h3>
            <div className="row weekly_row">
                {weeklyWeather.slice(1).map((week, index) => (

                    <div key={index} className="col">
                        <div className="card weekly_card mb-3">
                            <div className="card-body">
                                <p className="card-title">
                                    <b>{week.date}</b>

                                    <img id="weekweatherIcon" src={WeatherIcons[week.weather.icon]} alt="weather_icon" />&nbsp;&nbsp;

                                </p>
                                <span id="condition" className="card-text">
                                    <i class="fa fa-thermometer" style={{ fontSize: "23px" }}></i>
                                    <span style={{ fontSize: "19px" }}><b>{`   ${Math.floor(week.temp - 273)}°C`}</b></span> {` | ${week.weather.description}`}
                                </span>
                                {/* <p className="card-text" style={{fontSize:"18px"}}>
                            Weather :- <br></br>
                            <b>{week.weather.description}</b>
                        </p> */}
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>

        <div className="container">
            <ApexCharts options={options} series={options.series} type="area" height={200} />
        </div>
        </>
    )
}

export default WeeklyComponent
