import { Header } from "./components/Header";
import { GlobalStyles } from "./styles/global";

export function App() {
  //parei no 01:03 da aula do componente header
  return (
    <div className="App">
      <Header/> {/*importaçao do componente header*/}
      <GlobalStyles/> {/*importaçao do componente de estilo global*/}
    </div>
  );
}