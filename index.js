const progress = document.querySelector("#progress");
let newWidth = 0;
let lastMovement = performance.now();
let currentImageIndex = 0;
let lastHit = 0;
const images = document.querySelectorAll(".icon");
function progressLoop() {
  progress.style.width = newWidth + "%";
  newWidth += 0.1;
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
  const amountOfConfetti = 100;
  const amountOfConfettiPerSide = (amountOfConfetti * 1) / 2;
  for (let i = 0; i < amountOfConfetti; i++) {
    const pieceOfConfetti = document.createElement("div");
    pieceOfConfetti.classList.add("confetti-piece");
    pieceOfConfetti.style.background =
      colors[Math.floor(Math.random() * colors.length)];
    pieceOfConfetti.style.transform = `rotate(${Math.floor(
      Math.random() * 360
    )}deg)`;
    pieceOfConfetti.style.left = "5vmin";
    pieceOfConfetti.style.top = "-60vmin";
    elementList.push({
      left: i >= amountOfConfettiPerSide ? 5 : 172,
      top: 40,
      xVelocity:
        i >= amountOfConfettiPerSide
          ? Math.floor(Math.random() * (10 - 1 + 1)) + 1
          : -Math.floor(Math.random() * (10 - 1 + 1)) + 1,
      yVelocity: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
      gravity: 1,
      HTMLElement: pieceOfConfetti,
    });
    document.body.appendChild(pieceOfConfetti);
  }
  moveConfetti(elementList);
}

function moveConfetti(confettiList) {
  const airResistance = 3;
  if (performance.now() - lastMovement > 1000 / 60) {
    for (const confettiPiece of confettiList) {
      confettiPiece.HTMLElement.style.left =
        confettiPiece.left + confettiPiece.xVelocity + "vmin";
      confettiPiece.HTMLElement.style.top =
        confettiPiece.top +
        confettiPiece.yVelocity +
        confettiPiece.gravity -
        airResistance +
        "vmin";
      confettiPiece.left += confettiPiece.xVelocity;
      confettiPiece.top +=
        confettiPiece.yVelocity + confettiPiece.gravity - airResistance;
      confettiPiece.gravity += 0.1;
      lastMovement = performance.now();
    }
  }
  requestAnimationFrame(() => moveConfetti(confettiList));
}
