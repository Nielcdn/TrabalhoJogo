
function tickFunc() {
	fundoHeight = parseFloat(getComputedStyle(fundo).height);
	fundoWidth = parseFloat(getComputedStyle(fundo).width);
    moedaCount.innerHTML = 'Moedas:'+ moedas;

	//mover os itens da tela
	if (orient=='l'){
		pers.forEach(p=>p.style.left = parseFloat(getComputedStyle(p).left)-1*(0.01*fundoHeight));
		enemy.forEach(p=>p.style.left = parseFloat(getComputedStyle(p).left)-1*(0.01*fundoHeight));
	}
	if (orient=='r'){
		pers.forEach(p=>p.style.left = parseFloat(getComputedStyle(p).left)+1*0.01*fundoHeight);
		enemy.forEach(p=>p.style.left = parseFloat(getComputedStyle(p).left)+1*0.01*fundoHeight);
	}

	objs.forEach(p=>itemDestroy(p));
	pers.forEach(p=>colisao(p));

	//Criar objetos e plataformas
	switch(tick*0.01){
		case 0: createPlatform('chao',1000,10,600,9,'n');
		break;
		case 1: createPers('pilar',3,3,0,40,'n');
		createPlatform('chao',35,5,0,30,'n');
		break;
		case 1.5: neveMus.play();
		break;
		case 2: createPlatform('chao',25,3,0,20,'n');createPers('moeda',2,3,0,45,'n');
		break;
		case 3: createPers('pilar',2,2,0,15,'n'); break;
		case 4: createPers('moeda',2,3,0,15,'n'); break;
		case 5: createPers('pilar',2,2,0,15,'n');
		createPlatform('chao',200,4,0,40,'n');
		break;
		case 6: createPers('pilar',3,3,0,35,'n'); 
		break;
		case 7: createPers('pilar',2,2,0,80,'n'); break;
		case 7.5: createPers('pilar',2,2,0,80,'n'); break;
		case 8: createPlatform('chao',90,5,0,60,'n');
		createPers('pilar',3,3,0,80,'n');
		createPers('moeda',2,3,0,65,'n');
		break;
		case 8.5: createPers('pilar',2,2,0,100,'n'); break;
		case 9.5: createPlatform('chao',20,5,0,20,'n');
		createPers('pilar',2,2,0,250,'n');
		break;
		case 10.5: createPlatform('chao',250,3,0,20,'n');
		createPers('pilar',2,2,0,30,'n');
		break;
		case 11: createPers('pilar',2,2,0,35,'n');
		
		break;
		case 11.5: createPlatform('chao',20,5,0,20,'n'); break;
		case 12: createPers('pilar',2,2,0,40,'n');
		createPers('moeda',2,3,0,50,'n');
		
		break;
		case 12.5: createPlatform('chao',20,5,0,30,'n'); break;
		case 13: createPers('pilar',2,2,0,50,'n'); break;
		case 13.5: createPlatform('chao',20,5,0,40,'n'); break;
		case 14: createPers('pilar',2,2,0,60,'n');
		createPlatform('chao',500,10,0,10,'n');
		break;
		case 14.5: createPlatform('chao',20,5,0,50,'n'); break;
		case 15.25: createPers('moeda',2,3,0,70,'n'); break;
		case 15.5: createPlatform('chao',20,5,0,60,'n');
		
		break;
		case 16: createPers('pilar',2,2,0,50,'n');
		createPers('pilar',2,2,0,60,'n');
		
		break;
		case 16.75:
		createPers('moeda',2,3,0,60,'n');
		break;
		case 17.25: createPers('save',10,7,0,20,'n'); break;
		case 17.75:saveCheckPoint(); break;
		case 18: createPers('pilar',2,2,0,50,'n');
		createPers('pilar',2,2,0,60,'n');
		break;
		case 19.5: createPers('pilar',2,2,0,60,'n');
		createPers('pilar',2,2,0,20,'n');
		createPlatform('chao',500,10,0,10,'n');
		break;
		case 20: createPlatform('chao',40,5,0,25,'n');
		createPers('moeda',2,3,0,35,'n'); break;
		case 22: createPers('pilar',3,3,0,20,'n'); break;
		case 23: createPers('moeda',2,3,0,30,'n'); break;
		case 23.75: createPlatform('chao',20,3,0,35,'n');
		case 24: createPers('pilar',4,4,0,25,'n'); break;
		case 25.25: createPers('moeda',2,3,0,40,'n'); break;
		case 25.75: createPers('moeda',2,3,0,25,'n'); break;
		case 26.25: createPers('pilar',4,4,0,25,'n'); break;
		case 27: createPers('pilar',2,2,0,25,'n'); break;
		case 27.25: createPers('moeda',2,3,0,25,'n'); break;
		case 27.50: createPers('pilar',2,2,0,25,'n'); break;
		case 28: createPlatform('final',30,35,0,50,'n'); break;

	}
	if (parseFloat(getComputedStyle(pl).top) >= fundoHeight - parseFloat(getComputedStyle(pl).height)){
		pl.style.opacity = 0;
		neveMus.pause();
		clearInterval(tickInt);
	}

	tick += 1;
}

