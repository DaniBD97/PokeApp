import axios from 'axios';
import React, { createContext, useState, useEffect, useContext } from 'react';

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [topPokemon, setTopPokemon] = useState([]);
  const [active, setActive] = useState(false); // ✅ ahora es estado real

  // Cargar favoritos del localStorage al iniciar
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('favoritesPoke');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
    }
  }, []);

  // Fetch pokémons
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=50");
        const pokemons = response.data.results;

        const detailedPokemons = await Promise.all(
          pokemons.map(async (pokemon) => {
            try {
              const detailedResponse = await axios.get(pokemon.url);
              return detailedResponse.data;
            } catch (error) {
              console.error(`Error fetching ${pokemon.name}:`, error);
              return null;
            }
          })
        );

        const validPokemons = detailedPokemons.filter(pokemon => pokemon !== null);
        setAllPokemons(validPokemons);
        setLoading(false);
      } catch (error) {
        console.error('❌ Error fetching pokemons:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  // Calcular total de stats
  const calculateTotalStats = (stats) => {
    return stats.reduce((total, stat) => total + stat.base_stat, 0);
  };

  // Calcular topPokemons
  useEffect(() => {
    const topList = allPokemons
      .map(p => ({ ...p, totalStats: calculateTotalStats(p.stats) }))
      .filter(p => p.totalStats > 300)
      .sort((a, b) => b.totalStats - a.totalStats)
      .slice(0, 24);

    setTopPokemon(topList);
  }, [allPokemons]);

  // Ordenar lista
  const sortPokemonList = ({ value }) => {
    const sourceList = filteredPokemons.length === 0 ? allPokemons : filteredPokemons;

    const sortedList = [...sourceList].sort((a, b) => {
      if (value === 'asc') return a.name.localeCompare(b.name);
      if (value === 'desc') return b.name.localeCompare(a.name);
      if (value === 'ascN') return a.id - b.id;
      if (value === 'descN') return b.id - a.id;
      return a.id - b.id;
    });

    setFilteredPokemons(sortedList);
  };

  // Estado para checkboxes de tipo
  const [typeSelected, setTypeSelected] = useState({
    grass: false,
    normal: false,
    fighting: false,
    flying: false,
    poison: false,
    ground: false,
    rock: false,
    bug: false,
    ghost: false,
    steel: false,
    fire: false,
    water: false,
    electric: false,
    psychic: false,
    ice: false,
    dragon: false,
    dark: false,
    fairy: false,
    unknow: false,
    shadow: false,
    all: false
  });

  // Filtrar por tipos
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    const updatedSelection = { ...typeSelected, [name]: checked };

    // Si selecciona "all", desmarca los demás
    if (name === 'all') {
      Object.keys(updatedSelection).forEach(key => {
        updatedSelection[key] = key === 'all' ? checked : false;
      });
      setTypeSelected(updatedSelection);
      setFilteredPokemons([]);
      return;
    }

    // Desactiva "all" si selecciona un tipo
    if (checked) updatedSelection.all = false;

    setTypeSelected(updatedSelection);

    const updatedTypes = Object.keys(updatedSelection).filter((key) => updatedSelection[key]);

    if (updatedTypes.includes('all') || updatedTypes.length === 0) {
      setFilteredPokemons([]);
    } else {
      const filteredResults = allPokemons.filter((pokemon) =>
        updatedTypes.some((type) =>
          pokemon.types?.map((t) => t.type.name).includes(type)
        )
      );
      setFilteredPokemons(filteredResults);
    }
  };


  function FavoritesPokemon(pokemon, action) {
    // Verificar si el Pokémon ya está en la lista de favoritos
    const isFavorite = favorites.some(favPokemon => favPokemon.id === pokemon.id);
  
    if (action === 'add') {
      if (isFavorite) {
        console.log('El Pokémon ya está en la lista de favoritos.');
        return;
      }
      // Clonamos la lista de favoritos y agregamos el nuevo Pokémon
      const updatedFavorites = [...favorites, pokemon].slice(-10);// Limitamos a 10 elementos
  
      // Actualizamos el estado de los favoritos en tu aplicación
      setFavorites(updatedFavorites);
  
      // Almacenar los favoritos actualizados en el Local Storage
      localStorage.setItem('favoritesPoke', JSON.stringify(updatedFavorites));
    } else if (action === 'remove') {
      if (!isFavorite) {
        console.log('El Pokémon no está en la lista de favoritos.');
        return;
      }
      // Filtramos el Pokémon de la lista de favoritos
      const updatedFavorites = favorites.filter(favPokemon => favPokemon.id !== pokemon.id);
  
      // Actualizamos el estado de los favoritos en tu aplicación
      setFavorites(updatedFavorites);
  
      // Almacenar los favoritos actualizados en el Local Storage
      localStorage.setItem('favoritesPoke', JSON.stringify(updatedFavorites));
    }
  }
  // Manejo de favoritos
  const toggleFavoritePokemon = (pokemon, action) => {
    const isFavorite = favorites.some(favPokemon => favPokemon.id === pokemon.id);

    if (action === 'add') {
      if (isFavorite) return;

      const updatedFavorites = [...favorites, pokemon].slice(-10);
      setFavorites(updatedFavorites);
      localStorage.setItem('favoritesPoke', JSON.stringify(updatedFavorites));
    }

    if (action === 'remove') {
      if (!isFavorite) return;

      const updatedFavorites = favorites.filter(favPokemon => favPokemon.id !== pokemon.id);
      setFavorites(updatedFavorites);
      localStorage.setItem('favoritesPoke', JSON.stringify(updatedFavorites));
    }
  };

  return (
    <PokemonContext.Provider value={{
      allPokemons,
      filteredPokemons,
      handleCheckbox,
      sortPokemonList,
      FavoritesPokemon,
      toggleFavoritePokemon,
      topPokemon,
      favorites,
      setFavorites,
      loading,
      error,
      active,
      setActive
    }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error('usePokemon debe ser usado dentro de un PokemonProvider');
  }
  return context;
};
