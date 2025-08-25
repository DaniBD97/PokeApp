import React, { useContext } from 'react';
import Select from 'react-select';
import { usePokemon } from '../context/PokemonProvider';


export const SortPokemon = () => {

    const { sortPokemonList } = usePokemon();
    const suppliers = [
        { label: 'All', value: '' },
        { label: 'A-Z', value: 'asc' },
        { label: 'Z-A', value: 'desc' },
        { label: 'First at Last', value: 'ascN' },
        { label: 'Last at First', value: 'descN' },
       
    ];

    const handleSortChange = (selectedOption) => {
        sortPokemonList(selectedOption); // Llama a la función para ordenar
    };

    return (
        <div className='z-20 mr-10 text-[20px] w-[100px] justify-start'>
            <Select
                className='select-options'
                defaultValue={suppliers[0]}
                options={suppliers}
                onChange={handleSortChange} // Usa la función de manejo de cambio
            />
        </div>
    );
};