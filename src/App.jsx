import { useEffect, useState } from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Favourites, Search, SearchResult } from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import useCharacters from "./hooks/useCharacter";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(0);
  const {isLoading, characters} = useCharacters(query)
  const [selectedId, setSelectedId] = useState(null);
 const [favourites, setFavourites] = useLocalStorage("FAVOURITES", [])
  // const [favourites, setFavourites] = useState(
  //   () => JSON.parse(localStorage.getItem("FAVOURITES")) || []
  // );
 
  // useEffect(() => {
  //   localStorage.setItem("FAVOURITES", JSON.stringify(favourites));
  // }, [favourites]);


  useEffect(() => {
    const interval = setInterval(() => setCount((c) => c + 1), 1000);

    // return function(){}
    return () => {
      clearInterval(interval);
    };
  }, [count]);


  // console.log(JSON.parse(localStorage.getItem("FAVOURITES")));

  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleAddFavourite = (char) => {
    setFavourites((preFav) => [...preFav, char]);
  };

  const handleDeleteFavourite = (id) => {
    setFavourites((preFav) => preFav.filter((fav) => fav.id !== id));
  };

  const isAddToFavourite = favourites.map((fav) => fav.id).includes(selectedId);

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favourites
          favourites={favourites}
          onDeleteFavourite={handleDeleteFavourite}
        />
      </Navbar>
      <Main>
        <CharacterList
          selectedId={selectedId}
          characters={characters}
          isLoading={isLoading}
          onSelectCharacter={handleSelectCharacter}
        />
        <CharacterDetail
          selectedId={selectedId}
          onAddFavourite={handleAddFavourite}
          isAddToFavourite={isAddToFavourite}
        />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
