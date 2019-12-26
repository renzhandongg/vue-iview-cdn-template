<template>
  <div>
    <!-- <VirtualList :listData="data" :itemSize="100" /> -->
    <FlipClock></FlipClock>
  </div>
</template>
<script>
import {indexOffAll} from "@/js/array.js"
import VirtualList from "@/components/virtualList";
import FlipClock from "@/components/FlipClock.vue";
let d = [];
for (let i = 0; i < 1000; i++) {
  d.push({ id: i, value: i });
}
function de(arr,deep = 1){
  return arr.reduce((acc,el) => acc.concat(deep>1 && Array.isArray(el) ? de(el,deep-1) : el),[])
}
export default {
  components: {
    VirtualList,
    FlipClock
  },
  data() {
    return {
      data: d
    };
  },
  mounted(){
    console.log(de([1,2,3,[4,[5]]],4))
  }
};
</script>
