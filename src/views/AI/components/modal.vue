<template>
  <div>
    <Modal ref="myModal" v-model="visible" width="600" class-name="vertical-center-modal">
      <p slot="header">
        <span>产品匹配</span>
      </p>
      <div class="content">
        <div class="modalHeader">
          <ul>
            <li :class="[index==2?'addFlex':'']" v-for="(item,index) in list" :key="index">
              <span class="left">{{`${item.key} :`}}</span>
              <span class="right">{{`${item.value}`}}</span>
            </li>
          </ul>
        </div>
        <div class="modalContent common">
          <h3>推荐理由</h3>
          <ul>
            <li>1.lorem</li>
            <li>2.lorem</li>
            <li>3.lorem</li>
          </ul>
        </div>
        <div class="modalfooter common">
          <h3>推荐优秀话术</h3>
          <ul>
            <li>1.您好,***********</li>
            <li>2.您好,***********</li>
            <li>2.您好,***********</li>
          </ul>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "myModal",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
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
  }
};
</script>
<style lang="scss" scoped>
.content {
  font-size: 14px;
}
.modalHeader li {
  padding-bottom: 10px;
}
.left {
  display: inline-block;
  width: 80px;
  text-align: right;
}
.right {
  padding-left: 20px;
}
div.common {
  border-top: 1px solid #ccc;
  padding: 10px 20px;
}
// .addFlex {
//   display: flex;
// }
// .addFlex span:first-child {
//   width: 200px;
// }
ul {
  display: flex;
  flex-direction: column;
  li {
    display: flex;
    span:first-child {
      display: inline-block;
      width: 70px;
    }
    span:last-child {
      flex: 1;
    }
  }
}
</style>

