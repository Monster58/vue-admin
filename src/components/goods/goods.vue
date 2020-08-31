<template>
  <div>
    <my-breadcrumb :breadcrumb="['商品管理', '商品列表']"></my-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input
            clearable
            placeholder="请输入内容"
            v-model="queryParams.query"
          >
            <el-button
              @click="searchGoods"
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="10">
          <el-button type="primary">添加商品</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="goodsList.goods"
        style="width: 100%;margin-top:15px;"
        border
      >
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column
          prop="goods_name"
          label="商品名称"
          width="540"
        ></el-table-column>
        <el-table-column
          prop="goods_price"
          label="商品价格（元）"
        ></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
        <el-table-column prop="add_time" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top"
            >
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
            >
              <el-button
                @click="deleteGoods(scope.row.goods_id)"
                size="mini"
                type="danger"
                icon="el-icon-delete"
              ></el-button>
            </el-tooltip>
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
        :total="goodsList.total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getGoodsListAjax, deleteGoodsAjax } from "../../api/index";
export default {
  data() {
    return {
      goodsList: [],
      queryParams: {
        query: "",
        pagenum: 1,
        pagesize: 10
      }
    };
  },
  methods: {
    getGoodsList() {
      getGoodsListAjax(this.queryParams).then(res => {
        if (res.meta.status == 200) {
          this.$message.success(res.meta.msg);
          this.goodsList = res.data;
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },
    handleSizeChange(val) {
      this.queryParams.pagesize = val;
      this.getGoodsList();
    },
    handleCurrentChange(val) {
      this.queryParams.pagenum = val;
      this.getGoodsList();
    },
    searchGoods() {
      this.queryParams.pagenum = 1;
      this.getGoodsList();
    },
    deleteGoods(id) {
      this.$confirm("此操作将删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteGoodsAjax(`goods/${id}`).then(res => {
            if (res.meta.status == 200) {
              this.$message.success(res.meta.msg);
              this.getGoodsList();
            } else {
              this.$message.error(res.meta.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.getGoodsList();
  }
};
</script>

<style lang="stylus" scoped></style>
