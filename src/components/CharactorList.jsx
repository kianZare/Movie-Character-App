import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";

function CharactorList({
  selectedId,
  characters,
  isLoading,
  onSelectCharecter,
}) {
  if (isLoading)
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  return (
    <div className="characters-list">
      {characters.map((item) => (
        <Character
          selectedId={selectedId}
          key={item.id}
          item={item}
          onSelectCharecter={onSelectCharecter}
        />
      ))}
    </div>
  );
}

export default CharactorList;

function Character({ item, onSelectCharecter, selectedId }) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <CharacterName item={item} />
      <CharacterInfo item={item} />
      <button className="icon red" onClick={() => onSelectCharecter(item.id)}>
        {selectedId === item.id ? <EyeSlashIcon/> : <EyeIcon />}
      </button>
    </div>
  );
}

function CharacterName({ item }) {
  return (
    <h3 className="name">
      <span className="icon">{item.gender === "Male" ? "🧑" : "👩"}</span>
      <span className="info">{item.name}</span>
    </h3>
  );
}

function CharacterInfo({ item }) {
  return (
    <div className="list-item__info info">
      <span className={`status ${item.status === "Dead" ? "red" : ""}`}></span>
      <span> {item.status}</span>
      <span> - {item.species}</span>
    </div>
  );
}
