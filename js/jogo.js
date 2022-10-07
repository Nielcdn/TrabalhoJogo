
function tickFunc() {
	fundoHeight = parseFloat(getComputedStyle(fundo).height);
	fundoWidth = parseFloat(getComputedStyle(fundo).width);
    moedaCount.innerHTML = 'Moedas:'+ moedas;

	if (orient=='l'){
		pers.forEach(p=>p.style.left = parseFloat(getComputedStyle(p).left)-1*(0.01*fundoHeight));
		enemy.forEach(p=>p.style.left = parseFloat(getComputedStyle(p).left)-1*(0.01*fundoHeight));
	}
	if (orient=='r'){
		pers.forEach(p=>p.style.left = parseFloat(getComputedStyle(p).left)+1*0.01*fundoHeight);
		enemy.forEach(p=>p.style.left = parseFloat(getComputedStyle(p).left)+1*0.01*fundoHeight);
	}

	objs.forEach(p=>enemyDestroy(p));
	pers.forEach(p=>colisao(p));

	switch(tick*0.01){
		case 0: createPlatform('chao',2000,10,600,10);
		break;
		case 1: createPers('pilar',3,3,0,40);
		createPlatform('chao',35,5,4,30);
		break;
		case 1.5: neveMus.play();
		createPers('moeda',2,3,0,45); break;
		case 2: createPlatform('chao',25,3,0,20); break;
		case 3: createPers('moeda',2,3,0,15); break;
		case 5: createPers('pilar',2,2,0,15);
		createPlatform('chao',200,4,0,40);
		break;
		case 6: createPers('pilar',3,3,0,35); 
		createPlatform('chao',100,6,0,45);
		break;
		case 7: createPers('pilar',2,2,0,80); break;
		case 7.5: createPers('pilar',2,2,0,80); break;
		case 8: createPlatform('chao',90,5,0,60);
		createPers('pilar',3,3,0,80); 
		break;
		case 8.5: createPers('pilar',2,2,0,100); break;
		case 9: createPlatform('chao',20,5,0,40); break;
		case 9.5: createPlatform('chao',20,5,0,20);
		createPers('pilar',2,2,0,250);
		break;
		case 10.5: createPlatform('chao',500,5,0,20);
		createPers('pilar',2,2,0,30);
		break;
		case 11: createPers('pilar',2,2,0,30); break;
		case 11.5: createPlatform('chao',20,5,0,20); break;
		case 12: createPers('pilar',2,2,0,40); break;
		case 12.5: createPlatform('chao',20,5,0,30); break;
		case 13: createPers('pilar',2,2,0,50); break;
		case 13.5: createPlatform('chao',20,5,0,40); break;
		case 14: createPers('pilar',2,2,0,60); break;
		case 14.5: createPlatform('chao',20,5,0,50); break;
		case 15: createPers('moeda',2,2,0,70); break;
		case 15.5: createPlatform('chao',20,5,0,60); break;
		case 16: createPers('pilar',2,2,0,50);
		createPers('pilar',2,2,0,60);
		break;
		case 20: createPlatform('final',30,35,0,50); break;


	}
	if (parseFloat(getComputedStyle(pl).top) >= fundoHeight - parseFloat(getComputedStyle(pl).height)){
		pl.style.opacity = 0;
		neveMus.pause();
		clearInterval(tickInt);
	}

	tick += 1;
}

function createPlatform(platClass,width,height,leftMin,topMin){
	let p = document.createElement('div');
	p.setAttribute('class',platClass);
	pers.push(p);
	objs.push(p);
	fundo.appendChild(p);
	p.style.width = width*0.01*fundoWidth;
	p.style.height = height*0.01*fundoWidth;
	if (orient=='l'){p.style.left = parseFloat(getComputedStyle(fundo).width)-leftMin*0.01*fundoHeight;}
	if (orient=='r'){p.style.left = 0;}
	p.style.top = parseFloat(getComputedStyle(fundo).height)-topMin*0.01*fundoHeight;
}


function createPers(enemyClass,width,height,leftMin,topMin){
	let p = document.createElement('div');
	p.setAttribute('class',enemyClass);
	enemy.push(p);
	pers.push(p);
	objs.push(p);
	fundo.appendChild(p);
	p.style.width = width*0.01*fundoWidth;
	p.style.height = height*0.01*fundoWidth;
	if (orient=='l'){p.style.left = parseFloat(getComputedStyle(fundo).width)-leftMin*0.01*fundoHeight;}
	if (orient=='r'){p.style.left = 0;}
	p.style.top = parseFloat(getComputedStyle(fundo).height)-topMin*0.01*fundoHeight;
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
	((pTop >= div1Top)&&(pTop <= div1Top + div1Height)))) && (div1Top <= fundoHeight - div1Height)){
		cairCheck = 0;
	}
	else {cairCheck = 1;}
	}
}

