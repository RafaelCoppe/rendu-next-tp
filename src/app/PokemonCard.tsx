import React from 'react';

interface PokemonType {
  name: string;
  image: string;
}

interface PokemonCardProps {
  pokedexId: number;
  name: string;
  image: string;
  types: PokemonType[];
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokedexId, name, image, types }) => {
  return (
    <div className="pokemon-card" key={pokedexId}>
      <div className="pokemon-image">
        <img src={image} alt={name} />
      </div>
      <div className="pokemon-info">
        <span className="pokemon-number">#{pokedexId}</span>
        <span className="pokemon-name">{name}</span>
      </div>
      <div className="pokemon-types">
        {types.map((type, typeId) => (
          <img key={`${pokedexId}_${typeId}`} src={type.image} alt={type.name} className='pokemon-types-image' />
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;