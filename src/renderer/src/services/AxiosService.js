    import Axios from 'axios'

    export const PokeAPI = Axios.create({
        baseURL: "https://pokeapi.co/api/v2/",
        timeout: 8000,
    })