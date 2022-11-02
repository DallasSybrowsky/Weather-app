// Variables
// const searchBtn = document.querySelector('.btn');
// const searchEl = document.querySelector('cityName');
var APIKey = "6bd6fa04098d210723846067fd673874";
// var city;
// var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

// API call
// const handleSearch = (event) =>{
//     event.preventDefault();
//     city = searchEl.value.trim();
//     fetch(queryURL)
//     .then(function(response){
//         return response.json()
//     })
//     then(function(data){
//         console.log(data)
//     });
// };

// searchBtn.addEventListener('click', handleSearch)
// city = document.getElementById(".cityName");

const searchButton = document.querySelector('.btn');
const searchEl = document.querySelector('.city');
console.log(searchEl);
const handleSearch = (event) => {
    event.preventDefault();
    // console.log(searchEl.trim());
    let searchInput = searchEl;
    let weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=${APIKey}`;
    fetch(weatherURL)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data)
        });
}
searchButton.addEventListener('click', handleSearch)