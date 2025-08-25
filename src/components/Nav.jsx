import { IconHeart, IconHeartFilled, IconMenu2 } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router';
import { usePokemon } from '../context/PokemonProvider';

const Nav = () => {
  const { favorites } = usePokemon();
  const [modalFav, setModalFav] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const ToggleFav = () => {
    setModalFav(!modalFav);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Navbar principal */}
      <article className='mx-auto flex h-[50px] overflow-hidden bg-[#000000] text-[#000000] font-semibold text-[20px] relative sm:justify-center items-center'>
        {/* Botón de menú móvil */}
        <button
          className='mr-6 ml-2 sm:hidden md:hidden lg:hidden'
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          <IconMenu2 size={'50px'} color='white' />
        </button>

        {/* Navegación para pantallas grandes */}
        <section className='max-w-[1280px] mx-auto hidden sm:flex items-center'>
          <section className='flex items-center'>
            {/* Botón de favoritos */}


            {/* Enlaces de navegación */}
            <Link
              className='p-4 w-[200px] h-[50px] text-white hover:bg-[#F2F2F2] border-b-white border-b-4 hover:text-black hover:border-b-white transition-all ease-in flex items-center justify-center'
              to="/ListPokemon"
            >
              Home
            </Link>

            <Link
              className='p-4 w-[200px] h-[50px] text-white hover:bg-blue-600 border-b-blue-600 border-b-4 hover:text-white hover:border-b-white transition-all ease-in flex items-center justify-center'
              to="/ListPokemon"
            >
              Pokedex
            </Link>

            <Link
              className='p-4 w-[200px] h-[50px] text-white hover:bg-red-500 border-b-red-500 border-b-4 hover:text-white hover:border-b-white transition-all ease-in flex items-center justify-center'
              to="/Listfavorites"
            >
              Favorites
              <div
                className='flex p-2 items-center '
                aria-label={`Favoritos: ${favorites.length}`}
              >
                {favorites.length < 1 ? (
                  <IconHeart color='white' />
                ) : (
                  <IconHeartFilled
                    stroke={'black'}
                    width={20}
                    style={{ color: "white" }}
                  />
                )}
                <span className='text-white ml-1'>{favorites.length}</span>
              </div>
            </Link>

            <Link
              className='p-4 w-[200px] h-[50px] text-white hover:bg-green-500 border-b-green-500 border-b-4 hover:text-white hover:border-b-white transition-all ease-in flex items-center justify-center'
              to="/Ranking"
            >
              Ranking
            </Link>

            <Link
              className='p-4 w-[200px] h-[50px] text-white hover:bg-purple-500 border-b-purple-500 border-b-4 hover:text-white hover:border-b-white transition-all ease-in flex items-center justify-center'
              to="/"
            >
              Gallery
            </Link>
          </section>
        </section>
      </article>

      {/* Overlay para cerrar el menú móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={closeMenu}
          aria-label="Cerrar menú"
        />
      )}

      {/* Menú móvil */}
      <div className={`
        fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out rounded-r-[20px]
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        sm:hidden
      `}>
        {/* Header del menú móvil */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Menú</h2>
            <button
              onClick={closeMenu}
              className="p-2 rounded-md hover:bg-gray-100"
              aria-label="Cerrar menú"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Enlaces del menú móvil */}
        <nav className="p-4">
          <Link
            className='text-gray-950 hover:bg-black hover:text-white block px-3 py-3 rounded-md text-base font-medium mb-2 transition-colors'
            to="/"
            onClick={closeMenu}
          >
            🏠 Home
          </Link>

          <Link
            className='text-gray-950 hover:bg-black hover:text-white block px-3 py-3 rounded-md text-base font-medium mb-2 transition-colors'
            to="/ListaPokemon"
            onClick={closeMenu}
          >
            📱 Pokedex
          </Link>

          <Link
            className='text-gray-950 hover:bg-black hover:text-white block px-3 py-3 rounded-md text-base font-medium mb-2 transition-colors'
            to="/Favoritos"
            onClick={closeMenu}
          >
            ❤️ Favoritos ({favorites.length})
          </Link>

          <Link
            className='text-gray-950 hover:bg-black hover:text-white block px-3 py-3 rounded-md text-base font-medium mb-2 transition-colors'
            to="/Top"
            onClick={closeMenu}
          >
            🏆 Ranking10
          </Link>

          <Link
            className='text-gray-950 hover:bg-black hover:text-white block px-3 py-3 rounded-md text-base font-medium mb-2 transition-colors'
            to="/Gallery"
            onClick={closeMenu}
          >
            🖼️ Gallery
          </Link>
        </nav>
      </div>

      {/* Outlet para renderizar las rutas hijas */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Nav;