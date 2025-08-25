import React from 'react';

import Nav from './components/Nav';
import PokemonList from './page/PokemonList';
import { Route, Routes } from 'react-router';
import RankingPokemon from './page/RankingPokemon';
import { PokemonFavorites } from './page/PokemonFavorites';

const AppRouter = () => {
  return (
    <div>
      {/* Nav siempre visible */}
      <Nav />

      {/* Rutas sin layout anidado */}
      <Routes>
        <Route path='/' element={<PokemonList />} />
        <Route path='/ListPokemon' element={<PokemonList />} />
        <Route path="/Ranking" element={<RankingPokemon />} />
        <Route path="/Listfavorites" element={<PokemonFavorites />} />
        {/* <Route path="/pokemon/:id" element={<PokemonDetail />} /> */}
        {/* */}
        {/* Más rutas... */}
      </Routes>
    </div>
  );
};

export default AppRouter;