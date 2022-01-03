///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Création de certaine variable utile //

var score = 0;

var nombreDeCanard = 10;  //  |MODE SOLO |
var canardRestant = nombreDeCanard; // |MODE SOLO |

var delaiVol; // |MODE SOLO |
var tempsDeVol; // |MODE SOLO |

var angle = 0; // |MODE SOLO |

var duck = $('.duck'); // Permet d'appeler ma class (JQUERY ici)
var chienCourir = $('.chienCourir'); // Permet d'appeler ma class (JQUERY ici)


var score = 0; 


var currentKeyPressed = { // Variable me permettant de stocker True ou False , True = Touche préssé / False = Touche relaché.
	up: false,
	down: false,
	left: false,
	right: false,
	shift: false
};

var duckLocation = { // Variable me permettant de stocker l'emplacement de mon canard en axeX et axeY. (Ce sont des coordonnés finalement)
	x: 0,
	y: 0
 };
 


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Ici mes sons sont stocké dans des variables.
// Appel des sons //

var musiqueIntro = new Audio;
musiqueIntro.src = './assets/son/Intro.mp3';

var sonTombe = new Audio;
sonTombe.src = './assets/son/Falls.mp3';

var sonTir = new Audio;
sonTir.src = './assets/son/shot.wav';

var sonRire = new Audio;
sonRire.src = './assets/son/laugh.wav';

var sonAboiement = new Audio;
sonAboiement.src = './assets/son/bark.wav';

var sonCanardAttraper = new Audio;
sonCanardAttraper.src = './assets/son/catch.wav';

var sonCanardAiles = new Audio;
sonCanardAiles.src = './assets/son/flap.wav';

var sonCanard = new Audio;
sonCanard.src = './assets/son/krya.wav';

var musiqueTheme = new Audio;
musiqueTheme.src = './assets/son/DuckTalesTheme.mp3';

var sonToucheLeSol = new Audio;
sonToucheLeSol.src = './assets/son/Lands.mp3';

var sonNiveauReussit = new Audio;
sonNiveauReussit.src = './assets/son/Clear.mp3';


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////
//////   <===== MES FONCTIONS =====>  //////
///////////////////////////////////////////


// [FONCTION 1]: Création d'une <div> Canard que l'on va pouvoir boucler pour créer plusieurs canard | MODE SOLO |


function creationDivCanard(nomDeLaClasse){
	var logoCanardDiv = document.createElement("div");
	logoCanardDiv.classList.add(nomDeLaClasse);
	document.querySelector('.duckBox').append(logoCanardDiv);	
}


// [APPEL F1] : Fonction creationDivCanard = Tant que i n'est pas égal au nombre de canard alors la boucle créer des divs (ici 10 pour notre jeu solo) environ 1 à 2 min de partie max | MODE SOLO |

for(var i=0; i < nombreDeCanard; i++){
	creationDivCanard('duckStat');
}

creationDivCanard('clear');



// [FONCTION 3] Fonction GameOver : Pour le mode solo, celui si est adapté à un mode 1 joueur. | SOLO|


function gameOverSolo() {
	document.querySelector('.chienAttrape').style.display = "none";
	document.querySelector('.introScreen').style.display = "block";
	document.querySelector('.gameScreen').style.display = "none";
	document.querySelector('.scores').style.display = "block";
	document.querySelector('.top1').style.display = "none";
	document.querySelector('.yourScore2').style.display = "none";
	document.querySelector('.yourScore').textContent = 'Votre score = ' + score;                 // Ici des grosses modif CSS pour ajuster l'écrans et les infos.
	document.querySelector('.fakegames').style.top= '-200px'; 
	document.querySelector('.help').style.top= '-450px';
	document.querySelector('.helptext').style.top= '-220px';
	document.querySelector('.helptext').marginRight= '30px';
	

}

// [FONCTION 4] Fonction GameOver : Pour le mode multi, celui si est adapté à un mode 2 joueurs. | SOLO|

