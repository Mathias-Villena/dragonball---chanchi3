import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Cardlist from './components/Cardlist.jsx';

import SearchBar from './components/SearchBar.jsx';
// ...existing code...

function App() {
  const [characters, setCharacters] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dragonball-api.com/api/characters?race=Saiyan&affiliation=Z%20fighter');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCharacters(data.results || data);
        setFiltered(data.results || data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFiltered(characters);
    } else {
      setFiltered(
        characters.filter(c =>
          c.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/card-list"
            element={
              <div>
                <SearchBar onSearch={handleSearch} />
                <Cardlist data={filtered} />
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
export default App;