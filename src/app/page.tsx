"use client"
import React, { useEffect, useState, useRef } from 'react';
import Image from "next/image";
import './app.css';
import PokemonCard from './PokemonCard';

export default function Home() {
  const [pokemons, setPokemons] = useState([]); // Liste des Pokémon
  const [isLoading, setIsLoading] = useState(false); // Indicateur de chargement
  const [page, setPage] = useState(1); // Page courante
  const [limit, setLimit] = useState("50"); // Limite des résultats par page

  const sentinelRef = useRef(null); // Référence pour l'observateur

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Charger les Pokémon
  const fetchPokemons = async (currentPage) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://nestjs-pokedex-api.vercel.app/pokemons?limit=${limit}&page=${currentPage}`);
      const data = await response.json();
      if (currentPage > 1) {
        await delay(1000); // Attente pour un effet visuel
      }
      setPokemons((prevPokemons) => [...prevPokemons, ...data]); // Ajouter les nouveaux Pokémon
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Charger la première page au montage
  useEffect(() => {
    fetchPokemons(page);
  }, [page]);

  // Observateur pour détecter la visibilité du sentinel
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoading) {
          setPage((prevPage) => prevPage + 1); // Charger la page suivante
        }
      },
      { threshold: 1.0 } // Observer lorsque l'élément est totalement visible
    );

    const sentinel = sentinelRef.current;
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [isLoading]);

  return (
    <div className="app">
      <div className="topbar">
        <div className="logo">
          <Image src="/pokeball.png" alt="Pokeball" width={16} height={16} />
          <span>Pokedex</span>
        </div>
        <div className="filters">
          <input type="text" placeholder="Rechercher un Pokémon" className="search-input" />
          <select multiple className="multi-select">
            <option value="fire">Feu</option>
            <option value="water">Eau</option>
            <option value="grass">Plante</option>
          </select>
          <select
            className="limit_select"
            onChange={(e) => {
              setLimit(e.target.value);
              setPokemons([]);
              setPage(1);
            }}
          >
            <option value="50">Limit</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
      <div className="main">
        <div className="pokemons">
          {pokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.pokedexId}
              pokedexId={pokemon.pokedexId}
              name={pokemon.name}
              image={pokemon.image}
              types={pokemon.types}
            />
          ))}
        </div>
        {isLoading && <div className="loading">Chargement...</div>}
        <div ref={sentinelRef} className="sentinel"></div> {/* Sentinel */}
      </div>
    </div>
  );
}
