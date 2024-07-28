import React from 'react';
import { WeatherIcons } from '../App';

const HourlyComponent = (props) => {
    const { hourlyWeather } = props;
    console.log(hourlyWeather);
    if (!hourlyWeather || hourlyWeather.length === 0) {
        return <p>Loading hourly forecast...</p>;
    }

    return (
        <div className="container">
            <h3 style={{textAlign:"center"}}>Hourly Forecast</h3>
            <div className="row hourly_row">
                {hourlyWeather.map((forecast, index) => (

                    <div key={index} className="col-sm-6 col-md-3 col-lg-3">
                        <div className="card hourly_card mb-3">
                            <div className="card-body">
                                <h6 className="card-title">
                                    {forecast.dt_txt}
                                </h6>
                                <p className="card-text">
                                    <img id="monthweatherIcon" src={WeatherIcons[forecast.weather[0].icon]} alt="weather_icon" />&nbsp;&nbsp;
                                    <i class="fa fa-thermometer" style={{fontSize:"29px"}}></i>
                                    <span style={{fontSize:"23px"}}><b>{`   ${Math.floor(forecast.main.temp - 273)}°C`}</b></span>
                                </p>
                                <p className="card-text" style={{fontSize:"15px",textAlign:"center",marginTop:"-10px"}}>
                                    
                                    {forecast.weather[0].description}
                                </p>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
}

export default HourlyComponent;
