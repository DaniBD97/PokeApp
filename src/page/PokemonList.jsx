import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { usePokemon } from '../context/PokemonProvider';
import { SortPokemon } from '../components/SortPokemon';
import { CardPokemon } from '../components/CardPokemon';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const INITIAL_LIMIT = 30;
const LOAD_INCREMENT = 10;

const PokemonList = () => {
    // ✅ CORREGIDO: Usar el nombre correcto que exporta el Provider
    const { allPokemons, filteredPokemons, loading, error, Active, setActive } = usePokemon();
    
    console.log("🔍 DEBUG - allpokemons:", allPokemons);
    console.log("🔍 DEBUG - filteredPokemons:", filteredPokemons);
    
    const [search, setSearch] = useState('');
    const [offSet, setOffSet] = useState(INITIAL_LIMIT);

    const targetObserver = useRef(null);
    const entry = useIntersectionObserver(targetObserver, []);
    const isVisible = !!entry?.isIntersecting;

    // ✅ CORREGIDO: Usar el nombre correcto de la variable
    const pokemonsToDisplay = useMemo(() => {
        const basePokemonList = filteredPokemons.length > 0 ? filteredPokemons : allPokemons;
        
        console.log("🔍 DEBUG - basePokemonList length:", basePokemonList?.length);
        
        if (!search.trim()) {
            return basePokemonList || [];
        }

        const lowercaseSearch = search.toLowerCase();
        const filtered = (basePokemonList || []).filter(pokemon => 
            pokemon.name.toLowerCase().includes(lowercaseSearch) ||
            String(pokemon.id).includes(lowercaseSearch)
        );
        
       
        return filtered;
    }, [allPokemons, filteredPokemons, search]); // ✅ CORREGIDO: Nombre correcto en dependencias

    // Efecto para el scroll infinito con todas las dependencias necesarias
    useEffect(() => {
        if (isVisible && pokemonsToDisplay.length > 0 && offSet < pokemonsToDisplay.length) {
            const newOffSet = Math.min(offSet + LOAD_INCREMENT, pokemonsToDisplay.length);
            setOffSet(newOffSet);
        }
    }, [isVisible, pokemonsToDisplay.length, offSet]);

    // Efecto para reiniciar el contador cuando cambia la búsqueda o los filtros
    useEffect(() => {
        setOffSet(INITIAL_LIMIT);
    }, [search, filteredPokemons]);

    // Handlers memoizados
    const handleChangeSearch = useCallback((e) => {
        setSearch(e.target.value);
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
    }, []);

    const handleToggleFilter = useCallback(() => {
        setActive(!Active);
    }, [Active, setActive]);

    // Manejo de estados de carga y error
    if (loading) {
        return <p className="text-center text-white text-2xl mt-10">Cargando Pokémon...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 text-2xl mt-10">Error: {error}</p>;
    }

    const displayedPokemons = pokemonsToDisplay.slice(0, offSet);
    const hasMoreToLoad = offSet < pokemonsToDisplay.length;
    

    return (
        <div className='bg-[#232323] p-4 py-5'>

            <div className='sm:flex sm:flex-row flex flex-row justify-between items-center mb-4 sm:max-w-[1400px] md:mx-auto '>
                <form onSubmit={handleSubmit} className="flex-grow w-[350px] sm:max-w-xl">
                    <div className='flex text-lg'>
                        <input
                            className='outline-none flex-1 rounded-md p-2 bg-gray-700 text-white placeholder-gray-400'
                            type='search'
                            name='pokemonName'
                            value={search}
                            onChange={handleChangeSearch}
                            placeholder='Buscar por nombre o ID'
                        />
                    </div>
                </form>

                <div className='flex items-center gap-4'>
                    <div 
                        className='icon-filter cursor-pointer flex items-center gap-2' 
                        onClick={handleToggleFilter}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleToggleFilter();
                            }
                        }}
                    >
                        {/* <svg 
                            xmlns='http://www.w3.org/2000/svg' 
                            fill='none' 
                            viewBox='0 0 24 24' 
                            strokeWidth='1.5' 
                            stroke='currentColor' 
                            className='w-6 h-6 text-white'
                        >
                            <path 
                                strokeLinecap='round' 
                                strokeLinejoin='round' 
                                d='M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75' 
                            />
                        </svg> */}
                        
                    </div>
                    <SortPokemon />
                </div>
            </div>

            <div className='flex'>
                <article className='flex-auto h-fit pt-4 gap-4 grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))]'>
                    {displayedPokemons.length > 0 ? (
                        displayedPokemons.map((pokemon) => {
                            console.log("🔍 Rendering pokemon:", pokemon.name);
                            return <CardPokemon key={pokemon.id} pokemon={pokemon} />;
                        })
                    ) : (
                        <p className="text-center text-gray-400 col-span-full">
                            No se encontraron Pokémon.
                        </p>
                    )}
                    
                    {/* Elemento observador solo si hay más contenido por cargar */}
                    {hasMoreToLoad && (
                        <span 
                            ref={targetObserver} 
                            className="col-span-full h-4"
                            aria-hidden="true"
                        />
                    )}
                </article>
            </div>
        </div>
    );
};

export default PokemonList;