function createPlatform(Class,width,height,leftMin,topMin,fix){
	let p = document.createElement('div');
	p.setAttribute('class',Class);
	pers.push(p);
	objs.push(p);
	fundo.appendChild(p);
	if (fix=='n'){p.style.width = width*0.01*fundoWidth;}
	else {p.style.width = width;}
	if (fix=='n'){p.style.height = height*0.01*fundoWidth;}
	else {p.style.height = height;}
	if (orient=='l'){
		if (fix=='n'){p.style.left = parseFloat(getComputedStyle(fundo).width)-leftMin*0.01*fundoHeight;}
		else {p.style.left = leftMin;}
	}
	if (orient=='r'){
		if (fix=='n'){p.style.left = 0;}
		else {p.style.left = leftMin;}
	}
	if (fix=='n'){p.style.top = parseFloat(getComputedStyle(fundo).height)-topMin*0.01*fundoHeight;}
	else {p.style.top = topMin;}
}


function createPers(Class,width,height,leftMin,topMin,fix){
	let p = document.createElement('div');
	p.setAttribute('class',Class);
	if (Class=='save'){p.innerHTML = 'CHECKPOINT!';}
	enemy.push(p);
	pers.push(p);
	objs.push(p);
	fundo.appendChild(p);
	if (fix=='n'){p.style.width = width*0.01*fundoWidth;}
	else {p.style.width = width;}
	if (fix=='n'){p.style.height = height*0.01*fundoWidth;}
	else {p.style.height = height;}
	if (orient=='l'){
		if (fix=='n'){p.style.left = parseFloat(getComputedStyle(fundo).width)-leftMin*0.01*fundoHeight;}
		else {p.style.left = leftMin;}
	}
	if (orient=='r'){
		if (fix=='n'){p.style.left = 0;}
		else {p.style.left = leftMin;}
	}
	if (fix=='n'){p.style.top = parseFloat(getComputedStyle(fundo).height)-topMin*0.01*fundoHeight;}
	else {p.style.top = topMin;}
}

//começar o jogo
function startGame(){
	pl.style.top = plTopStart;
	pl.style.left = plLeftStart;
	pl.style.opacity = 1;
	moedaCount.style.top = 0;
	moedaCount.style.left = 0;
	moedaCount.style.width = moedaCountWStart;
	moedaCount.style.height = moedaCountHStart;
	moedaCount.innerHTML = '';
	start = 0;
	if (startMsg==0) {
		moedaCount.innerHTML = 'Bem Vindo!<br>Você deseja recomeçar do último checkpoint?<br><br><button type="button" class="recomeco">Começar do Início</button><br><button type="button" class="checkpoint">Começar do Checkpoint</button>';
		moedaCount.style.width = parseFloat(getComputedStyle(moedaCount).width)*5;
		moedaCount.style.height = parseFloat(getComputedStyle(moedaCount).height)*4;
		moedaCount.style.top = fundoHeight*0.25 - parseFloat(getComputedStyle(moedaCount).top);
		moedaCount.style.left = fundoWidth*0.5 - parseFloat(getComputedStyle(moedaCount).width)/2;
		document.querySelector(".recomeco").addEventListener("click",(e)=>{startGame()})
		document.querySelector(".checkpoint").addEventListener("click",(e)=>{loadCheckPoint()})
		startMsg = 1;
	}
}

