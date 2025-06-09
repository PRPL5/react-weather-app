import React from 'react';
import '../styles/style.css';

const WeatherAreaRight = ({ sunrise, sunset, length }) => (
  <div className="weather-area-right">
    <div className="sun">
      <h1>Sunrise</h1>
      <p id="sunrise">{sunrise}</p>
      <h1>Sunset</h1>
      <p id="sunset">{sunset}</p>
      <h1>Day Length</h1>
      <p id="length">{length}</p>
    </div>
  </div>
);

export default WeatherAreaRight;