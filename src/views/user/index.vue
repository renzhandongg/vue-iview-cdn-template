<template>
  <div>
    <Form ref="formInline" :model="formInline" inline label-position="right" class="from">
      <!-- <FormItem label="选择时间" :label-width="100">
          <DatePicker
            type="daterange"
            split-panels
            placeholder="选择时间"
            style="width: 230px"
            v-model="formInline.date"
          ></DatePicker>
      </FormItem>-->
      <FormItem>
        <InputNumber placeholder="输入ID" v-model="formInline.ticker" style="width:150px" />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit">查询</Button>
        <Button type="info" @click="reset('formInline')" class="resetButton">重置操作</Button>
      </FormItem>
    </Form>
    <tableAndPage
      :columns="columns"
      :tableData="tableData"
      :Total_Count="Total_Count"
      @changeTable="goTo"
    ></tableAndPage>
    <tableTwoModel
      :tableDataModel="tableDataModel"
      :tableModelContent="tableModelContent"
      v-model="tableModalShowOrFalse"
    ></tableTwoModel>
    <tableOneModel :tableContent="tableContent" v-model="tableModal" :tableModel="tableModel" />
  </div>
</template>
<script>
import TableAndPage from "@/components/tableAndPage";
import TableTwoModel from "@/components/tableModel/indexTwo";
import TableOneModel from "@/components/tableModel/indexOne";
import { findPageUser, findUserOrderPredict, findOneUser } from "api/getData";
export default {
  components: {
    TableAndPage,
    TableTwoModel,
    TableOneModel
  },
  data() {
    return {
      tableModel: {
        columns: [
          {
            title: "日期",
            key: "upd_timestamp",
            width: 100,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h("span", {
                  domProps: {
                    innerHTML: `${new Date(params.row.upd_timestamp).Format(
                      "yyyy-MM-dd"
                    )}`
                  }
                })
              ]);
            }
          },
          {
            title: "用户ID",
            key: "user_code",
            width: 100,
            align: "center"
          },
          {
            title: "用户名称",
            key: "user_fname",
            width: 100,
            align: "center"
          },
          {
            title: "未知",
            key: "ppn_tmstamp",
            width: 100,
            align: "center"
          },
          {
            title: "未知",
            key: "modify_datetime",
            width: 100,
            align: "center"
          }
        ],
        tableData: []
      },
      tableContent: "用户详情",
      tableModal: false,
      tableModelContent: "",
      tableModalShowOrFalse: false,
      tableDataModel: [
        {
          columns: [
            {
              title: "近12个月购买记录",
              align: "center",
              children: [
                {
                  title: "用户ID",
                  key: "user_code",
                  align: "center",
                  width: 150
                },
                {
                  title: "类别ID",
                  key: "itemcls",
                  align: "center",
                  width: 100
                },
                {
                  title: "购买数量",
                  key: "buycount",
                  align: "center",
                  width: 180,
                  sortable: true
                },
                {
                  title: "类别名称",
                  key: "dd_item_name",
                  align: "center",
                  width: 175,
                  sortable: true
                }
              ]
            }
            // {
            //   title: "小类",
            //   align: "center",
            //   children: [
            //     {
            //       title: "用户ID",
            //       key: "code",
            //       align: "center",
            //       width: 150
            //     },
            //     {
            //       title: "小类ID",
            //       key: "cls",
            //       align: "center",
            //       minWidth: 100
            //     },
            //     {
            //       title: "购买数量",
            //       key: "count",
            //       align: "center",
            //       width: 180,
            //       sortable: true
            //     },
            //     {
            //       title: "类别名称",
            //       key: "item_name",
            //       align: "center",
            //       width: 175,
            //       sortable: true
            //     }
            //   ]
            // }
          ],
          tableData: []
        },
        {
          columns: [
            {
              title: "模型推荐",
              align: "center",
              children: [
                {
                  title: "用户ID",
                  key: "user_code",
                  align: "center",
                  width: 150
                },
                {
                  title: "类别ID",
                  key: "itemcls",
                  align: "center",
                  width: 100
                },
                {
                  title: "类别名称",
                  key: "dd_item_name",
                  align: "center",
                  width: 175,
                  sortable: true
                },
                {
                  title: "预测评分",
                  key: "score",
                  align: "center",
                  width: 180
                }
              ]
            }
            // {
            //   title: "小类",
            //   align: "center",
            //   children: [
            //     {
            //       title: "用户ID",
            //       key: "code",
            //       align: "center",
            //       width: 150
            //     },
            //     {
            //       title: "小类ID",
            //       key: "cls",
            //       align: "center",
            //       minWidth: 100
            //     },
            //     {
            //       title: "类别名称",
            //       key: "item_name",
            //       align: "center",
            //       width: 175,
            //       sortable: true
            //     },
            //     {
            //       title: "预测评分",
            //       key: "scor",
            //       align: "center",
            //       width: 180
            //     }
            //   ]
            // }
          ],
          tableData: []
        }
      ],
      modalShowOrFalse: false, //行情模态框
      detailsContent: "内容",
      formInline: {
        ticker: null
        // date: [
        //   `${new Date().Format("yyyy-MM-dd")}`,
        //   `${new Date().Format("yyyy-MM-dd")}`
        // ]
      },
      columns: [
        {
          title: "序号",
          width: 100,
          key: "index",
          align: "center",
          render: (h, par) => {
            let self = this;
            return h(
              "div",
              (self.page.pageNum - 1) * self.page.pageSize + par.index + 1
            );
          }
        },

        {
          title: "日期",
          key: "upd_timestamp",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("span", {
                domProps: {
                  innerHTML: `${new Date(params.row.upd_timestamp).Format(
                    "yyyy-MM-dd"
                  )}`
                }
              })
            ]);
          }
        },
        {
          title: "ID",
          key: "user_code",
          width: 200,
          align: "center"
        },
        {
          title: "用户名称",
          key: "user_fname",
          width: 200,
          align: "center"
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
                "用户详细"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.buyMore(params);
                    }
                  }
                },
                "购买详细"
              )
            ]);
          }
        }
      ],
      tableData: [],
      page: {
        pageNum: 1,
        pageSize: 10
        // from_Date: `${new Date().Format("yyyy-MM-dd")}`,
        // to_Date: `${new Date().Format("yyyy-MM-dd")}`
      },
      copyPage: {},
      Total_Count: null
    };
  },
  mounted: function() {
    this.$nextTick(() => {
      this.copyPage = JSON.parse(JSON.stringify(this.page));
      this.getData();
    });
  },
  methods: {
    handleSubmit() {
      let self = this;
      let data = Object.assign({}, this.formInline);
      self.page.user_code = data.ticker;
      //   self.page.from_Date = data.date[0].Format("yyyy-MM-dd");
      //   self.page.to_Date = data.date[1].Format("yyyy-MM-dd");
      self.getData();
    },
    async getData() {
      let data = Object.assign({}, this.page);
      const d = await findPageUser(data).catch(() => {
        this.$Message.error("请求错误");
      });
      if (d.status == 200) {
        this.tableData = d.data;
        this.Total_Count = d.total;
      } else this.$Message.warning(d.msg);
    },
    goTo(e) {
      if (typeof e == "object") {
        this.page.pageSize = e.e;
        this.page.pageNum = 1;
      } else this.page.pageNum = e;
      this.getData();
    },
    reset() {
      this.page = this.copyPage;
      this.getData();
    },
    async buyMore(e) {
      this.tableModelContent = `用户编号:${e.row.user_code}     用户姓名:${e.row.user_fname}`;
      const d = await findUserOrderPredict({
        user_code: e.row.user_code
      }).catch(() => {
        this.$Message.error("请求错误");
      });
      if (d) {
        let data = d.data.typeBuy.map(it => {
          return {
            code: it.user_code,
            cls: it.itemcls,
            count: it.buycount,
            item_name: it.dd_item_name
          };
        });
        let typeData = d.data.typePredict.map(it => {
          return {
            code: it.user_code,
            cls: it.itemcls,
            scor: it.score,
            item_name: it.dd_item_name
          };
        });
        this.tableDataModel[0].tableData = d.data.clsBuy.map((it, index) => {
          return Object.assign(it, data[index]);
        });
        this.tableDataModel[1].tableData = d.data.clsPredict.map(
          (it, index) => {
            return Object.assign(it, typeData[index]);
          }
        );
        // this.tableData = d.result.neeq_news;
      }
      this.$nextTick(() => {
        this.tableModalShowOrFalse = true;
      });
    },
    async show(e) {
      const d = await findOneUser({ user_code: e.row.user_code }).catch(() => {
        this.$Message.error("请求错误");
      });
      if (d) {
        this.tableModel.tableData = [d.data];
      }
      this.$nextTick(() => {
        this.tableModal = true;
      });
    }
  }
};
</script>
<style lang="scss">
.subCol > ul > li {
  margin: 0 -18px;
  list-style: none;
  text-align: center;
  height: 30px;
  padding: 9px;
  border-bottom: 1px solid #ccc;
  overflow-x: hidden;
}
.subCol > ul > li:last-child {
  border-bottom: none;
}
.resetButton {
  margin-left: 20px;
}
</style>
