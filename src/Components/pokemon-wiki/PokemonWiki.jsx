import { useState } from "react";
import { useEffect } from "react";

export const PokemonWiki = ({ pokemon }) => {



    const initialRelations = {
        "normal": 1,
        "fire": 1,
        "water": 1,
        "electric": 1,
        "grass": 1,
        "ice": 1,
        "fighting": 1,
        "poison": 1,
        "ground": 1,
        "flying": 1,
        "psychic": 1,
        "bug": 1,
        "rock": 1,
        "ghost": 1,
        "dragon": 1,
        "dark": 1,
        "steel": 1,
        "fairy": 1
    }

    const [sensibilities, setSensibilities] = useState(initialRelations);
    const [damagesTo, setDamagesTo] = useState(initialRelations);

    const actualizeSensibilities = () => {
        const newSensibilities = initialRelations;
        pokemon.types.forEach(type => {
            const typeSensibilities = type.damage_relations;
            Object.keys(typeSensibilities)?.forEach(key => {
                typeSensibilities[key].forEach(sensibility => {
                    newSensibilities[sensibility.name] *= sensibility.damage_relation;
                })
            })
        })
        setSensibilities(newSensibilities);
    }

    const actualizeDamagesTo = () => {
        const newDamagesTo = initialRelations;
        pokemon.types.forEach(type => {
            const typeSensibilities = type.damage_relations;
            Object.keys(typeSensibilities)?.forEach(key => {
                typeSensibilities[key].forEach(sensibility => {
                    newDamagesTo[sensibility.name] *= sensibility.damage_relation;
                })
            })
        })
        setDamagesTo(newDamagesTo);
    }


    useEffect(() => {
        if(Object.e) {
            console.log(pokemon);
        }
    }, [pokemon])


    // actualizeSensibilities();
    // actualizeDamagesTo();

    return (
        <div className="pokemon-wiki">
            <span>Sensibilities:</span>
                <ul>
                </ul>
            <p><span>Damage to:</span>

            </p>
        </div>
    )
}