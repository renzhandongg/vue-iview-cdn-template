<template>
  <div>
    <div class="y-body">
      <Table border stripe :columns="columns" :data="tableData"></Table>
    </div>
    <div class="y-footer">
      <Page
        :total="Total_Count"
        :page-size-opts="pageSizeOpts"
        show-sizer
        show-elevator
        @on-change="goTo"
        @on-page-size-change="showSize"
        show-total
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "tabAndPage",
  props: {
    columns: {
      type: Array,
      default: function() {
        return [];
      }
    },
    tableData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    Total_Count: {
      type: Number,
      default: null
    },
    pageSizeOpts: {
      type: Array,
      default: function() {
        return [10, 20, 30, 40];
      }
    }
  },
  data() {
    return {
      stripe: true
    };
  },
  methods: {
    goTo(e) {
      this.$emit("changeTable", e);
    },
    showSize(e) {
      this.$emit("changeTable", { e, flag: true });
    }
  }
};
</script>
<style lang="scss" scoped>
.y-footer {
    float:right;
  // position: absolute;
  // bottom: 10px;
  // right: 10px;
  padding-top: 50px;
}
</style>
