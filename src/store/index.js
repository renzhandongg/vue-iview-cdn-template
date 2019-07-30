// import Vue from 'vue';
// import Vuex from 'vuex';
import app from './modules/app'
// Vue.use(Vuex);
import Vuex from 'vuex'
export default new Vuex.Store({
    modules: {
        app,
    },
    // state: {
    //     showFooter: true,
    //     num: 100
    // },
    // getters: { //实时监听state值的变化(最新状态)
    //     isShow(state) {
    //         return state.showFooter;
    //     },
    //     getNum(state) {
    //         return state.num;
    //     }
    // },
    // mutations: {
    //     show(state) {
    //         state.showFooter = false;
    //     },
    //     setNum(state, sum) {
    //         state.num += sum;
    //     }
    // },
    // actions: {
    //     hideFooter(context) {
    //         context.commit('isShow');
    //     },
    //     setSt(context, sum) {
    //         context.commit('setNum', sum);
    //     }
    // }
});