
function tickFunc() {
	fundoHeight = parseFloat(getComputedStyle(fundo).height);
	fundoWidth = parseFloat(getComputedStyle(fundo).width);


	if (orient=='l'){
		pers.forEach(p=>p.style.left = parseFloat(getComputedStyle(p).left)-10*(0.001*fundoHeight));
		enemy.forEach(p=>p.style.left = parseFloat(getComputedStyle(p).left)-2*10*(0.001*fundoHeight));
	}
	if (orient=='r'){
		pers.forEach(p=>p.style.left = parseFloat(getComputedStyle(p).left)+2*500/fundoHeight);
		enemy.forEach(p=>p.style.left = parseFloat(getComputedStyle(p).left)+2*500/fundoHeight);
	}

	objs.forEach(p=>enemyDestroy(p));
	pers.forEach(p=>colisao(p));

	switch(tick/100){
		case 0: createPlatform('chao',2000,10,400,40);
		break;
		case 1: createEnemy('pilar',3,3,0,120);
		createPlatform('chao',200,10,4,60); break;
		case 2: createPlatform('chao',200,10,0,50); break;
		case 3: createPlatform('moeda',7,9,20,90); break;
		case 5: createEnemy('pilar',2,2,0,80);
		createPlatform('chao',200,10,0,150);break;
		case 6: createEnemy('pilar',8,8,0,90); break;
		case 7: createEnemy('pilar',2,2,0,80); break;
	}

	if (parseFloat(getComputedStyle(pl).top) >= fundoHeight - parseFloat(getComputedStyle(pl).height)){
		pl.style.opacity = 0;
		clearInterval(tickInt);
	}

	tick++;

}

function createPlatform(platClass,width,height,leftMin,topMin){
	let p = document.createElement('div');
	p.setAttribute('class',platClass);
	pers.push(p);
	objs.push(p);
	fundo.appendChild(p);
	p.style.width = width*0.01*fundoHeight;
	p.style.height = height*0.01*fundoHeight;
	if (orient=='l'){p.style.left = parseFloat(getComputedStyle(fundo).width)-leftMin*1000/fundoHeight;}
	if (orient=='r'){p.style.left = 0;}
	p.style.top = parseInt(getComputedStyle(fundo).height)-topMin;
}


function createEnemy(enemyClass,width,height,leftMin,topMin){
	let p = document.createElement('div');
	p.setAttribute('class',enemyClass);
	enemy.push(p);
	pers.push(p);
	objs.push(p);
	fundo.appendChild(p);
	p.style.width = width*3*(0.01*fundoHeight);
	p.style.height = height*3*(0.01*fundoHeight);
	if (orient=='l'){p.style.left = parseInt(getComputedStyle(fundo).width)-leftMin;}
	if (orient=='r'){p.style.left = 0;}
	p.style.top = parseInt(getComputedStyle(fundo).height)-topMin;
}


function gravidade(){
	if (objs[0] != null){
	objs.forEach(p=>cair(p));

	if (cairCheck==0){
		if (pulando==0) {pl.style.top = parseFloat(getComputedStyle(pl).top)+3*3.5*0.001*fundoHeight;
		puloCheck = 0;}
	} 
	else {puloCheck = 1;}
	cairCheck = 0;
	}

}
function cair(p){
	let div1Left= parseFloat(getComputedStyle(div1).left);
	let div1Top= parseFloat(getComputedStyle(div1).top);
	let div1Height= parseFloat(getComputedStyle(div1).height);
	let div1Width= parseFloat(getComputedStyle(div1).width);

	let pLeft= parseFloat(getComputedStyle(p).left);
	let pTop= parseFloat(getComputedStyle(p).top);
	let pHeight= parseFloat(getComputedStyle(p).height);
	let pWidth= parseFloat(getComputedStyle(p).width);
	
	if (cairCheck==0) {
	if (!((((div1Left >= pLeft)&&(div1Left <= pLeft + pWidth))&&
	((div1Top >= pTop-div1Height)&&(div1Top <= pTop + pHeight))) || (((pLeft >= div1Left)&&(pLeft <= div1Left + div1Width))&&
	((pTop >= div1Top)&&(pTop <= div1Top + div1Height)))) && (div1Top <= fundoHeight - div1Height) && (p.className != 'moeda')){
		cairCheck = 0;
	}
	else {cairCheck = 1;}
	}
}