function gameOverMulti() {
	document.querySelector('.chienAttrape').style.display = "none";
	document.querySelector('.introScreen').style.display = "block";
	document.querySelector('.gameScreen').style.display = "none";
	document.querySelector('.scores').style.display = "block";

	document.querySelector('.yourScore').style.display = "block";
	document.querySelector('.yourScore2').style.display = "block";
	document.querySelector('.yourScore').textContent = 'Score Player 1 = ' + score;      // Ici des grosses modif CSS pour ajuster l'écrans et les infos.
	document.querySelector('.yourScore2').textContent = 'Score Player 2 = 12';

	document.querySelector('.fakegames').style.top= '-300px';
	document.querySelector('.help').style.top= '-550px';
	document.querySelector('.helptext').style.top= '-320px';
	document.querySelector('.helptext').marginRight= '30px';



	document.querySelector('.top1').style.display = "block";  
	if (score > 12) { // Ici on note 12 car le score max du canard est 12 car 120 secondes / 10 = 12pts
		document.querySelector('.top1').textContent = 'PLAYER 1 WIN !';
	} else {
		document.querySelector('.top1').textContent = 'PLAYER 2 WIN !';
	}
	

}


function gameOverReplay() {
	document.querySelector('.chienAttrape').style.display = "none";
	document.querySelector('.introScreen').style.display = "none";
	document.querySelector('.gameScreen').style.display = "block";
	document.querySelector('.scores').style.display = "none";
}


// [FONCTION 5] Bouton HELP disponible dans le menu principal (Affiche les informations (Rêgles, Comment jouer, Crédit)

function help(){
	alert("affiche mon menu help");

}




// [FONCTION 6] Bouton REPLAY disponible dans le jeu (Celui si restart directement la partie) | MODE MULTIJOUEUR | 






// // [FONCTION 7] Création d'un angle RANDOM après le rebond contre un mûr | MODE SOLO | 

function angleRandom(anciennePosition, nextPos){
	var angle = Math.round(Math.atan((nextPos.left-anciennePosition.left)/(-nextPos.top+anciennePosition.top))*180/Math.PI);

	if (nextPos.top-anciennePosition.top > 0){
		if( nextPos.left-anciennePosition.left <= 0){angle-=180;}
		else angle +=180 ;
	}
	
	return angle;


}

//[FONCTION 6] Donne une direction Random au canard (Merci Google :D ) | MODE SOLO |

