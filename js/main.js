// today
let today = document.getElementById("today"),
    todayDate = document.getElementById("today-date"),
    cityLocation = document.getElementById("location"),
    todayDegree = document.getElementById("today-degree"),
    todayIcon = document.getElementById("today-icon"),
    description = document.getElementById("today-description"),
    percent = document.getElementById("percent"),
    wind = document.getElementById("wind"),
    compass = document.getElementById("compass"),
    searchBar = document.getElementById("search-bar");

    // next day
    let nextDay = document.getElementsByClassName("nextDay"),
    nextDayIcon = document.getElementsByClassName("nextDay-icon"),
    maxDegree = document.getElementsByClassName("max-degree"),
    minDegree = document.getElementsByClassName("min-degree"),
    nextDayDescription = document.getElementsByClassName("nextDay-description"),
apiResponse,
apiData

// variables to select current date from Date method
let days = ['sunday','monday' , 'tuesday' , 'wednesday', 'thursday','friday','saturday']
let months = ['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec']

// function get Api
async function getApiWeather(currentCity='ismailia'){
    apiResponse = await fetch (`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`)
    apiData = await apiResponse.json()
    displayToday();
    getNextDay();
}
getApiWeather()

// function display current weather
function displayToday(){
    let date = new Date();
    today.innerHTML = days[date.getDay()]
    todayDate.innerHTML = `${date.getDate()} ${months[date.getMonth()]}`
    cityLocation.innerHTML = apiData.location.name;
    todayDegree.innerHTML = apiData.current.temp_c;
    todayIcon.setAttribute('src' , `https:${apiData.current.condition.icon}`)
    description.innerHTML = apiData.current.condition.text;
    percent.innerHTML = apiData.current.humidity;
    wind.innerHTML = apiData.current.wind_kph;
    compass.innerHTML = apiData.current.wind_dir;

}

// function get next day api
function getNextDay(){
    for (let i = 0 ; i<nextDay.length ; i++){
        nextDay[i].innerHTML = days[new Date(apiData.forecast.forecastday[i+1].date).getDay()];
        nextDayIcon[i].setAttribute('src', `https:${apiData.forecast.forecastday[i+1].day.condition.icon}`);
        maxDegree[i].innerHTML = apiData.forecast.forecastday[i+1].day.maxtemp_c;
        minDegree[i].innerHTML = apiData.forecast.forecastday[i+1].day.mintemp_c;
        nextDayDescription[i].innerHTML = apiData.forecast.forecastday[i+1].day.condition.text;

    }
}

// search by city
searchBar.addEventListener('keyup',function(){
    let currentCity = searchBar.value;
    getApiWeather(currentCity)
    
})
