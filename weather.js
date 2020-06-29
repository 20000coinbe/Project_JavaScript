const weather = document.querySelector(".js-weather");

const API_KEY = "0a44e79c9a7f869061d30240998493df";

/* API = application Programming Interface
   다른서버로부터 손쉽게 데이터를 가져올 수 있는 수단(오직 데이터만 가져온다)
*/

const COORDS = 'coords';

// 중요!! JavaScript를 이용해 특정URL을 호출하는 방법
function getWeather(lat, lng) {
    // fetch()안에 가져올 데이터, `(백틱)을 사용함으로 주의!
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response) { // json형태이기 때문에
        return response.json();
    }).then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerHTML = `${temperature} @ ${place}`;
    }); 
    // 필요한 변수들 $처리하여 사용할 수 있도록 만들어준다
    // then()은 기본적으로 함수를 호출하는 역할(데이터가 완전히 들어온 다음)
}


function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// getlocation 성공 했을 때 함수
function handleGeoSucces(position) {
    const latitude = position.coords.latitude; // position안에는 위도 경도 등 많은 정보가 담겨있다
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, // === latitude : latitude
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log('위치정보를 읽을 수 없습니다');
}

function askForCoords() {
    // navigator API 사용
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        //좌표요청함수
        askForCoords();
    } else {
        //이미 좌표값을 가지고 있을 경우
        const parseCoords = JSON.parse(loadedCoords);
        console.log(parseCoords);
        // getWeather
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();