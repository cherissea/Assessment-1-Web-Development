let score = 0;
let lives = 3;
let correctColor = '';

//Elements
const scoreEl = document.getElementById('score');
const livesEl = document.getElementById('lives');
const rgbEl = document.getElementById('rgb');
const but1 = document.getElementById('but1');
const but2 = document.getElementById('but2');
const but3 = document.getElementById('but3');
const overEl = document.getElementById('over');
const fscoreEl = document.getElementById('fscore');

//generate random rgb
function randomRGB() {
    const r = Math.floor(Math.random()*256);
    const g = Math.floor(Math.random()*256);
    const b = Math.floor(Math.random()*256);
    return `rgb(${r}, ${g}, ${b})`;
}

//new round
function newRound() {
    correctColor = randomRGB();
    rgbEl.textContent = correctColor;

    // 3 colors 1 correct
    const colors = [correctColor, randomRGB(), randomRGB()];
    but1.style.background = colors[0];
    but2.style.background = colors[1];
    but3.style.background = colors[2];

    //reset button classes
    but1.className = 'colorbut';
    but2.className = 'colorbut';
    but3.className = 'colorbut';
}

//click handlers
but1.onclick = () => checkAnswer(but1);
but2.onclick = () => checkAnswer(but2);
but3.onclick = () => checkAnswer(but3);

function checkAnswer(but) {
    if(but.style.backgroundColor === correctColor) {
        //correct
        but.classList.add('correct');
        score += 10;
        scoreEl.textContent = score;
        setTimeout(newRound,800);
    } else {
        //wrong
        but.classList.add('wrong');
        lives--;
        livesEl.textContent = lives;
        if (lives <= 0) {
            over();
        } else {
            setTimeout(newRound,800);
        }

    }
}

//gameover

function over(){
    overEl.style.display = 'block';
    fscoreEl.textContent = score;
}

//reset game
function resetGame() {
    score = 0;
    lives = 3;
    scoreEl.textContent = score;
    livesEl.textContent = lives;
    overEl.style.display = 'none';
    newRound()
}

newRound()