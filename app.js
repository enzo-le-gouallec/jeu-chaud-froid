// Elements du DOM
const divVies = document.querySelector('.vies');
const message = document.getElementById('message');
const formulaire = document.getElementById('inputBox');
const input = document.getElementById('number');
const esseyerBtn = document.getElementById('esseyerBtn');
const rejouerBtn = document.getElementById('rejouer');
const body = document.getElementsByTagName('body')[0];

//modèle de coeur
const coeurVide ='<ion-icon name="heart-outline"></ion-icon>';
const coeurPlein = '<ion-icon name="heart"></ion-icon>';

// Fond
const bgFroid = 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)';
const bgTiede = 'linear-gradient(to right, #f83600 0%, #f9d423 100%)';
const bgChaud = 'linear-gradient(-60deg, #ff5858 0%, #f09819 100%)';
const bgBrulant = 'linear-gradient(-225deg, #AC32E4 0%, #7918F2 48%, #4801FF 100%)';

const bgWin = 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)';
const bgLoose = 'linear-gradient(to right, #434343 0%, black 100%)';

// PLAY :
const play =() => {

	//nombre aléatoire
	const randomNumber = Math.floor(Math.random() * 101)
	const totalVies = 6;
	let vies = totalVies;
	console.log(randomNumber);

	//Actualisation à chaque essaie - toute la logique
	formulaire.addEventListener('submit', (e) => {
		e.preventDefault();
		const valeurInput = parseInt(input.value);

		if(valeurInput < 0 || valeurInput > 100) return;

		if (valeurInput === randomNumber){
			body.style.backgroundImage = bgWin;
			message.textContent = `BRAVO !!! Le nombre était bien ${randomNumber}`;
			rejouerBtn.style.display = "block"
		}

		if(valeurInput !== randomNumber) {
			if(randomNumber < valeurInput + 3 && randomNumber >  valeurInput - 3){
				body.style.backgroundImage = bgBrulant;
				message.textContent = "c'est brûlant !!! 🔥🔥🔥 ";
			} else if (randomNumber < valeurInput + 6 && randomNumber >  valeurInput - 6){
				body.style.backgroundImage = bgChaud;
				message.textContent = "c'est chaud ! 🔥 ";
			} else if (randomNumber < valeurInput + 11 && randomNumber >  valeurInput - 11){
				body.style.backgroundImage = bgTiede;
				message.textContent = "c'est tiède 😐 ";
			} else{
				body.style.backgroundImage = bgFroid;
				message.textContent = "c'est Froid ! ❄️ ";
			}
			vies--;
			verifyloose();
		}
	
		actualiseCoeurs(vies);


	})

	const verifyloose = () => {
		if(vies === 0) {
		body.style.backgroundImage = bgLoose;
		body.style.color = '#990000';
		esseyerBtn.setAttribute("disabled", "");
		message.textContent = `Vous avez perdu. la reponse était ${randomNumber}`;
		rejouerBtn.style.display = "block";
	}
}

const actualiseCoeurs = (vies) => {
	divVies.innerHTML = "";
	let tableauDeVies = [];
	for(let i = 0; i < vies; i++){
		tableauDeVies.push(coeurPlein);
	}
	for(let i = 0; i < totalVies - vies; i++){
		tableauDeVies.push(coeurVide);
	}
	tableauDeVies.forEach(coeur => {
		divVies.innerHTML += coeur;
	})
	}
	actualiseCoeurs(vies);

	rejouerBtn.addEventListener('click', () => {
		message.style.display = 'none';
		document.location.reload(true);
	})

}

play();