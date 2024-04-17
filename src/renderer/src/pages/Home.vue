<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center mt-2 fs-3 fw-semibold">
                <p class="font-pokemon fs-5">Electron's</p>
                <p class="font-pokemon fs-1">Pokédex</p>
            </div>
            <div class="col-12 text-center my-3">
                <img :src="icon" class="icon" alt="">
            </div>
            <div class="col-12 mt-5 text-center">
                <button class="btn bg-primary" @click="getRandomPoke">Get Random Pokemon</button>
            </div>
            <div class="col-12">
                <form class="my-3 text-center">
                    <p class="font-pokemon m-2">Find Pokemon:</p>
                    <input type="search" name="pokeSearch" id="pokeSearch" class="bg-primary">
                    <div class="my-2">
                        <button class="btn btn-sm btn-danger" id="pokeSearchBtn">Submit</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="row mt-5">
            <div
                class="col-12 d-flex justify-content-center align-items-center border-top border-bottom pt-1 pb-3 mb-3">
                <p class="font-pokemon fs-3">Your Pokemon</p>
            </div>

            <div class="col-2 pokeCard d-flex justify-content-center" v-for="p in pokes">
                <router-link :to="{ name: 'PokePage', params: { pokemonId: p.id } }" @click="selectPokemon(p.id)">
                    <img :src="p.images.default" class="pokeImg" alt="as">
                </router-link>
            </div>
        </div>
    </div>
</template>


<script setup>
import { computed } from 'vue';
import icon from '../assets/imgs/icon.png'
import { pokeServices } from '../services/PokeServices'
import { AppState } from '../AppState';

const pokes = computed(() => AppState.pokes)

async function getRandomPoke() {
    try {
        window.electron.getSystemInfo()
        // await pokeServices.getRandomPoke()
    }
    catch (error) {
        console.error(error)
    }
}

function selectPokemon(pokemonId) {
    pokeServices.selectPokemon(pokemonId)
}

</script>


<style lang="scss" scoped>
.pokeCard {
    filter: drop-shadow(0 0 13px white) brightness(95%);
}

.pokeCard:hover {
    filter: drop-shadow(0 0 18px white) brightness(105%);
    cursor: pointer;
}

.pokeImg {
    height: 100%;
}
</style>