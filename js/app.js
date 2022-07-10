// Elementos
const userOptions = document.querySelectorAll('#userOptions button')
const resultDisplay = document.querySelector('#result span')
const winDisplay = document.getElementById('v')
const drawDisplay = document.getElementById('e')
const loseDisplay = document.getElementById('d')
const menuWrapper = document.querySelector('.menu-wrapper')
const submenus = document.querySelectorAll('.submenu')
const submenuButtons = document.querySelectorAll('.btn.btn-menu.sub')
const backButtons = document.querySelectorAll('.btn.volver')

// Variables
var result = "" //guarda el ultimo resultado de la partida

const Estadisticas = {
	get partidas() {return this.victorias + this.empates + this.derrotas},
	victorias: 0,
	empates: 0,
	derrotas: 0,
	rachaVic: 0,
	rachaVicMax: 0
}

// Inicializar
updateScore()
menuWrapper.addEventListener('click', closeMenu)
document.getElementById('btn-menu').addEventListener('click', openMenu)
document.querySelector('.btn.btn-menu.cerrar').addEventListener('click', closeMenu)
document.getElementById('main-menu').addEventListener('click', (e) => e.stopPropagation())
submenus.forEach(submenu => submenu.addEventListener('click', (e) => e.stopPropagation())) // Detener propagacion en los submenus
backButtons.forEach(button => button.addEventListener('click', closeSubmenu))
submenuButtons.forEach(button => button.addEventListener('click', openSubmenu))

	// Al pulsar una carta
userOptions.forEach(card => card.addEventListener('click', (e) => {
    let userChoise = e.currentTarget.id
    let computerChoise = generateComputerChoise()
    result = getResult(userChoise, computerChoise)

    showCard(computerChoise)
    showResult(result)
    updateStats()
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
    let r
    if (userChoise === computerChoise) {
        r = 'Empate'
        Estadisticas.empates++
        Estadisticas.rachaVic = 0
    } else if ((userChoise == 'piedra' && computerChoise == 'tijera') || (userChoise == 'papel' && computerChoise == 'piedra') || (userChoise == 'tijera' && computerChoise == 'papel')) {
        r = 'Victoria'
        if (result == r) {
        	Estadisticas.rachaVic++
        	if (Estadisticas.rachaVic > Estadisticas.rachaVicMax) {
        		Estadisticas.rachaVicMax = Estadisticas.rachaVic
        	}
        } else {
        	Estadisticas.rachaVic = 1
        }
        Estadisticas.victorias++
    } else {
        r = 'Derrota'
        Estadisticas.derrotas++
        Estadisticas.rachaVic = 0
    }
    updateScore()

    return r
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
	winDisplay.textContent = Estadisticas.victorias
	drawDisplay.textContent = Estadisticas.empates
	loseDisplay.textContent = Estadisticas.derrotas
}

function openMenu() {
	menuWrapper.classList.add('d-block')
	setTimeout(function() {
		menuWrapper.classList.add('open')
	}, 1);
}

function closeMenu() {
	// Primero cierra los submenus abiertos
	const openSubmenus = document.querySelectorAll('.submenu.open')
	openSubmenus.forEach(submenu => submenu.classList.remove('open'))
	// Cierra el menu principal
	menuWrapper.classList.remove('open')
	// Elimina el bloque al terminar la animación
	setTimeout(function() {
		menuWrapper.classList.remove('d-block')
	}, 300);
}

function openSubmenu() {
	let id = this.dataset.id
	const submenu = document.getElementById(id)
	submenu.classList.add('open')
}

function closeSubmenu() {
	const submenu = this.parentNode
	submenu.classList.remove('open')
}

function updateStats() {
	for (estadistica in Estadisticas) {
		document.getElementById('std-'+estadistica).textContent = Estadisticas[estadistica];
	}
}