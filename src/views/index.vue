<template>
  <div class="layout main">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">
            <img src="../assets/logo.png" />
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu
            @on-select="turnToPage"
            :active-name="$route.name"
            theme="light"
            width="auto"
            ref="side_menu"
            :open-names="['1']"
            :accordion="accordion"
          >
            <template v-for="(s,i) in menuList">
              <MenuItem v-if="!s.menu" :name="s.name" :key="i">
                <Icon :type="s.icon" />
                {{s.text}}
              </MenuItem>
            </template>
          </Menu>
        </Sider>
        <Content class="main-content-con">
          <Layout class="main-layout-con">
            <div class="tag-nav-wrapper">
              <tags-nav
                :value="$route"
                @input="handleClick"
                :tagNavList="tagNavList"
                @on-close="handleCloseTag"
              />
            </div>
            <Content class="content-wrapper">
              <router-view />
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import { routeEqual, getNewTagList } from "@/utils";
import { mapMutations } from "vuex";
import TagsNav from "@/components/tags-nav";
export default {
  components: {
    TagsNav
  },
  name: "AI",
  data() {
    return {
      accordion: true,
      menuList: [
        {
          text: "用户",
          icon: "md-contacts",
          name: "user"
        },
        {
          text: "商品",
          icon: "ios-calendar",
          name: "u"
        },
        {
          text: "经济人",
          icon: "md-contact",
          name: "s"
        },
        {
          text: "AI",
          icon: "md-thunderstorm",
          name: "e"
        }
      ]
    };
  },
  methods: {
    ...mapMutations(["setTagNavList", "addTag", "closeTag"]),
    turnToPage(route) {
      let { name, params, query } = {};
      if (typeof route === "string") name = route;
      else {
        name = route.name;
        params = route.params;
        query = route.query;
      }
      this.$router.push({
        name,
        params,
        query
      });
    },
    handleCloseTag(res, type, route) {
      if (type !== "others") {
        if (type === "all") {
          this.turnToPage(this.$config.homeName);
        } else {
          if (routeEqual(this.$route, route)) {
            this.closeTag(route);
          }
        }
      }
      this.setTagNavList(res);
    },
    handleClick(item) {
      this.turnToPage(item);
    }
  },
  computed: {
    tagNavList() {
      return this.$store.state.app.tagNavList;
    }
  },
  mounted() {
    /**
     * @description 初始化设置标签导航
     */
    this.setTagNavList();
    const { name, params, query, meta } = this.$route;
    if (name !== "matchUser")
      this.addTag({
        route: { name, params, query, meta },
        type: "push"
      });
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        name: this.$config.homeName
      });
    }
    this.$nextTick(() => {
      let innerHeith = window.innerHeight;
      let height = this.$el.querySelector(".ivu-layout-header").clientHeight;
      this.$el.querySelector(".ivu-layout-has-sider").style.height =
        innerHeith - height - 20 + "px";
    });
  },
  watch: {
    $route(newRoute) {
      const { name, query, params, meta } = newRoute;
      if (params.tableData) return;
      this.addTag({
        route: { name, query, params, meta },
        type: "push"
      });
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute));
    }
  }
};
</script>
<style lang="scss">
.layout-logo {
  height: 30px;
  float: left;
  position: relative;
  vertical-align: middle;
  img {
    vertical-align: middle;
  }
}
.layout {
  height: 100%;
  //   background: #fff;
  position: relative;
  overflow: hidden;
}

.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 10px;
  min-height: 100%;
}

.ivu-layout {
  height: 100%;
  background-color: #eee;

  &-header {
    // background-color: #fff;
    padding: 0 20px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
  }
}

.ivu-layout.ivu-layout-has-sider {
  margin-top: 10px;
}

// .ivu-menu-dark {
//   background-color: #fff;
// }

.ivu-layout-content {
  background-color: #fff;
  padding: 15px 15px 0 15px;
}
.ivu-layout-sider {
  overflow: auto;
  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
}
.ivu-layout-sider-children {
  border-right: 1px solid #ccc;
}
.main .tag-nav-wrapper {
  padding: 0;
  height: 40px;
  background: #f0f0f0;
}
</style>