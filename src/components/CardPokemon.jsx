// CardPokemon.js (versión actualizada con modal de Tailwind)
import React, { useState, useEffect } from 'react';
import { usePokemon } from '../context/PokemonProvider';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { toast } from 'react-toastify';
import { colorByType } from '../hooks/ColotType.js';
// Importa el nuevo modal
import { PokemonModal } from './PokemonModal';

export const CardPokemon = ({ pokemon, className }) => {
    const { favorites, FavoritesPokemon } = usePokemon();
    const [isHeartFilled, setIsHeartFilled] = useState(false);
    // Nuevo estado para controlar la visibilidad del modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    useEffect(() => {
        setIsHeartFilled(favorites.some(favPokemon => favPokemon.id === pokemon.id));
    }, [favorites, pokemon.id]);

    const formatPokemonId = (id) => {
        if (id == null || typeof id !== 'number') return '';
        return String(id).padStart(3, '0');
    };

    const heart = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (isHeartFilled) {
            FavoritesPokemon(pokemon, 'remove');
            toast.error(`${pokemon.name} eliminado de favoritos`, { autoClose: 2000 });
        } else {
            if (favorites.length >= 10) {
                toast.error('No puedes agregar más de 10 favoritos', { autoClose: 2000 });
                return;
            }
            FavoritesPokemon(pokemon, 'add');
            toast.success(`${pokemon.name} agregado a favoritos`, { autoClose: 2000 });
        }
    };

    // Si el pokemon no ha cargado, no renderices nada
    if (!pokemon?.types) {
        return null;
    }

    return (
        // Usamos un Fragment (<>) para envolver la tarjeta y el modal
        <>
            <article className='relative' onClick={() => setIsModalOpen(true)}>
                {/* Ya no necesitamos el componente Link */}
                <div
                    className={`h-[170px] text-center bg-white justify-center sm:rounded-lg
                      capitalize relative isolate shadow-lg shadow-slate-400/10 pb-2 cursor-pointer
                      group grid gap-1 card-bounce hover:card-bounce `}
                >
                    <button onClick={heart} className='absolute top-2 right-2 w-10 z-10 p-1'>
                        {isHeartFilled ? <IconHeartFilled width={30} stroke={'black'} style={{ color: "red" }} /> : <IconHeart stroke={1} width={30} />}
                    </button>

                    <div className='flex gap-2 items-center'>
                        <img
                            src={pokemon?.sprites?.other["official-artwork"]?.front_default}
                            alt={pokemon.name}
                            className='w-[150px] scale-110  h-auto'
                        />

                        <section className="flex flex-col items-start w-full pr-4">
                            <div className='text-left'>
                                <p className='text-3xl font-bold uppercase'>{pokemon.name}</p>
                                <span className='font-semibold text-gray-500'>#{formatPokemonId(pokemon.id)}</span>
                            </div>

                            <ul className='flex justify-start gap-2 mt-2'>
                                {pokemon?.types?.map(typeInfo => (
                                    <li
                                        className={`p-1 rounded-md px-3 text-sm font-bold text-white ${colorByType[typeInfo.type.name]}`}
                                        key={typeInfo.type.name}
                                    >
                                        {typeInfo.type.name}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </div>
            </article>

            {/* Renderizamos el modal y le pasamos el estado y la función para cerrarlo */}
            <PokemonModal
                pokemon={pokemon}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}

            />
        </>
    );
};