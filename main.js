const span = document.querySelector('span');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
let alreadyChosen;
let timeUp = false;
let score = 0;


// random number generator 
function randomTime(min, max) {
   return Math.floor(Math.random() * (max - min) + min)
   //console.log(random);
}

// random hole generator
function randomHole(holes) {
     let idx = Math.floor(Math.random() * holes.length);
     let rand = holes[idx];

     if(rand === alreadyChosen) {
       console.log('Sorry, you have tried this one already');
       return randomHole(holes);
     }
       alreadyChosen = rand;
       return rand;
}

// trigger the random timgings and and holes

function putTogether() {
    let time = randomTime(200, 1000);
    let hole = randomHole(holes);

     hole.classList.add('up');

     setTimeout(() => {
        hole.classList.remove('up');
        if(!timeUp) putTogether();
     }, time);
}

function startGame() {
    span.textContent = 0;
    timeUp = false;
    score = 0;
    putTogether();
    setTimeout(() => timeUp = true, 10000);
}

function bonk(e) {
   if(!e.isTrusted) return; // if clicked on random things => cheater!

   score++;
   this.parentNode.classlist.remove('up');
   span.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk))