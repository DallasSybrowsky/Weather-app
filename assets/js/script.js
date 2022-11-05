// Variables
const cities = [];
const searchBtn = document.querySelector(".btn");
const searchEl = document.querySelector("#city");
const citySearchInput = document.querySelector("#searched-city");
const forecast = document.querySelector("#forecast");
const forecastContainerEl = document.querySelector("#fiveday-div");
const recentSearchBtnEl = document.querySelector("#recent-search-btn");
const currentWeatherEl = document.querySelector("#current-weather-div");
let forecastCity = document.querySelector(".current-p");
let forecastWind = document.querySelector(".wind-p");
let forecastTemp = document.querySelector(".temp-p");
let forecastHumid = document.querySelector(".humidity-p");
const APIKey = "6bd6fa04098d210723846067fd673874";

// Functions
const formSubmission = function(event) {
    event.preventDefault();
    let location = searchEl.value.trim();
    if (location){
        getForecast(location); // create function to get forecast
        get5Day(location);
        cities.unshift({location});
        searchEl.value = "";
    } else {
        alert("Please enter a city name.");
    }
    saveCities();
    pastSearches(location);
}

// API calls
const getForecast = (event) => {
  event.preventDefault();
  let searchInput = searchEl.value.trim();
  let geoLocURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&appid=${APIKey}&units=imperial`;

  fetch(geoLocURL)
    .then((response) => response.json())
    .then(function (result) {
        let lat = result[0].lat
        let lon = result[0].lon
        currentForecast(lat, lon);
    })
    .catch((error) => console.log("error", error));
};

const currentForecast = (lat, lon) => {
  let currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;
  
  fetch(currentURL)
    .then((response) => response.json())
    .then(function (result) {
        console.log(result);
        console.log("The current temperature in " + result.name + " is: " + Math.round(result.main.temp) +"°F.");
        console.log("It feels like: " + Math.round(result.main.feels_like) +"°F.");
        console.log("The high is " + Math.round(result.main.temp_max) +"°F and the low is " + Math.round(result.main.temp_min) + "°F.");
        console.log("The wind is coming from " + result.wind.deg + " at " + Math.round((result.wind.speed)/1.609344) + "mph with gusts up to " + Math.round((result.wind.gust)/1.609344) + "mph.");
        console.log("Humidity: " + result.main.humidity + "%");
        console.log("Weather Icon: " + result.weather[0].icon);
        var today = moment().format("dddd, MMMM Do, YYYY");
        var icon = `<img src="https://openweathermap.org/img/w/${result.weather[0].icon}.png"></img>`;

        forecastCity.innerHTML = result.name + " " + today + " " + icon;
        forecastTemp.innerHTML = result.main.temp + "°F";
        forecastWind.innerHTML = Math.round((result.wind.speed)/1.609344) + "mph";
        forecastHumid.innerHTML = result.main.humidity + "%";
        })
    .catch((error) => console.log("error", error));

};


// Saves recent searches to local storage
const saveCities = function() {
  localStorage.setItem("cities", JSON.stringify(cities));
}

// Event handlers
searchBtn.addEventListener("click", getForecast);
searchBtn.addEventListener("click", saveCities);
// recentSearchBtnEl.addEventListener("click", newFunction);
