
function tickFunc() {
	tick++;
	if (orient=='l'){
		pers.forEach(p=>p.style.left = parseInt(getComputedStyle(p).left)-2);
		enemy.forEach(p=>p.style.left = parseInt(getComputedStyle(p).left)-2);
	}
	if (orient=='r'){
		enemy.forEach(p=>p.style.left++);
	}

	pers.forEach(p=>enemyDestroy(p));
	pers.forEach(p=>colisao(p));


	if (tick==400){
		let p = document.createElement('div');
		p.setAttribute('class','pilar');
		enemy.push(p);
		pers.push(p);
		fundo.appendChild(p);
		p.style.left = getComputedStyle(fundo).width;
	}

	if (tick==500){
		let p = document.createElement('div');
		p.setAttribute('class','pilar');
		enemy.push(p);
		pers.push(p);
		fundo.appendChild(p);
		p.style.left = getComputedStyle(fundo).width;
		p.style.top = parseInt(getComputedStyle(fundo).height)-20;
	}


}

function gravidade(){
	pers.forEach(p=>cair(p));
	if (cairCheck==0) {pl.style.top = parseInt(getComputedStyle(pl).top)+2;}
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
	if (!(((div1Left >= pLeft)&&(div1Left <= pLeft + pWidth))&&((div1Top == pTop-pHeight - pHeight)&&(div1Top <= pTop ))) && (div1Top <= fundoHeight - div1Height/2)){
		cairCheck==1
		pl.style.top = parseInt(getComputedStyle(pl).top)+1;
	}
	else {cairCheck==0}
}


function enemyDestroy(p){
	if (parseInt(getComputedStyle(p).left) <= 0-parseInt(getComputedStyle(p).width)){
		fundo.removeChild(pers.shift());
	}
}



function moverdireita(){
	let div2Left= parseInt(getComputedStyle(div2).left);
	let fundoWidth= parseInt(getComputedStyle(fundo).width);
	let div2Width= parseInt(getComputedStyle(div2).width);

	div2.style.left = div2Left +5;
	if ( div2Left >=  fundoWidth - div2Width){
		clearInterval(m);
		m = setInterval ("moveresquerda()",15);
	}
}
function moveresquerda(){
	let div2Left= parseInt(getComputedStyle(div2).left);
	let fundoWidth= parseInt(getComputedStyle(fundo).width);
	let div2Width= parseInt(getComputedStyle(div2).width);

	div2.style.left = div2Left -5;
	if ( div2Left <= 0){
		clearInterval(m);
		m = setInterval ("moverdireita()",15);
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


	if (e.keyCode == 65) {

		timer = setInterval("esquerda()",15);
		contador ++;
	}

	if (e.keyCode == 32) {
		timer = setInterval("acima()",15);
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

function esquerda() {
	let div1Left= parseInt(getComputedStyle(div1).left);
	
	div1.style.left = div1Left-5;
	if ( div1Left <= 0){
		clearInterval(timer);
		timer = setInterval ("direita()",15);
	}
}

function baixo() {
	let div1Top= parseInt(getComputedStyle(div1).top);
	let fundoHeight= parseInt(getComputedStyle(fundo).height);
	let div1Height= parseInt(getComputedStyle(div1).height);

	div1.style.top = div1Top+5;
	if(div1Top >= fundoHeight - div1Height){
		clearInterval(timer);
	timer = setInterval("acima()",15);
	}
}
function acima() {
	let div1Top= parseInt(getComputedStyle(div1).top);

	div1.style.top = div1Top-5;
	if(div1Top <= 0 ){
	clearInterval(timer);
	timer = setInterval("baixo()",15);
	}
}

// Parar cursores
function para2(){
	clearInterval(m);
}
function para() {
	clearInterval(timer);
}



function altura(parametro) {
	div1.style.height = parseInt(getComputedStyle(div1).height)+parametro;
}

function largura(parametro) {
	div1.style.width = parseInt(getComputedStyle(div1).width)+parametro;
}
function cor(){
if(cont == 0){
	div1.style.backgroundColor="blue";
	cont++;
}else{
	if(cont == 1){
		div1.style.backgroundColor="orange";
		cont++;
	   }else{
	   if(cont == 2){
		div1.style.backgroundColor="yellow";
		cont = 0;
		}
	}
}

}

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



		if (((div1Left >= div2Left)&&(div1Left <= div2Left + div2Width))&&
			((div1Top >= div2Top)&&(div1Top <= div2Top + div2Height))){
				para2();
				para();
		}
		if (((div2Left >= div1Left)&&(div2Left <= div1Left + div1Width))&&
			((div2Top >= div1Top)&&(div2Top <= div1Top + div1Height))){
				para2();
				para();
		}
	}


//Ao carregar a página estas linhas são executadas. 


let fundo = document.querySelector('#fundo');

let pl = document.querySelector('#div1');
let pers = [];
let enemy = [];
let orient = '';
let tick = 0;
let tickInt = setInterval("tickFunc()",10);
let grav = setInterval("gravidade()",10);
let audioplay = 0;
let cairCheck = 0;
orient = 'l';


let contador = 0;
let cont = 0;
   let m = setInterval("moverdireita()", 15); //Funções que são chamadas a cada 15 e 5 milisegundos

document.querySelector("body").addEventListener("keydown", (e)=>{move(e)});




let rrrr = document.createElement('div');
rrrr.setAttribute('class','chao');
pers.push(rrrr);
fundo.appendChild(rrrr);

document.querySelector("#para").addEventListener("click",()=>{ para()});
document.querySelector("#para2").addEventListener("click", ()=>{para2()});