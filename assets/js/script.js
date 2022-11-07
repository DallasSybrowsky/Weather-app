// Variables
let cities = [];
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
let forecastHeader = document.querySelector(".five-day-header");
let forecastFiveDay = document.querySelector(".five-day-card");
const APIKey = "6bd6fa04098d210723846067fd673874";

//Global variables for loops
let fiveDayDate = [];
let fiveDayTemp = [];
let fiveDayWind = [];
let fiveDayHumidity = []; 
let fiveDayIcon = [];

// Functions
const formSubmission = function (event) {
  event.preventDefault();
  let location = searchEl.value.trim();
  if (location) {
    getForecast(location); // create function to get forecast
    get5Day(location);
    cities.unshift({ location });
    searchEl.value = "";
  } else {
    alert("Please enter a city name.");
  }
  saveCities();
  pastSearches(location);
};

// API calls
const getForecast = (event) => {
  event.preventDefault();
  let searchInput = searchEl.value.trim();
  let geoLocURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&appid=${APIKey}&units=imperial`;

  fetch(geoLocURL)
    .then((response) => response.json())
    .then(function (result) {
      let lat = result[0].lat;
      let lon = result[0].lon;
      currentForecast(lat, lon);
      fiveDayForecast(lat, lon);
    })
    .catch((error) => console.log("error", error));
};

const currentForecast = (lat, lon) => {
  let currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;

  fetch(currentURL)
    .then((response) => response.json())
    .then(function (result) {
    //   console.log(result);
    //   console.log(
    //     "The current temperature in " +
    //       result.name +
    //       " is: " +
    //       Math.round(result.main.temp) +
    //       "°F."
    //   );
    //   console.log(
    //     "It feels like: " + Math.round(result.main.feels_like) + "°F."
    //   );
    //   console.log(
    //     "The high is " +
    //       Math.round(result.main.temp_max) +
    //       "°F and the low is " +
    //       Math.round(result.main.temp_min) +
    //       "°F."
    //   );
    //   console.log(
    //     "The wind is coming from " +
    //       result.wind.deg +
    //       " at " +
    //       Math.round(result.wind.speed / 1.609344) +
    //       "mph with gusts up to " +
    //       Math.round(result.wind.gust / 1.609344) +
    //       "mph."
    //   );
    //   console.log("Humidity: " + result.main.humidity + "%");
    //   console.log("Weather Icon: " + result.weather[0].icon);
      var today = moment().format("dddd, MMMM Do, YYYY");
      var icon = `<img src="https://openweathermap.org/img/w/${result.weather[0].icon}.png"></img>`;

      forecastCity.innerHTML = result.name + " - " + today + " " + icon;
      forecastTemp.innerHTML =
        "Temperature: " + Math.round(result.main.temp) + "°F";
      forecastWind.innerHTML =
        "Wind from: " +
        result.wind.deg +
        " at " +
        Math.round(result.wind.speed / 1.609344) +
        " mph";
      forecastHumid.innerHTML = "Humidity: " + result.main.humidity + "%";
    })
    .catch((error) => console.log("error", error));
};

const fiveDayForecast = (lat, lon) => {
  let fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;
  fetch(fiveDayURL)
    .then((response) => response.json())
    .then(function (result) {
      console.log(result);
    //   console.log(result.list[3].weather[0].icon);
      console.log(result.list[0].main.humidity);

      for (i = 0; i < result.list.length; i++) {
        if (
          moment(result.list[i].dt_txt, "YYYY-MM-DD HH:mm:ss").format("HH") ===
          "15"
        ) {
            fiveDayDate.push(moment(result.list[i].dt_txt, "YYYY-MM-DD HH:mm:ss").format("MMMM Do"));
            fiveDayIcon.push(result.list[i].weather[0].icon);
            fiveDayTemp.push(result.list[i].main.temp_max);
            fiveDayWind.push(result.list[i].wind.speed);
            fiveDayHumidity.push(result.list[i].main.humidity);
        }
      };

    let fiveDayCard = "";
    for (i=0; i<5; i++){
        fiveDayCard += `
        <div id="days" class="col-2 row day-1">
            <p class="date-1">${fiveDayDate[i]}</p>
            <img class="icon-img" src="https://openweathermap.org/img/w/${fiveDayIcon[i]}.png" style="width:50px;height:50px;"></img>
            <p class="day-1-temp">${"Temp: " + Math.round(fiveDayTemp[i]) + "°F"}</p>
            <p class="day-1-wind">${"Wind: " + Math.round(fiveDayWind[i]) + " mph"}</p>
            <p class="day-1-humid">${"Humidity: " + Math.round(fiveDayHumidity[i]) + "%"}</p>
          </div>`
    };
    forecastFiveDay.innerHTML = fiveDayCard;
    fiveDayDate = [];
    fiveDayTemp = [];
    fiveDayWind = [];
    fiveDayHumidity = []; 
    fiveDayIcon = [];
    });
};

// Saves recent searches to local storage
// let saveCities = function(searchEl) {
//     cities = JOSN.parse(localStorage.setItem("cities")) ?? [];
//     cities.push(searchEl);
//     localStorage.setItem('cities', JSON.stringify(cities));
// }

// Event handlers
searchBtn.addEventListener("click", getForecast);
// searchBtn.addEventListener("click", saveCities);
// recentSearchBtnEl.addEventListener("click", newFunction);
