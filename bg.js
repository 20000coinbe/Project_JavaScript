const body = document.querySelector('body');

const IMG_NUMBER = 3;  

function paintImage(imgNumber) { //화면에 이미지 나타내기
    const image  = new Image();
    image.src = `images/${imgNumber + 1}.jpg` // 0이 나오는 경우가 있기 때문에 +1
    image.classList.add("bgImage");
    body.prepend(image); 
    
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER); // IMG_NUMBER처럼 처리를 해줘야 유지보수 용이
    // Math의 random 메소드는 소수점이하의 임의의 수를 반환해준다
    // 예를들면 Math.random * 5를 해주면 1~5사이의 임의의 수를 만들 수 있다
    // Math.floor() : 소수점 버림 ex. Math.floor(3.4) = 3
    // Math.ceil() : 소수점 무조건 올림 ex. Math.ceil(3.1) = 4
    // ceil()과 floor()를 천장과 바닥으로 기억하자
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init()