let titleString = document.querySelector(".maintenance__title");
let animationString = titleString.textContent;
let stringMap = animationString.split(``);

//* Массив спан элементов для заголовка
let animationSpanMap = stringMap.map((item) => {return `<span class="maintenance__letter maintenance__letter--hide">${item}</span>`});

//* Записываем сточку в отдельные спан линии
titleString.innerHTML = `<span>
  ${animationSpanMap.join(``)}
</span>`

//* Меняем класс на взибл для каждой буквы
const animationSpanLines = titleString.querySelectorAll('.maintenance__letter--hide');
const showLetter = (elem,index) => {
  setTimeout(() => {
    elem.classList.remove(`maintenance__letter--hide`);
    elem.classList.add(`maintenance__letter--show`);
  }, index*180);
}

//* Пробегаемся по всем элементам заголовка
const showLine = () => {
  animationSpanLines.forEach((item, index) => {
    if (item.classList.contains(`maintenance__letter--hide`)) {
      showLetter(item, index);
    }
  });
}

// document.addEventListener(``)


