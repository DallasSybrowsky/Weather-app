// Variables
const searchBtn = document.querySelector('.btn');
const searchEl = document.querySelector('#City');
var APIKey = "6bd6fa04098d210723846067fd673874";

// API call
const weatherSearch = (event) => {
    event.preventDefault();
    let searchInput = searchEl.value.trim();
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=${APIKey}`;
    fetch(queryURL)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data)
            // console.log(data.document)
        });
}
searchBtn.addEventListener('click', weatherSearch)