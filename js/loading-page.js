let loadingStatus = false;

const showContent = (ready) => {
  if (ready) {
    let loaderElement = document.querySelector(`.transition-loader`);
    loaderElement.classList.add(`transition-loader--hide`);
  } else {
    return
  }
}

const deleteLoaderTimer = () => {
  setTimeout(() => {
    showContent(true)
  }, 1200);
  // showContent(true);
  setTimeout(() => {
    showLine()
  }, 1800);
}

document.addEventListener(`DOMContentLoaded`, deleteLoaderTimer());
