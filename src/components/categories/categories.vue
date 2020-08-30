<template>
  <div>
    <my-breadcrumb :breadcrumb="['商品管理', '商品分类']"></my-breadcrumb>
    <el-card>
      <el-button
        @click="$refs['addCategories'].open()"
        style="margin-bottom: 15px;"
        type="primary"
        >添加分类</el-button
      >
      <el-table
        :data="categories.result"
        style="width: 100%"
        row-key="cat_id"
        border
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="cat_name" label="分类名称"></el-table-column>
        <el-table-column align="center" prop="cat_deleted" label="是否有效">
          <template slot-scope="scope">
            <i
              style="color: #67C23A;"
              v-if="!scope.row.cat_deleted"
              class="el-icon-success"
            ></i>
            <i style="color: #F56C6C;" v-else class="el-icon-error"></i>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="cat_level" label="级别">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.cat_level == 0" type="warning">一级</el-tag>
            <el-tag v-else-if="scope.row.cat_level == 1" type="success"
              >二级</el-tag
            >
            <el-tag v-else>三级</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="$refs['editCategories'].open(scope.row.cat_id)"
              size="mini"
              type="primary"
              icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button
              @click="deleteCategories(scope.row.cat_id)"
              size="mini"
              type="danger"
              icon="el-icon-delete"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="_handleSizeChange"
        @current-change="_handleCurrentChange"
        :current-page="ajaxParams.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="ajaxParams.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="categories.total"
      ></el-pagination>
    </el-card>
    <addCategories
      @_getCategories="_getCategories"
      ref="addCategories"
    ></addCategories>
    <editCategories
      @_getCategories="_getCategories"
      ref="editCategories"
    ></editCategories>
  </div>
</template>

<script>
import { getCategories, deleteCategoriesAjax } from "../../api/index";
import addCategories from "./addCategories";
import editCategories from "./editCategories";
export default {
  components: {
    addCategories,
    editCategories
  },
  data() {
    return {
      ajaxParams: {
        type: 3,
        pagenum: 1,
        pagesize: 10
      },
      categories: {}
    };
  },
  methods: {
    _handleSizeChange(val) {
      this.ajaxParams.pagesize = val;
    },
    _handleCurrentChange(val) {
      this.ajaxParams.pagenum = val;
    },
    _getCategories() {
      getCategories(this.ajaxParams).then(res => {
        if (res.meta.status == 200) {
          this.$message.success(res.meta.msg);
          this.categories = res.data;
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },
    deleteCategories(id) {
      this.$confirm("此操作将删除当前分类及所有下级分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteCategoriesAjax(`categories/${id}`).then(res => {
            if (res.meta.status == 200) {
              this.$message.success(res.meta.msg);
              this._getCategories();
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
    this._getCategories();
  },
  watch: {
    ajaxParams: {
      handler: function() {
        this._getCategories();
      },
      deep: true
    }
  }
};
</script>

<style lang="stylus" scoped></style>
