const toDoForm = document.querySelector('.js-toDoForm');
const toDoInput = toDoForm.querySelector('input'),
      toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';

/* 웹의 기능마다 js파일을 만들어서 관리하면 
   동일한 변수명도 써도되고 관리하기 매우 쉬운거 같다
*/

let toDos = [];// 해야할 일이 여러개이니까 array를 만들어 저장

function deleteToDo(event) {
    console.log(event.target.parentNode); 
    // toDo 목록에서 무엇을 삭제하는지 알기위해 .target 사용
    // 중요 : 삭제한 버튼의 위치를 알기위해 dir를 통해서 parentNode를 찾는다  
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    // 화면에서도 지원주기
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id); 
        // toDo.id는 숫자 li.id는 스트링 타입을 맞추기 위해 parseInt
    });
    toDos = cleanToDos // toDos는 지우고 난 이전의 것이기 때문에 바꿔준다
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    // 중요!!! localStorage에는 js데이터를 저장할 수 없다.
    // localStorage에는 string타입만 가능 -> ""(따움표)를 써줘야함
    // => JSON.stringify()를 사용해준다
    // 자바스크립트 객체를 string으로 만들어주는 역할
    /* JSON = javaScript object notation
       역할 : 데이터 전달 시, js가 그걸 다룰수 있도록 object로 바꿔주는 기능 */
}

function paintToDo(text) {
    const li = document.createElement('li'); // Element생성
    const delBtn = document.createElement('button');
    delBtn.innerHTML = 'X';
    //
    delBtn.addEventListener("click", deleteToDo);
    //
    const span = document.createElement('span');
    const newId = toDos.length + 1;
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    // 중요!!! 배열에 toDo 저장하기
    const toDoObj = {
        text : text,
        id : newId
    };
    toDos.push(toDoObj);
    saveToDos();    
}


function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
} 

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    // 아무것도 안한다. form은 항상 showing일 것이기 때문이다
    // 그렇기 때문에 이번에는 if else를 사용할 필요가 없다
    if(loadedToDos !== null) {
        // Todo리스트 불러오자
        console.log(loadedToDos);
        /* console.log(loadedToDos)으로 불러오면 string형태
           이기 때문에 문제 다시 바꿔주자!!!
        */

        // forEach() : array에 담긴 것들을 각각에 한번씩 함수를 실행


        // string -> object
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) { //
            console.log(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener('submit', handleSubmit);
}

init();


