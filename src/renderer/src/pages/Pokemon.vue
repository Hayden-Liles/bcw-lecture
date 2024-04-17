<template>
    <div class="container" v-if="pokemon">
        <div class="row">
            <div class="col-12 text-end my-3">
                <router-link :to="{ name: 'HomePage' }">
                    <span class="mdi mdi-chevron-left text-light fs-1 border rounded"></span>
                </router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-5 d-flex justify-content-center text-center mt-3">
                <img :src="pokemon.images?.default" alt="" class="pokeImg">
            </div>
            <div class="col-7 flex-grow-1">
                <div class="row statsContainer p-3">
                    <div class="col-6 text-center" v-for="stat in pokemon.stats">
                        <p class="fs-5 fw-bold">{{ stat.name }}</p>
                        <p class="fw-semibold">{{ stat.total }}</p>
                    </div>
                </div>
            </div>
            <div class="col-5 d-flex justify-content-center text-center mt-3">
                <img :src="pokemon.images.shiny" alt="" class="pokeImg">
            </div>
        </div>
    </div>
</template>


<script setup>
import { computed, watchEffect } from 'vue';
import { AppState } from '../AppState';

let pokemon = computed(() => AppState.poke)
watchEffect(() => {
    if (pokemon.value) {
        console.log(pokemon.value)
    }
})



</script>


<style lang="scss" scoped>
.pokeImg {
    height: 250px;
}

.statsContainer {
    height: 350px;
    background-color: rgb(77, 88, 94);
}
</style>