const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')
const audioElement = document.querySelector(`audio[data-sound]`);

let countdown;

function timer(seconds) {
    timerDisplay.classList.remove('alert')
    audioElement.pause()
    audioElement.currentTime = 0

    clearInterval(countdown)

    //now is in ms
    const now = Date.now()
    const then = now + seconds * 1000;
    
    // to run immd., as setinterval takes 1 s to start
    displayTimeLeft(seconds)
    displayEndTime(then)
    
    countdown = setInterval(() => {
        // console.log({now,then})
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if(secondsLeft < 0) {
            clearInterval(countdown)
            
            audioElement.loop = true
            audioElement.play()
            timerDisplay.classList.add('alert')
            
            return
        }
        
        displayTimeLeft(secondsLeft)

    }, 1000);
    
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60)
    const remainderSeconds = seconds % 60

    const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display
    
    document.title = display
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours()
    const minutes = end.getMinutes()

    const adjustedHour = hour > 12 ? hour - 12 : hour

    endTime.textContent = `Be back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds)
}

buttons.forEach(button => button.addEventListener('click',startTimer))

// diff way to select a form, by its className directly
document.customForm.addEventListener('submit',function(e) {
    e.preventDefault();
    // get the input box value
    const mins = this.minutes.value;
    timer(mins * 60)
    
    this.reset()
})

