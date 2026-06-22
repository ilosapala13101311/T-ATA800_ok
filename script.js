const game = document.getElementById("game");
const player = document.getElementById("player");

const bgMusic = new Audio("sounds/theme.mp3");
const comboSound = new Audio("sounds/dzieciaki-gora.mp3");
const marysiaSound = new Audio("sounds/buziak.mp3");
const przytulasSound = new Audio("sounds/przytulas.mp3");
const fujkaSound = new Audio("sounds/fujka.mp3");
const kctataSound = new Audio("sounds/kctata.mp3");
const besttataSound = new Audio("sounds/besttata.mp3");
const smrodekSound = new Audio("sounds/smrodek.mp3");
const endSound = new Audio("sounds/end.mp3");
const kupaSound = new Audio("sounds/kupa.mp3");
const mniamSound = new Audio("sounds/mniam.mp3");
const graSound = new Audio("sounds/gra.mp3");
const helenaSound = new Audio("sounds/helena.mp3");

bgMusic.loop = true;
bgMusic.volume = 0.3;

let score = 0;
let humor = 50;
let lives = 5;
let playerX = window.innerWidth/2;
let level = 1;
let gameEnded = false;
let lastMarysia = 0;
let lastJas = 0;

const items = [];

const types = [
  {emoji:"👧", points:100, family:true},
  {emoji:"👧", points:100, family:true},

  {emoji:"👦", points:100, family:true},
  {emoji:"👦", points:100, family:true},

  {emoji:"🏋️", points:50},
  {emoji:"🥤", points:10},
  {emoji:"🎮", points:25},
  {emoji:"🍕", points:500},

  {emoji:"🧦", points:-30},
  {emoji:"💩", points:-50},
  {emoji:"🚬", points:-100}

];

document.addEventListener("touchmove",(e)=>{
  playerX=e.touches[0].clientX;
});

document.addEventListener("mousemove",(e)=>{
  playerX=e.clientX;
});

function spawnItem(){

const type = types[Math.floor(Math.random()*types.length)];

const el = document.createElement("div");
el.className = "item";

const marysiaPhotos = [
"images/marysia-princess.jpg",
"images/marysia-lod.jpg",
"images/marysia-tata.jpg",
"images/marysia-zabek.jpg"

];

const jasPhotos = [
"images/jas-mario.jpg",
"images/jas-piekny.jpg",
"images/jas-tata.jpg",
"images/jas-skrzydla.jpg"

];

if(type.emoji === "👧"){

const photo =
  marysiaPhotos[
    Math.floor(Math.random()*marysiaPhotos.length)
  ];

el.innerHTML =
  `<img src="${photo}" class="childPhoto">`;

}

else if(type.emoji === "👦"){

const photo =
  jasPhotos[
    Math.floor(Math.random()*jasPhotos.length)
  ];

el.innerHTML =
  `<img src="${photo}" class="childPhoto">`;

}

else{
el.innerText = type.emoji;

}

const item = {
el,
x: Math.random()*(window.innerWidth-50),
y: -50,
speed: 4,
type
};

el.style.left = item.x + "px";

game.appendChild(el);
items.push(item);
}

function updateHUD(){
 document.getElementById("score").innerText = score;
  document.getElementById("humor").innerText = humor;
  document.getElementById("lives").innerText = lives;

  let newLevel = 1;

  if(score >= 3000){
    newLevel = 4;
  }
  else if(score >= 1500){
    newLevel = 3;
  }
  else if(score >= 500){
    newLevel = 2;
  }

  if(newLevel !== level){

    level = newLevel;

    let levelName = "";

    if(level === 2){
      levelName = "🥈 TATA W FORMIE";
    }

    if(level === 3){
      levelName = "🤖 T-ATA 800";
    }

    if(level === 4){
      levelName = "👑 TATA ROKU";
      showConfetti();
    }

    showLevelMessage(levelName);
  }

}
  
const messageQueue = [];
let showingMessage = false;

function showLevelMessage(text){

  if(gameEnded) return;

  messageQueue.push(text);

  if(!showingMessage){
    showNextMessage();
  }
}

