import classes from "./Slider.module.css";

export interface IHero {
  id: number;
  creationDate: string;
  imgUrl: string;
  name: string;
  title: string;
}

export function Slider(element: HTMLElement, heroes: IHero[]) {
  // Иньектим разметку

  // Если герои еще не созданы, то предлагаем это сделать
  // иначе показываем слайдер
  element.innerHTML = `
  <div class="${classes.sliderBox}">
    <h3 class="${classes.title}">МОЯ <span>СУПЕР КОМАНДА</span></h3>
    ${
      heroes.length
        ? `
        <div id="carouselContainer"class="${classes.carouselContainer}">
          <div id="carouselTrack" class="${classes.carouselTrack}"></div>
        </div>
        <div class="${classes.btnBox}">
          <div>
            <button id="btnPrev" class="${classes.btn}">Пред.</button>
            <button id="btnNext" class="${classes.btn}">След.</button>
          </div>
        </div>    
    `
        : `<div style="margin-top:24px"><h3 class="${classes.title}">СОЗДАЙ СВОЕГО ПЕРВОГО ГЕРОЯ НИЖЕ!</h3></div>`
    }
  </div>
    `;

  // Отрисовываем бокс с героем
  setHero(document.querySelector<HTMLDivElement>("#carouselTrack")!, heroes);

  // Вызываем логику для слайдера
  if (heroes.length) {
    setupSlider({
      slidesToShow: Math.floor(heroes.length / 2),
      slidesToScroll: 1,
    });
  }
}
function setHero(element: HTMLElement, heroes: IHero[]) {
  heroes.forEach((hero) => {
    const heroBox = document.createElement("div");
    heroBox.innerHTML = `
      <div
        style="background-image:url(${hero.imgUrl});"
        class="${classes.heroImg}"
      ></div>
      <div class="${classes.heroTitle}" style="margin-top:16px">${hero.name}</div>
      <div class="${classes.heroSubtitle}" style="margin-top:8px">${hero.title}</div>
      <div class="${classes.heroSubtitle}" style="margin-top:16px">Дата вступления в команду:</div>
      <div class="${classes.heroSubtitle}" style="margin-top:8px">${hero.creationDate}</div>
      `;
    element.appendChild(heroBox);
    heroBox.setAttribute("class", `${classes.heroBox}`);
    heroBox.setAttribute("id", "heroBox");
  });
}

function setupSlider(config: { slidesToShow: number; slidesToScroll: number }) {
  const elements = {
    container: document.querySelector("#carouselContainer")!,
    track: document.querySelector("#carouselTrack")!,
    items: document.querySelectorAll("#heroBox")!,
  };
  const buttons = {
    prev: document.querySelector("#btnPrev")!,
    next: document.querySelector("#btnNext")!,
  };

  // Для маленьких экранов показываем одного героя на слайде

  let slidesOneTimeForUser = 1;

  // Проверяем размер экрана и увеличиваем при надобности slidesOneTimeForUser

  if (window.innerWidth > 900) {
    slidesOneTimeForUser = 2;
  }
  if (window.innerWidth > 1100) {
    slidesOneTimeForUser = 3;
  }

  // Размер слайда

  const itemWidth = 200;

  // Изначальная позиция

  let position = 0;

  // Насколько сдвигаем слайдер movePosition

  let movePosition = config.slidesToScroll * itemWidth;

  // Максимальный сдвиг

  let maxPosition =
    (elements.items.length - config.slidesToShow) * itemWidth * -1;

  buttons.prev.addEventListener("click", () => handlePrevClick());
  buttons.next.addEventListener("click", () => handleNextClick());
  checkBtns();

  function handlePrevClick() {
    position += movePosition;
    if (position > 0) {
      position = 0;
    }
    setPosition();
    checkBtns();
  }

  function handleNextClick() {
    position -= movePosition;
    if (position < maxPosition) {
      position = maxPosition;
    }
    setPosition();
    checkBtns();
  }

  function setPosition() {
    elements.track.setAttribute(
      "style",
      `transform: translateX(${position}px)`
    );
  }

  function checkBtns() {
    // Если находимся на начальной позиции дизейблим кнопку

    if (position === 0) {
      buttons.prev.setAttribute("disabled", `${position === 0}`);
    } else {
      buttons.prev.removeAttribute("disabled");
    }

    // Если находимся на конечной позиции
    // или героев еще недостаточно для нескольких слайдов
    // дизейблим кнопку

    if (
      position === maxPosition ||
      elements.items.length <= slidesOneTimeForUser
    ) {
      buttons.next.setAttribute("disabled", `${position === maxPosition}`);
    } else {
      buttons.next.removeAttribute("disabled");
    }
  }
}
