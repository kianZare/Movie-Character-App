import "./App.css";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import Navbar, { SearchResult, Search, Favourites } from "./components/Navbar";
import CharactorList from "./components/CharactorList";
import CharactorDetail from "./components/CharactorDetail";
import axios from "axios";

function App() {
  const [characters, setCaracters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`,
          { signal }
        );
        setCaracters(data.results);
      } catch (err) {
        setCaracters([]);
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();

    return () => {
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    const interval = setInterval(() => setCount((c) => c + 1), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [count]);

  const handleSelectCharacter = (id) => {
    setSelectedId((privId) => (privId === id ? null : id));
  };
  const handleAddFavourite = (char) => {
    setFavourites(() => [...favourites, char]);
  };
  const isAddToFavourite = favourites.map((fav) => fav.id).includes(selectedId);

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favourites numOfFavourites={favourites.length} />
      </Navbar>
      <div style={{ color: "white" }}>{count}</div>
      <Main>
        <CharactorList
          selectedId={selectedId}
          characters={characters}
          isLoading={isLoading}
          onSelectCharecter={handleSelectCharacter}
        />
        <CharactorDetail
          characters={characters}
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
