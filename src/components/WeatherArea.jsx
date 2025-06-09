import React from 'react';
import '../styles/style.css';

const WeatherArea = ({ weatherData, tempUnit, onTempToggle }) => (
  <div className="weather-area">
    <section className="left">
      <p id="country">
        <i className="fa-solid fa-location-dot"></i>
        <span id="address">{weatherData.location.toUpperCase()}</span>
      </p>
      <section className="date-day">
        <h1 id="time">{weatherData.time}</h1>
        <p id="date">{weatherData.date}</p>
      </section>
      <h1 id="temp">
        <span id="temp-value">
          {tempUnit === 'C' ? weatherData.temperature : weatherData.temperatureF}
        </span>
        °<span id="temp-metrics">{tempUnit}</span>
      </h1>
    </section>
    <section className="right">
      <button id="temp-metric" onClick={onTempToggle}>
        {tempUnit === 'C' ? 'Celcius' : 'Fahrenheit'}
      </button>
      <img src={weatherData.icon} alt="" id="weather-icon" />
      <h1 id="desc">{weatherData.description}</h1>
      <p id="desc-p">
        Feels like{' '}
        <span id="desc-temp">
          {tempUnit === 'C' ? weatherData.feelsLike : weatherData.feelsLikeF}
        </span>
        °<span id="desc-temp-metrics">{tempUnit}</span>
      </p>
    </section>
  </div>
);

export default WeatherArea;