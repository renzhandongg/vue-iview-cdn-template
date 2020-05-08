<template>
  <div>
    <!-- <VirtualList :listData="data" :itemSize="100" /> -->
    <FlipClock></FlipClock>
    <Button @click="renderFunc" alt="我爱你中国">Message</Button>
    <a href alt="我爱你中国">中欧</a>
  </div>
</template>
<script>
import { indexOffAll } from "@/js/array.js";
import VirtualList from "@/components/virtualList";
import FlipClock from "@/components/FlipClock.vue";
let d = [];
for (let i = 0; i < 1000; i++) {
  d.push({ id: i, value: i });
}
function de(arr, deep = 1) {
  return arr.reduce(
    (acc, el) =>
      acc.concat(deep > 1 && Array.isArray(el) ? de(el, deep - 1) : el),
    []
  );
}
export default {
  components: {
    VirtualList,
    FlipClock
  },
  data() {
    return {
      data: d,
      arr: ["123,我爱你中国", "456,最爱的母亲"]
    };
  },
  mounted() {
    import("../../../src/js/utils").then(app => {
      console.log(app);
    });
  },
  methods: {
    renderFunc() {
      this.$Message.info({
        duration: 10,
        render: h => {
          return h(
            "ul",
            this.arr.map(item => h("li", item + "只羊"))
          );
        }
      });
    }
  }
};
</script>
<style>
.red {
  background: red !important;
  display: block !important;
}
</style>
