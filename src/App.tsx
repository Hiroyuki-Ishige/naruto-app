import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

type Character = {
  id: string | number;
  name: string;
  images: string[];
  debut?: {
    novel?: string;
    manga?: string;
    anime?: string;
    movie?: string;
    appearsIn?: string;
  };
  // Add other properties if needed
};

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  useEffect(() => {
    fetchCharacters(1);
  }, []);

  //set up state for current page
  const [currentPage, setCurrentPage] = useState(1);

  //fetch characters by NEXT button click
  const handleNextPage = async () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    await fetchCharacters(nextPage);
  };

  //fetch characters by PREV button click
  const handlePrevPage = async () => {
    const prevPage = Math.max(currentPage - 1, 1);
    setCurrentPage(prevPage);
    await fetchCharacters(prevPage);
  };

  //fetch characters from API
  const fetchCharacters = async (page: number) => {
    const apiURL = "http://localhost:80/character";
    const response = await axios.get(apiURL, { params: { page: page } });

    setCharacters(response.data.characters);

    console.log("Full response:", response.data);
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>

      <main>
        <div className="cards-container">
          {characters.map((character) => {
            const imageUrl =
              character.images[0] != null ? character.images[0] : "dummy_2.png";

            console.log(`Character: ${character.name}, Image URL: ${imageUrl}`);

            return (
              <div className="card" key={character.id}>
                <img
                  src={imageUrl}
                  alt={character.name}
                  className="card-image"
                />
                <div className="card-content">
                  <h3 className="card-title">Name: {character.name}</h3>
                  <p className="card-description">
                    Novel: {character.debut?.novel || "N/A"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pager">
          <button
            className="prev transition-all duration-200 ease-in-out hover:scale-105 hover:bg-gray-600"
            onClick={handlePrevPage}
          >
            Previous
          </button>
          <span className="page-number">{currentPage}</span>
          <button
            className="next transition-all duration-200 ease-in-out hover:scale-105 hover:bg-gray-600"
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
