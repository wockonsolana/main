let score = 0;
let clickCount = 0;
let oreState = 1; // Initial ore state

const ore = document.getElementById('ore');
const scoreDisplay = document.getElementById('score');

ore.addEventListener('click', mineOre);

function mineOre() {
    clickCount++;
    if (clickCount % 10 === 0) {
        score += 10;
        scoreDisplay.textContent = `Score: ${score}`;
        oreState++;
        if (oreState > 5) {
            oreState = 1; // Reset to initial state if reached the last state
        }
        updateOreSprite();
        createLargeParticleEffect(); // Add larger particle effect when rocks break
    } else if (clickCount % 2 === 0) {
        oreState++;
        if (oreState > 5) {
            oreState = 1; // Reset to initial state if reached the last state
        }
        updateOreSprite();
        createParticleEffect(); // Add particle effect on each click
    }
}

function updateOreSprite() {
    ore.style.backgroundImage = `url('ore${oreState}.png')`;
}

function createParticleEffect() {
    const particles = document.createElement('div');
    particles.classList.add('particles');
    ore.appendChild(particles);
    particles.style.animation = 'particle-effect 1s ease-out forwards';
    particles.addEventListener('animationend', () => {
        ore.removeChild(particles);
    });
}

function createLargeParticleEffect() {
    const particles = document.createElement('div');
    particles.classList.add('large-particles');
    ore.appendChild(particles);
    particles.style.animation = 'large-particle-effect 1s ease-out forwards';
    particles.addEventListener('animationend', () => {
        ore.removeChild(particles);
    });
}
