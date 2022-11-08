import App from "./app";
import { Form } from "./features/addNewHero";
import { IHero, Slider } from "./features/heroesSlider";

// Иньектим базову разметку

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `${App()}`;

// Пустой массив заменяет стор и в этом случае еще и бек с бд

export const heroesArr: IHero[] = [];

// Добавляем слайдер

Slider(document.querySelector<HTMLDivElement>("#slider")!, heroesArr);

// Добавляем форму

Form(document.querySelector<HTMLDivElement>("#form")!);
