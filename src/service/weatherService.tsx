import { Weather, Forecast, City } from '../types';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = process.env.REACT_APP_WEATHER_API_URL;

// Ensure the base URL uses HTTPS
const SECURE_BASE_URL = BASE_URL?.replace('http://', 'https://');

export const getCurrentWeather = async (city: City): Promise<Weather> => {
  try {
    const response = await fetch(`${SECURE_BASE_URL}/weather?lat=${city.latitude}&lon=${city.longitude}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return {
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      city: data.name,
      country: data.sys.country,
    };
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

export const getWeatherForecast = async (city: City): Promise<Forecast[]> => {
  try {
    const response = await fetch(`${SECURE_BASE_URL}/forecast?lat=${city.latitude}&lon=${city.longitude}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.list.map((item: any) => ({
      date: item.dt_txt,
      temperature: item.main.temp,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
    }));
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error;
  }
};
