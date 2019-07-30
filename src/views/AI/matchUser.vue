<template>
  <div>
    <div class="y-search">
      <div class="y-header">
        <Form ref="formInline" :model="formInline" inline label-position="right">
          <FormItem>
            <Input
              placeholder="请输入客户姓名"
              style="width: 200px"
              autofocus
              @keyup.native.enter="clickInput"
              v-model="formInline.ticker"
            />
          </FormItem>
          <FormItem>
            <Button type="success" @click="clickInput">搜索</Button>
            <Button @click="goToPrev" type="info" style="margin-left:20px;">返回上一级</Button>
          </FormItem>
        </Form>
      </div>
    </div>
    <tableAndPage
      :columns="columns"
      :tableData="tableData"
      :Total_Count="Total_Count"
      @changeTable="goTo"
    ></tableAndPage>
    <Modal v-model="modalShowOrFalse" :list="list" />
  </div>
</template>
<script>
import TableAndPage from "@/components/tableAndPage/index.vue";
import { sget } from "@/utils";
import { Message } from "iview";
import { findPageHotItemDetail, findItemUserDetail } from "@/api/getData";
import Modal from "./components/modal.vue";
let numeral = require("numeral");
export default {
  components: {
    TableAndPage,
    Modal
  },
  data() {
    return {
      modalShowOrFalse: false,
      page: {
        pageNum: 1,
        pageSize: 10,
        code: ""
      },
      formInline: {
        ticker: null
      },
      columns: [
        {
          title: "客户姓名",
          key: "name",
          width: 100,
          align: "left"
        },
        // {
        //   title: "客户性别",
        //   key: "sex",
        //   width: 80,
        //   align: "left"
        // },
        // {
        //   title: "客户年龄",
        //   key: "age",
        //   width: 80,
        //   align: "left"
        // },
        {
          title: "匹配分",
          key: "score",
          width: 100,
          align: "left"
        },
        {
          title: "总资产",
          key: "assets",
          width: 100,
          align: "center",
          render: (h, par) => {
            return h("div", numeral(par.row.assets).format("0,0.00"));
          }
        },
        {
          title: "推荐理由",
          key: "reason",
          minWidth: 200,
          align: "center"
        },
        {
          title: "查看",
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
                "用户详细"
              )
            ]);
          }
        }
      ],
      tableData: [],
      Total_Count: null,
      list: [],
      listData: ["客户姓名", "匹配分", "详情"]
    };
  },
  methods: {
    async clickInput() {
      if (this.formInline.ticker == null || this.formInline.ticker == "") {
        Message.warning("请输入客户姓名");
        return;
      } else {
        let name = this.formInline.ticker;
        this.page.name = name;
        this.getData();
      }
    },
    async show(e) {
      this.page.inst_code = sget("AI_code") || "";
      this.page.user_code = e.row.code;
      let data = await findItemUserDetail(this.page);
      if (data.data.status === 200) {
        let list = Object.keys(data.data.data);
        let l = list
          .map((it, index) => {
            return {
              key: it,
              value: Object.values(data.data.data)[index]
            };
          })
          .filter(
            it =>
              it.key == "itemname" || it.key == "score" || it.key == "reason"
          );
        //    it.key == "cash_asset" ||
        this.listData.forEach((it, index) => {
          l[index].key = it;
        });
        this.list = l;
        this.$nextTick(() => {
          this.modalShowOrFalse = true;
        });
      } else this.$Message.wraning("请求错误");
    },
    goTo(e) {
      if (typeof e == "object") {
        this.page.pageSize = e["e"];
        this.page.pageNum = 1;
      } else this.page.pageNum = e;
      this.getData();
    },
    async getData() {
      let code = sget("AI_code");
      // let code = "000006";
      this.page.code = code || "";
      let obj = Object.assign({}, this.page);
      let data = await findPageHotItemDetail(obj);
      if (data.data.status == 200) {
        this.tableData = data.data.data;
        this.Total_Count = data.data.total;
      } else Message.warning(data.data.msg);
    },
    goToPrev() {
      this.$router.push({
        name: "AI"
      });
    }
  },
  created() {
    let params = this.$route.params;
    this.tableData = params.tableData || [];
    this.Total_Count = params.Total_Count || null;
  }
};
</script>