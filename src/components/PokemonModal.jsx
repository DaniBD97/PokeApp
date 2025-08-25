import React from 'react';
import { Link } from 'react-router'; // Asegúrate de importar Link correctamente si usas react-router
import usePokemonData from '../hooks/PokemonData.js'; // Ajusta la ruta a tu hook
import { colorByType } from '../hooks/ColotType.js'; // Ajusta la ruta a tus colores

// Componente para las flechas de navegación
const NavigationArrow = ({ direction, onClick }) => (
    <button
        onClick={(e) => {
            e.stopPropagation(); 
            onClick();
        }}
        className="absolute top-4 z-10 p-2 bg-white/30 rounded-full hover:bg-white/50 transition-colors duration-200"
        style={direction === 'left' ? { left: '1rem' } : { right: '1rem' }}
        aria-label={`Go to ${direction === 'left' ? 'previous' : 'next'} Pokémon`}
    >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {direction === 'left' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            )}
        </svg>
    </button>
);

export const PokemonModal = ({ pokemon, isOpen, onClose,onNext,onPrevious,isFirst,isLast }) => {
    // Si no hay un pokémon, no renderizamos nada para estar seguros.
    if (!pokemon) return null;

    const { PokemonInfo, loading, nextPokemon, previousPokemon } = usePokemonData(pokemon.id);

    // Formatear el ID del Pokémon para que siempre tenga 3 dígitos (ej: 001, 025, 151)
    const formatPokemonId = (id) => String(id).padStart(3, '0');

    // Obtener el color principal del Pokémon para el fondo del encabezado
    const primaryType = pokemon.types[0]?.type.name;
    const backgroundColor = primaryType ? colorByType[primaryType] : 'bg-gray-400';

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end 
                        transition-opacity duration-300 ease-in-out z-40 overflow-y-auto no-scrollbar ab
                        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`relative w-full max-w-3xl h-11/12 bg-gray-50 rounded-t-2xl shadow-lg 
                            transform transition-transform duration-500 ease-in-out z-50 overflow-y-auto
                            ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
            >
                {/* --- SECCIÓN SUPERIOR CON COLOR DINÁMICO E IMAGEN --- */}
                <div className={`relative ${backgroundColor} rounded-t-2xl px-6 pt-12 pb-20`}>
                  

                    <div className="relative flex flex-col mt-4 text-center">
                        <img
                            src={pokemon.sprites?.other['official-artwork']?.front_default}
                            alt={pokemon.name}
                            className="w-48 h-48 mx-auto absolute mt-[60px] -top-32 left-1/2 -translate-x-1/2"
                            style={{ imageRendering: 'pixelated' }} // Mejora la calidad de la imagen de pixel art si es necesario
                        />
                        <h2 className="text-4xl font-bold capitalize text-white mt-[120px]">{pokemon.name}</h2>
                        <span className="font-semibold text-white/80 text-lg">#{formatPokemonId(pokemon.id)}</span>
                        
                        {/* Tipos */}
                        <ul className='flex justify-center gap-3 '>
                            {pokemon.types?.map(typeInfo => (
                                <li
                                    className={`p-1.5 rounded-md px-5 text-white font-bold text-sm shadow-md ${colorByType[typeInfo.type.name]}`}
                                    key={typeInfo.type.name}
                                >
                                    {typeInfo.type.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* --- SECCIÓN DE CONTENIDO PRINCIPAL --- */}
                <div className="p-6">
                    {/* Grid para estadísticas y detalles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-4">
                        
                        {/* Columna Izquierda: Detalles físicos */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-3 border-b-2 pb-1">Características</h3>
                                <div className="flex justify-around text-center mt-3">
                                    <div>
                                        <h4 className='text-md font-semibold text-gray-500'>Altura</h4>
                                        <span className='text-lg font-medium text-slate-700'>{PokemonInfo?.height} cm</span>
                                    </div>
                                    <div>
                                        <h4 className='text-md font-semibold text-gray-500'>Peso</h4>
                                        <span className='text-lg font-medium text-slate-700'>{PokemonInfo?.weight} kg</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className='text-lg font-bold text-slate-800 capitalize mb-2'>Debilidades</h4>
                                <ul className='flex flex-wrap justify-start gap-2'>
                                    {PokemonInfo?.weak.map((weak) => (
                                        <li key={weak.name} className={`capitalize text-center text-xs p-1 w-[80px] font-semibold items-center rounded-md px-2 text-white shadow-sm ${colorByType[weak.name]}`}>
                                            {weak.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Columna Derecha: Estadísticas Base */}
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3 border-b-2 pb-1">Estadísticas Base</h3>
                            <div className="space-y-2">
                                {pokemon.stats?.map(stat => (
                                    <div key={stat.stat.name} className="grid grid-cols-3 items-center gap-2">
                                        <span className="text-sm font-semibold capitalize text-gray-600 col-span-1">{stat.stat.name.replace('-', ' ')}</span>
                                        <div className="col-span-2 flex items-center gap-2">
                                            <span className="font-bold text-slate-800 w-8">{stat.base_stat}</span>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div className={`${backgroundColor} h-2.5 rounded-full`} style={{ width: `${(stat.base_stat / 255) * 100}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sección de Evoluciones */}
                    {PokemonInfo?.evolutions && PokemonInfo.evolutions.length > 0 && (
                        <section className='mx-auto mt-10'>
                            <h3 className='text-center text-2xl font-bold text-slate-800 p-2 mb-4'>Evoluciones</h3>
                            <div className='flex justify-center items-center gap-2 sm:gap-6 flex-wrap'>
                                {PokemonInfo.evolutions.map((evo, i) => (
                                    <React.Fragment key={evo.name}>
                                        {i > 0 && (
                                            <div className='text-center font-bold text-gray-500'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                                {evo.min_level && <span className='text-sm'>Lv. {evo.min_level}</span>}
                                            </div>
                                        )}
                                        <div className='flex flex-col text-center capitalize justify-center items-center'>
                                            <Link to={`/pokemon/${evo?.pokemonInfo?.id}`} onClick={onClose} className='group'>
                                                <div className='rounded-full bg-gray-200 justify-center p-2 group-hover:bg-gray-300 transition-colors'>
                                                    <img className='w-[100px] h-[100px] scale-110' src={evo.image} alt={evo.name} />
                                                </div>
                                                <span className="mt-2 font-semibold text-slate-700">{evo.name}</span>
                                            </Link>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};