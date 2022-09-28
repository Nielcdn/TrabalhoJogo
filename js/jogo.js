
function tickFunc() {
	tick++;
	if (orient=='l'){
		pers.forEach(p=>p.style.left = parseInt(getComputedStyle(p).left)-2);
		enemy.forEach(p=>p.style.left = parseInt(getComputedStyle(p).left)-2);
	}
	if (orient=='r'){
		pers.forEach(p=>p.style.left = parseInt(getComputedStyle(p).left)+2);
		enemy.forEach(p=>p.style.left = parseInt(getComputedStyle(p).left)+2);
	}

	pers.forEach(p=>enemyDestroy(p));
	pers.forEach(p=>colisao(p));


	if (tick==1){
		createPlatform('chao',450,400,50);
	}
	if (tick==700){
		createPlatform('chao',450,400,50);
	}
	if (tick==3000){
		createPlatform('chao',450,400,50);
	}
	if (tick%100==0){
		createEnemy('pilar',20,0,50);
	}

	if (tick==500){
		createEnemy('pilar',20,0,0);
	}
	if (tick==600){
		createEnemy('pilar',20,0,30);
	}
	if (tick==700){
		createEnemy('pilar',20,0,60);
	}
}

function createPlatform(enemyClass,width,leftMin,topMin){
	let p = document.createElement('div');
	p.setAttribute('class',enemyClass);
	pers.push(p);
	fundo.appendChild(p);
	p.style.width = width;
	if (orient=='l'){p.style.left = parseInt(getComputedStyle(fundo).width)-leftMin;}
	if (orient=='r'){p.style.left = 0;}
	p.style.top = parseInt(getComputedStyle(fundo).height)-topMin;
}


function createEnemy(enemyClass,width,leftMin,topMin){
	let p = document.createElement('div');
	p.setAttribute('class',enemyClass);
	enemy.push(p);
	pers.push(p);
	fundo.appendChild(p);
	p.style.width = width;
	if (orient=='l'){p.style.left = parseInt(getComputedStyle(fundo).width)-leftMin;}
	if (orient=='r'){p.style.left = 0;}
	p.style.top = parseInt(getComputedStyle(fundo).height)-topMin;
}



function gravidade(){
	if (pers[0] != null){
	pers.forEach(p=>cair(p));

	if (cairCheck==0){
		pl.style.top = parseInt(getComputedStyle(pl).top)+2-grauQueda;		
	}
	cairCheck = 0;
}
}
function cair(p){
	let div1Left= parseInt(getComputedStyle(div1).left);
	let div1Top= parseInt(getComputedStyle(div1).top);
	let div1Height= parseInt(getComputedStyle(div1).height);
	let div1Width= parseInt(getComputedStyle(div1).width);

	let pLeft= parseInt(getComputedStyle(p).left);
	let pTop= parseInt(getComputedStyle(p).top);
	let pHeight= parseInt(getComputedStyle(p).height);
	let pWidth= parseInt(getComputedStyle(p).width);
	
	let fundoHeight= parseInt(getComputedStyle(fundo).height);
	let fundoWidth= parseInt(getComputedStyle(fundo).width);
	if (cairCheck==0) {
	if (!((((div1Left >= pLeft)&&(div1Left <= pLeft + pWidth))&&
	((div1Top >= pTop-div1Height)&&(div1Top <= pTop + pHeight))) || (((pLeft >= div1Left)&&(pLeft <= div1Left + div1Width))&&
	((pTop >= div1Top)&&(pTop <= div1Top + div1Height)))) && (div1Top <= fundoHeight - div1Height)){
		cairCheck = 0;
	}
	else {cairCheck = 1;}
	}
}

function enemyDestroy(p){
	if (orient=='l' && parseInt(getComputedStyle(p).left) <= 0-parseInt(getComputedStyle(p).width)){
		fundo.removeChild(pers.splice(pers.indexOf(p),1)[0]);
	}
	if (orient=='r' && parseInt(getComputedStyle(p).left) >= parseInt(getComputedStyle(fundo).width)-parseInt(getComputedStyle(p).width )){
		fundo.removeChild(pers.splice(pers.indexOf(p),1)[0]);
	}
}


// Mover cursor 1  - através dos botões do teclado
function move(e) {
	console.log(e.keyCode)
	if (audioplay==0) {
		let neve = new Audio('../audio/neve.mp3');
		neve.play();
		audioplay=1;
	}
	if (e.keyCode == 68) {
		timer = setInterval("direita()",15);
		contador ++;
	}

	if (e.keyCode == 32) {
		if (contador==0){countPulo = 0;}
		if (countPulo==0){
			timer = setInterval("acima()",50);
		}
		contador ++;

	}

	if (e.keyCode == 83) {
		timer = setInterval("baixo()",15);
		contador ++;
	}
}


function direita() {
	let div1Left= parseInt(getComputedStyle(div1).left);
	let fundoWidth= parseInt(getComputedStyle(fundo).width);
	let div1Width= parseInt(getComputedStyle(div1).width);

	div1.style.left = div1Left+5;
	if ( div1Left >= fundoWidth  - div1Width){
		clearInterval(timer);
		timer = setInterval ("esquerda()",15);
	}
}

function acima() {
	let div1Top = parseInt(getComputedStyle(div1).top)
	countPulo++;
	if (countPulo<2){
		div1Top = parseInt(getComputedStyle(div1).top + 3);
		grauQueda = grauQueda+3;
	}
	if (countPulo<10) {
		grauQueda = grauQueda+2;
	}
	if (countPulo>5) {
		grauQueda = grauQueda-2;
	}
	if (countPulo==20){
	clearInterval(timer);
	countPulo = 0;
	grauQueda = 0;
	}
}

// Parar cursores


	function colisao(b){
	let div1Left= parseInt(getComputedStyle(div1).left);
	let div1Top= parseInt(getComputedStyle(div1).top);
	let div1Height= parseInt(getComputedStyle(div1).height);
	let div1Width= parseInt(getComputedStyle(div1).width);

	let div2Left= parseInt(getComputedStyle(b).left);
	let div2Top= parseInt(getComputedStyle(b).top);
	let div2Height= parseInt(getComputedStyle(b).height);
	let div2Width= parseInt(getComputedStyle(b).width);
	
	let fundoHeight= parseInt(getComputedStyle(fundo).height);
	let fundoWidth= parseInt(getComputedStyle(fundo).width);

	}


//Ao carregar a página estas linhas são executadas. 


let fundo = document.querySelector('#fundo');

let pl = document.querySelector('#div1');
let pers = [];
let enemy = [];
let orient = 'l';
let tick = 0;
let tickInt = setInterval("tickFunc()",10);
let grav = setInterval("gravidade()",10);
let audioplay = 0;
let cairCheck = 0;
let grauQueda = 0;
let countPulo = 0;

let contador = 0;
let cont = 0; //Funções que são chamadas a cada 15 e 5 milisegundos
document.querySelector("body").addEventListener("keydown", (e)=>{move(e)});





document.querySelector("#para").addEventListener("click",()=>{ para()});
document.querySelector("#para2").addEventListener("click", ()=>{para2()});