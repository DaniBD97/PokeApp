import { Link } from 'react-router';
import { usePokemon } from '../context/PokemonProvider';
import { imgByType } from '../hooks/ColotType';

// Utilidad: capitaliza el nombre del Pokémon
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export const PokemonFavorites = () => {
  const { favorites } = usePokemon();

  return (
    <article className="bg-black min-h-screen w-full">
      <div className="max-w-7xl mx-auto text-center p-5">
        <h1 className="text-white text-2xl md:text-3xl p-5 font-extrabold tracking-tight">
          Hello Trainer Master, catch your favorites!
        </h1>
      </div>

      <div className="max-w-7xl mt-2 mx-auto p-4 grid grid-cols-[repeat(auto-fit,_minmax(270px,_1fr))] gap-6 md:gap-8">
        {favorites.map((pokemon) => {
          const name = capitalize(pokemon.name);
          const key = pokemon.id ?? pokemon.name;

          // Sprite preferido
          const bw = pokemon?.sprites?.versions?.["generation-v"]?.["black-white"]?.animated;
          const sprite = bw?.front_default
            ? (Math.random() > 0.5 ? bw.front_shiny : bw.front_default)
            : pokemon?.sprites?.front_default;

          return (
            <Link to={`/pokemon/${pokemon.name}`} key={key} className="no-underline">
              {/* CARD BLANCO – tipografía negra, imagen y nombre dominantes */}
              <div
                className="group h-[500px] relative overflow-hidden rounded-3xl
                 bg-white text-black shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* Imagen destacada */}
                <div className="p-8 sm:p-10 flex items-center justify-center">
                  {sprite ? (
                    <img
                      src={sprite}
                      alt={pokemon.name}
                      className="h-40 w-40 md:h-48 md:w-48 object-contain drop-shadow pixel-art pixelate transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="h-40 w-40 md:h-48 md:w-48 grid place-items-center rounded-2xl bg-neutral-100 text-neutral-500 text-sm">
                      No image
                    </div>
                  )}
                </div>

                {/* Contenido */}
                <div className="px-6 pb-6">
                  {/* Nombre súper destacado */}
                  <h2 className="text-center text-2xl md:text-3xl font-extrabold tracking-tight">
                    {name}
                  </h2>

                  {/* Tipos – pequeños chips minimalistas con ícono */}
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                    {pokemon.types?.map((t) => (
                      <span
                        key={t.type.name}
                        className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700"
                      >
                      
                        {t.type.name}
                      </span>
                    ))}
                  </div>

                  {/* Movimientos – detalle sutil */}
                  {pokemon.moves && pokemon.moves.length > 0 && (
                    <div className="mt-6 border-t border-neutral-200 pt-4">
                      <h3 className="text-[10px] uppercase tracking-widest text-neutral-500 text-center mb-2">
                        Moves
                      </h3>
                      <div className="flex flex-wrap justify-center gap-2">
                        {pokemon.moves
                          .slice()
                          .sort(() => 0.5 - Math.random())
                          .slice(0, 3)
                          .map((m, i) => (
                            <span
                              key={i}
                              className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700 border border-neutral-200"
                              title={m.move.name}
                            >
                              {m.move.name.replace(/-/g, ' ')}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sombra decorativa inferior para dar profundidad sin color */}
                <div className="pointer-events-none absolute -bottom-10 left-0 right-0 h-24 bg-gradient-to-t from-black/5 to-transparent"></div>
              </div>
            </Link>
          );
        })}
      </div>
    </article>
  );
};
