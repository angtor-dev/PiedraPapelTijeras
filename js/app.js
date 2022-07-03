// Elementos
const userOptions = document.querySelectorAll('#userOptions button')
const resultDisplay = document.querySelector('#result span')
const winDisplay = document.getElementById('v')
const drawDisplay = document.getElementById('e')
const loseDisplay = document.getElementById('d')

// Variables
var wins = 0
var draws = 0
var loses = 0

// Inicializar
updateScore()

// Al pulsar una carta
userOptions.forEach(card => card.addEventListener('click', (e) => {
    let userChoise = e.currentTarget.id
    let computerChoise = generateComputerChoise()
    let result = getResult(userChoise, computerChoise)

    showCard(computerChoise)
    showResult(result)
}))

function generateComputerChoise() {
    let choise
    const randNumber = Math.ceil(Math.random() * 3) //retorna numero entre 1 y 3

    switch (randNumber) {
        case 1:
            choise = 'piedra'
            break;
        case 2:
            choise = 'papel'
            break;
        case 3:
            choise = 'tijera'
            break;
        default:
            break;
    }
    
    return choise
}

function getResult(userChoise, computerChoise) {
    let result
    if (userChoise === computerChoise) {
        result = 'Empate'
        draws++
    } else if ((userChoise == 'piedra' && computerChoise == 'tijera') ||
               (userChoise == 'papel' && computerChoise == 'piedra') ||
               (userChoise == 'tijera' && computerChoise == 'papel'))
    {
        result = 'Victoria'
        wins++
    } else {
        result = 'Derrota'
        loses++
    }
    updateScore()

    return result
}

function showCard(computerChoise) {
	const card = document.querySelector('.computerCard')
	const cardTitle = document.querySelector('.computerCard .card-title')
	const piedra = document.querySelector('.computerCard .piedra')
	const papel = document.querySelector('.computerCard .papel')
	const tijera = document.querySelector('.computerCard .tijera')

	//Inicia animación
	card.classList.remove('rotate3d')
	setTimeout(() => card.classList.add('rotate3d'), 1)

	//Cambia la carta a mitad de animación
	setTimeout(function() {
		switch (computerChoise) {
			case 'piedra':
				cardTitle.textContent = "Piedra"
				piedra.classList.add('show')
				papel.classList.remove('show')
				tijera.classList.remove('show')
				break;
			case 'papel':
				cardTitle.textContent = "Papel"
				piedra.classList.remove('show')
				papel.classList.add('show')
				tijera.classList.remove('show')
				break;
			case 'tijera':
				cardTitle.textContent = "Tijeras"
				piedra.classList.remove('show')
				papel.classList.remove('show')
				tijera.classList.add('show')
				break;
			default:
				break;
		}
	}, 250)
}

function showResult(result) {
	//Inicia animación
	resultDisplay.classList.remove('fadeout')
	setTimeout(() => resultDisplay.classList.add('fadeout'), 1)
	
	//cambia el resultado a mitad de la animación
	setTimeout(() => resultDisplay.textContent = result, 250)
}

function updateScore() {	
	winDisplay.textContent = wins
	drawDisplay.textContent = draws
	loseDisplay.textContent = loses
}