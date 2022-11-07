import App from "./app";
import { setupForm } from "./features/addNewHero";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `${App()}`;
setupForm(document.querySelector<HTMLDivElement>("#form")!);
