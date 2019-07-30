<template>
  <div id="app">
    <!-- <transition v-bind:css="false" v-on:before-enter="beforeEnter"  v-on:enter="enter"> -->
    <!-- <transition
      v-bind:css="false"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:before-leave="beforeleave"
      v-on:leave="leave"
      v-on:after-leave="afterleave"
    >-->
    <!-- <keep-alive :include="include"> -->
    <!-- 会被缓存的组件 -->
    <!-- <router-view v-if="$route.meta.keepAlive" keepAlive/> -->
    <router-view/>
    <!-- </keep-alive> -->
    <!-- </transition> -->
    <!-- <HelloWorld msg="我的小时候,吵闹任性的时候"/> -->
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    // HelloWorld
  },
  data: () => {
    return {
      //   include: [],
      //   SPEED: 300,
      //   firstReact: {},
      //   transitionType: ""
    };
  }
  //   computed: {
  //     SLIDE() {
  //       return ["slide-left", "slide-right"].includes(this.transitionType);
  //     },
  //     FLIP() {
  //       return (
  //         ["flipEnter", "flipLeave"].includes(this.transitionType) &&
  //         this.transitionType
  //       );
  //     }
  //   },
  //   methods: {
  //     beforeEnter(e) {
  //       if (this.SLIDE) {
  //         let x = this.transitionType === "slide-right" ? "-100%" : "%100";
  //         e.style.cssText = `transition: transform ${
  //           this.SPEED
  //         }ms;transform: translate(${x}, 0);`;
  //       }
  //     },
  //     enter(e, done) {
  //       if (this.SLIDE) {
  //         requestAnimationFrame(() => {
  //           e.style.cssText = `transition: transform ${
  //             this.SPEED
  //           }ms;transform: translate(0, 0);`;
  //         });
  //         //监听 transitionend 事件
  //         let transitionend = window.onanimationend ?'transitionend':'webkitTransitionEnd';
  //         e.addEventListener(transitionend,function onEnd(){
  //             e.removeEventListener(transitionend,onEnd);
  //             done();
  //         })
  //       }
  //     //   if(this.FLIP === 'flipEnter'){
  //     //     let lastReact = dom.getBoundingClientRect();
  //     //   }
  //     }
  //   },
  //   watch: {
  //     $route(to, from) {
  //       if (to.meta.transitionType || from.meta.transitionType) {
  //         this.transitionType = to.meta.transitionType
  //           ? "flipEnter"
  //           : "flipLeave";
  //       } else {
  //         if (to.meta.deepth || from.meta.deepth) {
  //           this.transitionType = to.meta.deepth ? "slide-left" : "slide-right";
  //         }
  //       }
  //     }
  //   }
};
</script>

<style>
</style>
