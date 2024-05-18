let score = 0;
let clickCount = 0;
let oreState = 1; // Initial ore state

const ore = document.getElementById('ore');
const scoreDisplay = document.getElementById('score');

ore.addEventListener('click', mineOre);

function mineOre(event) {
    clickCount++;
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    if (clickCount % 10 === 0) {
        score += 10;
        scoreDisplay.textContent = `Score: ${score}`;
        oreState++;
        if (oreState > 5) {
            oreState = 1; // Reset to initial state if reached the last state
        }
        updateOreSprite();
        createLargeParticleEffect(mouseX, mouseY); // Add larger particle effect when rocks break
    } else if (clickCount % 2 === 0) {
        oreState++;
        if (oreState > 5) {
            oreState = 1; // Reset to initial state if reached the last state
        }
        updateOreSprite();
        createParticleEffect(mouseX, mouseY); // Add particle effect on each click
    }
}

function updateOreSprite() {
    ore.style.backgroundImage = `url('/assets/ore${oreState}.png')`;
}

function createParticleEffect(x, y) {
    const particles = document.createElement('div');
    particles.classList.add('particles');
    particles.style.left = `${x}px`;
    particles.style.top = `${y}px`;
    document.body.appendChild(particles);
    particles.style.animation = 'particle-effect 1s ease-out forwards';
    particles.addEventListener('animationend', () => {
        document.body.removeChild(particles);
    });
}

function createLargeParticleEffect(x, y) {
    const particles = document.createElement('div');
    particles.classList.add('large-particles');
    particles.style.left = `${x}px`;
    particles.style.top = `${y}px`;
    document.body.appendChild(particles);
    particles.style.animation = 'large-particle-effect 1s ease-out forwards';
    particles.addEventListener('animationend', () => {
        document.body.removeChild(particles);
    });
}
