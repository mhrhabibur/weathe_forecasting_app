import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import moment from 'moment';
import dateFormat from 'dateformat';


const Weather = () => {
  const inputRef = useRef();
  const [forecast, setForecast] = useState(false);
  const [weatherData, setWeatherData] = useState(false);
  
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "010d": rain_icon,
    "010n": rain_icon,
    "013d": snow_icon,
    "013n": snow_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter a city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`;
      const response = await fetch(url);
      const data = await response.json();
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      console.log(data);



      setWeatherData({
        humidity: data.main.humidity,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        feelLike: Math.floor(data.main.feels_like),
        location: data.name,
        country: data.sys.country,
        status: data.weather[0].main,
        icon: icon,
        lat: data.coord.lat,
        lon: data.coord.lon,
        min: Math.floor(data.main.temp_min), 
        max: Math.floor(data.main.temp_max), 
        sunrise: Math.floor(data.sys.sunrise), 
        sunset: Math.floor(data.sys.sunset),
        date: Math.floor(data.dt),
        
      });
      test(data.coord.lat, data.coord.lon);
      
    } catch (error) {}
  };

  const test = async (lat, lon) => {
    try {
      const urls = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`;
      const responses = await fetch(urls);
      const forecastData = await responses.json();
      const icon1 = allIcons[forecastData.list[0].weather[0].icon] || clear_icon;
      const icon2 = allIcons[forecastData.list[1].weather[0].icon] || clear_icon;
      const icon3 = allIcons[forecastData.list[2].weather[0].icon] || clear_icon;
      const icon4 = allIcons[forecastData.list[3].weather[0].icon] || clear_icon;
      const icon5 = allIcons[forecastData.list[4].weather[0].icon] || clear_icon;
      const icon6 = allIcons[forecastData.list[5].weather[0].icon] || clear_icon;
      const icon7 = allIcons[forecastData.list[6].weather[0].icon] || clear_icon;
      const icon8 = allIcons[forecastData.list[7].weather[0].icon] || clear_icon;
      console.log(forecastData);
      setForecast({
        temp1: Math.floor(forecastData.list[0].main.temp),
        temp2: Math.floor(forecastData.list[1].main.temp),
        temp3: Math.floor(forecastData.list[2].main.temp),
        temp4: Math.floor(forecastData.list[3].main.temp),
        temp5: Math.floor(forecastData.list[4].main.temp),
        temp6: Math.floor(forecastData.list[5].main.temp),
        temp7: Math.floor(forecastData.list[6].main.temp),
        temp8: Math.floor(forecastData.list[7].main.temp),
        icon1: icon1,
        icon2: icon2,
        icon3: icon3,
        icon4: icon4,
        icon5: icon5,
        icon6: icon6,
        icon7: icon7,
        icon8: icon8,
        time1: forecastData.list[0].dt_txt,
        time2: forecastData.list[1].dt_txt,
        time3: forecastData.list[2].dt_txt,
        time4: forecastData.list[3].dt_txt,
        time5: forecastData.list[4].dt_txt,
        time6: forecastData.list[5].dt_txt,
        time7: forecastData.list[6].dt_txt,
        time8: forecastData.list[7].dt_txt,
       
    
      });
    } catch (error) {}
  };
  useEffect(() => {
    search("Dhaka");
  }, []);
  return (
    <div className="weather">
      <div className="header">
        <div className="header-2">
          <p className="location">{weatherData.location}, {weatherData.country}</p> 
        </div>
        <div className="search-bar">
          <input ref={inputRef} type="text" placeholder="Search" />
          <img
            src={search_icon}
            alt=""
            onClick={() => search(inputRef.current.value)}
          />
        </div>
      </div>
      <p className="time-zone">{moment.unix(weatherData.sunrise).format("dddd")}, {moment.unix(weatherData.sunrise).format("DD MMMM, YYYY")}</p> 
      <div className="header-3">
        <img src={weatherData.icon} alt="" className="weather-icon" />
        <div>
          <p className="temperature">{weatherData.temperature}°c</p>
          <p className="feelLike">Feels Like {weatherData.feelLike}°c</p>
          <p className="status">{weatherData.status}</p>
        </div>
        <div className="vl"></div>

       <div className="weather-info">
        
       <div className="weather-status">
       <div className="col">
       <div className="temp-info">
            <p  className="info">{weatherData.max}°c</p>
            <p>Max Temperature</p>
          </div>
        </div>
        
        <div className="col">
          <div className="temp-info">
            <p  className="info">{weatherData.min}°c</p>
            <p>Min Temperature</p>

          </div>
        </div>
       </div>
       <div className="weather-status">
       <div className="col">
       <div className="temp-info">
            <p  className="info">{weatherData.humidity}%</p>
            <p>Humidity</p>
          </div>
        </div>
        <div className="col">
        <div className="temp-info">
            <p  className="info">{weatherData.windSpeed} Kmh</p>
            <p>Wind Speed</p>
          </div>
        </div>
        
       </div>
       <div className="weather-status">
       <div className="col">
       <div className="temp-info">
            <p  className="info">{moment.unix(weatherData.sunrise).format("hh:mm")} am</p>
            <p>Sunrise</p>
          </div>
        </div>
        <div className="col">
        <div className="temp-info">
            <p className="info">{moment.unix(weatherData.sunset).format("hh:mm")} pm</p>
            <p>Sunset</p>
          </div>
        </div>
       </div>
       </div>
      </div>
<div className="today-weather"><p>Todays Weather</p></div>
      <div className="weather-data">
      <div className="col">
          <div>
          <p>{dateFormat(forecast.time1, "HH:00")}</p>
          <img src={forecast.icon1} alt="" />
          <p>{forecast.temp1}°c</p>
          </div>
        </div>
        <div className="col">
          <div>
          <p>{dateFormat(forecast.time2, "HH:00")}</p>
          <img src={forecast.icon2} alt="" />
            <p>{forecast.temp2}°c</p>
          </div>
        </div>
        <div className="col">
          <div>
          <p>{dateFormat(forecast.time3, "HH:00")}</p>
          <img src={forecast.icon3} alt="" />
            <p>{forecast.temp3}°c</p>
          </div>
        </div>
        <div className="col">
          <div>
          <p>{dateFormat(forecast.time4, "HH:00")}</p>
          <img src={forecast.icon4} alt="" />
            <p>{forecast.temp4}°c</p>
          </div>
        </div>
        <div className="col">
          <div>
          <p>{dateFormat(forecast.time5, "HH:00")}</p>
          <img src={forecast.icon5} alt="" />
            <p>{forecast.temp5}°c</p>
          </div>
        </div>
        <div className="col">
          <div>
          <p>{dateFormat(forecast.time6, "HH:00")}</p>
          <img src={forecast.icon6} alt="" />
            <p>{forecast.temp6}°c</p>
          </div>
        </div>
        <div className="col">
          <div>
          <p>{dateFormat(forecast.time7, "HH:00")}</p>
          <img src={forecast.icon7} alt="" />
            <p>{forecast.temp7}°c</p>
          </div>
        </div>
        <div className="col">
          <div>
          <p>{dateFormat(forecast.time8, "HH:00")}</p>
          <img src={forecast.icon8} alt="" />
            <p>{forecast.temp8}°c</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
