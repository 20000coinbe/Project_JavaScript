const form = document.querySelector('.js-form');
const input = form.querySelector('input');

const USER_LS = 'currentUser';
const SHOWING_CN = 'showing';

const greeting = document.querySelector('.js-greeting');
// querySelector는 하위에 있는 첫번째 것을 가져온다
// querySelectorAll은 배열로 나열 시킨다    

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    // event처리에 대한 기본값을 설정
    event.preventDefault(); // form에 있는 내용이 전달되면서 사라지지는 않게 해준다
    const currentValue = input.value;
    paintGreeting(currentValue); 
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit) 
    // 윗줄에 폼에서 sumbmit을 한다면 hadlesubmit함수로 처리하겠다
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        // 없는 경우
        askForName();
    } else {
        // 존재하는 경우
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();