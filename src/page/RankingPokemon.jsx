import React, { useContext } from 'react';
import { formatStats } from '../hooks/Stats';
import { usePokemon } from '../context/PokemonProvider';




const RankingPokemon = () => {
 const { topPokemon } = usePokemon();
 console.log(topPokemon);
 

  return (
    <section className='p-2 mx-auto   bg-gray-100'>
      <h1 className='text-3xl text-center  mt-2 p-2 text-black font-bold text-4xl border-gray-600 w-fit mx-auto'>Strongest Pokemon</h1>
      <article className={`flex-auto  h-fit pt-4 gap-2 mx-auto max-w-[1250px] grid grid-cols-[repeat(auto-fit,_minmax(330px,_1fr))]`}>
        {topPokemon.map((pokemon, index) => (
          <div className='p-3 items-center rounded-[20px]  flex mt-[150px] flex-col  relative bg-[#232323] text-center justify-center' key={index}>
            <div className='relative '>
              <div className='justify-start ml-[36px]  mt-[-140px] absolute bg-[#232323] rounded-full w-[250px] flex items-center ' >
                <div className='w-12'>
                  <img className='absolute mt-[-125px] w-[100%]' src="./src/assets/Pokeball.png" alt="" />
                </div>
                <img className=' mx-auto scale-125  ' src={pokemon?.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
              </div>
              <div className='flex flex-col mt-[130px] mr-5 justify-end' >
                <strong className='text-2xl text-white capitalize'>{pokemon?.name}<span> #{pokemon?.id}</span></strong>
                <div className='flex gap-2 mt-3 text-center justify-center'>
                  {pokemon?.types.map((type, index) => 
                  
                  <li className={`list-none h-fit w-fit text-black font-bold p-2 rounded-md  bg-white`} key={index}>{type.type.name}</li>)}
                </div>
                <ul className='flex justify-center gap-2 mt-3 flex-wrap'>
                  {formatStats(pokemon?.stats).map((stat) => (
                    <li className='bg-white p-1 rounded-full' key={stat.name}>
                      <div className='bg-yellow-400 rounded-full w-[30px] aspect-square grid place-content-center'>
                        <span className='text-xs text-white font-semibold'>{stat.name}</span>
                      </div>
                      <span>{stat.base_stat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </article>
    </section>
  );
};

export default RankingPokemon;