function enemyDestroy(p){
	if (orient=='l' && parseFloat(getComputedStyle(p).left) <= 0-parseFloat(getComputedStyle(p).width)){
		fundo.removeChild(pers.splice(pers.indexOf(p),1)[0]);
		objs.splice(objs.indexOf(p),1);
	}
	if (orient=='r' && parseFloat(getComputedStyle(p).left) >= parseFloat(getComputedStyle(fundo).width)){
		fundo.removeChild(pers.splice(pers.indexOf(p),1)[0]);
		objs.splice(objs.indexOf(p),1);
	}
}


// Mover Personagem  - através dos botões do teclado
function move(e) {
	if (start==0) {
		tickInt = setInterval("tickFunc()",10);
		grav = setInterval("gravidade()",10);
		start = 1;
	}
	if (e.keyCode == 32 && puloCheck==1) {
		timer = setInterval("acima()",10);
	}
}

function moveCel(){
	if (start==0) {
		tickInt = setInterval("tickFunc()",10);
		grav = setInterval("gravidade()",10);
		neveMus.play();
		start = 1;
	}
	if (puloCheck==1) {
		timer = setInterval("acima()",10);
	}
}


function acima() {
	countPulo++;
	if (countPulo==1){
		grauQueda = grauQueda + 1.5*0.001*fundoHeight;
		puloCheck = 0;
		pulando = 1;
	}
	if (countPulo<=20){
		grauQueda = grauQueda + 1*0.001*fundoHeight;
		puloCheck = 0;
	}
	if (countPulo > 20 && countPulo <= 25) {
		grauQueda = grauQueda - 1*0.001*fundoHeight;;
		pulando = 0;
	}
	if (countPulo > 25) {
		grauQueda = grauQueda-1.5*0.0001*fundoHeight;
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
	let div1Left= parseFloat(getComputedStyle(div1).left);
	let div1Top= parseFloat(getComputedStyle(div1).top);
	let div1Height= parseFloat(getComputedStyle(div1).height);
	let div1Width= parseFloat(getComputedStyle(div1).width);

	let pLeft= parseFloat(getComputedStyle(p).left);
	let pTop= parseFloat(getComputedStyle(p).top);
	let pHeight= parseFloat(getComputedStyle(p).height);
	let pWidth= parseFloat(getComputedStyle(p).width);

	if (((div1Left >= pLeft)&&(div1Left <= pLeft + pWidth) && (div1Top >= pTop-div1Height)&&(div1Top <= pTop + pHeight))
	|| ((pLeft >= div1Left)&&(pLeft <= div1Left + div1Width) && (pTop >= div1Top) &&(pTop <= div1Top + div1Height))) {

	if (enemy.indexOf(p) != -1 && p.className != 'moeda'){
		neveMus.pause();
		pl.style.opacity = 0;
		pers.forEach(p=>p.style.opacity = 0);
		moedaCount.innerHTML = 'Fim de Jogo!<br>Você coletou '+moedas+' moedas!';
		moedaCount.style.top = fundoHeight*0.5 - parseFloat(getComputedStyle(moedaCount).top);
		moedaCount.style.left = fundoWidth*0.5 - parseFloat(getComputedStyle(moedaCount).width);
		moedaCount.style.width = parseFloat(getComputedStyle(moedaCount).width)*2.5;
		moedaCount.style.height = parseFloat(getComputedStyle(moedaCount).height)*2;
		clearInterval(tickInt);
	}
	if (p.className == 'moeda'){
		fundo.removeChild(pers.splice(pers.indexOf(p),1)[0]);
		objs.splice(objs.indexOf(p),1);
		moedas++;
	}
	if (p.className == 'final'){
		neveMus.pause();
		pl.style.opacity = 0;
		pers.forEach(p=>p.style.opacity = 0);
		moedaCount.innerHTML = 'Fim de Jogo!<br>Você coletou '+moedas+' moedas!';
		moedaCount.style.top = fundoHeight*0.5 - parseFloat(getComputedStyle(moedaCount).top);
		moedaCount.style.left = fundoWidth*0.5 - parseFloat(getComputedStyle(moedaCount).width);
		moedaCount.style.width = parseFloat(getComputedStyle(moedaCount).width)*2.5;
		moedaCount.style.height = parseFloat(getComputedStyle(moedaCount).height)*2;
		clearInterval(tickInt);
	}
	}
}

//Ao carregar a página estas linhas são executadas. 

let start = 0;
let fundo = document.querySelector('#fundo');
let pl = document.querySelector('#div1');
let moedaCount = document.createElement('div');
moedaCount.setAttribute('class','moedaCount');
fundo.appendChild(moedaCount);

let neveMus = new Audio('../audio/neve.mp3');
let pers = [];
let enemy = [];
let objs = [moedaCount];
let orient = 'l';
let tick = 0.0;
let tickTime = 0;
let tickInt;
let grav;
let audioplay = 0;
let cairCheck = 0;
let puloCheck = 0;
let pulando = 0;
let grauQueda = 0;
let countPulo = 0;
let moedas = 0;
let timer;

let fundoHeight= parseFloat(getComputedStyle(fundo).height);
let fundoWidth= parseFloat(getComputedStyle(fundo).width);

let cont = 0;
document.querySelector("body").addEventListener("keydown", (e)=>{move(e)});
document.querySelector("body").addEventListener("touchstart", ()=>{moveCel()});
