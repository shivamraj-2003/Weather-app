/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import search from "../images/search.png"
import clear from "../images/clear.png"
import drizzle from "../images/drizzle.png"
import cloud from "../images/cloud.png"
import rain from "../images/rain.png"
import wind from "../images/wind.png"
import snow from "../images/snow.png"
import humidity from "../images/humidity.png"
import ima from "../images/ima.jpg"
function Weather() {
    const [weatherData, setWeatherData] = useState({
        humidity: "64",
        windSpeed: "8",
        temperature: "24",
        location: "London",
        High: "24",
        Low: "12",
        Precipitation: "70",
        AtmosphericPressure: "1010",
        Description: "Moderate Rain"

    });

    let api_key = "";

    const [wicon, setWicon] = useState(cloud);

    const searchWeather = async () => {
        const element = document.getElementsByClassName("cityInput");
        if (element[0].value === "") {
            return 0;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let response = await fetch(url);
        let data = await response.json();

        setWeatherData({
            humidity: Math.floor(data.main.humidity),
            windSpeed: Math.floor(data.wind.speed),
            temperature: Math.floor(data.main.temp),
            location: data.name,
            High: data.main.temp_min,
            Low: data.main.temp_max,
            Precipitation: data.clouds.all,
            AtmosphericPressure: data.main.pressure,
            Description: data.weather[0].description
        });

        if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
            setWicon(clear);
        }
        else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
            setWicon(cloud);
        }
        else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
            setWicon(drizzle);
        }
        else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
            setWicon(drizzle);
        }
        else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
            setWicon(rain);
        }
        else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
            setWicon(rain);
        }
        else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
            setWicon(snow);
        }
        else {
            setWicon(clear);
        }

    }

    return (
        <div style={ { backgroundImage: `url(${ima})` } } className='w-screen h-screen bg-cover bg-center bg-fixed bg-no-repeat'>
            <div className='w-1/2 h-auto m-auto text-center rounded-lg '>

                <div className='flex justify-center gap-6 pt-8'>
                    <input type="text" placeholder='Search' className='cityInput flex w-full md:w-64 h-12 bg-white border-none outline-none rounded-2xl pl-8 text-gray-400 text-xl font-medium' />
                    <div className='flex justify-center items-center w-12 h-12 bg-white rounded-full cursor-pointer'>
                        <img src={ search } alt="" onClick={ searchWeather } />
                    </div>
                </div>

                <div className='mt-2 flex justify-center'>
                    <img src={ wicon } alt="" />
                </div>
                <div className=' weather-temp flex  justify-center text-gray-300 text-4xl font-semibold'>{ weatherData.Description }</div>

                <div className=' weather-temp flex justify-center  text-yellow-400 text-6xl font-semibold'>{ weatherData.temperature }&deg;C</div>
                <div className='weather-location flex justify-center text-white text-4xl font-medium'>{ weatherData.location }</div>

                <div className='mt-2 flex flex-col md:flex-row justify-center'>
                    <div className='m-auto flex items-start gap-6'>
                        <img src={ humidity } alt="" className='mt-3 text-red-400' />
                        <div className='text-2xl font-medium'>
                            <div className='humidity-per text-violet-500'>{ weatherData.humidity }%</div>
                            <div className='text-xl text-red-300 font-medium'>Humidity</div>
                        </div>
                    </div>
                    <div className='m-auto flex items-start gap-6'>
                        <img src={ wind } alt="" className='mt-3' />
                        <div className='text-2xl font-medium'>
                            <div className='text-amber-400 wind-speed'>{ weatherData.windSpeed } km/h</div>
                            <div className='text-xl text-teal-400 font-medium'>Wind Speed</div>
                        </div>
                    </div>
                </div>

                <div className='mt-2 text-white flex justify-center '>
                    <div className='m-auto flex items-start gap-6 '>
                        <div className='text-2xl font-medium'>
                            <div className='humidity-per text-red-600 '>{ weatherData.High }&deg;C</div>
                            <div className='text-xl  text-pink-400 font-medium'>High</div>
                        </div>
                    </div>
                    <div className='m-auto mt-2 flex items-start gap-6 '>
                        <div className='text-2xl font-medium'>
                            <div className='wind-speed text-purple-400'>{ weatherData.Low }&deg;C</div>
                            <div className='text-xl text-rose-400 font-medium'>Low</div>
                        </div>
                    </div>
                </div>
                <div className='mt-2 text-white flex justify-center '>
                    <div className='m-auto flex items-start gap-6 '>
                        <div className='text-2xl font-medium'>
                            <div className='humidity-per text-indigo-400 '>{ weatherData.Precipitation }%</div>
                            <div className='text-xl text-cyan-700 font-medium'>Precipitation</div>
                        </div>
                    </div>
                    <div className='m-auto flex items-start gap-6 '>
                        <div className='text-2xl font-medium'>
                            <div className='wind-speed text-sky-300 '>{ weatherData.AtmosphericPressure }hPa</div>
                            <div className='text-xl  text-orange-300 font-medium'>Atmospheric Pressure</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;
