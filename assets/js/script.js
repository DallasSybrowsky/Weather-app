// Variables
const searchBtn = document.querySelector('.btn');
const searchEl = document.querySelector('#City');
var APIKey = "6bd6fa04098d210723846067fd673874";

// API call
const weatherSearch = (event) => {
    event.preventDefault();
    let searchInput = searchEl.value.trim();
    let forecastURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&appid=${APIKey}&units=imperial`;
    // let currentURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${APIKey}&units=imperial`;
    fetch(forecastURL)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data)
            console.log(data.list[0].main.temp)
        });
    }

const currentForecast = (event) => {
    event.preventDefault();
    let
}
    // fetch(currentURL)
    //     .then(function(response){
    //         return response.json()
    //     })
    //     .then(function(data){
    //         console.log(data)
    //         console.log(data.list[0].lat)
    //     });    

searchBtn.addEventListener('click', weatherSearch)

// Save seaches to local storage
function dataStore() {
    let name = "Location:";
    let cities = JSON.stringify(searchEl.value);
    localStorage.setItem(name, cities);
}
searchBtn.addEventListener('click', dataStore)
