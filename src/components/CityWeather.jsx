import React from 'react';
import '../scss/styles.css'

const CityWeather = ({ city, temperature, temperatureF, tempUnit, weatherIcon, description }) => (
  <div className="city">
    <h1>
      {tempUnit === 'C' ? temperature : temperatureF}
      <span id="temperature-m">°{tempUnit}</span>
    </h1>
    <section className="city-frame">
      <p>{city}</p>
      <img src={weatherIcon} alt={description} id="icon-1" />
    </section>
  </div>
);

export default CityWeather;