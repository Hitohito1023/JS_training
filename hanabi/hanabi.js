

const SCREEN_W = 800;
const SCREEN_H = 600;

let can = document.getElementById("can");
let con = can.getContext("2d");

can.width = SCREEN_W;
can.height = SCREEN_H;

class Hanabi {
  constructor(x, y, vx, vy, gv){
    this.x = x<<8;
    this.y = y<<8;
    this.vx = vx;
    this.vy = vy;
    this.gv = gv;
    this.kill = false;
    this.type = 0;
  }

  update(){
    if(this.kill)return;
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gv;

    if(this.y>>8 > SCREEN_H) this.kill = true;
    if(this.type == 0){
      if(this.vy > 0){
        this.kill = true;
      }
    }
  }

  draw(){
    if(this.kill)return;
    con.fillStyle = "#ffee88";
    con.fillRect(this.x>>8, this.y>>8, 2, 2);
  }
}

let hanabi = [];

setInterval(mailLoop, 1000/60);



//メインループ
function mailLoop() {
  update();
  draw();
}

//更新
function update() {
  for(let i = hanabi.length-1; i>=0; i--){
    hanabi[i].update();
    if(hanabi[i].kill)hanabi.splice(i, 1);
  }
}


//描画
function draw() {
  con.fillStyle= "#222222";
  con.fillRect(0, 0, SCREEN_W, SCREEN_H);
  for(let i = hanabi.length-1; i>=0; i--){
    hanabi[i].draw();
  }
}

document.onkeydown = function(e) {
  if(e.keyCode==32){
    hanabi.push(
      new Hanabi(SCREEN_W/2, SCREEN_H, 0, -800, 4)
    );
  }
}





