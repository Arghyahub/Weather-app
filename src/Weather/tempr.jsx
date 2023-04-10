import React, { useState, useEffect } from 'react'
import "./styles.css"
import WeatherCard from './weatherCard';


const Tempr = () => {
    const [searchValue,setSearchValue] = useState("Guwahati") ;
    const [tempInfo,setTempInfo] = useState({}) ;
    const key = process.env.REACT_APP_API_KEY;

    const getWeatherInfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${key}`
            const res = await fetch(url) ;
            const data = await res.json() ;
            // console.log(data) ;

            const {temp,humidity,pressure} = data.main;
            const {main:weatherMood} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {country , sunset} = data.sys ;
            
            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weatherMood,
                name,
                speed,
                country,
                sunset
            };
            setTempInfo(myNewWeatherInfo) ;
        }
        catch(err){
            console.log(err) ;
        }
    };

    useEffect(() => {
        getWeatherInfo() ;
    }, [])
        

    return (
    <>
        <div className="wrap">
            <div className="search">
                <input type="search"
                placeholder='search...'
                autoFocus id="search"
                className='searchTerm'
                value={searchValue}
                onChange={(e)=> {setSearchValue(e.target.value)}}
                />
                <button className="searchButton" onClick={getWeatherInfo}>🔍</button>
            </div>
        </div>

        <WeatherCard tempInfo={tempInfo} />

    </>
  )
}

export default Tempr