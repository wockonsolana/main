function preloadImages(imagePaths) {
    imagePaths.forEach((path) => {
        const img = new Image();
        img.src = path;
    });
}

// Call this function with the paths of the images you want to preload
preloadImages([
    'assets/wock1-1.webp',
    'assets/wock1-2.webp',
    'assets/wock1-3.webp',
    'assets/wock1-4.webp',
    'assets/wock1-5.webp',
]);

let score = 0;
let clickCount = 0;
let oreState = 1; // Initial ore state
const maxHappiness = 100;
const happinessIncrement = 10;
let happiness = 0;

const ore = document.getElementById('ore');
const scoreDisplay = document.getElementById('score');
const happinessBar = document.getElementById('happiness-bar');
const clickSound = new Audio('clickSound');
const nextSound = new Audio('nextSound');

document.addEventListener('DOMContentLoaded', () => {
    updateOreSprite(); // Initialize the ore image when the page loads
    updateScoreDisplay(); // Initialize the score display
    updateHappinessBar(); // Initialize the happiness bar
});

ore.addEventListener('click', mineOre);

function mineOre(event) {
    clickCount++;
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    if (clickCount % 10 === 0) {
        score += 60; // Add 60 points when the rock breaks (every 10 clicks)
        oreState = 1; // Reset to initial state
        updateOreSprite();
        createLargeParticleEffect(mouseX, mouseY); // Add larger particle effect when rocks break

        // Add shake effect on the 10th click
        ore.classList.add('shake');
        setTimeout(() => {
            ore.classList.remove('shake');
        }, 150);

        // Reset happiness after the first click cycle is complete
        happiness = 0;
        nextSound.play(); // Play sound effect for breaking the rock
    } else {
        if (clickCount % 2 === 0) {
            score += 10; // Add 10 points every 2 clicks
            oreState = (oreState % 5) + 1; // Cycle ore states from 1 to 5
            updateOreSprite();
        }
        clickSound.play(); // Play sound effect for each click
    }

    updateScoreDisplay();
    createParticleEffect(mouseX, mouseY); // Add particle effect on each click
    incrementHappiness();
}

function updateOreSprite() {
    ore.style.backgroundImage = `url('assets/wock1-${oreState}.webp')`;
}

function updateScoreDisplay() {
    scoreDisplay.textContent = `Score: ${score}`;
}

function incrementHappiness() {
    happiness = Math.min(maxHappiness, happiness + happinessIncrement);
    updateHappinessBar();
}

function updateHappinessBar() {
    happinessBar.style.width = `${happiness}%`;
}

function createParticleEffect(x, y) {
    for (let i = 0; i < 10; i++) { // Create multiple small particles for more effect
        const particles = document.createElement('div');
        particles.classList.add('particles');
        particles.style.left = `${x}px`;
        particles.style.top = `${y}px`;

        // Add randomness to the particle movement
        particles.style.setProperty('--random-x', `${Math.random() * 100 - 50}px`);
        particles.style.setProperty('--random-y', `${Math.random() * 100 - 50}px`);

        document.body.appendChild(particles);
        particles.addEventListener('animationend', () => {
            document.body.removeChild(particles);
        });
    }
}

function createLargeParticleEffect(x, y) {
    for (let i = 0; i < 5; i++) { // Create multiple larger particles for more effect
        const particles = document.createElement('div');
        particles.classList.add('large-particles');
        particles.style.left = `${x}px`;
        particles.style.top = `${y}px`;

        // Add randomness to the large particle movement
        particles.style.setProperty('--random-x', `${Math.random() * 200 - 100}px`);
        particles.style.setProperty('--random-y', `${Math.random() * 200 - 100}px`);

        document.body.appendChild(particles);
        particles.addEventListener('animationend', () => {
            document.body.removeChild(particles);
        });
    }
}

function setupMuteButton() {
    let isMuted = false;
    const muteButton = document.getElementById('mute-button');

    muteButton.addEventListener('click', () => {
        isMuted = !isMuted;
        if (isMuted) {
            // Mute sounds
            clickSound.volume = 0;
            nextSound.volume = 0;
            muteButton.textContent = 'Unmute';
        } else {
            // Unmute sounds
            clickSound.volume = 1;
            nextSound.volume = 1;
            muteButton.textContent = 'Mute';
        }
    });
}

// Call the function to set up the mute button functionality
setupMuteButton();
