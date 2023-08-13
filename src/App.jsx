import "./App.css";
import Navbar from "./components/Navbar";
import CharactorList from "./components/CharactorList";
import CharactorDetail from "./components/CharactorDetail";
import { allCharacters } from "../data/data";

function App() {
  return (
    <div>
      <Navbar />
      <div className="app">
      <CharactorList characters={allCharacters} />
      <CharactorDetail />
      </div>
    </div>
  );
}

export default App;
