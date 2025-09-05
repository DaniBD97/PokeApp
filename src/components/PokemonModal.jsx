import React from 'react';
import { Link } from 'react-router';
import usePokemonData from '../hooks/PokemonData.js';
import { colorByType } from '../hooks/ColotType.js';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export const PokemonModal = ({ pokemon, isOpen, onClose, onNext, onPrevious, isFirst, isLast }) => {
    if (!pokemon) return null;

    const { PokemonInfo, loading } = usePokemonData(pokemon.id);

    const formatPokemonId = (id) => String(id).padStart(3, '0');

    const primaryType = pokemon.types[0]?.type.name;
    const backgroundColor = primaryType ? colorByType[primaryType] : 'bg-gray-400';

    const images = [
        pokemon.sprites?.other["official-artwork"]?.front_default,
        pokemon.sprites?.other["official-artwork"]?.front_shiny,
    ].filter(Boolean); //

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center 
                        transition-opacity duration-300 ease-in-out z-40 p-4 
                        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`relative w-full max-w-4xl h-full max-h-[90vh] bg-gray-50 rounded-2xl shadow-lg 
                            transform transition-transform duration-500 ease-in-out z-50 flex flex-col
                            ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            >


                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/40 rounded-full hover:bg-white/60 transition-colors duration-200"
                    aria-label="Close modal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
                    {/* Sección de Imagen (Izquierda) */}
                    <div className={`w-full md:w-1/2 ${backgroundColor} flex flex-col justify-center items-center p-8 relative rounded-l-2xl`}>
                        <Swiper
                            modules={[Autoplay]}
                            autoplay={{
                                delay: 2000, // tiempo en ms entre slides
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            className="w-full max-w-[220px] drop-shadow-lg"
                        >
                            {images.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        className="w-full h-auto object-contain"
                                        loading="lazy"
                                        src={image}
                                        alt={`pokemon-${index}`}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>





                        {/* <img
                            src={pokemon.sprites?.other['official-artwork']?.front_default}
                            alt={pokemon.name}
                            className="w-full max-w-[250px] h-auto object-contain drop-shadow-lg"
                            style={{ imageRendering: 'pixelated' }}
                        /> */}


                        <h2 className="text-4xl font-bold capitalize text-white mt-4">{pokemon.name}</h2>
                        <span className="font-semibold text-white/80 text-lg">#{formatPokemonId(pokemon.id)}</span>
                        <ul className='flex justify-center gap-3 mt-3'>
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

                    {/* Sección de Información (Derecha) */}
                    <div className="w-full md:w-1/2 p-8 flex flex-col justify-between overflow-y-auto custom-scrollbar">
                        <div>
                            {/* Detalles físicos */}
                            <div className="mb-6">
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

                            {/* Debilidades */}
                            <div className="mb-6">
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

                        {/* Estadísticas Base (Abajo) */}
                        <div className="mt-6">
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
                </div>

                {/* Sección de Evoluciones (Abajo de todo) */}
                {PokemonInfo?.evolutions && PokemonInfo.evolutions.length > 0 && (
                    <section className='p-8 border-t-2 border-gray-200 mt-auto flex-shrink-0'>
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
    );
};