//salvar o jogo
function saveCheckPoint(){
	console.log(pers);
	console.log(objs);
	let c = 1;
	pers.forEach(p=>{
		localStorage.setItem('length',''+pers.length);
		localStorage.setItem('objTop'+c,''+getComputedStyle(p).top);
		localStorage.setItem('objLeft'+c,''+getComputedStyle(p).left);
		localStorage.setItem('objWidth'+c,''+getComputedStyle(p).width);
		localStorage.setItem('objHeight'+c,''+getComputedStyle(p).height);
		localStorage.setItem('objClass'+c,''+p.className);
		localStorage.setItem('tick',tick+1);
		localStorage.setItem('moedas',moedas);
		c++;
	})
		localStorage.setItem('plTop',''+getComputedStyle(div1).top);
		localStorage.setItem('plLeft',''+getComputedStyle(div1).left);
		localStorage.setItem('plWidth',''+getComputedStyle(div1).width);
		localStorage.setItem('plHeight',''+getComputedStyle(div1).height);
}

//carregar o jogo salvo
function loadCheckPoint(){
	if (parseFloat(localStorage.getItem('length'))*0 == 0){
	startGame();
	div1.style.top = parseFloat(localStorage.getItem('plTop'));
	div1.style.left = parseFloat(localStorage.getItem('plLeft'));
	div1.style.width = parseFloat(localStorage.getItem('plWidth'));
	div1.style.height = parseFloat(localStorage.getItem('plHeight'));
	for (let c=1;c<=parseFloat(localStorage.getItem('length'));c++){
		if (localStorage.getItem('objClass'+c)=='chao'){
		createPlatform(localStorage.getItem('objClass'+c),
		parseFloat(localStorage.getItem('objWidth'+c)),
		parseFloat(localStorage.getItem('objHeight'+c)),
		parseFloat(localStorage.getItem('objLeft'+c)),
		parseFloat(localStorage.getItem('objTop'+c)),
		's');
		}
		else {
		createPers(localStorage.getItem('objClass'+c),
		parseFloat(localStorage.getItem('objWidth'+c)),
		parseFloat(localStorage.getItem('objHeight'+c)),
		parseFloat(localStorage.getItem('objLeft'+c)),
		parseFloat(localStorage.getItem('objTop'+c)),
		's');
		}
	}
	tick = parseFloat(localStorage.getItem('tick'));
	moedas = parseInt(localStorage.getItem('moedas'));
	}
}

//finalizar o jogo
function final(){
	neveMus.pause();
	pl.style.opacity = 0;
	pers.forEach(p=>p.style.opacity = 0);
	moedaCount.innerHTML = 'Fim de Jogo!<br>Você coletou '+moedas+' moedas!<br>Deseja tentar novamente?<br><br><button type="button" class="recomeco">Recomeçar</button><br><button type="button" class="checkpoint">Começar do Checkpoint</button>';
	moedaCount.style.width = parseFloat(getComputedStyle(moedaCount).width)*5;
	moedaCount.style.height = parseFloat(getComputedStyle(moedaCount).height)*4;
	moedaCount.style.top = fundoHeight*0.25 - parseFloat(getComputedStyle(moedaCount).top);
	moedaCount.style.left = fundoWidth*0.5 - parseFloat(getComputedStyle(moedaCount).width)/2;
	document.querySelector(".recomeco").addEventListener("click",(e)=>{startGame()})
	document.querySelector(".checkpoint").addEventListener("click",(e)=>{loadCheckPoint()})
	clearInterval(tickInt);
	clearInterval(grav);
	pers = [];
	enemy = [];
	objs = [moedaCount];
	orient = 'l';
	tick = 0.0;
	tickInt;
	grav;
	audioplay = 0;
	cairCheck = 0;
	puloCheck = 0;
	pulando = 0;
	grauQueda = 0;
	countPulo = 0;
	moedas = 0;

}

