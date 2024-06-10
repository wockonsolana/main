const characters = [
    ['assets/wock1-1.webp', 'assets/wock1-2.webp', 'assets/wock1-3.webp', 'assets/wock1-4.webp', 'assets/wock1-5.webp'],
    ['assets/wock2-1.webp', 'assets/wock2-2.webp', 'assets/wock2-3.webp', 'assets/wock2-4.webp', 'assets/wock2-5.webp'],
    ['assets/wock3-1.webp', 'assets/wock3-2.webp', 'assets/wock3-3.webp', 'assets/wock3-4.webp', 'assets/wock3-5.webp'],
    ['assets/wock4-1.webp', 'assets/wock4-2.webp', 'assets/wock4-3.webp', 'assets/wock4-4.webp', 'assets/wock4-5.webp'],
    ['assets/wock5-1.webp', 'assets/wock5-2.webp', 'assets/wock5-3.webp', 'assets/wock5-4.webp', 'assets/wock5-5.webp'],
    ['assets/wock6-1.webp', 'assets/wock6-2.webp', 'assets/wock6-3.webp', 'assets/wock6-4.webp', 'assets/wock6-5.webp'],
    ['assets/wock7-1.webp', 'assets/wock7-2.webp', 'assets/wock7-3.webp', 'assets/wock7-4.webp', 'assets/wock7-5.webp'],
    ['assets/wock8-1.webp', 'assets/wock8-2.webp', 'assets/wock8-3.webp', 'assets/wock8-4.webp', 'assets/wock8-5.webp'],
    ['assets/wock9-1.webp', 'assets/wock9-2.webp', 'assets/wock9-3.webp', 'assets/wock9-4.webp', 'assets/wock9-5.webp'],
    ['assets/wock10-1.webp', 'assets/wock10-2.webp', 'assets/wock10-3.webp', 'assets/wock10-4.webp', 'assets/wock10-5.webp']
];

const unlockThresholds = [0, 10, 100, 500, 1000, 2000, 3500, 10000, 15000, 100000];

let currentCharacter = 0;
let clickCount = 0;
let oreState = 1;
let resetCount = 0;
let score = 0;
let happiness = 0;
const maxHappiness = 100;
const happinessIncrement = 5;
const unlockedCharacters = new Array(characters.length).fill(false);
unlockedCharacters[0] = true;

document.addEventListener('DOMContentLoaded', () => {
    const ore = document.getElementById('ore');
    ore.addEventListener('click', mineOre);
    loadProgress();
    updateOreSprite();
    updateScoreDisplay();
    updateHappinessBar();
    updateCharacterUnlockDisplay();
});

function preloadImages(imagePaths) {
    imagePaths.forEach(path => {
        const img = new Image();
        img.src = path;
    });
}

preloadImages([
    ...characters.flat(),
    'assets/click-effect.wav', 
    'assets/next-effect.wav'
]);

function mineOre(event) {
    clickCount++;
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    if (clickCount % 10 === 0) {
        score += 60;
        oreState = 1;
        createLargeParticleEffect(mouseX, mouseY);
        ore.classList.add('shake');
        setTimeout(() => ore.classList.remove('shake'), 150);
        happiness = 0;
        document.getElementById('nextSound').play();
        resetCount++;
        checkForNewCharacter();
    } else {
        if (clickCount % 2 === 0) {
            score += 10;
            oreState = (oreState % 5) + 1;
        }
        document.getElementById('clickSound').play();
    }

    updateOreSprite();
    updateScoreDisplay();
    createParticleEffect(mouseX, mouseY);
    incrementHappiness();
    saveProgress();
}

function checkForNewCharacter() {
    for (let i = currentCharacter + 1; i < unlockThresholds.length; i++) {
        if (resetCount >= unlockThresholds[i] && !unlockedCharacters[i]) {
            unlockedCharacters[i] = true;
            currentCharacter = i;
            oreState = 1;
            updateOreSprite();
            alert(`You unlocked character ${i + 1}!`);
            updateCharacterUnlockDisplay();
            break;
        }
    }
}

function updateOreSprite() {
    const ore = document.getElementById('ore');
    ore.style.backgroundImage = `url('${characters[currentCharacter][oreState - 1]}')`;
}

function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = `Score: ${score}`;
}

function incrementHappiness() {
    happiness = Math.min(maxHappiness, happiness + happinessIncrement);
    updateHappinessBar();
}

function updateHappinessBar() {
    const happinessBar = document.getElementById('happinessBar');
    happinessBar.style.width = `${happiness}%`;
}

function createParticleEffect(x, y) {
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particles');
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.setProperty('--random-x', `${Math.random() * 100 - 50}px`);
        particle.style.setProperty('--random-y', `${Math.random() * 100 - 50}px`);
        document.body.appendChild(particle);
        particle.addEventListener('animationend', () => document.body.removeChild(particle));
    }
}

function createLargeParticleEffect(x, y) {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.classList.add('large-particles');
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.setProperty('--random-x', `${Math.random() * 200 - 100}px`);
        particle.style.setProperty('--random-y', `${Math.random() * 200 - 100}px`);
        document.body.appendChild(particle);
        particle.addEventListener('animationend', () => document.body.removeChild(particle));
    }
}

function setupMuteButton() {
    let isMuted = false;
    const muteButton = document.getElementById('mute-button');
    const clickSound = document.getElementById('clickSound');
    const nextSound = document.getElementById('nextSound');

    muteButton.addEventListener('click', () => {
        isMuted = !isMuted;
        clickSound.volume = isMuted ? 0 : 1;
        nextSound.volume = isMuted ? 0 : 1;
        muteButton.textContent = isMuted ? 'Unmute' : 'Mute';
    });
}

setupMuteButton();

function saveProgress() {
    const progress = {
        score,
        happiness,
        currentCharacter,
        resetCount,
        unlockedCharacters
    };
    localStorage.setItem('progress', JSON.stringify(progress));
}

function loadProgress() {
    const savedProgress = localStorage.getItem('progress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        score = progress.score;
        happiness = progress.happiness;
        currentCharacter = progress.currentCharacter;
        resetCount = progress.resetCount;
        for (let i = 0; i < progress.unlockedCharacters.length; i++) {
            unlockedCharacters[i] = progress.unlockedCharacters[i];
        }
        updateOreSprite();
        updateScoreDisplay();
        updateHappinessBar();
        updateCharacterUnlockDisplay();
    }
}

function updateCharacterUnlockDisplay() {
    const unlockedCount = unlockedCharacters.filter(Boolean).length;
    const characterUnlockDisplay = document.getElementById('character-unlock-display');
    characterUnlockDisplay.textContent = `Characters Unlocked: ${unlockedCount}/10`;
}
