import "./App.css";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import Navbar, { SearchResult, Search } from "./components/Navbar";
import CharactorList from "./components/CharactorList";
import CharactorDetail from "./components/CharactorDetail";
import axios from "axios";

function App() {
  const [characters, setCaracters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`
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
  }, [query]);

  const handleSelectCharacter = (id) => {
    setSelectedId((privId) => (privId === id ? null : id));
  };
  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
      </Navbar>
      <Main>
        <CharactorList
          selectedId={selectedId}
          characters={characters}
          isLoading={isLoading}
          onSelectCharecter={handleSelectCharacter}
        />
        <CharactorDetail characters={characters} selectedId={selectedId} />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
