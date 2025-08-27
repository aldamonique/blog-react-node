import { createContext, useState } from "react";

export const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [query, setQuery] = useState("");        
  const [filteredPosts, setFilteredPosts] = useState([]); 

  return (
    <SearchContext.Provider value={{ query, setQuery, filteredPosts, setFilteredPosts }}>
      {children}
    </SearchContext.Provider>
  );
}