function duckDirection(angle) {
	if (-22 < angle && angle <= 22){
		duck.css({
			'animation':'duckFlyAway .4s infinite step-end',
			'transform': `rotate(${angle}deg)`,
		})	
	}

	if (22 < angle && angle <= 68){
		duck.css({
			'animation':'duckFlyRightUp .4s infinite step-end',
			'transform': `rotate(${angle-45}deg)`,
		})	
	}

	else if (68 < angle && angle <= 112){
		duck.css({
			'animation':'duckFlyRight .4s infinite step-end',
			'transform': `rotate(${angle-90}deg)`,
		})
	}

	else if (112 < angle && angle <= 157.5){
		duck.css({
			'animation':'duckFlyRightUp .4s infinite step-end',
			'transform': `rotate(${angle-45}deg)`,
		})
	}

	if (157.5 < angle || angle <= -157.5){
		duck.css({
			'animation':'duckFlyAway .4s infinite step-end',
			'transform': `scale(-1,1) rotate(${-angle}deg)`,
		})	
	}

	else if (-157.5 < angle && angle <= -112){
		duck.css({
			'animation':'duckFlyRightUp .4s infinite step-end',
			'transform': `scale(-1,1) rotate(${-45-angle}deg)`,
		})	
	}

	else if (-112 < angle && angle <= -68){
		duck.css({
			'animation':'duckFlyRight .4s infinite step-end',
			'transform': `scale(-1,1) rotate(${-angle-90}deg)`,
		})
	}

	else if (-68 < angle && angle <= -22){
		duck.css({
			'animation':'duckFlyRightUp .4s infinite step-end',
			'transform': `scale(-1,1) rotate(${-angle-45}deg)`,
		})	
	}
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////
//////     <===== MES JEUX =====>     //////
///////////////////////////////////////////

$(document).ready(function() {  // Me permet de charger toute la fonction dans coup, je n'est pas trouvé un équivalent en javascript qui fonctionné simplement.

	

	// [FONCTION 7] Me permet de jouer le son de TIR

	function sonDansIntro() {
		sonTir.currentTime = 0;
		sonTir.play();
	}

	
	// [APPEL F7] Me permet de jouer le son de TIR au click de ma souris.

	document.querySelector('.introScreen').onclick = sonDansIntro; 


	var modeDeJeu; 	//  Création de ma variable modeDeJeu pour enregistrer : Solo ou Multijoueur



	// [FONCTION 8] Permet de choisir le mode de jeu et de nottament savoir lequel l'utilisateur souhaite jouer.

	function selectionModeDeJeu (e){
		sonNiveauReussit.pause();
		sonNiveauReussit.currentTime = 0;
		document.querySelector('.introScreen').style.display = "none"; //  Enlève l'écran menuprincipal
		document.querySelector('.gameScreen').style.display = "block"; //  M'affiche l'écran du jeu
		
		var monBoutonClick = e.target //  Ici ev.target me permet de récupérer en gros la div que j'ai clické. Donc le bouton
		console.log(monBoutonClick)

		if(monBoutonClick.classList.contains("singleplayer")) {
			modeDeJeu = 'singleplayer';
		} else {
			modeDeJeu = 'multiplayer';
		}

		console.log('Le mode de jeu est',modeDeJeu); 
		
		nouvellePartie();

	}


	// [APPEL F8] Au clic du mode de jeu celui ci me renvoie donc sa class et donc son mode de jeu (if modeDeJeu = 'singleplayer' ou 'multiplayer')

	document.querySelector('.modeDeJeu').onclick = selectionModeDeJeu;




	// [FONCTION 9] Permet de créer une nouvelle partie (Ouvre le mode jeu + animation chien avant que la partie commence)

	function nouvellePartie(){		
		score = 0;
		musiqueIntro.play();
		
		if (modeDeJeu == 'singleplayer') {
			canardRestant = nombreDeCanard;
			document.querySelector('.scoreBox').textContent = 'Score= \n' + score;
			document.querySelector('.duckStat').style.backgroundColor = 'transparent';
			document.querySelector('.scoreBox2').style.display = 'none';
			document.querySelector('.timer').style.display = 'none';
			document.querySelector('.scoreBox2').style.display ='none';
			document.querySelector('.duckBox').style.display = 'block'
			document.querySelector('.duckStat').style.backgroundColor = 'transparent';          // Ici des grosses modif CSS pour ajuster l'écrans et les infos.
			document.querySelector('.infini').style.display = "none";
			
		} else {
			canardRestant = 9999;
			document.querySelector('.scoreBox').textContent = 'ScoreP1   \n' + score;
			document.querySelector('.scoreBox2').style.display = 'block';
			document.querySelector('.timer').style.display = 'block';
			document.querySelector('.timer').textContent = 'Temps = \n ' ;
			document.querySelector('.scoreBox2').textContent = 'ScoreP2 \n  ' + score;           // Ici des grosses modif CSS pour ajuster l'écrans et les infos.
			document.querySelector('.duckBox').style.display = 'none'
			document.querySelector('.duckStat').style.backgroundColor = 'transparent';
			document.querySelector('.bullet1').style.display = 'block';
			document.querySelector('.bullet2').style.display = 'none';
			document.querySelector('.bullet3').style.display = 'none';
			document.querySelector('.infini').style.display = 'block';


		
		} 


		// ANIMATION : Course du chien gauche vers milieu

		document.querySelector('.chienCourir').style.left = '0px';
		document.querySelector('.chienCourir').style.top = '550px';
		document.querySelector('.chienCourir').style.display = 'block';

		$('.chienCourir').position(); // Me renvoie la position de l'élement .ChienCourir (introuvable en JS pur)
		

		document.querySelector('.chienCourir').style.left = 'calc(50% - 75px)';
		document.querySelector('.chienCourir').style.transition = 'all 5s ease-in-out .1s';
		document.querySelector('.chienCourir').style.animation = 'chienCourir .5s 12 step-end 0s';

		$('.chienCourir').position(); // Me renvoie la position de l'élement .ChienCourir (introuvable en JS pur)

		// ANIMATION : Saut du chien

		$('.chienCourir').one('transitionend', function() {	// .one me permet de réaliser la fonction de la transition une fois par partie j'ai trouvé un équivalent JS avec once = true que je n'est pas réussit à faire fonctionner	
			
			document.querySelector('.chienCourir').classList.add('chienSaute');

			document.querySelector('.chienCourir').style.animation = 'dogJump 1s 1 step-end 0s';
			document.querySelector('.chienCourir').style.top = '450px';
			document.querySelector('.chienCourir').style.transition = 'all .5s cubic-bezier(0.33, 0.33, 0.3, 2.5) .5s';

			$('.chienSaute').one('transitionend', function() {

				sonAboiement.play();
				document.querySelector('.chienCourir').style.display = 'none';
				document.querySelector('.chienCourir').style.transition = 'none';

				musiqueTheme.play();

				if (modeDeJeu == 'singleplayer') {   // du coup ici on lance la partie (fonction) corresponde au mode souhaité.
					gameSolo();
				} else {
					gameMulti();
				}

				$('.chienSaute').off('transitionend');

			});
		})
	}
	

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// [[[[[[[[[[ MODE SOLO ]]]]]]]]]


	function gameSolo(){

		var tirRestant = 3;
		delaiVol = setTimeout(duckVol, 7000);

		// [FONCTION 10] Me redonne les balles dans le chargeur visible à chaque round et initial son de tir

		function ballePerdu(){
			if (tirRestant > 0) {
				sonTir.currentTime = 0;
				sonTir.play();
				tirRestant--;

				if (tirRestant == 2) {
					document.querySelector('.bullet3').style.visibility = "hidden"; //marche pas avec display block/none et je sais pas pourquoi j'ai perdu 1h mdrrr ( fin 24/12/21) joyeux noel 
				} 
				if (tirRestant == 1) {
					document.querySelector('.bullet2').style.visibility = "hidden";
				} 
				if (tirRestant == 0) {
					document.querySelector('.bullet').style.visibility = "hidden";
				} 
			}

		}


		// [APPEL F10]

		document.querySelector('.gameScreen').onclick = ballePerdu;


		// [FONCTION 11] Arriver des canard + son
		
		sonCanardAilesInterval = setInterval(function(){
			sonCanardAiles.currentTime = 0;
			sonCanardAiles.play();
		},250);


		//[APPEL F13] Renvoie un nouveau canard, en gros cela passe à la manche suivante avec le gain des nouvelles balles ect...

		initialisationDuck();

		//starts selected game mode
		soloDuckRebonMur()
		

		// [FONCTION 12] Arriver des canard + son
		duck.on('transitionend', function(event){

			if (event.originalEvent.propertyName == 'left'){ // N'écoute que la transition gauche pour que transitionend ne se déclenche pas 2x
				soloDuckRebonMur();
			}
		})


		// [FONCTION 13] Initialisation des canard avec gain de balle ect..

		function initialisationDuck(){

			document.querySelector('.duck').classList.remove('duckMort');

			// Redonne les balles à chaque 
			if (modeDeJeu == 'singleplayer'){
				tirRestant = 3;
			}  

			// Reaffiche les balles dans mon "chargeur"
			document.querySelector('.bullet1').style.visibility = 'visible';
			document.querySelector('.bullet2').style.visibility = 'visible';
			document.querySelector('.bullet3').style.visibility = 'visible';


			// Donne une position de départ aléatoire au canard (utilisation de Jquery pour cette partie la traduction vers full JS n'est pas facile) je le reutilise en multi sans le random.
			duck.position().left==0 ? duck.css('transform', 'scale(1,1)'):duck.css('transform', 'scale(-1,1)') // Merci google 
			document.querySelector('.duck').style.left = Math.round(Math.random())*(parseInt($('.gameScreen').css('width')) - 90) +'px'; // Merci google = maillage grille et donne une position random sur celle-ci
			document.querySelector('.duck').style.top = Math.floor((parseInt($('.gameScreen').css('height'))-200)*Math.random()) +'px'; // Merci google 

			document.querySelector('.duck').style.transition = 'none';
			document.querySelector('.duck').style.animation = 'none';
			document.querySelector('.duck').style.display = 'block';
			document.querySelector('.duck').style.backgroundPosition = '-320px -300px';

		}		

		// [FONCTION 14] Mouvement du caneton 

		function soloDuckRebonMur(){

			document.querySelector('.duck').style.transition = 'left 2s linear, top 2s linear ';

			var nouvellePosition = {};	
			var anciennePosition = {};
	 		anciennePosition.top = $('.duck').position().top; // Me renvoie la position haut (top)
			anciennePosition.left = $('.duck').position().left; // Me renvoie la position gauche (left) comme des cordonnés finalement



			//Direction aléatoire l'hors du contact au mur gauche

			if (duck.position().left <= 0) {
				nouvellePosition.top = Math.floor((parseInt($('.gameScreen').css('height'))-200)*Math.random());
				nouvellePosition.left = parseInt($('.gameScreen').css('width')) - 90;

				sonCanard.play();
			} 

		 	//Direction aléatoire l'hors du contact au mur droite

			if(parseInt(duck.css('right'))<=0){
				nouvellePosition.top = Math.floor((parseInt($('.gameScreen').css('height'))-200)*Math.random());
				nouvellePosition.left = 0;

				sonCanard.play();			
			}
			

			setTimeout(function(){

				document.querySelector('.duck').style.left = nouvellePosition.left +'px';
				document.querySelector('.duck').style.top = nouvellePosition.top +'px';
			}, 0);		

			//[APPEL F6] duckDirection qui randomise la direction du canard

			duckDirection(angleRandom(anciennePosition,nouvellePosition));
		}
		





		// [FONCTION 15] Ce qui ce passe quand on tir, sur ou non le canard, maj des stats ect... 

		$('.duck').one('click', function(ev){


			var monClick = ev.target // Ou je tir finalement

			if(!monClick.classList.contains('duckMort') && tirRestant > 0) { // ! = ni un True ou False en gros si mon canard n'est pas mort = si canard en vie est présent 

				clearTimeout(tempsDeVol);

				canardRestant--; // A chaque canard tué ou disparu donc mise dans la classe duckMort alors les canardRestant diminue de 1 jusqu'à 0

				score+=1000; // Le score gagné par kill 

				clearInterval(sonCanardAilesInterval);
				
				// Met à jour les stats 

				$('.duckStat').eq(canardRestant).css('background-color', 'green');
				document.querySelector('.scoreBox').textContent = 'Score= \n' + score;

				document.querySelector('.chienAttrape').style.animation = 'none';

				// Meurt sur l'endroit ou on la tué et s'arrête de voler, sans cela le canard ce téléporte autre part et commence son animation 

				document.querySelector('.duck').style.left = $(ev.target).position().left+'px'; // Utilisation logique de Jquery par rapport au début
				document.querySelector('.duck').style.top = $(ev.target).position().top+'px'; // Utilisation logique de Jquery par rapport au début
				document.querySelector('.duck').style.animation = 'none';
				document.querySelector('.duck').style.transform = 'scale(1,1) rotate(0deg';
		
				
				this.classList.add('duckMort'); // Ici le this me permet d'assigner la classe DuckMort à celui que je vien de tué, mais attention mon canard finalement reste le même il respawn d'une certaine façon. Il faut donc bien qu'il disparaisse.

				// Animation de mort du duck que je vien de tuer 

				sonTombe.play();

				$('.duckMort').position();
				document.querySelector('.duck').style.top = '600px';
				document.querySelector('.duck').style.backgroundPosition =  '-320px -580px';
				document.querySelector('.duck').style.animation = 'duckFall .4s infinite step-end .5s';
				document.querySelector('.duck').style.transition = 'top 1.2s cubic-bezier(0.6, -0.28, 0.74, 0.05) 0s';


				// Animation du chien
				$('.duckMort').one('transitionend', function(){	

					sonTombe.pause();
					sonTombe.currentTime = 0;
					sonToucheLeSol.play();
					sonCanardAttraper.play();

					document.querySelector('.chienAttrape').style.display = 'block';
					document.querySelector('.chienAttrape').style.left = $(ev.target).position().left + 'px';
					document.querySelector('.chienAttrape').style.animation = 'chienAttrape 3s 1 ease 0s';
				});
				

				clearTimeout(delaiVol);

			 	// Je vérifie si il reste des canard ou que le jeu s'arrête (GameOver)

			 	$('.chienAttrape').one('animationend', function(){
				 	if (canardRestant > 0) {				 		
						gameSolo(); 
				 	}	

					else  {	
						musiqueTheme.pause();
						musiqueTheme.currentTime = 0;
						sonNiveauReussit.play();

						gameOverSolo();														
					}	
				});	

			}

			
		});

		// [FONCTION 16] Condition de jeu pour le vol du canard 
			
		function duckVol(){

			if (!document.querySelector('.duck').classList.contains('duckMort')) {

				clearTimeout(tempsDeVol); 

				duck.off('transitionend'); 

				canardRestant--;

				document.querySelector('.duck').classList.add('duckMort');
				
				document.querySelector('.duck').style.left = duck.position().left + 'px';
				document.querySelector('.duck').style.top = duck.position().top + 'px';
				document.querySelector('.duck').style.animation = 'none';
				document.querySelector('.duck').style.transform = 'scale(1,1) rotate(0deg)';
				document.querySelector('.duck').style.transition = 'left 2s linear, top 2s linear ';
				
				duck.position();

				// Envole du duck disparait du haut de l'écran 

				document.querySelector('.duck').style.top = '-200px'
				document.querySelector('.duck').style.animation  = 'duckFlyAway .4s infinite step-end 0s';
				
				clearTimeout(delaiVol); 

				// Je vérifie si il reste des canard ou que le jeu s'arrête (GameOver)

		 		$('.duckMort').one('transitionend', function(){	
					
					clearInterval(sonCanardAilesInterval);

		 			sonRire.play();

					document.querySelector('.chienRigole').style.animation = 'chienRigole .5s infinite step-end 0s';
					document.querySelector('.chienRigole').style.top = '461px';
		 				
					// Animation du chien qui ce fou de toi

					$('.chienRigole').one('transitionend', function(){	
						document.querySelector('.chienRigole').style.top = '600px';

						if (canardRestant > 0) {
							gameSolo();
						} else  {		
							musiqueTheme.pause();
							musiqueTheme.currentTime = 0;
							sonNiveauReussit.play();												
							gameOverSolo();				
						}					
					})
				})				
			}
		}
	};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [[[[[[[[[[ MODE MULTIJOUEUR ]]]]]]]]]

	function gameMulti(){
		var tirRestantMulti = 999999; // ou Infinity ? a tester ( fin 27/12/21)
		var temps = 121;
		var scoreDuck = -1; // start point -1 car le temps de l'intro avec le chien on gagne 1 point setTimeout a utiliser surement mieux


		function replay() {
			temps = 121;
			score = 0;
			scoreDuck = -1;
			musiqueTheme.pause();
			musiqueTheme.currentTime = 0;
			sonNiveauReussit.play();
			sonCanardAiles.pause();
			musiqueTheme.play();	
			document.querySelector('.scoreBox').textContent = 'ScoreP1\n ' + score;
			document.querySelector('.scoreBox2').textContent = 'ScoreP2\n ' + scoreDuck;
			clearInterval(myTimerScoreHunt);
			scoreHunt();
			setInterval(scoreHunt, 10000);
		}

		document.querySelector('.pausebutton').onclick = replay; 

		// [FONCTION 17] Le timer qui arrete la game à 0 sec

			function timer() {
				temps--;
				console.log(temps);
				document.querySelector('.timer').textContent = 'Temps = \n ' + temps;
				if (temps <= 0 ) {
					musiqueTheme.pause();
					musiqueTheme.currentTime = 0;
					sonNiveauReussit.play();
					sonCanardAiles.pause();
					gameOverMulti();
					clearInterval(myTimer);
				
				}

						
			}
		
		
		// [APPEL F17] 

		timer();
		var myTimer = setInterval(timer, 1000) // En gros on perd une seconde toute les secondes mdr


		//  [FONCTION 18] Infiny balle + son 

		function balleMulti() {
			if (tirRestantMulti > 0) {
				sonTir.currentTime = 0;
				sonTir.play();		
			}
		}

		// [APPEL F18] 

		document.querySelector('.gameScreen').onclick = balleMulti;



		// [FONCTION 19] Score du joueur P2 = Duck | Augmente de 1 par 10 secondes et s'arrête à 12 pts 
		function scoreHunt() { // le canard fini la partie avec 12 point quoi qu'il arrive 120 secondes / 10 = 12
			
			scoreDuck += 1;
			document.querySelector('.scoreBox2').textContent = 'ScoreP2\n ' + scoreDuck;


			if (scoreDuck == 12 ) {
				clearInterval(myTimerScoreHunt)
			}			
		}
	
		// [APPEL F19]
		scoreHunt();
		var myTimerScoreHunt = setInterval(scoreHunt, 10000); // toute les 10 secondes appel de la fonction

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


		// Donne une position de départ aléatoire au canard (utilisation de Jquery pour cette partie la traduction vers full JS n'est pas facile)

		duck.position().left==0 ? duck.css('transform', 'scale(1,1)'):duck.css('transform', 'scale(-1,1)') // Merci google 
		document.querySelector('.duck').style.left = $('.gameScreen').css('width') - 90 +'px'; // Merci google = maillage grille et donne une position random sur celle-ci
		document.querySelector('.duck').style.top = $('.gameScreen').css('height')-200 +'px'; // Merci google 

		document.querySelector('.duck').style.transition = 'none';
		document.querySelector('.duck').style.animation = 'none';
		document.querySelector('.duck').style.display = 'block';
		document.querySelector('.duck').style.backgroundPosition = '-320px -300px';

		document.querySelector('.duck').display = 'block';
		document.querySelector('.duck').visibility = 'visible';




		// [FONCTION 20] Mouvement du caneton () anim

		function multiDuckRebonMur(){

			var nouvellePosition = {};	
			var anciennePosition = {};
	 		anciennePosition.top = $('.duck').position().top; // Me renvoie la position haut (top)
			anciennePosition.left = $('.duck').position().left; // Me renvoie la position gauche (left) comme des cordonnés finalement



			if (duck.position().left <= 0) {
				nouvellePosition.top = Math.floor((parseInt($('.gameScreen').css('height'))-200)*Math.random());
				nouvellePosition.left = parseInt($('.gameScreen').css('width')) - 90;

				sonCanard.play();
			} 


			if(parseInt(duck.css('right'))<=0){
				nouvellePosition.top = Math.floor((parseInt($('.gameScreen').css('height'))-200)*Math.random());
				nouvellePosition.left = 0;

				sonCanard.play();			
			}
		
			duckDirection(angleRandom(anciennePosition,nouvellePosition)); // useless en soit mais me pause soucis si je l'enlève pour l'anim de loiseau
		}



		// [APPEL F20] 
		multiDuckRebonMur()



		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		// [FONCTION 21] Remet à zéro les touches dites préssé, donc tous au non préssé (False) = Initialisation finalement

		function resetKeyPressed() {
			currentKeyPressed.up = false,
			currentKeyPressed.down = false,
			currentKeyPressed.left = false,
			currentKeyPressed.right = false
		};


		

		// Input des touches directionnel et ZQSD pour l'état TRUE = ENFONCER 

		window.addEventListener("keydown", function(e) {
			if (e.code === "ArrowDown" || e.code === "KeyS"){
			currentKeyPressed.down = true
			} else if (e.code === "ArrowUp" || e.code === "KeyW" ) {
			currentKeyPressed.up = true
			} else if (e.code === "ArrowLeft" || e.code === "KeyA"){
			currentKeyPressed.left = true
			} else if (e.code === "ArrowRight" || e.code === "KeyD"){
			currentKeyPressed.right = true
		}});
		
		// Input des touches directionnel et ZQSD pour l'état FALSE = RELACHER

		window.addEventListener("keyup", function(e) {
			if (e.code === "ArrowDown" || e.code === "KeyS"){
			currentKeyPressed.down = false
			} if (e.code === "ArrowUp" || e.code === "KeyW"){
			currentKeyPressed.up = false
			} if (e.code === "ArrowLeft" || e.code === "KeyA"){
			currentKeyPressed.left = false
			} if (e.code === "ArrowRight" || e.code === "KeyD"){
			currentKeyPressed.right = false
		}});
		
		// Intervalle concernant le rafraichissement des touches 

		setInterval(() => {
			if (currentKeyPressed.up) {
			duckPosition(0,-8.7)
			} else if (currentKeyPressed.down) {
			duckPosition(0,8.7)
			} if (currentKeyPressed.right) {
			duckPosition(8.7,0)
			} else if (currentKeyPressed.left) {
			duckPosition(-8.7,0)
			}
		}, 8);


		// [APPEL F21]
		resetKeyPressed()


		// [FONCTION 22] Directive pour le déplacement/positionnement du canard

		function duckPosition(x, y) {
			duckLocation.x += x // la position du canard sur l'axeX
			duckLocation.y += y // la position du canard sur l'axeY
		 
		 
				// Conditions de sortie de l'écran de jeux .gameScreen (Attention il y a des marges sur mon screen donc obligé de réadapter les valeurs manuellement)

				if (duckLocation.x > 1200) {
				duckLocation.x = 1200
				} if (duckLocation.x < 0) {
				duckLocation.x = 0
				} if (duckLocation.y > 769) {
				duckLocation.y = 769
				} if (duckLocation.y < 0) {
				duckLocation.y = 0
				} if (x<0) {    
				document.querySelector('.duck').style.transform = 'translate('+duckLocation.x+'px,'+duckLocation.y+'px) scaleX(-1)' // scaleX(-1) = retourne le canard
				} else {
					document.querySelector('.duck').style.transform = 'translate('+duckLocation.x+'px,'+duckLocation.y+'px)' // On utilise une fonction CSS qui permet de changer l'emplacement du canard sur l'axeX et l'axeY 
		}};
		 
		// [FONCTION 23] Gestion des point pour le joueur P1, si il touche le canard alors +1 pts

		function duckHit() {
			score += 1;
		 	document.querySelector('.scoreBox').textContent = 'ScoreP1\n ' + score;
		}

		// [APPEL F23]
		document.querySelector('.duck').addEventListener('mousedown', () => duckHit())
		
	}
});
