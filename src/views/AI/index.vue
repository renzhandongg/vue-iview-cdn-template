<template>
  <div class="y-search">
    <div class="y-header">
      <Tabs>
        <TabPane label="全部" icon="ios-albums">
          <Form
            ref="formInline"
            :model="formInline"
            inline
            label-position="right"
            @submit.native.prevent
          >
            <!-- suffix="ios-search" -->
            <FormItem>
              <Input
                v-model="formInline.ticker"
                placeholder="请输入产品名称/代码"
                style="width: 200px"
                autofocus
                @keyup.native.enter="clickInput"
              />
            </FormItem>
            <FormItem>
              <Button @click="clickInput" type="success">搜索</Button>
            </FormItem>
          </Form>
          <tableAndPage
            :columns="columns"
            :tableData="tableData"
            :Total_Count="Total_Count"
            @changeTable="goTo"
          ></tableAndPage>
          <div class="heat">
            <Button @click="heat" size="small" type="error">热度</Button>
          </div>
        </TabPane>
        <TabPane label="重销" icon="md-barcode">内容</TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
import { findPageHotItem, findPageHotItemDetail } from "@/api/getData";
import { sset } from "@/utils";
import TableAndPage from "@/components/tableAndPage/index";
export default {
  components: {
    TableAndPage
  },
  data() {
    return {
      modalShowOrFalse: false,
      formInline: {
        ticker: null
      },
      columns: [
        {
          title: "产品名称",
          key: "inst_sname",
          width: 200,
          align: "left"
        },
        {
          title: "产品热度",
          key: "bycount",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "匹配人数",
          key: "countuser",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params);
                    }
                  }
                },
                "全景"
              )
            ]);
          }
        }
      ],
      page: {
        pageNum: 1,
        pageSize: 10,
        managerid: 21249
      },
      tableData: [],
      Total_Count: null,
      flag: true
    };
  },
  methods: {
    async getData() {
      let page = this.page;
      let data = await findPageHotItem(page);
      if (data.data.status == 200) {
        this.tableData = data.data.data;
        this.Total_Count = data.data.total;
      } else this.$Message.warning("请求错误");
    },
    goTo(e) {
      if (typeof e == "object") {
        this.page.pageSize = e["e"];
        this.page.pageNum = 1;
      } else this.page.pageNum = e;
      this.getData();
    },
    async show(e) {
      let code = e.row.inst_code || "";
      sset("AI_code", code);
      this.page.code = code || "";
      this.page.manager = this.page.managerid;
      let obj = Object.assign({}, this.page);
      let data = await findPageHotItemDetail(obj);
      if (data.data.status == 200) {
        this.$nextTick(() => {
          this.$router.push({
            name: "matchUser",
            params: {
              tableData: data.data.data,
              Total_Count: data.data.total
            }
          });
        });
      } else this.$Message.warning(data.data.msg);
    },
    clickInput() {
      if (this.formInline.ticker == "") {
        this.$Message.warning("请输入产品名称/代码");
        return;
      } else {
        this.page.managerid = this.formInline.ticker;
        this.getData();
      }
    },
    heat() {
      if (this.flag) {
        delete this.page.ordercount;
        this.page.orderhot = "asc";
        this.getData();
        this.flag = false;
      } else {
        this.flag = true;
        delete this.page.orderhot;
        this.page.ordercount = "asc";
        this.getData();
      }
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style lang="scss">
.resetButton {
  margin-left: 20px;
}
.heat {
  position: absolute;
  top: 67px;
  left: 336px;
}
</style>
