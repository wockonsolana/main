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
let oreState = 0;
let resetCount = 0; // Track the number of times the rock resets
let unlockedCharacters = new Array(characters.length).fill(false);
unlockedCharacters[0] = true; // The first character is always unlocked

document.addEventListener('DOMContentLoaded', () => {
    const ore = document.getElementById('ore'); // Get the rock element
    ore.addEventListener('click', mineOre); // Attach mineOre function to the rock's click event
    updateOreSprite(); // Initialize the ore image when the page loads
    updateScoreDisplay(); // Initialize the score display
    updateHappinessBar(); // Initialize the happiness bar
    loadProgress(); // Load saved progress if any
    updateCharacterUnlockDisplay(); // Initialize the character unlock display
});

function preloadImages(imagePaths) {
    imagePaths.forEach((path) => {
        const img = new Image();
        img.src = path;
    });
}

// Preload the first two characters
preloadImages([
    'assets/wock1-1.webp', 'assets/wock1-2.webp', 'assets/wock1-3.webp', 'assets/wock1-4.webp', 'assets/wock1-5.webp',
    'assets/wock2-1.webp', 'assets/wock2-2.webp', 'assets/wock2-3.webp', 'assets/wock2-4.webp', 'assets/wock2-5.webp',
    'assets/click-effect.wav', 'assets/next-effect.wav'
]);

function mineOre(event) {
    clickCount++;
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    if (clickCount % 10 === 0) {
        score += 60; // Add 60 points when the rock breaks (every 10 clicks)
        oreState = 1; // Reset to initial state
        createLargeParticleEffect(mouseX, mouseY); // Add larger particle effect when rocks break

        // Add shake effect on the 10th click
        ore.classList.add('shake');
        setTimeout(() => {
            ore.classList.remove('shake');
        }, 150);

        // Reset happiness after the first click cycle is complete
        happiness = 0;
        nextSound.play(); // Play sound effect for breaking the rock

        // Increment the reset count and check for character unlocks
        resetCount++;
        checkForNewCharacter();
    } else {
        if (clickCount % 2 === 0) {
            score += 10; // Add 10 points every 2 clicks
            oreState = (oreState % 5) + 1; // Cycle ore states from 1 to 5
        }
        clickSound.play(); // Play sound effect for each click
    }

    updateOreSprite();
    updateScoreDisplay();
    createParticleEffect(mouseX, mouseY); // Add particle effect on each click
    incrementHappiness();
    saveProgress(); // Save progress on each click
}

// Remaining functions remain unchanged

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
    ore.style.backgroundImage = `url('${characters[currentCharacter][oreState - 1]}')`;
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
    const clickSound = document.getElementById('clickSound');
    const nextSound = document.getElementById('nextSound');

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

function saveProgress() {
    const progress = {
        score,
        happiness,
        currentCharacter,
        resetCount,
        unlockedCharacters
    };
    document.cookie = `progress=${JSON.stringify(progress)}; path=/;`;
}

function loadProgress() {
    const match = document.cookie.match(new RegExp('(^| )progress=([^;]+)'));
    if (match) {
        const progress = JSON.parse(match[2]);
        score = progress.score;
        happiness = progress.happiness;
        currentCharacter = progress.currentCharacter;
        resetCount = progress.resetCount;
        unlockedCharacters = progress.unlockedCharacters;
        updateOreSprite();
        updateScoreDisplay();
        updateHappinessBar();
        updateCharacterUnlockDisplay();
    }
}

function updateCharacterUnlockDisplay() {
    const unlockedCount = unlockedCharacters.filter(Boolean).length;
    document.getElementById('character-unlock-display').textContent = `Characters Unlocked: ${unlockedCount}/10`;
}
