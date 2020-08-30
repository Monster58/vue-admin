<template>
  <el-dialog
    title="添加分类"
    :visible.sync="dialogVisible"
    width="60%"
    @close="_resetForm"
  >
    <el-form
      ref="addCategoriesForm"
      label-position="left"
      label-width="80px"
      :model="formLabelAlign"
      :rules="rules"
    >
      <el-form-item label="分类名称" prop="cat_name">
        <el-input v-model="formLabelAlign.cat_name" clearable></el-input>
      </el-form-item>
      <el-form-item label="父级分类">
        <el-cascader
          class="cascader"
          v-model="cascaderValue"
          :options="categories"
          :props="{
            expandTrigger: 'hover',
            label: 'cat_name',
            value: 'cat_id',
            checkStrictly: true
          }"
          @change="handleCascaderChange"
          clearable
        ></el-cascader>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addCategories">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getCategories, addCategoriesAjax } from "../../api/index";
export default {
  data() {
    return {
      dialogVisible: false,
      formLabelAlign: {
        cat_pid: 0,
        cat_name: "",
        cat_level: 0
      },
      cascaderValue: [],
      categories: [],
      rules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    open() {
      this.dialogVisible = true;
    },
    handleCascaderChange() {
      this.formLabelAlign.cat_pid = this.cascaderValue[
        this.cascaderValue.length - 1
      ];
      this.formLabelAlign.cat_level = this.cascaderValue.length;
    },
    _resetForm() {
      this.cascaderValue = [];
      this.formLabelAlign = {
        cat_pid: 0,
        cat_name: "",
        cat_level: 0
      };
    },
    _getCategories() {
      getCategories({ type: 2 }).then(res => {
        if (res.meta.status == 200) {
          // this.$message.success(res.meta.msg);
          this.categories = res.data;
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },
    addCategories() {
      this.$refs["addCategoriesForm"].validate(valid => {
        if (valid) {
          addCategoriesAjax(this.formLabelAlign).then(res => {
            if (res.meta.status == 201) {
              this.$message.success(res.meta.msg);
              this.dialogVisible = false;
              this.$emit("_getCategories");
              this._getCategories();
            } else {
              this.$message.error(res.meta.msg);
            }
          });
        }
      });
    }
  },
  created() {
    this._getCategories();
  }
};
</script>

<style lang="stylus" scoped>
.cascader {
  width: 100%;
}
</style>
