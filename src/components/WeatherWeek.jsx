import React from 'react';
import '../scss/styles.css';

const WeatherWeek = ({ weeklyForecast, tempUnit }) => (
  <div className="days">
    {weeklyForecast && weeklyForecast.length > 0 ? (
      weeklyForecast.map((day, index) => {
        const weekday = new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' });
        const temp = tempUnit === 'C' ? day.temperature : day.temperatureF;
        return (
          <div key={index} className="day">
            <div className="weekday">{weekday}</div>
            <img className="day-img" src={day.icon} alt={day.description} />
            <div>{temp}°{tempUnit}</div>
          </div>
        );
      })
    ) : (
      <p>No forecast data available.</p>
    )}
  </div>
);

export default WeatherWeek;