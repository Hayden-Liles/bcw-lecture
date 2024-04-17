export class Poke {
        constructor(pokeData) {
            this.id = pokeData.id;
            this.name = pokeData.name;
            this.stats = pokeData.stats.map(stat => ({
                name: stat.stat.name,
                total: stat.base_stat
            }));
            this.types = pokeData.types.map(type => type.type.name);
            this.weaknesses = pokeData.weaknesses;
            this.strengths = pokeData.strengths;
            this.images = {
                default: pokeData.sprites.front_default,
                shiny: pokeData.sprites.front_shiny
            };
        }
    }