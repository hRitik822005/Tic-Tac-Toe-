let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [1, 2, 3],
  [2, 3, 4],
  [5, 6, 7],
  [6, 7, 8],
  [7, 8, 9],
  [0, 6, 12], 
  [0, 5, 10],
  [3, 8, 13],
  [1, 6, 11],
  [2, 7, 12],
  [2, 8, 14],
  [1, 7, 13],
  [4, 9, 14],
  [8, 13, 18],
  [5, 11, 17],
  [6, 12, 18],
  [7, 13, 19],
  [9, 14, 19],
  [7, 12, 17],
  [6, 11, 16],
  [5, 10, 15],
  [11, 17, 23],
  [10, 16, 22],
  [12, 18, 24],
  [13, 18, 23],
  [14, 19, 24],
  [12, 17, 22],
  [11, 16, 21],
  [10, 15, 20],
  [10, 11, 12],
  [11, 12, 13],
  [12, 13, 14],
  [15, 16, 17],
  [16, 17, 18],
  [17, 18, 19],
  [20, 21, 22],
  [21, 22, 23],
  [22, 23, 24],

];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 25 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);