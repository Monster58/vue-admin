<template>
  <div>
    <my-breadcrumb :breadcrumb="['订单管理', '订单列表']"></my-breadcrumb>
    <el-card>
      <el-input
        placeholder="请输入内容"
        v-model="queryParams.query"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-table :data="orderData.goods" border style="width: 100%" stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column
          prop="order_number"
          label="订单号"
          width="240"
        ></el-table-column>
        <el-table-column prop="order_price" label="订单价格"></el-table-column>
        <el-table-column prop="order_pay" label="是否付款">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.order_pay != 0" type="success"
              >已付款</el-tag
            >
            <el-tag v-else type="danger">未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"></el-table-column>
        <el-table-column label="下单时间" width="180">
          <template slot-scope="scope">{{
            scope.row.create_time | formatDate | updateTime
          }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button
              @click="$refs['editOrders'].open()"
              type="primary"
              icon="el-icon-edit"
              circle
            ></el-button>
            <el-button
              @click="$refs['logistics'].open()"
              type="warning"
              icon="el-icon-location"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.pagenum"
        :page-sizes="[5, 10, 15]"
        :page-size="queryParams.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="orderData.total"
      ></el-pagination>
    </el-card>
    <editOrders ref="editOrders"></editOrders>
    <logistics ref="logistics"></logistics>
  </div>
</template>

<script>
import { getOrdersAjax } from "../../api/index";
import { formatDate, updateTime } from "../../filter/index";
import editOrders from "./editOrders";
import logistics from "./logistics"; //logistics
export default {
  components: {
    editOrders,
    logistics
  },
  data() {
    return {
      queryParams: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      orderData: {}
    };
  },
  methods: {
    getOrders() {
      getOrdersAjax(this.queryParams).then(res => {
        if (res.meta.status == 200) {
          this.orderData = res.data;
          this.$message.success(res.meta.msg);
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },
    handleSizeChange(val) {
      this.queryParams.pagesize = val;
      this.getOrders();
    },
    handleCurrentChange(val) {
      this.queryParams.pagenum = val;
      this.getOrders();
    }
  },
  created() {
    this.getOrders();
  },
  filters: {
    formatDate,
    updateTime
  }
};
</script>

<style lang="stylus" scoped>
.input-with-select {
  width: 30%;
  margin-bottom: 15px;
}
</style>
