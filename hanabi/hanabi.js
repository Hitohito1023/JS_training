

const SCREEN_W = 800;
const SCREEN_H = 600;

let can = document.getElementById("can");
let con = can.getContext("2d");

can.width = SCREEN_W;
can.height = SCREEN_H;

class Zanzo {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.c = 10;
  }
  update(){
    if(this.kill)return;
    if( --this.c == 0)this.kill = true;
  }
  draw(){
    if(this.kill)return;

    con.globalAlpha = 1.0 * this.c/10;
    con.fillStyle = "#ffee88";
    con.fillRect(this.x>>8, this.y>>8, 2, 2);
  }
}

class Hanabi {
  constructor(x, y, vx, vy, gv, hp){
    this.x = x<<8;
    this.y = y<<8;
    this.vx = vx;
    this.vy = vy;
    this.gv = gv;
    this.kill = false;
    this.type = 0;
    if(hp == undefined){
      this.hp=200;
    }else{
      this.hp = hp;
      this.type = 1;
    }
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

        for(let i = 0; i<10; i++){
          let r = rand(0, 360);
          let s = rand(10, 400);
          let vx = Math.cos(r * Math.PI/180)*s;
          let vy = Math.sin(r * Math.PI/180)*s;

          hanabi.push(
            new Hanabi(this.x >> 8, this.y >> 8, vx, vy, 1, 200)
          );


        }
      }
    }else{
      if( --this.hp==0)this.kill = true;
    }
  }

  draw(){
    if(this.kill)return;
    con.globalAlpha = 1.0;
    con.fillStyle = "#ffee88";
    con.fillRect(this.x>>8, this.y>>8, 2, 2);
    zanzo.push(
      new Zanzo(this.x, this.y)
    )
  }
}

let hanabi = [];
let zanzo = [];

setInterval(mailLoop, 1000/60);

function rand(min, max){
  return Math.floor(
    (Math.random() * (max - min + 1)) + min
  );
}

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
  for(let i = zanzo.length-1; i>=0; i--){
    zanzo[i].update();
    if(zanzo[i].kill)zanzo.splice(i, 1);
  }
}


//描画
function draw() {
  con.fillStyle= "#222222";
  con.fillRect(0, 0, SCREEN_W, SCREEN_H);
  for(let i = hanabi.length-1; i>=0; i--){
    hanabi[i].draw();
  }
  for(let i = zanzo.length-1; i>=0; i--){
    zanzo[i].draw();
  }
}

document.onkeydown = function(e) {
  if(e.keyCode==32){
    hanabi.push(
      new Hanabi(SCREEN_W/2, SCREEN_H, 0, -800, 4)
    );
  }
}





