import "./style.css";
import { Footer } from "../features/footer";

// Создаем базовую разметку

export default function App() {
  return `
    <main>
        <div id="slider"></div>
        <div id="form"></div>
    </main>
    ${Footer()}
`;
}
