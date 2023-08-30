const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const start = document.querySelector('.start');
const diff = document.querySelector('select')

let lastHole;
let timeUp = false
let score = 0;
let maxTime = 200
let minTime = 1500;

function randomTime(min,max) {
    const randomFraction = Math.random();
    const range = max - min;
    const scaledValue = randomFraction * range;
    const randomTimeValue = scaledValue + min;
    
    return Math.round(randomTimeValue);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx]

    if(hole === lastHole){
        // if same hole returned
        return randomHole(holes)
    }

    lastHole = hole

    return hole
}

function difficulty() {
    const diffvalue = diff.value

    if(diffvalue === 'easy')
    {
        minTime = 200;
        maxTime = 2000;
    }
    else if(diffvalue === 'medium')
    {
        minTime = 200;
        maxTime = 1500;
    }
    else
    {
        minTime = 100;
        maxTime = 800;
    }
}

function peep() {

    const time = randomTime(minTime,maxTime)
    const hole = randomHole(holes)
    
    hole.classList.add('up')

    setTimeout(()=>{

        hole.classList.remove('up')
        
        if(!timeUp) peep();

    },time)
}

function startgame() {
    scoreBoard.textContent = 0
    timeUp = false
    score = 0
    difficulty()
    peep()
    setTimeout(() => timeUp = true , 10000)
}

function bonk(e) {
    // if someone did 'fake' click (other than mouse-click)
    if(!e.isTrusted) return;

    if(this.parentNode.classList.contains('up'))
        score++;
    
    this.parentNode.classList.remove('up')
    scoreBoard.textContent = score
}

start.addEventListener('click',startgame)
moles.forEach(mole => mole.addEventListener('click',bonk))
diff.addEventListener('change',difficulty)