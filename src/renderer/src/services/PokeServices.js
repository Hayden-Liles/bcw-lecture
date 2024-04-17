import { AppState } from '../AppState'
    import { PokeAPI } from './AxiosService';
    import {Poke} from '../models/Poke'


    function getRandomPokeId() {
        const min = Math.ceil(1); // minimum poke id
        const max = Math.floor(1025); // maximum poke id
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async function getPokemonDamageDetails(pokeData){
        const detailPromises = pokeData.types.map(async (typeEntry) => {
            const typeData = (await PokeAPI.get(`type/${typeEntry.type.name}`)).data
            return {
                weaknesses: typeData.damage_relations.double_damage_from.map(weakness => weakness.name),
                strengths: typeData.damage_relations.double_damage_to.map(strength => strength.name)
            }
        })

        const detailData = await Promise.all(detailPromises)

        const allWeaknesses = detailData.flatMap(detail => detail.weaknesses)
        const allStengths = detailData.flatMap(detail => detail.strengths)

        const uniqueWeaknesses = [...new Set(allWeaknesses)];
        const uniqueStrengths = [...new Set(allStengths)]

        return { weaknesses: uniqueWeaknesses, strengths: uniqueStrengths };
    }


    class PokeServices {

        async getPokemon(id) {
            const pokeData = (await PokeAPI.get(`pokemon/${id}`)).data
            const pokeDetails = await getPokemonDamageDetails(pokeData)
            pokeData.weaknesses = pokeDetails.weaknesses
            pokeData.strengths = pokeDetails.strengths
            return new Poke(pokeData)
        }

        async getRandomPoke(){
            const randomPokeId = getRandomPokeId()
            const Pokemon = await this.getPokemon(randomPokeId)

            AppState.pokes.push(Pokemon)
        }
        
        selectPokemon(pokemonId){
            AppState.poke = AppState.pokes.find(p => p.id == pokemonId)
        }

    }

    export const pokeServices = new PokeServices();