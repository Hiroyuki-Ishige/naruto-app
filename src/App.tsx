import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

type Character = {
  id: string | number;
  name: string;
  images: string;
  // Add other properties if needed
};

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    const apiURL = "http://localhost:80/character";
    const response = await axios.get(apiURL);

    setCharacters(response.data.characters);

    console.log(response.data);
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <main>
        <div className="cards-container">
          {characters.map((character) => {
            return (
              <div className="card" key={character.id}>
                <img
                  src={character.images[0]}
                  alt={character.name}
                  className="card-image"
                />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;