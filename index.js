const progress = document.querySelector("#progress");
let newWidth = 0;

function progressLoop() {
  progress.style.width = newWidth + "%";
  newWidth += 0.1;
  if (newWidth >= 100) {
    newWidth = 0;
  } else {
    requestAnimationFrame(progressLoop);
  }
}
requestAnimationFrame(progressLoop);
