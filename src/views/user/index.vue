<template>
  <div>
    <!-- <VirtualList :listData="data" :itemSize="100" /> -->
    <FlipClock></FlipClock>
  </div>
</template>
<script>
import VirtualList from "@/components/virtualList";
import FlipClock from "@/components/FlipClock.vue";
let d = [];
for (let i = 0; i < 1000; i++) {
  d.push({ id: i, value: i });
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
  }
};
</script>
<style lang="scss">
</style>
