const apiKey = "58d5a927d0d794f673c4d461cdd225fc";

export const getWeatherByZip = zipCode => {
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=imperial`;
    return fetch(url)
        .then(response => response.json())
        .catch(() => {
            msg.textContent = "Please search for a valid city 😩";
        });
}