function showNextMessage(){

  if(messageQueue.length === 0){
    showingMessage = false;
    return;
  }

  showingMessage = true;

  const text = messageQueue.shift();

  const msg = document.createElement("div");

  msg.innerHTML = text;

  msg.style.position = "fixed";
  msg.style.top = "20px";
  msg.style.left = "50%";
  msg.style.transform = "translateX(-50%)";

  msg.style.background = "#ffd700";
  msg.style.color = "#000";

  msg.style.padding = "18px 28px";
  msg.style.borderRadius = "20px";

  msg.style.fontSize = "30px";
  msg.style.fontWeight = "bold";

  msg.style.zIndex = "9999";

  msg.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)";

  document.body.appendChild(msg);

  setTimeout(()=>{

    msg.remove();

    showNextMessage();

  },2000);
}
function showHearts(){

  for(let i=0;i<8;i++){

    const heart = document.createElement("div");

    heart.innerHTML = "❤️";

    heart.style.position = "fixed";
    heart.style.left = (20 + Math.random()*60) + "%";
    heart.style.bottom = "50px";

    heart.style.fontSize = (20 + Math.random()*20) + "px";

    heart.style.zIndex = "9999";

    heart.style.transition = "all 2s linear";

    document.body.appendChild(heart);

    setTimeout(()=>{

      heart.style.transform =
      `translateY(-300px) rotate(${Math.random()*360}deg)`;

      heart.style.opacity = "0";

    },50);

    setTimeout(()=>{
      heart.remove();
    },2000);

  }

}
function showComboPhoto(){

  const comboPhotos = [
    "images/dzieci-kombo.jpg",
    "images/dzieci-kombo2.jpg"
  ];

  const randomPhoto =
    comboPhotos[
      Math.floor(Math.random()*comboPhotos.length)
    ];

  const img = document.createElement("img");

  img.id = "comboPhoto";
  img.src = randomPhoto;

  document.body.appendChild(img);

  comboSound.currentTime = 0;
  comboSound.play().catch(()=>{});

  setTimeout(()=>{
    img.remove();
  },2000);
}
function showConfetti(){

  const icons = ["🎊","🎉","⭐","🏆","👑"];

  for(let i=0;i<30;i++){

    const conf = document.createElement("div");

    conf.innerHTML =
      icons[Math.floor(Math.random()*icons.length)];

    conf.style.position = "fixed";
    conf.style.left = Math.random()*100 + "%";
    conf.style.top = "-50px";

    conf.style.fontSize =
      (20 + Math.random()*25) + "px";

    conf.style.zIndex = "9999";

    conf.style.transition = "all 3s linear";

    document.body.appendChild(conf);

    setTimeout(()=>{

      conf.style.transform =
        `translateY(${window.innerHeight+100}px)
         rotate(${Math.random()*720}deg)`;

    },50);

    setTimeout(()=>{
      conf.remove();
    },3000);

  }

}
function endGame(){

  gameEnded = true;
  messageQueue.length = 0;

  const koniec = document.createElement("div");

  koniec.id = "koniecMisji";

  koniec.innerHTML = "UPS! KONIEC GRY";

  koniec.style.position = "fixed";
  koniec.style.inset = "0";
  koniec.style.background = "rgba(0,0,0,0.95)";
  koniec.style.color = "white";
  koniec.style.display = "flex";
  koniec.style.justifyContent = "center";
  koniec.style.alignItems = "center";
  koniec.style.fontSize = "60px";
  koniec.style.fontWeight = "bold";
  koniec.style.zIndex = "99999";

  document.body.appendChild(koniec);
endSound.currentTime = 0;
endSound.play().catch(()=>{});

  bgMusic.pause();

  let procent = 75;

  if(score >= 1500) procent = 88;
  if(score >= 3000) procent = 95;
  if(score >= 5000) procent = 100;

  setTimeout(()=>{

    koniec.remove();

    document.getElementById("gameOver").style.display="flex";
kctataSound.currentTime = 0;
kctataSound.play().catch(()=>{});

    document.getElementById("finalScore").innerHTML =
    `
    👑 CERTYFIKAT TATY ROKU<br><br>
    Wynik: ${procent}%<br><br>
    ❤️ Kochamy Cię Tatusiu ❤️<br><br>
    Marysia • Jaś
    `;

  },3000);

}
function loop(){
  if(gameEnded) return;

  player.style.left=playerX+"px";

  for(let i=items.length-1;i>=0;i--){

    let item=items[i];

    item.y += item.speed;
    item.el.style.top=item.y+"px";

    let dx=Math.abs(item.x-playerX);

    if(dx<90 && item.y>window.innerHeight-220){

      score += item.type.points;

   if(item.type.family){

  humor = Math.min(100, humor + 10);

  if(item.type.emoji === "👧"){

  lastMarysia = Date.now();

  const isCombo = (Date.now() - lastJas < 3000);

  if(!isCombo){
    marysiaSound.currentTime = 0;
    marysiaSound.play.catch(()=>{});
  }

    if(Math.random() < 0.20){
      showLevelMessage("😘 Marysia daje buziaka!");
      showHearts();
    }

    if(Date.now() - lastJas < 3000){
      score += 500;
      showLevelMessage("❤️ RODZINNE KOMBO! +500");
showHearts();
marysiaSound.pause();
przytulasSound.pause();

marysiaSound.currentTime = 0;
przytulasSound.currentTime = 0;

comboSound.currentTime = 0;
comboSound.play().catch(()=>{});
showComboPhoto();
    }
  }

  if(item.type.emoji === "👦"){

  lastJas = Date.now();

  const isCombo = (Date.now() - lastMarysia < 3000);

 if(!isCombo){
  przytulasSound.currentTime = 0;
  przytulasSound.play().catch(()=>{});
}

    if(Math.random() < 0.20){
      showLevelMessage("🤗 Jaś przytula Tatę!");
      showHearts();
    }

    if(Date.now() - lastMarysia < 3000){
      score += 500;
      showLevelMessage("❤️ RODZINNE KOMBO! +500");
showHearts();

marysiaSound.pause();
  przytulasSound.pause();

  marysiaSound.currentTime = 0;
  przytulasSound.currentTime = 0;

  comboSound.currentTime = 0;
  comboSound.play();

  showComboPhoto();
}
 }
}


      if(item.type.emoji==="🧦"){
        humor=Math.max(0,humor-10);
smrodekSound.currentTime = 0;
  smrodekSound.play().catch(()=>{});
        showLevelMessage("🧦 Śmierdząca sprawa!");
      }
if(item.type.emoji==="🥤"){
        humor=Math.max(0,humor+10);
helenaSound.currentTime = 0;
  helenaSound.play().catch(()=>{});
        showLevelMessage("🥤 Wincyj cukru!");
      }
      if(item.type.emoji==="🍕"){
  humor = 100;
mniamSound.currentTime = 0;
  mniamSound.play().catch(()=>{});
  showLevelMessage("🍕 Capriciosa na grubym, raz!");
}
if(item.type.emoji==="🏋️"){
  humor = Math.min(100, humor + 5);
besttataSound.currentTime = 0;
  besttataSound.play().catch(()=>{});

  showLevelMessage("💪 TRENING ZALICZONY!");
}
       if(item.type.emoji==="🎮"){
  humor = 100;
graSound.currentTime = 0;
  graSound.play().catch(()=>{});

  showLevelMessage("🎮 ZOG!");
       }

if(item.type.emoji==="💩"){
  humor=Math.max(0,humor-15);
kupaSound.currentTime = 0;
  kupaSound.play().catch(()=>{});
  showLevelMessage("💩 WDEPNIĘTE!");
}
if(item.type.emoji==="🚬"){
  humor=Math.max(0,humor-25);
fujkaSound.currentTime = 0.catch(()=>{});
  fujkaSound.play();

  showLevelMessage("🚬 FUJ! TATA NIE PAL!");
}
      updateHUD();

      item.el.remove();
      items.splice(i,1);
    }

    else if(item.y>window.innerHeight){

      if(item.type.family){
        lives--;

        if(lives<=0){
          endGame();
          return;
        }
      }

      item.el.remove();
      items.splice(i,1);
      updateHUD();
    }
  }

  requestAnimationFrame(loop);
}

setInterval(spawnItem,1000);

document.getElementById("playBtn")
.addEventListener("click",()=>{

  bgMusic.play();

  document.getElementById("intro")
  .style.display="none";

  updateHUD();
  loop();

});