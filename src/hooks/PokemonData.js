import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatAbilities, formatStats, formatTypes, getDescription, getEvolutions, getImagePokemon } from '../hooks/Stats';

const usePokemonData = (id) => {
    const [PokemonInfo, setPokemonInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [nextPokemon, setNextPokemon] = useState('');
    const [previousPokemon, setPreviousPokemon] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const detailedPokemon = response.data;

                const { data: dataSpecies } = await axios.get(detailedPokemon.species.url);
                const { data: dataEvolution } = await axios.get(dataSpecies.evolution_chain.url);
                const { data: dataType } = await axios.get(detailedPokemon.types[0].type.url);
                const { data: dataLocation } = await axios.get(detailedPokemon.location_area_encounters);



                const evolutions = await getEvolutions(dataEvolution);
                console.log(evolutions);

                if (id < 1080) {
                    const nextResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${parseInt(id) + 1}?limit=1080`);
                    const nextPokemonName = nextResponse.data.name;
                    setNextPokemon(nextPokemonName);
                  } else {
                    // Si el ID del Pokémon siguiente excede el límite máximo
                    setNextPokemon(null); // o puedes manejarlo de otra manera según tu lógica de la aplicación
                  }
            
                  // Para el Pokémon anterior
                  if (id > 1) {
                    const previousResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${parseInt(id) - 1}?limit=1080`);
                    const previousPokemonName = previousResponse.data.name;
                    setPreviousPokemon(previousPokemonName);
                  } else {
                    // Si el ID del Pokémon anterior es menor que 1
                    setPreviousPokemon(null); // o puedes manejarlo de otra manera según tu lógica de la aplicación
                  }

                setPokemonInfo({
                    id: detailedPokemon.id || "Description not available",
                    name: detailedPokemon.name || "Description not available" ,
                    height: detailedPokemon.height || "Description not available",
                    weight: detailedPokemon.weight || "Description not available" ,
                    stats: formatStats(detailedPokemon.stats) ?? [],
                    types: formatTypes(detailedPokemon.types) ?? [],
                    abilities: formatAbilities(detailedPokemon.abilities) ?? [],
                    description: getDescription(dataSpecies) ?? [],
                    evolutions: evolutions ?? [],
                    image: getImagePokemon(detailedPokemon.sprites) ?? [],
                    image2: detailedPokemon.sprites.other["official-artwork"].front_shiny,
                    weak: dataType.damage_relations.double_damage_from || "Description not available", 
                    stronger: dataType.damage_relations.double_damage_to ,
                    location: dataLocation || "Description not available"
                });

                setLoading(false);

            } catch (error) {
                console.error('Error fetching Pokemon:', error);
                setLoading(false);
            }
        };

        fetchData();



    }, [id]);




    return { PokemonInfo, loading, nextPokemon, previousPokemon, setLoading };
};

export default usePokemonData;