const player = document.querySelector('.player')
const video = document.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const toggleScreen = player.querySelector('.toggle_screen')
const skipBtns = player.querySelectorAll('[data-skip')
const ranges = player.querySelectorAll('.player__slider')


function togglePlay(){
    video.paused ? video.play() : video.pause()
}

//separate func bcoz if played/paused by other means
function updateBtn(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon
}

function handleToggleScreen(){
    if(player.classList.contains("fullscreen"))
    {
        player.classList.remove('fullscreen')
        toggleScreen.innerHTML =' &#x26F6;';
    }
    else
    {
        player.classList.add("fullscreen")
        toggleScreen.innerHTML =' &#x2BCF';
    }
}

function skip(e){
    const val = this.dataset.skip
    video.currentTime += parseFloat(val)
}

function handleRangeUpdate(){
    const videoProperty = this.name
    video[videoProperty] = this.value
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}

function moveToTime(e){
    const cutTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = cutTime
}

video.addEventListener('click',togglePlay)
video.addEventListener('play',updateBtn)
video.addEventListener('pause',updateBtn)
video.addEventListener('timeupdate',handleProgress)
toggle.addEventListener('click',togglePlay)
toggleScreen.addEventListener('click',handleToggleScreen)
skipBtns.forEach(btn => btn.addEventListener('click',skip))
ranges.forEach(range => range.addEventListener('change',handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove',handleRangeUpdate))
progress.addEventListener('click',moveToTime)

let mousedown = false
progress.addEventListener('mousemove',(e) => mousedown && moveToTime(e))
progress.addEventListener('mousedown',() => mousedown = true)
progress.addEventListener('mouseup',() => mousedown = false)

window.addEventListener('keydown', (e) => (e.code === "KeyF") && handleToggleScreen())
window.addEventListener('keydown', (e) => (e.code === "Space") && togglePlay())