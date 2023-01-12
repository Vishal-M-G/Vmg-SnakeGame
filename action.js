function unique() {
  for (let j = 1; j < snakeLength; j++) {
    if (arr[0][0] === arr[j][0] && arr[0][1] === arr[j][1]) return true;
  }
  return false;
}

let food,
  topi,
  lefti,
  score = 0;
let arr = [
  [0, 0],
  [2, 0],
  [4, 0],
  [6, 0],
  [8, 0],
];
let parts = [];
let curDir = "Right";
let snakeLength = 5;

document.getElementById("score").innerHTML =
  "<h1>Score : " + score * 100 + "</h1>";

let snakeBody = document.createElement("div");
document.body.appendChild(snakeBody);
let part1 = document.createElement("div");
part1.className = "snakeBone";
snakeBody.appendChild(part1);
let part2 = document.createElement("div");
part2.className = "snakeBone";
snakeBody.appendChild(part2);
let part3 = document.createElement("div");
part3.className = "snakeBone";
snakeBody.appendChild(part3);
let part4 = document.createElement("div");
part4.className = "snakeBone";
snakeBody.appendChild(part4);
let part5 = document.createElement("div");
part5.className = "snakeBone";
snakeBody.appendChild(part5);
part1.innerText = "0";

parts.push(part5);
parts.push(part4);
parts.push(part3);
parts.push(part2);
parts.push(part1);
for (let i = 0; i < snakeLength; i++) {
  parts[i].style.left = `${arr[i][0]}vw`;
  parts[i].style.top = `${arr[i][1]}vh`;
}

function foodGen() {
  try {
    document.body.removeChild(food);
  } catch {}
  food = document.createElement("div");
  food.id = "food";
  lefti = Math.floor(Math.random() * 98) + 1;
  topi = Math.floor(Math.random() * 98) + 1;
  if (lefti % 2 === 1) lefti += 1;
  if (topi % 2 === 1) topi += 1;
  food.style.left = lefti + "vw";
  food.style.top = topi + "vh";
  document.body.appendChild(food);
}

foodGen();

let interval = setInterval(() => {
  if (arr[snakeLength - 1][0] === -2) arr.push([98, arr[snakeLength - 1][1]]);
  else if (arr[snakeLength - 1][1] === -2)
    arr.push([arr[snakeLength - 1][0], 98]);
  else if (arr[snakeLength - 1][0] === 100)
    arr.push([0, arr[snakeLength - 1][1]]);
  else if (arr[snakeLength - 1][1] === 100)
    arr.push([arr[snakeLength - 1][0], 0]);
  else {
    if (curDir === "Right") {
      arr.push([arr[snakeLength - 1][0] + 2, arr[snakeLength - 1][1]]);
    } else if (curDir === "Left") {
      arr.push([arr[snakeLength - 1][0] - 2, arr[snakeLength - 1][1]]);
    } else if (curDir === "Up") {
      arr.push([arr[snakeLength - 1][0], arr[snakeLength - 1][1] - 2]);
    } else {
      arr.push([arr[snakeLength - 1][0], arr[snakeLength - 1][1] + 2]);
    }
  }

  if (arr[snakeLength - 1][0] === lefti && arr[snakeLength - 1][1] === topi) {
    foodGen();
    score++;
    document.getElementById("score").innerHTML =
      "<h1>Score : " + score * 100 + "</h1>";
    let part = document.createElement("div");
    part.className = "snakeBone";
    parts.unshift(part);
    snakeBody.appendChild(part);
  } else {
    arr.shift();
    snakeLength--;
  }

  snakeLength++;

  for (let i = 0; i < snakeLength; i++) {
    parts[i].style.left = `${arr[i][0]}vw`;
    parts[i].style.top = `${arr[i][1]}vh`;
  }

  if (unique()) {
    alert("Ate useself");
    document.body.removeChild(food);
    document.body.removeChild(snakeBody);
    document.body.removeChild(document.getElementById("score"));
    document.body.innerHTML = "<h1>Score : " + score * 100 + "</h1>";
    clearInterval(interval);
  }
}, 100);

document.styleSheets[0].insertRule(
  ".snakeBone:first-of-type{ border-radius: 0 50% 50% 0 }"
);

document.body.addEventListener("keydown", (e) => {
  if (e.key === "Arrow" + curDir) return;
  if (e.key === "ArrowDown") {
    if (curDir === "Up") return;
    curDir = "Down";
  } else if (e.key === "ArrowUp") {
    if (curDir === "Down") return;
    curDir = "Up";
  } else if (e.key === "ArrowLeft") {
    if (curDir === "Right") return;
    curDir = "Left";
  } else if (e.key === "ArrowRight") {
    if (curDir === "Left") return;
    curDir = "Right";
  }

  if (curDir === "Left") {
    document.styleSheets[0].deleteRule(0);
    document.styleSheets[0].insertRule(
      ".snakeBone:first-of-type{ border-radius: 50% 0 0 50% }",
      0
    );
  } else if (curDir === "Down") {
    document.styleSheets[0].deleteRule(0);
    document.styleSheets[0].insertRule(
      ".snakeBone:first-of-type{ border-radius: 0 0 50% 50% }",
      0
    );
  } else if (curDir === "Up") {
    document.styleSheets[0].deleteRule(0);
    document.styleSheets[0].insertRule(
      ".snakeBone:first-of-type{ border-radius: 50% 50% 0 0 }",
      0
    );
  } else {
    document.styleSheets[0].deleteRule(0);
    document.styleSheets[0].insertRule(
      ".snakeBone:first-of-type{ border-radius: 0 50% 50% 0 }",
      0
    );
  }
});
