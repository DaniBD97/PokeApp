import { getEvolutionsData } from "./Services";


const formatStats = stats => {

    const nameStats = {
        hp: "HP",
        attack: "ATK",
        defense: "DEF",
        "special-attack": "SPA",
        "special-defense": "SPD",
        speed: "SPED",

    };

    const newStats = stats.map(({ stat, base_stat }) => ({
        name: nameStats[stat.name],
        base_stat,
    }))

    newStats.push(
        {
            name: "TOT",
            base_stat: newStats.reduce((acc, stat) => stat.base_stat + acc, 0)
        }
    )


    
    return newStats
};

const sort = ({newStats}) => {
    const sort = newStats.sort((a, b) => a.TOT - b.TOT)
 
   
};


const getImagePokemon = (sprites) => {
    return sprites.other["official-artwork"].front_default
};



const formatTypes = types => {
    const newTypes = types.map(({ type }) => type.name)


  
    return newTypes
}



// const formatAbilities = (abilities) => abilities.map((ability) => ability.ability.name);

const formatAbilities = (abilities) => {
    return abilities.map((ability) => ability.ability.name) || "Description not available";
};



const getDescription = (species) => {
    return species?.flavor_text_entries?.[0]?.flavor_text || "Description not available";
};


// const getDescription = (Specie) => Specie.flavor_text_entries[1].flavor_text ?? [];


const getEvolutions = async (evolutionInfo) => {

    const evolutions = [];

    let evolutionData = evolutionInfo.chain

    do {
        const evolutionDetail = evolutionData["evolution_details"][0];
        console.log(evolutionDetail);

        evolutions.push({
            name: evolutionData.species.name,
            min_level: evolutionDetail?.min_level ?? 'need something',

        });
        evolutionData = evolutionData.evolves_to[0];

    } while (!!evolutionData)

    const PromiseEvo = getEvolutionsData(evolutions)

    try {
        //este metodo permite que todas las promesas lleguen al mismo momento
        const res = await Promise.allSettled(PromiseEvo)
        ImgEvo(res, evolutions)
        //console.log(res);

    } catch (error) {
        console.log(error);
    }
    // console.log(PromiseEvo);
    return evolutions;



}




const ImgEvo = (res, evolutions) => {
    res.forEach((result, i) => {
        if (result.status === "fulfilled") {
            evolutions[i].image = result.value.data.sprites.other["official-artwork"].front_default;
            evolutions[i].pokemonInfo = result.value.data
        }



    })
}



export {
    formatStats,
    formatTypes,

    sort,
    formatAbilities,
    getDescription,
    getEvolutions,
    ImgEvo,
   

    getImagePokemon
}