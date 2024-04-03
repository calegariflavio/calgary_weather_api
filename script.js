// API settings
const openMeteoApiUrl = 'https://api.open-meteo.com/v1/forecast';
const latitude = 51.0447;
const longitude = -114.0719;

// Function to handle errors
function handleError(error) {
  console.error('Error fetching weather data:', error);
}

// Fetch weather data
fetch(`${openMeteoApiUrl}?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
  .then(response => {
    if (!response.ok) { // Check for HTTP errors
      throw new Error(`HTTP error ${response.status}`);
    }
    return response.json();
  })
  .then(currentWeatherData => {
    // Weather description mapping
    const weatherDescriptions = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast"
    };

    const temperature = currentWeatherData.current_weather.temperature;
    const weathercode = currentWeatherData.current_weather.weathercode;
    const description = weatherDescriptions[weathercode] || "Weather description unavailable";

    document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
    document.getElementById('description').textContent = `Current condition: ${description}`;
  })
  .catch(handleError); // Use the error handler
