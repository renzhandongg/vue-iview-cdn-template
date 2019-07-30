<template>
  <div>
    <Modal ref="myModal" v-model="visible" width="800" class-name="vertical-center-modal">
      <p slot="header">
        <span>{{tableContent}}</span>
      </p>
      <div>
        <Table stripe border :columns="tableModel.columns" :data="tableModel.tableData"></Table>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "myModal",
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false
    },
    tableModel: {
      type: Object,
      default: function() {
        return {};
      }
    },
    tableContent: {
      type: String,
      default: "详情"
    }
  },
  data() {
    return {
      visible: this.value
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
    visible(val) {
      if (!val) this.$emit("input", false);
    }
  },
  methods: {},
  mounted: function() {}
};
</script>

