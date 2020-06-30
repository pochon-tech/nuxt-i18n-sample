export const state = () => ({
    counter: 0,
    greeting2: 'greeting'
})
   
export const mutations = {
    increase(state) {
        state.counter++
    },
    decrease(state) {
        state.counter--
    }
}