//sistema de gravidade
function gravidade(){
	if (objs[0] != null){
	objs.forEach(p=>cair(p));

	if ((cairCheck==0 || countPulo>20)){
		if (pulando==0) {pl.style.top = parseFloat(getComputedStyle(pl).top)+3*3.5*0.0010*fundoHeight;
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
	((pTop >= div1Top)&&(pTop <= div1Top + div1Height)))) && (div1Top <= fundoHeight - div1Height) && p.className!='save'){
		cairCheck = 0;
	}
	else {cairCheck = 1;}
	}
}

//destruir itens fora da tela
function itemDestroy(p){
	if (orient=='l' && parseFloat(getComputedStyle(p).left) <= 0-parseFloat(getComputedStyle(p).width)){
		fundo.removeChild(pers.splice(pers.indexOf(p),1)[0]);
		objs.splice(objs.indexOf(p),1);
	}
	if (orient=='r' && parseFloat(getComputedStyle(p).left) >= parseFloat(getComputedStyle(fundo).width)){
		fundo.removeChild(pers.splice(pers.indexOf(p),1)[0]);
		objs.splice(objs.indexOf(p),1);
	}
}



// Pulo do Personagem  - através dos botões do teclado ou tela do celular
function move(e) {
	if (start==0) {
		tickInt = setInterval("tickFunc()",10);
		grav = setInterval("gravidade()",10);
		start = 1;
	}
	if (e.keyCode == 32 && puloCheck==1) {
		timer = setInterval("pulo()",10);
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
		timer = setInterval("pulo()",10);
	}
}


function pulo() {
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
		grauQueda = grauQueda - 1*0.001*fundoHeight;
		puloCheck = 0;
		pulando = 1;
	}
	if (countPulo > 25) {
		grauQueda = grauQueda-1.5*0.0001*fundoHeight;
		pulando = 0;
		puloCheck=0;
	}

	if (countPulo==50){
	countPulo = 0;
	grauQueda = 0;
	clearInterval(timer);
	}
	pl.style.top = parseFloat(getComputedStyle(pl).top)-grauQueda;


}


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

	if ((enemy.indexOf(p) != -1 && p.className != 'moeda' && p.className!= 'save') || p.className == 'final'){
		final();
	}
	if (p.className == 'moeda'){
		fundo.removeChild(pers.splice(pers.indexOf(p),1)[0]);
		objs.splice(objs.indexOf(p),1);
		moedas++;
	}
	}
}

//Ao carregar a página estas linhas são executadas. 

let plTopStart = getComputedStyle(div1).top;
let plLeftStart = getComputedStyle(div1).left;

let start; //quando for 0, um pulo inicia o jogo
let startMsg = 0; //para escrever a mensagem de início de jogo
let fundo = document.querySelector('#fundo');
let pl = document.querySelector('#div1'); //div do jogador

let moedaCount = document.createElement('div'); //contador de moedas
moedaCount.setAttribute('class','moedaCount');
fundo.appendChild(moedaCount);
let moedaCountWStart = getComputedStyle(moedaCount).width;
let moedaCountHStart = getComputedStyle(moedaCount).height;

let neveMus = new Audio('../audio/neve.mp3');
let pers = [];
let enemy = [];
let objs = [moedaCount];
let orient = 'l';
let tick = 0.0;
let tickInt; //timer do intervalo em ticks
let grav; //timer do sistema de gravidade

let audioplay = 0;
let cairCheck = 0;
let puloCheck = 0;
let pulando = 0;
let grauQueda = 0;
let countPulo = 0;
let moedas = 0;
let timer; //timer do pulo

let fundoHeight= parseFloat(getComputedStyle(fundo).height);
let fundoWidth= parseFloat(getComputedStyle(fundo).width);

document.querySelector("body").addEventListener("keydown", (e)=>{move(e)});
document.querySelector("body").addEventListener("touchstart", ()=>{moveCel()});

startGame();
start = 1;
