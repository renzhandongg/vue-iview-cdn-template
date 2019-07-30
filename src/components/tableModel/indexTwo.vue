<template>
  <div>
    <Modal ref="myModal" v-model="visible" width="1250" class-name="vertical-center-modal">
      <p slot="header">
        <span>{{tableModelContent}}</span>
      </p>
      <div>
        <Table
          stripe
          border
          :columns="tableDataModel[0].columns"
          :data="tableDataModel[0].tableData"
        ></Table>
        <Table
          border
          v-if="show"
          stripe
          :columns="tableDataModel[1].columns"
          :data="tableDataModel[1].tableData"
          style="margin-top:50px"
        ></Table>
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
    tableDataModel: {
      type: Array,
      default: function() {
        return [];
      }
    },
    tableModelContent: {
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
  mounted: function() {},
  computed: {
    show: function() {
      if (this.tableDataModel[1].columns.length >= 1) return true;
      else return false;
    }
  }
};
</script>

