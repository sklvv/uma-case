import { heroesArr } from "@/index";
import { capitalizeFirstLetter } from "@/shared/helpers/capitalizeFirstLetter";
import getDate from "@/shared/helpers/getDate";
import { Slider } from "../heroesSlider";
import classes from "./Form.module.css";

export function Form(element: HTMLElement) {
  // Иньектим разметку
  element.innerHTML = `
   <div class="${classes.formBox}">
      <h3 class="${classes.title}">ДОБАВЬ СВОЕГО <span>ГЕРОЯ</span></h3>
      <form id="formNode">
        <div class="${classes.firstRow}">
          <div class="${classes.formItem}">
            <label for="name">Имя <span>*</span></label>
            <input  type="text" id="name" class="${classes.smallItem}" name="name" required  />
          </div>
          <div class="${classes.formItem}">
            <label for="title">Титул <span>*</span></label>
            <input type="text" id="title" class="${classes.smallItem}" name="title" required /> 
          </div>
        </div>
        <div class="${classes.formItem}">
          <label for="photo">Фото <span>*</span></label>
          <input type="file" id="photo" name="photo" class="${classes.photoInput}" accept="image/png, image/jpg" />     
          <label for="photo" class="${classes.photoInputText}" id="dropArea">Чтобы добавить фото героя перетащите изображение в это поле или просто кликните сюда</label>
        </div>    
        <div  class="${classes.btnBox}">
          <button type="submit" class="${classes.btn}" id="formBtn">ПРИНЯТЬ</button>
        </div>
      </form>
    </div>
    `;
  // Элементы и подписки на события
  const btn = document.querySelector<HTMLButtonElement>("#formBtn")!;
  btn.addEventListener("click", (e) => handleSubmit(e));

  const formNode = document.querySelector<HTMLButtonElement>("#formNode")!;
  formNode.addEventListener("submit", (e) => handleSubmit(e));

  const nameNode = document.querySelector<HTMLInputElement>("#name")!;
  nameNode.value = "";
  nameNode.addEventListener("input", (e) => setName(e));

  const titleNode = document.querySelector<HTMLInputElement>("#title")!;
  titleNode.value = "";
  titleNode.addEventListener("input", (e) => setTitle(e));

  const photoNode = document.querySelector<any>("#photo")!;
  photoNode.addEventListener("input", (e: any) => setFile(e));

  let photoUrl = "";

  // const dropArea = document.querySelector<any>("#dropArea")!;

  // dropArea.ondragover = dropArea.ondragenter = function (evt: any) {         приходит пустой dataTransfer (((
  //   evt.preventDefault();
  // };

  // dropArea.ondrop = function (evt: any) {
  //   console.log(evt);
  //   evt.preventDefault();
  //   console.log(evt.dataTransfer);
  //   photoNode.files = evt.dataTransfer.files[0];

  //   console.log(photoNode.files);
  // };

  function setFile(e: any) {
    photoNode.files = e.target.files;
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      photoUrl = reader.result as string;
    });
    reader.readAsDataURL(photoNode.files[0]);
  }

  function setName(e: any) {
    nameNode.value = e.target.value;
  }

  function setTitle(e: any) {
    titleNode.value = e.target.value;
  }

  function handleSubmit(e: SubmitEvent | MouseEvent) {
    e.preventDefault();

    // Проверка на заполненность формы

    if (titleNode.value.trim() && nameNode.value.trim() && photoNode.files) {
      // Вместо отправки формы добавляем нового героя
      // в стор ( вместо стора массив в корне )

      heroesArr.push({
        id: Date.now(),
        name: capitalizeFirstLetter(nameNode.value),
        title: capitalizeFirstLetter(titleNode.value),
        imgUrl: photoUrl,
        creationDate: getDate(new Date()),
      });

      // Очищаем форму

      titleNode.value = "";
      nameNode.value = "";

      // Вызываем перерисовку слайдера

      Slider(document.querySelector<HTMLDivElement>("#slider")!, heroesArr);
    } else {
      alert("Введите все данные!");
    }
  }
}
