// Variables
let cities;
const searchBtn = document.querySelector(".btn");
const searchEl = document.querySelector("#city");
const citySearchInput = document.querySelector("#searched-city");
const forecast = document.querySelector("#forecast");
const forecastContainerEl = document.querySelector("#fiveday-div");
const recentSearchBtnEl = document.querySelector("#history");
const currentWeatherEl = document.querySelector("#current-weather-div");
let forecastCity = document.querySelector(".current-p");
let forecastWind = document.querySelector(".wind-p");
let forecastTemp = document.querySelector(".temp-p");
let forecastHumid = document.querySelector(".humidity-p");
// let forecastSunrise = document.querySelector(".sunrise-p");
// let forecastSunset = document.querySelector(".sunset-p");
let forecastHeader = document.querySelector(".five-day-header");
let forecastFiveDay = document.querySelector(".five-day-card");
const APIKey = "6bd6fa04098d210723846067fd673874";

//Global variables for loops
let fiveDayDate = [];
let fiveDayTemp = [];
let fiveDayWind = [];
let fiveDayHumidity = [];
let fiveDayIcon = [];

// API calls
const getForecast = (event) => {
  // console.log(event);
  let searchInput = searchEl.value.trim() || event;
  let geoLocURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&appid=${APIKey}&units=imperial`;
  console.log(searchInput);
  if (typeof searchInput != "string") {
    alert("Please enter a city name.");
    return;
  }
  fetch(geoLocURL)
    .then((response) => response.json())
    .then(function (result) {
      let lat = result[0].lat;
      let lon = result[0].lon;
      currentForecast(lat, lon);
      fiveDayForecast(lat, lon);
    })
    .catch((error) => console.log("error", error));
  // Saves searches to local storage
  let oldSearches = localStorage.getItem("searchInput") || [];
  var parsedOldSearches =
    oldSearches.length === 0 ? [] : JSON.parse(oldSearches);
  if (!parsedOldSearches.includes(searchInput)) {
    parsedOldSearches.push(searchInput);
    localStorage.setItem("searchInput", JSON.stringify(parsedOldSearches));
  }
  createRecentButtons();
  searchEl.value = "";
};

var createRecentButtons = function () {
  var data = localStorage.getItem("searchInput") || [];
  var parsedOldSearches = data.length === 0 ? [] : JSON.parse(data);
  var template = "";
  if (parsedOldSearches.length > 0) {
    parsedOldSearches.forEach(function (cityName) {
      template += `<button class="city-btn">${cityName}</button>`;
    });
  }
  document.querySelector("#history").innerHTML = template;
};

createRecentButtons();
document.querySelector("#history").addEventListener("click", function (event) {
  console.log(event.target);
  var cityName = event.target.textContent;
  getForecast(cityName);
});

const currentForecast = (lat, lon) => {
  let currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;

  fetch(currentURL)
    .then((response) => response.json())
    .then(function (result) {
      console.log(result);
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
        "Wind speed: " + Math.round(result.wind.speed / 1.609344) + " mph";
      forecastHumid.innerHTML = "Humidity: " + result.main.humidity + "%";
      // forecastSunrise.innerHTML = `Sunrise: ${moment.unix((result.sys.sunrise + result.sys.timezone) * 1000).format("hh:mm")}`
      // console.log(moment.unix((result.sys.sunrise)).format("h:mm a"))
      // forecastSunset.innerHTML = `Sunset: ${result.sys.sunset}`
    })
    .catch((error) => console.log("error", error));
};

const fiveDayForecast = (lat, lon) => {
  let fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;
  fetch(fiveDayURL)
    .then((response) => response.json())
    .then(function (result) {
      // console.log(result);
      //   console.log(result.list[3].weather[0].icon);
      //   console.log(result.list[0].main.humidity);
      for (i = 0; i < result.list.length; i++) {
        if (
          moment(result.list[i].dt_txt, "YYYY-MM-DD HH:mm:ss").format("HH") ===
          "15"
        ) {
          fiveDayDate.push(
            moment(result.list[i].dt_txt, "YYYY-MM-DD HH:mm:ss").format(
              "MMMM Do"
            )
          );
          fiveDayIcon.push(result.list[i].weather[0].icon);
          fiveDayTemp.push(result.list[i].main.temp_max);
          fiveDayWind.push(result.list[i].wind.speed);
          fiveDayHumidity.push(result.list[i].main.humidity);
        }
      }

      let fiveDayCard = "";
      for (i = 0; i < 5; i++) {
        fiveDayCard += `
        <div id="days" class="col-2 row day-p">
            <p class="date-p">${fiveDayDate[i]}</p>
            <img class="icon-img" src="https://openweathermap.org/img/w/${
              fiveDayIcon[i]
            }.png" style="width:50px;height:50px;"></img>
            <p class="p-temp">${
              "Temp: " + Math.round(fiveDayTemp[i]) + "°F"
            }</p>
            <p class="p-wind">${
              "Wind: " + Math.round(fiveDayWind[i]) + " mph"
            }</p>
            <p class="p-humid">${
              "Humidity: " + Math.round(fiveDayHumidity[i]) + "%"
            }</p>
          </div>`;
      }
      forecastFiveDay.innerHTML = fiveDayCard;
      fiveDayDate = [];
      fiveDayTemp = [];
      fiveDayWind = [];
      fiveDayHumidity = [];
      fiveDayIcon = [];
    });
};

// Event handlers
searchBtn.addEventListener("click", getForecast);
