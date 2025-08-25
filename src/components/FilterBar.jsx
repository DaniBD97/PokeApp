
import { useState } from 'react';



import { usePokemon } from '../context/PokemonProvider';



export const FilterBar = () => {
    const { handleCheckbox, } = usePokemon();
    const [active, setActive] = useState(false)
  


    return (
        <div className={`chadow container-filters overflow-y-scroll no-scrollbar ${active ? 'active' : ''}`}>

            <div className='filter-by-type'>
                {/* <button className='btnCerrar' onClick={() => setActive(!Active)}> <span> X </span>cerrar</button> */}
                <h4 className='font-bold text-white'>Filter By Type:</h4>


                <div className='group-type'>
                    <input
                        type='checkbox'
                        onChange={handleCheckbox}
                        name='all'
                        id='all'
                    />
                    <label htmlFor='all' className='text-white '>All</label>
                </div>

                <div className='group-type'>
                    <input
                        type='checkbox'
                        onChange={handleCheckbox}
                        name='grass'
                        id='grass'
                    />
                    <label className='text-green-400 ' htmlFor='grass'>Grass</label>
                </div>
                <div className='group-type'>
                    <input
                        type='checkbox'
                        onChange={handleCheckbox}
                        name='fire'
                        id='fire'
                    />
                    <label className='text-red-400' htmlFor='fire'>Fire</label>
                </div>
                <div className='group-type'>
                    <input
                        type='checkbox'
                        onChange={handleCheckbox}
                        name='bug'
                        id='bug'
                    />
                    <label htmlFor='bug' className='text-lime-400'>Bug</label>
                </div>
                <div className='group-type'>
                    <input
                        type='checkbox'
                        onChange={handleCheckbox}
                        name='fairy'
                        id='fairy'
                    />
                    <label htmlFor='fairy' className='text-pink-400'>Fairy</label>
                </div>
                <div className='group-type'>
                    <input
                        type='checkbox'
                        onChange={handleCheckbox}
                        name='dragon'
                        id='dragon'
                    />
                    <label htmlFor='dragon' className='text-purple-500'>Dragón</label>
                </div>
                <div className='group-type'>
                    <input
                        type='checkbox'
                        onChange={handleCheckbox}
                        name='ghost'
                        id='ghost'
                    />
                    <label htmlFor='ghost' className='text-purple-400'>Ghost</label>
                </div>
                <div className='group-type'>
                    <input
                        type='checkbox'
                        onChange={handleCheckbox}
                        name='ground'
                        id='ground'
                    />
                    <label htmlFor='ground' className='text-amber-600'>Ground</label>
                </div>
                <div className='group-type'>
                    <input
                        type='checkbox'
                        onChange={handleCheckbox}
                        name='normal'
                        id='normal'
                    />
                    <label htmlFor='normal' className='text-white'>Normal</label>
                </div>
                <div className='group-type'>
                    <input
                        type='checkbox'
                        onChange={handleCheckbox}
                        name='psychic'
                        id='psychic'
                    />
                    <label htmlFor='psychic' className='text-fuchsia-600'>Psychic</label>
                </div>
                <div className='group-type'>
                    <input
                        type='checkbox'
                        onChange={handleCheckbox}
                        name='steel'
                        id='steel'
                    />
                    <label htmlFor='steel' className='text-gray-300'>Steel</label>
                </div>
                <div className='group-type'>
                    <input
                        type='checkbox'
                        onChange={handleCheckbox}
                        name='dark'
                        id='dark'
                    />
                    <label htmlFor='dark' className='text-[#9841f1]'>Dark</label>
                </div>
                <div className='group-type'>
                    <input
                        type='checkbox'
                        onChange={handleCheckbox}
                        name='electric'
                        id='electric'
                    />
                    <label htmlFor='electric' className='text-yellow-200'>Electric</label>
                </div>
                <div className='group-type'>
                    <input
                        type='checkbox'
                        onChange={handleCheckbox}
                        name='fighting'
                        id='fighting'
                    />
                    <label htmlFor='fighting' className='text-orange-400'>Fighting</label>
                </div>
                <div className='group-type'>
                    <input
                        type='checkbox'
                        onChange={handleCheckbox}
                        name='flying'
                        id='flying'
                    />
                    <label htmlFor='flying' className='text-cyan-300'>Flying</label>
                </div>
                <div className='group-type'>
                    <input
                        type='checkbox'
                        onChange={handleCheckbox}
                        name='ice'
                        id='ice'
                    />
                    <label htmlFor='ice' className='text-cyan-100'>Ice</label>
                </div>
                <div className='group-type'>
                    <input
                        type='checkbox'
                        onChange={handleCheckbox}
                        name='poison'
                        id='poison'
                    />
                    <label htmlFor='poison' className='text-purple-300'>Poison</label>
                </div>
                <div className='group-type'>
                    <input
                        type='checkbox'
                        onChange={handleCheckbox}
                        name='rock'
                        id='rock'
                    />
                    <label htmlFor='rock' className='text-[#d1a26c]'>Rock</label>
                </div>
                <div className='group-type'>
                    <input
                        type='checkbox'
                        onChange={handleCheckbox}
                        name='water'
                        id='water'
                    />
                    <label htmlFor='water' className='text-blue-600'>Water</label>
                </div>
            </div>
        </div>
    )
}