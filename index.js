const progress = document.querySelector("#progress");
let newWidth = 0;
let lastMovement = performance.now();
let currentImageIndex = 0;
let lastHit = 0;
const amountOfConfetti = 140;
const amountOfConfettiPerSide = amountOfConfetti / 2;
const maxXvelocity = 40;
const maxYvelocity = 50;
const minXvelocity = 1;
const minYvelocity = 1;
const maxRotationPerFrame = 360;
const images = document.querySelectorAll(".icon");
document.body.scrollLeft =
  document.body.scrollWidth - document.body.clientWidth;
function progressLoop() {
  progress.style.width = newWidth + "%";
  newWidth += 1;
  if (newWidth - lastHit >= 9 && !(currentImageIndex >= images.length)) {
    images[currentImageIndex].style.opacity = "1";

    currentImageIndex++;
    lastHit = newWidth;
  }
  if (newWidth < 100) {
    requestAnimationFrame(progressLoop);
  } else {
    createConfetti();
  }
}
requestAnimationFrame(progressLoop);

function createConfetti() {
  const colors = ["red", "yellow", "blue", "lightgreen", "pink", "purple"];
  const elementList = [];

  for (let i = 0; i < amountOfConfetti; i++) {
    const pieceOfConfetti = document.createElement("div");
    pieceOfConfetti.classList.add("confetti-piece");
    pieceOfConfetti.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    const confettiObject = {
      left: i >= amountOfConfettiPerSide ? 5 : 100,
      top: 40,
      xVelocity:
        i >= amountOfConfettiPerSide
          ? Math.floor(Math.random() * (maxXvelocity - minXvelocity + 1)) +
            minXvelocity
          : -Math.floor(Math.random() * (maxXvelocity - 1 + 1)) + 1,
      yVelocity:
        -Math.floor(Math.random() * (maxYvelocity - minYvelocity + 1)) +
        minYvelocity,
      gravity: 1,
      rotation: Math.floor(Math.random() * 360),
      rotationPerFrame: Math.floor(Math.random() * maxRotationPerFrame),
      minXVelocity: i >= amountOfConfettiPerSide ? 2 : -2,
      minYVelocity: 2,
      HTMLElement: pieceOfConfetti,
    };
    elementList.push(confettiObject);
    document.body.appendChild(pieceOfConfetti);

    pieceOfConfetti.style.transform = `rotate(${confettiObject.rotation}deg)`;
  }
  moveConfetti(elementList);
}
let numMoved = 0;
function moveConfetti(confettiList) {
  const airResistance = 5;

  if (performance.now() - lastMovement > 1000 / 60) {
    let i = 0;
    for (const confettiPiece of confettiList) {
      if (
        confettiPiece.left + confettiPiece.xVelocity - airResistance > 89.5 ||
        confettiPiece.left + confettiPiece.xVelocity - airResistance < 0
      ) {
        confettiPiece.HTMLElement.style.display = "none";
      } else {
        confettiPiece.HTMLElement.style.display = "grid";
      }
      confettiPiece.HTMLElement.style.left =
        confettiPiece.left + confettiPiece.xVelocity + "vw";
      confettiPiece.HTMLElement.style.top =
        confettiPiece.top +
        confettiPiece.yVelocity +
        confettiPiece.gravity -
        airResistance +
        "vh";
      confettiPiece.left += confettiPiece.xVelocity;
      confettiPiece.top +=
        confettiPiece.yVelocity + confettiPiece.gravity - airResistance;
      confettiPiece.gravity += 0.1;
      confettiPiece.HTMLElement.style.transform = `rotate(${
        confettiPiece.rotation + confettiPiece.rotationPerFrame
      }deg)`;
      confettiPiece.rotation += confettiPiece.rotationPerFrame;
      confettiPiece.yVelocity = Math.max(
        confettiPiece.yVelocity - airResistance,
        confettiPiece.minYVelocity
      );
      if (i >= amountOfConfettiPerSide) {
        confettiPiece.xVelocity = Math.max(
          confettiPiece.xVelocity - airResistance,
          confettiPiece.minXVelocity
        );
      } else {
        confettiPiece.xVelocity = Math.min(
          confettiPiece.xVelocity + airResistance,
          confettiPiece.minXVelocity
        );
      }
      lastMovement = performance.now();
      i++;
    }
    numMoved++;
  }
  if (numMoved < 70) {
    requestAnimationFrame(() => moveConfetti(confettiList));
  } else {
    for (const confettiPiece of confettiList) {
      confettiPiece.HTMLElement.style.display = "none";
    }
  }
}
