const userOptions = document.querySelectorAll('#userOptions button')
const resultDisplay = document.querySelector('#result span')

let userChoise
let computerChoise
let result

userOptions.forEach(button => button.addEventListener('click', (e) => {
    userChoise = e.currentTarget.id
    computerChoise = generateComputerChoise()
    result = getResult()

    showCard(computerChoise)
    resultDisplay.textContent = result
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

function getResult() {
    let result
    if (userChoise === computerChoise) {
        result = 'Empate'
    } else if ((userChoise == 'piedra' && computerChoise == 'tijera') ||
               (userChoise == 'papel' && computerChoise == 'piedra') ||
               (userChoise == 'tijera' && computerChoise == 'papel'))
    {
        result = 'Ganaste'
    } else {
        result = 'Perdiste'
    }

    return result
}

function showCard(card) {
	let piedra = document.querySelector('.computerCard.piedra')
	let papel = document.querySelector('.computerCard.papel')
	let tijera = document.querySelector('.computerCard.tijera')

	switch (card) {
		case 'piedra':
			piedra.classList.add('show')
			papel.classList.remove('show')
			tijera.classList.remove('show')
			break;
		case 'papel':
			piedra.classList.remove('show')
			papel.classList.add('show')
			tijera.classList.remove('show')
			break;
		case 'tijera':
			piedra.classList.remove('show')
			papel.classList.remove('show')
			tijera.classList.add('show')
			break;
		default:
			break;
	}
}