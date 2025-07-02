import { useState, useEffect } from "react";

const Cardlist = ({ data = [] }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(favs);
  }, []);

  const toggleFavorite = (id) => {
    let favs = [...favorites];
    if (favs.includes(id)) {
      favs = favs.filter(favId => favId !== id);
    } else {
      favs.push(id);
    }
    setFavorites(favs);
    localStorage.setItem("favorites", JSON.stringify(favs));
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {data.map((item) => {
          const { id, name, ki, description, image, race } = item;
          const isFav = favorites.includes(id);
          return (
            <div key={id} className="col-md-4 mb-4">
              <div className="card h-100 bg-dark text-light">
                <img src={image || 'https://via.placeholder.com/150'} alt={name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">
                    {name}{" "}
                    <span
                      style={{ cursor: "pointer", color: isFav ? "gold" : "gray" }}
                      onClick={() => toggleFavorite(id)}
                      title={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
                    >
                      {isFav ? "⭐" : "☆"}
                    </span>
                  </h5>
                  <p className="card-text">{description || 'No description available.'}</p>
                  <p className="card-text"><strong>Raza:</strong> {race || 'Desconocida'}</p>
                  <h2 className="card-text">KI: {ki}</h2>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cardlist;