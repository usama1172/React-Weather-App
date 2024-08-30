// Main.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import ThemeContext from '../contexts/ThemeContext'; // Import ThemeContext directly

const Main = () => {
  const [city, setCity] = useState('Lahore');
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const { theme, toggleTheme } = useContext(ThemeContext); // Use useContext to consume theme and toggleTheme
  const apiKey = '98797ea43b434d060e7778354a878f11';

  // Function to fetch weather data
  const fetchData = () => {
    setError(null);
    setLoading(true);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        setWeatherData(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch weather data. Please try again.');
        setLoading(false);
      });
  };

  // Handle city input change
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        theme === 'light' ? 'bg-blue-100 text-black' : 'bg-gray-900 text-white'
      }`}
    >
      <h1 className="text-4xl font-bold mb-8">Simple Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="Enter city name"
        className={`p-2 border rounded mb-4 w-64 text-center ${
          theme === 'light'
            ? 'bg-white text-black border-gray-400'
            : 'bg-gray-700 text-white border-gray-600'
        }`}
      />
      <button
        onClick={fetchData}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600 transition-colors"
      >
        Search
      </button>
      {loading ? (
        <p className="text-xl">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        weatherData && (
          <div
            className={`p-6 rounded shadow-md w-80 ${
              theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'
            }`}
          >
            <h2 className="text-2xl font-semibold mb-2">{weatherData.name}</h2>
            <p className="text-lg">Temperature: {weatherData.main.temp}°C</p>
            <p className="text-lg">Weather: {weatherData.weather[0].description}</p>
          </div>
        )
      )}
      {/* Toggle Theme Button */}
      <button
        onClick={toggleTheme}
        className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
      >
        Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
};

export default Main;


