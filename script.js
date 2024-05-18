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
    } else if (clickCount % 2 === 0) {
        oreState++;
        if (oreState > 5) {
            oreState = 1; // Reset to initial state if reached the last state
        }
        updateOreSprite();
    }
}

function updateOreSprite() {
    ore.style.backgroundImage = `url('ore${oreState}.png')`;
}
