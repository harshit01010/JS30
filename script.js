const exercises = document.querySelector('.all-exercises-wrapper')
 
 const listexercises = [
    '01 - JavaScript Drum Kit',
    '02 - JS and CSS Clock',
    '03 - CSS Variables',
    '04 - Array Cardio Day 1',
    '05 - Flex Panel Gallery',
    '06 - Type Ahead',
    '07 - Array Cardio Day 2',
    '08 - Fun with HTML5 Canvas',
    '09 - Dev Tools Domination',
    '10 - Hold Shift and Check Checkboxes',
    '11 - Custom Video Player',
    '12 - Key Sequence Detection',
    '13 - Slide in on Scroll',
    '14 - JavaScript References VS Copying',
    '15 - LocalStorage',
    '16 - Mouse Move Shadow',
    '17 - Sort Without Articles',
    '18 - Adding Up Times with Reduce',
    '19 - Webcam Fun',
    '20 - Speech Detection',
    '21 - Geolocation',
    '22 - Follow Along Link Highlighter',
    '23 - Speech Synthesis',
    '24 - Sticky Nav',
    '25 - Event Capture, Propagation, Bubbling and Once',
    '26 - Stripe Follow Along Nav',
    '27 - Click and Drag',
    '28 - Video Speed Controller',
    '29 - Countdown Timer',
    '30 - Whack A Mole',
]


listexercises.forEach((exerciseTitle, index) => {
    const exerciseTitleNumber = exerciseTitle.split('-')[0].trim()
    const exerciseTitleName = exerciseTitle.split('-')[1].trim()
    
    const exerciseWrapper = document.createElement('div');
    exerciseWrapper.classList.add('exercise-wrapper');

    const exerciseImage = document.createElement('div');
    exerciseImage.classList.add('exercise-image');
    exerciseImage.style.backgroundImage  = `url("./assets/${exerciseTitleNumber}.png")`

    const exerciseTitleElement = document.createElement('div');
    exerciseTitleElement.classList.add('exercise-title');
    exerciseTitleElement.textContent = exerciseTitleName;

    const exerciseLinks = document.createElement('div');
    exerciseLinks.classList.add('exercise-links');

    const demoLinkWrapper = document.createElement('div');
    demoLinkWrapper.classList.add('exercise-link-demo');

    const demoImage = document.createElement('img');
    demoImage.src = './assets/preview.png';
    demoImage.alt = 'Preview Image';

    const demoLink = document.createElement('a');
    demoLink.setAttribute("target","_blank")
    demoLink.href = `https://harshit01010.github.io/JS30/${exerciseTitle}/index.html`;
    demoLink.textContent = 'Preview';

    const githubLinkWrapper = document.createElement('div');
    githubLinkWrapper.classList.add('exercise-link-github');

    const githubImage = document.createElement('img');
    githubImage.src = './assets/github.png';
    githubImage.alt = 'GitHub Image';

    const githubLink = document.createElement('a');
    githubLink.setAttribute("target","_blank")
    githubLink.href = `https://github.com/harshit01010/JS30/tree/main/${exerciseTitle}`;
    githubLink.textContent = 'Github';

    demoLinkWrapper.appendChild(demoImage);
    demoLinkWrapper.appendChild(demoLink);

    githubLinkWrapper.appendChild(githubImage);
    githubLinkWrapper.appendChild(githubLink);

    exerciseLinks.appendChild(demoLinkWrapper);
    exerciseLinks.appendChild(githubLinkWrapper);

    exerciseWrapper.appendChild(exerciseImage);
    exerciseWrapper.appendChild(exerciseTitleElement);
    exerciseWrapper.appendChild(exerciseLinks);

    exercises.appendChild(exerciseWrapper);
})
