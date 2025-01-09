import React from 'react';

// Modal component
const PokemonModal = ({ pokemon, onClose }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <button className="close-btn" onClick={onClose}>X</button>
      <div className="pokemon-modal-header">
        <img src={pokemon.image} alt={pokemon.name} className="pokemon-modal-image" />
        <h2 className='pokemon-modal-name'>{`#${pokemon.pokedexId} - ${pokemon.name}`}</h2>
        <div className="pokemon-modal-types">
          {pokemon.types.map((type, typeId) => (
            <img key={`${pokemon.pokedexId}_${typeId}`} src={type.image} alt={type.name} className='pokemon-types-image' />
          ))}
        </div>
      </div>
      <div className="pokemon-stats">
        <table className='pokemon-stats-table'>
          {Object.keys(pokemon.stats).map((index) => (
            <div key={index} className="stat">
              <tr>
                <td>{index}</td>
                <td>{pokemon.stats[index]}</td>
              </tr>
            </div>
          ))}
        </table>
      </div>
    </div>
  </div>
);

export default PokemonModal;