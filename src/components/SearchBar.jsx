// Nuevo archivo: src/components/SearchBar.jsx
import { useState, useEffect } from "react";

function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(value);
    }, 500); // 500ms debounce

    return () => clearTimeout(handler);
  }, [value, onSearch]);

  return (
    <input
      className="form-control mb-3"
      placeholder="Buscar personaje..."
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
}

export default SearchBar;