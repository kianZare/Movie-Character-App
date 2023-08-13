import "./App.css";
import Navbar from "./components/Navbar";
import CharactorList from "./components/CharactorList";
import CharactorDetail from "./components/CharactorDetail";
import { allCharacters } from "../data/data";

function App() {
  return (
    <div className="app">
      <Navbar />
      <CharactorList characters={allCharacters} />
      <CharactorDetail />
    </div>
  );
}

export default App;
