let score = 0;
let clickCount = 0;
let oreState = 1; // Initial ore state

const ore = document.getElementById('ore');
const scoreDisplay = document.getElementById('score');

document.addEventListener('DOMContentLoaded', () => {
    updateOreSprite(); // Initialize the ore image when the page loads
    updateScoreDisplay(); // Initialize the score display
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
    } else {
        if (clickCount % 2 === 0) {
            score += 10; // Add 10 points every 2 clicks
            oreState = (oreState % 5) + 1; // Cycle ore states from 1 to 5
            updateOreSprite();
        }
    }

    updateScoreDisplay();
    createParticleEffect(mouseX, mouseY); // Add particle effect on each click
}

function updateOreSprite() {
    ore.style.backgroundImage = `url('assets/ore${oreState}.png')`;
}

function updateScoreDisplay() {
    scoreDisplay.textContent = `Score: ${score}`;
}

function createParticleEffect(x, y) {
    for (let i = 0; i < 10; i++) { // Create multiple particles for more effect
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
