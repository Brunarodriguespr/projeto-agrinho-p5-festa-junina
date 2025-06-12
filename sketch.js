let estado = "inicio";
let baloes = [];
let estrelas = [];
let fogos = [];
let rastros = [];
let tempoQuadrilha = 0;

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  textSize(24);

  for (let i = 0; i < 10; i++) {
    baloes.push({
      x: random(100, 700),
      y: random(600, 800),
      speed: random(1, 2)
    });
  }

  for (let i = 0; i < 100; i++) {
    estrelas.push({ x: random(width), y: random(300), brilho: random(150, 255) });
  }

  for (let i = 0; i < 5; i++) {
    fogos.push({
      x: random(200, 600),
      y: random(100, 300),
      r: random(40, 80),
      cor: color(random(255), random(255), random(255)),
      fase: random(TWO_PI)
    });
  }
}

function draw() {
  if (estado === "inicio") {
    telaInicio();
  } else if (estado === "cidade") {
    cenaCidade();
  } else if (estado === "campo") {
    cenaCampo();
  } else if (estado === "festa") {
    cenaFesta();
    efeitoRastro();
  } else if (estado === "dança") {
    cenaDanca();
  } else if (estado === "final") {
    cenaFinal();
  }
}

function mousePressed() {
  if (estado === "inicio") estado = "cidade";
  else if (estado === "cidade") estado = "campo";
  else if (estado === "campo") estado = "festa";
  else if (estado === "festa") {
    estado = "dança";
    tempoQuadrilha = millis();
  } else if (estado === "final") {
    estado = "inicio";
  }
}

function telaInicio() {
  background(200, 220, 255);
  text("Dora e a Festa Junina dos Dois Mundos", width / 2, height / 2 - 40);
  text("Clique para começar", width / 2, height / 2 + 20);
}

function cenaCidade() {
  background(150);
  fill(255);
  rect(100, 400, 100, 200);
  rect(250, 350, 100, 250);
  fill(0);
  text("Na cidade, Dora compra roupas de festa junina.", width / 2, 100);
  text("Clique para ir ao campo", width / 2, height - 40);
}

function cenaCampo() {
  background(100, 200, 100);
  fill(139, 69, 19);
  rect(200, 400, 150, 150);
  fill(0);
  text("No campo, Dora ajuda a avó a preparar a pamonha.", width / 2, 100);
  text("Clique para ir à festa", width / 2, height - 40);
}

function cenaFesta() {
  background(20, 20, 60);
  desenhaEstrelas();
  desenhaLua();
  desenhaFogos();
  desenhaBandeirinhas();
  desenhaFogueira();
  desenhaBaloes();
  desenhaDora(600);
  desenhaJoao(500);
  desenhaAna(700);
  desenhaComidas();
  desenhaPescaria();

  fill(255);
  text("Na festa, Dora dança quadrilha com seus amigos!", width / 2, 60);
  text("Clique para começar a dança!", width / 2, height - 40);
}

function cenaDanca() {
  background(20, 20, 60);
  desenhaEstrelas();
  desenhaFogos();
  desenhaBandeirinhas();
  desenhaFogueira();
  desenhaBaloes();

  fill(255);
  text("Dora e os amigos estão dançando quadrilha!", width / 2, 60);

  let centroX = 400;
  let centroY = 450;
  let raio = 100;
  let ang = frameCount * 0.03;

  desenhaPessoaPolar(centroX, centroY, raio, ang, "pink"); // Dora
  desenhaPessoaPolar(centroX, centroY, raio, ang + PI * 2 / 3, "green"); // João
  desenhaPessoaPolar(centroX, centroY, raio, ang + PI * 4 / 3, "blue"); // Ana

  if (millis() - tempoQuadrilha > 10000) {
    estado = "final";
  }
}

function desenhaPessoaPolar(cx, cy, r, ang, cor) {
  let x = cx + cos(ang) * r;
  let y = cy + sin(ang) * r;
  fill(255, 220, 200);
  ellipse(x, y - 30, 30);
  fill(cor);
  rect(x - 10, y - 15, 20, 40);
}

function cenaFinal() {
  background(10);
  desenhaFogos();
  desenhaFogos();

  fill(255);
  textSize(28);
  text("🎉 Parabéns, Dora! 🎉", width / 2, height / 2 - 40);
  textSize(20);
  text("Você uniu cidade e campo numa festa inesquecível!", width / 2, height / 2);
  text("Clique para recomeçar", width / 2, height / 2 + 40);

  desenhaZe(width / 2, height / 2 + 80);
  fill(255, 255, 100);
  textSize(16);
  text("Oxente, Dora! Que festa arretada!", width / 2, height / 2 + 130);
}

