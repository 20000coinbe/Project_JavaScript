const clockContainer = document.querySelector('.js-clock'); // querySelector는 괄호안에 element의 자식을 탐색한다!!!

const clcokTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clcokTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes}:${
        seconds < 10 ? `0${seconds}` : seconds}`;
}
// init 함수를 만들어 놓고 시작해보자
function init() {
    getTime();
    // setInterval(실행함수, 첫번째인자를 실행할 시간 간격(ms단위))
    setInterval(getTime, 1000);
}

init();