function enemyDestroy(p){
	if (orient=='l' && parseInt(getComputedStyle(p).left) <= 0-parseInt(getComputedStyle(p).width)){
		fundo.removeChild(pers.splice(pers.indexOf(p),1)[0]);
		objs.splice(objs.indexOf(p),1);
	}
	if (orient=='r' && parseInt(getComputedStyle(p).left) >= parseInt(getComputedStyle(fundo).width)){
		fundo.removeChild(pers.splice(pers.indexOf(p),1)[0]);
		objs.splice(objs.indexOf(p),1);
	}
}


// Mover Personagem  - através dos botões do teclado
function move(e) {
	if (audioplay==0) {
		let neve = new Audio('../audio/neve.mp3');
		neve.play();
		audioplay=1;
	}
	if (e.keyCode == 32 && puloCheck==1) {
		timer = setInterval("acima()",10);
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
	console.log(grauQueda);
	countPulo++;
	if (countPulo==1){
		grauQueda = grauQueda + 1*0.001*fundoWidth;
		puloCheck = 0;
		pulando = 1;
	}
	if (countPulo<=20){
		grauQueda = grauQueda + 0.5*0.001*fundoWidth;
		puloCheck = 0;
	}
	if (countPulo > 20 && countPulo <= 25) {
		grauQueda = grauQueda - 0.5*0.001*fundoWidth;;
		pulando = 0;
	}
	if (countPulo > 25) {
		grauQueda = grauQueda-1*0.0001*fundoHeight;
		pulando = 0;
	}

	if (countPulo==50 || puloCheck==1){
	countPulo = 0;
	grauQueda = 0;
	clearInterval(timer);
	}
	pl.style.top = parseFloat(getComputedStyle(pl).top)-grauQueda;


}

// Parar cursores


function colisao(p){
	let div1Left= parseInt(getComputedStyle(div1).left);
	let div1Top= parseInt(getComputedStyle(div1).top);
	let div1Height= parseInt(getComputedStyle(div1).height);
	let div1Width= parseInt(getComputedStyle(div1).width);

	let pLeft= parseInt(getComputedStyle(p).left);
	let pTop= parseInt(getComputedStyle(p).top);
	let pHeight= parseInt(getComputedStyle(p).height);
	let pWidth= parseInt(getComputedStyle(p).width);

	if (((div1Left >= pLeft)&&(div1Left <= pLeft + pWidth) && (div1Top >= pTop-div1Height)&&(div1Top <= pTop + pHeight))
	|| ((pLeft >= div1Left)&&(pLeft <= div1Left + div1Width) && (pTop >= div1Top) &&(pTop <= div1Top + div1Height))) {

	if (enemy.indexOf(p) != -1){
		pl.style.opacity = 0;
		clearInterval(tickInt);
	}
	if (p.className == 'moeda'){
		fundo.removeChild(pers.splice(pers.indexOf(p),1)[0]);
		objs.splice(objs.indexOf(p),1);
		moedas++;
	}

	}
}

//Ao carregar a página estas linhas são executadas. 


let fundo = document.querySelector('#fundo');
let pl = document.querySelector('#div1');
let moedaCount = document.createElement('div');
moedaCount.setAttribute('class','moedaCount');
moedaCount.innerHTML = 'Moedas:';
fundo.appendChild(moedaCount);
let pers = [];
let enemy = [];
let objs = [];
let orient = 'l';
let tick = 0;
let tickTime = 0;
let tickInt = setInterval("tickFunc()",10);
let grav = setInterval("gravidade()",10);
let audioplay = 0;
let cairCheck = 0;
let puloCheck = 0;
let pulando = 0;
let grauQueda = 0;
let countPulo = 0;
let moedas = 0;
let timer;

let fundoHeight= parseInt(getComputedStyle(fundo).height);
let fundoWidth= parseInt(getComputedStyle(fundo).width);

let contador = 0;
let cont = 0; //Funções que são chamadas a cada 15 e 5 milisegundos
document.querySelector("body").addEventListener("keydown", (e)=>{move(e)});