function desenhaZe(x, y) {
  fill(255, 220, 180);
  ellipse(x, y - 30, 30); // cabeça
  fill("brown");
  rect(x - 10, y - 15, 20, 40); // corpo
  fill("gold");
  arc(x, y - 45, 40, 30, PI, TWO_PI); // chapéu
  fill("white");
  rect(x - 25, y, 15, 20); // parte da sanfona
  rect(x + 10, y, 15, 20);
  fill("gray");
  rect(x - 10, y, 20, 20); // meio da sanfona
}

function desenhaEstrelas() {
  for (let e of estrelas) {
    fill(255, 255, 255, e.brilho + sin(frameCount * 0.05) * 50);
    ellipse(e.x, e.y, 2);
  }
}

function desenhaLua() {
  fill(250, 250, 200);
  ellipse(100, 100, 60);
}

function desenhaFogos() {
  for (let f of fogos) {
    for (let a = 0; a < TWO_PI; a += PI / 8) {
      let x = f.x + cos(a + frameCount * 0.05 + f.fase) * f.r;
      let y = f.y + sin(a + frameCount * 0.05 + f.fase) * f.r;
      stroke(f.cor);
      line(f.x, f.y, x, y);
    }
  }
}

function desenhaBandeirinhas() {
  let cores = ['red', 'blue', 'yellow', 'green', 'orange'];
  for (let i = 0; i < 10; i++) {
    fill(cores[i % cores.length]);
    triangle(100 + i * 60, 300, 120 + i * 60, 270, 140 + i * 60, 300);
  }
}

function desenhaFogueira() {
  fill(101, 67, 33);
  rect(380, 480, 10, 60);
  rect(410, 480, 10, 60);
  rect(395, 490, 10, 60);

  let distancia = dist(mouseX, mouseY, 400, 450);
  let tamanho = distancia < 80 ? 80 : 60;

  noStroke();
  fill(255, 100 + sin(frameCount * 0.2) * 50, 0);
  beginShape();
  vertex(400, 480);
  vertex(380, 480 - tamanho * 0.5 + sin(frameCount * 0.3) * 5);
  vertex(400, 480 - tamanho * 0.7 + sin(frameCount * 0.5) * 5);
  vertex(420, 480 - tamanho * 0.5 + sin(frameCount * 0.3) * 5);
  endShape(CLOSE);
}

function desenhaBaloes() {
  for (let b of baloes) {
    fill(255, 0, 0);
    ellipse(b.x, b.y, 20, 30);
    line(b.x, b.y + 15, b.x, b.y + 30);
    b.y -= b.speed;
    if (b.y < -30) b.y = random(600, 800);
  }
}

function desenhaDora(x) {
  desenhaPessoa(x, "pink");
}
function desenhaJoao(x) {
  desenhaPessoa(x, "green");
}
function desenhaAna(x) {
  desenhaPessoa(x, "blue");
}

function desenhaPessoa(x, cor) {
  fill(255, 220, 200);
  ellipse(x, 420, 30);
  fill(cor);
  rect(x - 10, 435, 20, 40);
  line(x - 10, 455, x - 30 + sin(frameCount * 0.2) * 5, 480);
  line(x + 10, 455, x + 30 + sin(frameCount * 0.2) * 5, 480);
  line(x - 5, 475, x - 15, 510);
  line(x + 5, 475, x + 15, 510);
}

function desenhaComidas() {
  fill(255, 248, 220);
  rect(100, 480, 100, 60);
  fill(255, 255, 0);
  ellipse(120, 500, 20, 10);
  fill(255, 200, 100);
  rect(140, 495, 15, 15);
  fill(210, 180, 140);
  rect(160, 490, 20, 20);
}

function desenhaPescaria() {
  fill(135, 206, 250);
  rect(300, 500, 100, 60);
  fill(255, 100, 100);
  for (let i = 0; i < 3; i++) {
    ellipse(320 + i * 25, 530 + sin(frameCount * 0.1 + i) * 5, 10, 5);
  }
}

function efeitoRastro() {
  rastros.push({ x: mouseX, y: mouseY, cor: color(random(255), random(255), random(255), 150), vida: 60 });
  for (let i = rastros.length - 1; i >= 0; i--) {
    let r = rastros[i];
    fill(r.cor);
    noStroke();
    ellipse(r.x, r.y, 8);
    r.vida--;
    if (r.vida <= 0) rastros.splice(i, 1);
  }
}
