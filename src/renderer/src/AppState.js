import { reactive, watch, watchEffect } from 'vue'

    export const AppState = reactive({
        /** @type {import('./models/Poke').Poke[]} */
        pokes: [],
        poke: null,
    })

    watchEffect(() => {
        if (window.electron) {
            window.electron.loadAppState()
            window.electron.onAppStateLoaded((loadedAppState) => {
                Object.assign(AppState, loadedAppState)
            })
        }
    })

    watch(
        () => AppState,
        () => {
            if (window.electron) {
                const plainAppState = JSON.parse(JSON.stringify(AppState));
                window.electron.saveAppState(plainAppState)
            }
        },
        { deep: true }
    )