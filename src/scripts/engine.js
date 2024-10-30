const state = {
  //Criando as variáveis de Visualização
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  //Criando as variaveis que alteram valor
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    curretTime: 60,
  },
  actions: {
    timerID: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  }
};

function countDown(){
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;
  if(state.values.curretTime <= 0){
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerID);
    alert("Game Over! o seu resultado foi: " + state.values.result +"!"+"Meus Parabéns!");
  }
}

function playSound(audioName){
  let audio = new Audio(`./src/sounds/${audioName}.m4a`);
  audio.volume = 0.1;
  audio.play();
}

//removendo a classe selecionado de todos os squares
function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });
 //criando uma variavel para armzenar um valor aleatorio através do ID e colocar esse valor dentro de um square aleatorio//
  let randomNumber = Math.floor(Math.random() * 9); 
  let randomSquare = state.view.squares[randomNumber]; 
  //adicionando a classe enemy no square com o id aleatorio gerado
  randomSquare.classList.add("enemy"); 
  state.values.hitPosition = randomSquare.id;
}
//Criando uma função para mover o a classe enemy aleatoriamente em um intevalo de temp
// function moveEnemy(){
//   state.values.timerID = setInterval(randomSquare, state.values.gameVelocity);
// }



function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => { //"mousedown > significa que ao clicar um evento será gerado"
      if(square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition =null;
        playSound("hit");
      }
    });
  });
}

function initialize() {
  addListenerHitBox();
}

initialize();
