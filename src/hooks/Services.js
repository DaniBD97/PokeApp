import axios from "axios"

const getEvolutionsData = (evolutions) => {
    return evolutions.map(async (evo) => await axios.get(`https://pokeapi.co/api/v2/pokemon/${evo.name}/`))
};


const getWeakData = (weak) => {
    return weak.map(async (w) => await axios.get(`https://pokeapi.co/api/v2/pokemon/${w.name}/`))
};


const getRegionData = (region) => {
    return region.map(async (region) => await axios.get(`https://pokeapi.co/api/v2/location/${region.name}/`))
};

export {getEvolutionsData,getWeakData,getRegionData};