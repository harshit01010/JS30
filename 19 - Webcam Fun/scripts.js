const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(camera_stream => {
            // video.src = window.URL.createObjectURL(camera_stream);
            video.srcObject = camera_stream;
            video.play()
        })
        .catch(err => {
            console.log('Access Denied',err)
        })
}

function VideoToCanvas() {
    //video's W & H
    const width = video.videoWidth    
    const height = video.videoHeight    

    //setting canvas's W&H to that of video
    canvas.width = width
    canvas.height = height

    //take img from webcam and put into canvas
    return setInterval(() => {
        ctx.drawImage(video,0,0,width,height)

        //array of numbers representing rgba values in continuous manner
        let pixels = ctx.getImageData(0,0,width,height)

        ctx.globalAlpha = 0.5
        // pixels = redEffect(pixels)

        pixels = rgbSplit(pixels)
        
        // pixels = greenScreen(pixels)
        
        ctx.putImageData(pixels,0,0)

    }, 18);

}

function takePhoto() {
    snap.currentTime = 0;
    snap.play()

    const data = canvas.toDataURL('image/jpeg')

    const link = document.createElement('a')
    link.href = data
    link.setAttribute('download','your_image')
    link.innerHTML = `<img src="${data}" alt="your_image">`
    strip.insertBefore(link, strip.firstChild)

}

function redEffect(pixels) {
    for(let i=0 ; i < pixels.data.length ; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100 //RED
        pixels.data[i + 1] = pixels.data[i + 1] - 50 //GREEN
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5 //BLUE
    }
    return pixels
}

function rgbSplit(pixels) {
    for(let i=0 ; i < pixels.data.length ; i += 4) {
        pixels.data[i - 350] = pixels.data[i + 0]  //RED
        pixels.data[i + 300] = pixels.data[i + 1]  //GREEN
        pixels.data[i - 350] = pixels.data[i + 2] //BLUE
    }
    return pixels
}

function greenScreen(pixels) {
  const levels = {};

  //all sliders
  document.querySelectorAll('.rgb input').forEach((input) => {
      levels[input.name] = input.value;
    });
    
  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      // this is alpha pixel
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

getVideo()

//when video plays from webcam,it emit this event
video.addEventListener('canplay',VideoToCanvas)