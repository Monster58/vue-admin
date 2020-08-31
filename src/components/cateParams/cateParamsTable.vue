<template>
  <div>
    <el-table :data="data" style="width: 100%" border stripe>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-tag
            :key="index"
            v-for="(tag, index) in scope.row.attr_vals"
            closable
            :disable-transitions="false"
            @close="handleClose(index, scope.row)"
            >{{ tag }}</el-tag
          >
          <el-input
            class="input-new-tag"
            v-if="scope.row.inputVisible"
            v-model="scope.row.inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(scope.row)"
            @blur="handleInputConfirm(scope.row)"
          ></el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput(scope.row)"
            >+ New Tag</el-button
          >
        </template>
      </el-table-column>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="attr_name" label="参数名"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="
              $refs['editParamsOrAttr'].open(
                currentCategoriesId,
                scope.row.attr_id
              )
            "
            size="mini"
            type="primary"
            icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button
            @click="deleteParamsOrAttr(currentCategoriesId, scope.row.attr_id)"
            size="mini"
            type="danger"
            icon="el-icon-delete"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <editParamsOrAttr
      @getCategoriesParams="getCategoriesParams"
      :id="currentCategoriesId"
      ref="editParamsOrAttr"
    ></editParamsOrAttr>
  </div>
</template>

<script>
import editParamsOrAttr from "./editParamsOrAttr";
import {
  deleteCategoriesParamsAjax,
  putCategoriesParamsAjax
} from "../../api/index";
export default {
  components: {
    editParamsOrAttr
  },
  props: {
    currentCategoriesId: {
      type: [String, Number]
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    getCategoriesParams() {
      this.$emit("getCategoriesParams");
    },
    deleteParamsOrAttr(id, attrid) {
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteCategoriesParamsAjax(
            `categories/${id}/attributes/${attrid}`
          ).then(res => {
            if (res.meta.status == 200) {
              this.$message.success(res.meta.msg);
              this.$emit("getCategoriesParams");
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
    },
    // putCategoriesParams(){

    // },
    handleClose(index, row) {
      const attr_vals = row.attr_vals;
      attr_vals.splice(index, 1);
      putCategoriesParamsAjax(
        `categories/${row.cat_id}/attributes/${row.attr_id}`,
        {
          attr_name: row.attr_name,
          attr_sel: row.attr_sel,
          attr_vals: attr_vals.join(" ")
        }
      ).then(res => {
        if (res.meta.status == 200) {
          this.$message.success(res.meta.msg);
          // this.getCategoriesParams();
          row = res.data;
        } else {
          this.$message.error(res.meta.msg);
        }
      });
      // attr_vals.splice(index,1)
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput(row) {
      row.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm(row) {
      let inputValue = row.inputValue;
      if (inputValue) {
        row.attr_vals.push(inputValue);
        const attr_vals = row.attr_vals.join(" ");
        putCategoriesParamsAjax(
          `categories/${row.cat_id}/attributes/${row.attr_id}`,
          {
            attr_name: row.attr_name,
            attr_sel: row.attr_sel,
            attr_vals
          }
        ).then(res => {
          if (res.meta.status == 200) {
            this.$message.success(res.meta.msg);
            row = res.data;
          } else {
            this.$message.error(res.meta.msg);
          }
        });
      }
      row.inputVisible = false;
      row.inputValue = "";
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
